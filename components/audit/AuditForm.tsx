'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { leadSchema, type Lead } from '@/lib/lead';
import { track } from '@/lib/analytics';

const REVENUE = [
  { v: '<1m', label: 'Under $1M' },
  { v: '1-3m', label: '$1M – $3M' },
  { v: '3-10m', label: '$3M – $10M' },
  { v: '10m+', label: '$10M+' },
  { v: 'na', label: 'Prefer not to say' },
] as const;

const WHEN = [
  { v: 'now', label: 'Now' },
  { v: '30d', label: 'Inside 30 days' },
  { v: '60d', label: 'Inside 60 days' },
  { v: 'browsing', label: 'Just exploring' },
] as const;

export default function AuditForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Lead>({ resolver: zodResolver(leadSchema) });

  async function onSubmit(values: Lead) {
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('lead api ' + res.status);
      track({
        event: 'lead_form_submit',
        revenue: values.revenue,
        when: values.when,
      });
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-gold bg-gold/5 p-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
          ◊ Received
        </p>
        <p className="mt-4 font-serif text-3xl text-cream">
          You&apos;ll hear back from Ahmad within 24 hours.
        </p>
        <p className="mt-3 font-sans text-sm text-cream-dim">
          If you&apos;d rather pick a slot directly, the calendar is below.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-7 border border-line bg-ink-2/30 p-8 md:p-10"
      noValidate
    >
      <Field
        label="Name"
        error={errors.name?.message}
        input={
          <input
            {...register('name')}
            type="text"
            autoComplete="name"
            className={fieldClass}
          />
        }
      />
      <Field
        label="Email"
        error={errors.email?.message}
        input={
          <input
            {...register('email')}
            type="email"
            autoComplete="email"
            className={fieldClass}
          />
        }
      />
      <div className="grid gap-7 md:grid-cols-2">
        <Field
          label="Company"
          input={
            <input
              {...register('company')}
              type="text"
              autoComplete="organization"
              className={fieldClass}
            />
          }
        />
        <Field
          label="Your role"
          input={
            <input
              {...register('role')}
              type="text"
              className={fieldClass}
              placeholder="Founder · CEO · Ops lead"
            />
          }
        />
      </div>
      <div className="grid gap-7 md:grid-cols-2">
        <Field
          label="Revenue band"
          input={
            <select {...register('revenue')} className={fieldClass}>
              <option value="">Select…</option>
              {REVENUE.map((r) => (
                <option key={r.v} value={r.v}>
                  {r.label}
                </option>
              ))}
            </select>
          }
        />
        <Field
          label="Timing"
          input={
            <select {...register('when')} className={fieldClass}>
              <option value="">Select…</option>
              {WHEN.map((r) => (
                <option key={r.v} value={r.v}>
                  {r.label}
                </option>
              ))}
            </select>
          }
        />
      </div>
      <Field
        label="Current stack (any tools you're running)"
        input={
          <input
            {...register('stack')}
            type="text"
            className={fieldClass}
            placeholder="HubSpot, Twilio, Make, Notion…"
          />
        }
      />
      <Field
        label="Anything specific you'd like to surface on the call?"
        input={
          <textarea
            {...register('notes')}
            rows={4}
            className={`${fieldClass} resize-y`}
          />
        }
      />

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-3 border border-gold bg-gold px-7 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-gold-soft disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Request audit'}
          <span aria-hidden>→</span>
        </button>
        {status === 'error' && (
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-rose-300">
            Something broke. Email <a className="underline" href="mailto:hello@manhaj.ai">hello@manhaj.ai</a> directly.
          </span>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  input,
  error,
}: {
  label: string;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">
        {label}
      </span>
      <span className="mt-3 block">{input}</span>
      {error && (
        <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-rose-300">
          {error}
        </span>
      )}
    </label>
  );
}

const fieldClass =
  'w-full bg-transparent border border-line px-4 py-3 font-sans text-base text-cream outline-none transition-colors focus:border-gold placeholder:text-mute';
