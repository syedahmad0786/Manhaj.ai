import { NextResponse, type NextRequest } from 'next/server';
import { leadSchema } from '@/lib/lead';
import { getResend } from '@/lib/resend';
import { getSupabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;

  const submittedAt = new Date().toISOString();
  const subject = `New audit lead · ${data.company || data.email}`;
  const body = [
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    `Company: ${data.company || '—'}`,
    `Role:    ${data.role || '—'}`,
    `Revenue: ${data.revenue || '—'}`,
    `Stack:   ${data.stack || '—'}`,
    `When:    ${data.when || '—'}`,
    '',
    'Notes:',
    data.notes || '—',
  ].join('\n');

  // Triple-write: Resend (operator inbox) + Supabase (durable record) + n8n
  // (downstream automations). Each is independent — if one fails the others
  // still attempt. We surface a 500 only if ALL three fail.
  const tasks = [
    (async () => {
      try {
        await getResend().emails.send({
          from: process.env.RESEND_FROM ?? 'Manhaj <hello@manhaj.ai>',
          to: process.env.RESEND_TO ?? 'ahmad@manhaj.ai',
          subject,
          text: body,
        });
        return { ok: true, channel: 'resend' as const };
      } catch (err) {
        console.error('resend failed', err);
        return { ok: false, channel: 'resend' as const, err: String(err) };
      }
    })(),
    (async () => {
      try {
        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from('leads').insert({
          name: data.name,
          email: data.email,
          company: data.company || null,
          role: data.role || null,
          revenue: data.revenue || null,
          stack: data.stack || null,
          when_band: data.when || null,
          notes: data.notes || null,
          source: 'audit-form',
          created_at: submittedAt,
        });
        if (error) throw error;
        return { ok: true, channel: 'supabase' as const };
      } catch (err) {
        console.error('supabase failed', err);
        return { ok: false, channel: 'supabase' as const, err: String(err) };
      }
    })(),
    (async () => {
      const url = process.env.N8N_WEBHOOK_URL;
      if (!url) return { ok: false, channel: 'n8n' as const, err: 'no webhook configured' };
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ...data, submittedAt }),
        });
        if (!res.ok) throw new Error(`n8n status ${res.status}`);
        return { ok: true, channel: 'n8n' as const };
      } catch (err) {
        console.error('n8n failed', err);
        return { ok: false, channel: 'n8n' as const, err: String(err) };
      }
    })(),
  ];

  const results = await Promise.all(tasks);
  const allFailed = results.every((r) => !r.ok);
  if (allFailed) {
    return NextResponse.json(
      { error: 'All sinks failed', results },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, results });
}
