'use client';

import { useState, type ReactNode } from 'react';
import { track } from '@/lib/analytics';

// Visual port of AuditForm from .extracted-source/006 — pills + monospace
// labels + accent submit. Submit logic preserved from the existing lib/lead
// integration: validates client-side, POSTs to /api/lead, fires GTM event.
//
// NOTE: the lib/lead.ts zod schema is the source of truth for fields. We keep
// `notes`, `stack`, `revenue` enum and `when` enum names from there even
// though the UI relabels `notes` to "Biggest bottleneck" to match the
// original copy.
const REVENUE_OPTIONS = [
  { value: '<1m', label: '<$1M' },
  { value: '1-3m', label: '$1M–$3M' },
  { value: '3-10m', label: '$3M–$10M' },
  { value: '10m+', label: '$10M+' },
  { value: 'na', label: 'Prefer not to say' },
] as const;

const WHEN_OPTIONS = [
  { value: 'now', label: 'This week' },
  { value: '30d', label: 'Inside 30 days' },
  { value: '60d', label: 'Inside 60 days' },
  { value: 'browsing', label: 'Just exploring' },
] as const;

const STACK_OPTIONS = [
  'GHL', 'HubSpot', 'Pipedrive', 'Airtable', 'Notion', 'Zapier', 'n8n', 'Make.com', 'Calendly', 'Custom',
] as const;

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  revenue: string;
  stack: string[];
  notes: string;
  when: string;
};

const INITIAL: FormState = {
  name: '', email: '', company: '', role: '',
  revenue: '1-3m', stack: [], notes: '', when: 'now',
};

export default function AuditForm() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg(null);

    const payload = {
      name: data.name,
      email: data.email,
      company: data.company,
      role: data.role,
      revenue: data.revenue,
      stack: data.stack.join(', '),
      notes: data.notes,
      when: data.when,
    };
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `lead api ${res.status}`);
      }
      track({ event: 'lead_form_submit', revenue: data.revenue, when: data.when });
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div
        style={{
          padding: 56,
          border: '1px solid var(--accent)',
          background: 'var(--bg-elevated)',
          textAlign: 'center',
          minHeight: 480,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <span style={{ fontSize: 56, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>◊</span>
        <h2 className="t-display" style={{ fontSize: 36 }}>Submitted.</h2>
        <p style={{ color: 'var(--ink-secondary)', maxWidth: 480, lineHeight: 1.6 }}>
          You&apos;ll get an email within 4 hours with two times that work for Ahmad. The discovery call runs
          30 minutes.
        </p>
        <div className="t-mono" style={{ marginTop: 16 }}>
          ◊ ref · {Math.random().toString(36).slice(2, 8).toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        padding: 40,
        border: '1px solid var(--line)',
        background: 'var(--bg-elevated)',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
      noValidate
    >
      <div className="t-eyebrow">◊ Qualifying form</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field
          label="Name"
          value={data.name}
          onChange={(v) => setData({ ...data, name: v })}
          placeholder="Ahmad Bukhari"
          required
        />
        <Field
          label="Email"
          type="email"
          value={data.email}
          onChange={(v) => setData({ ...data, email: v })}
          placeholder="ahmad@founder.co"
          required
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field
          label="Company"
          value={data.company}
          onChange={(v) => setData({ ...data, company: v })}
          placeholder="Operator Co."
        />
        <Field
          label="Role"
          value={data.role}
          onChange={(v) => setData({ ...data, role: v })}
          placeholder="Founder · CEO · COO"
        />
      </div>

      <div>
        <FieldLabel>Annual revenue</FieldLabel>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {REVENUE_OPTIONS.map((r) => (
            <Pill
              key={r.value}
              active={data.revenue === r.value}
              onClick={() => setData({ ...data, revenue: r.value })}
            >
              {r.label}
            </Pill>
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>
          Current stack <span style={{ color: 'var(--ink-tertiary)' }}>(multi-select)</span>
        </FieldLabel>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {STACK_OPTIONS.map((s) => {
            const active = data.stack.includes(s);
            return (
              <Pill
                key={s}
                active={active}
                onClick={() =>
                  setData({
                    ...data,
                    stack: active ? data.stack.filter((x) => x !== s) : [...data.stack, s],
                  })
                }
              >
                {active && '+ '}
                {s}
              </Pill>
            );
          })}
        </div>
      </div>

      <div>
        <FieldLabel>Biggest bottleneck</FieldLabel>
        <textarea
          value={data.notes}
          onChange={(e) => setData({ ...data, notes: e.target.value })}
          placeholder="Where leads die. Where the system breaks. Where the founder is the bottleneck."
          rows={4}
          style={{
            width: '100%',
            padding: 16,
            background: 'var(--bg-base)',
            border: '1px solid var(--line)',
            color: 'var(--ink-primary)',
            fontFamily: 'inherit',
            fontSize: 15,
            resize: 'vertical',
            outline: 'none',
          }}
        />
      </div>

      <div>
        <FieldLabel>Preferred call time</FieldLabel>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {WHEN_OPTIONS.map((w) => (
            <Pill
              key={w.value}
              active={data.when === w.value}
              onClick={() => setData({ ...data, when: w.value })}
            >
              {w.label}
            </Pill>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 8, flexWrap: 'wrap' }}>
        <button
          type="submit"
          data-magnetic
          disabled={status === 'sending'}
          style={{
            background: 'var(--accent)',
            color: 'var(--bg-base)',
            padding: '18px 28px',
            border: 'none',
            cursor: status === 'sending' ? 'wait' : 'pointer',
            fontFamily: 'inherit',
            fontSize: 14,
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            transition: 'all 300ms var(--ease)',
            opacity: status === 'sending' ? 0.7 : 1,
          }}
        >
          {status === 'sending' ? 'Sending…' : 'Submit qualifying form'} <span>→</span>
        </button>
        <span style={{ fontSize: 12, color: 'var(--ink-tertiary)' }}>
          Response within 4 hours · Ahmad reads every form
        </span>
      </div>

      {status === 'error' && (
        <div
          style={{
            padding: 16,
            border: '1px solid #5c2b2e',
            background: '#2a1215',
            color: '#ff8a80',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.06em',
          }}
        >
          ◊ Something broke{errorMsg ? ` · ${errorMsg}` : ''}. Email{' '}
          <a href="mailto:hello@manhaj.ai" style={{ color: 'inherit', textDecoration: 'underline' }}>
            hello@manhaj.ai
          </a>{' '}
          directly and we&apos;ll catch it from there.
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '14px 16px',
          background: 'var(--bg-base)',
          border: '1px solid var(--line)',
          color: 'var(--ink-primary)',
          fontFamily: 'inherit',
          fontSize: 15,
          outline: 'none',
        }}
      />
    </div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <div className="t-mono" style={{ marginBottom: 12, fontSize: 10 }}>
      {children}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor-hover
      style={{
        padding: '10px 16px',
        border: '1px solid',
        borderColor: active ? 'var(--accent)' : 'var(--line)',
        background: active ? 'rgba(201,169,97,0.1)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--ink-secondary)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.06em',
        cursor: 'pointer',
        transition: 'all 300ms var(--ease)',
      }}
    >
      {children}
    </button>
  );
}
