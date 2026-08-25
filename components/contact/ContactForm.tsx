'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

const intents = [
  { id: 'product', label: 'Product enquiry' },
  { id: 'catalogue', label: 'Catalogue request' },
  { id: 'rep', label: 'Representative visit' },
  { id: 'general', label: 'General enquiry' },
] as const;

export function ContactForm() {
  const search = useSearchParams();
  const intentParam = search.get('intent');
  const refParam = search.get('ref') ?? '';
  const [intent, setIntent] = useState<string>(
    intents.find((i) => i.id === intentParam)?.id ?? 'product',
  );
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = `[${intents.find((i) => i.id === intent)?.label}] from ${data.get('firstName')} ${data.get('lastName')}${refParam ? ` — REF ${refParam}` : ''}`;
    const bodyLines = [
      `Name: ${data.get('firstName')} ${data.get('lastName')}`,
      `Hospital / organisation: ${data.get('hospital')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone')}`,
      refParam ? `Product / REF: ${refParam}` : null,
      `Enquiry type: ${intents.find((i) => i.id === intent)?.label}`,
      '',
      'Message:',
      String(data.get('message') ?? ''),
    ].filter(Boolean);
    const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
    setStatus('sent');
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-ink/10 bg-white p-6 md:p-10 space-y-8"
    >
      {/* Intent chips */}
      <fieldset>
        <legend className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-ink/50">
          Enquiry type
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {intents.map((i) => (
            <button
              key={i.id}
              type="button"
              onClick={() => setIntent(i.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm border transition-all',
                intent === i.id
                  ? 'bg-ink text-paper border-ink'
                  : 'border-ink/15 text-ink/70 hover:border-ink/40',
              )}
              aria-pressed={intent === i.id}
            >
              {i.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field name="firstName" label="First name" required autoComplete="given-name" />
        <Field name="lastName" label="Last name" required autoComplete="family-name" />
        <Field name="email" label="Email" type="email" required autoComplete="email" />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
        <div className="md:col-span-2">
          <Field name="hospital" label="Hospital / organisation" autoComplete="organization" />
        </div>
        {refParam && (
          <div className="md:col-span-2">
            <Field name="ref" label="Product REF" defaultValue={refParam} readOnly />
          </div>
        )}
        <div className="md:col-span-2">
          <Field
            name="message"
            label="How can we help?"
            multiline
            required
            placeholder="Tell us about the product, specialty or procedure you'd like to discuss."
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
        <p className="text-xs text-ink/50">
          By submitting you consent to being contacted by HSK Surgical Ltd.
        </p>
        <Button type="submit" arrow>
          {status === 'sent' ? 'Opened in email' : 'Send enquiry'}
        </Button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required,
  multiline,
  placeholder,
  autoComplete,
  defaultValue,
  readOnly,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  readOnly?: boolean;
}) {
  const commonClasses =
    'peer w-full rounded-xl border border-ink/15 bg-white px-4 pt-6 pb-2 text-ink placeholder-transparent focus:outline-none focus:border-ink/60 transition-colors';
  return (
    <label className="relative block">
      {multiline ? (
        <textarea
          name={name}
          rows={5}
          placeholder={placeholder ?? label}
          required={required}
          className={cn(commonClasses, 'resize-y')}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder ?? label}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          readOnly={readOnly}
          className={commonClasses}
        />
      )}
      <span
        className={cn(
          'absolute left-4 top-2 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink/50',
          'pointer-events-none',
        )}
      >
        {label}{required && <span className="text-accent"> *</span>}
      </span>
    </label>
  );
}
