'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import type { CommonDictionary } from '@/content/types';
import { collectContext, submitLead } from '@/lib/leads';
import { trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';
import styles from './LeadForm.module.css';

interface LeadFormProps {
  dict: CommonDictionary;
  variant?: 'lead' | 'demo';
}

/** Маска +7: цифры форматируются, @username и прочий текст не трогаем. */
function formatMessenger(raw: string): string {
  const trimmed = raw.trimStart();
  if (!/^[+\d(]/.test(trimmed)) return raw;
  let digits = trimmed.replace(/\D/g, '');
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (!digits.startsWith('7')) digits = '7' + digits;
  digits = digits.slice(0, 11);
  const parts = [digits.slice(1, 4), digits.slice(4, 7), digits.slice(7, 9), digits.slice(9, 11)];
  return ('+7 ' + parts.filter(Boolean).join(' ')).trim();
}

function isValidMessenger(value: string): boolean {
  const trimmed = value.trim();
  if (/^[+\d(]/.test(trimmed)) return trimmed.replace(/\D/g, '').length === 11;
  return trimmed.length >= 3;
}

export function LeadForm({ dict, variant = 'lead' }: LeadFormProps) {
  const f = dict.form;
  const [values, setValues] = useState({
    name: '',
    messenger: '',
    niche: '',
    link: '',
    comment: '',
    honeypot: '',
  });
  const [isConsented, setIsConsented] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const set = (field: keyof typeof values) => (value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!values.name.trim()) nextErrors.name = f.errors.required;
    if (!values.messenger.trim()) nextErrors.messenger = f.errors.required;
    else if (!isValidMessenger(values.messenger)) nextErrors.messenger = f.errors.phone;
    if (!isConsented) nextErrors.consent = f.errors.consent;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');
    try {
      await submitLead({ variant, ...values, ...collectContext() });
    } catch {
      setStatus('error');
      return;
    }
    trackEvent(variant === 'demo' ? 'demo_request' : 'form_submit', { variant });
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <p className="h3">{f.successTitle}</p>
        <p className={`body-l ${styles.successText}`}>{f.successText}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className="mono-label text-muted">{f.name}</span>
          <input
            className={styles.input}
            type="text"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set('name')(e.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span className={`caption ${styles.error}`}>{errors.name}</span>}
        </label>
        <label className={styles.field}>
          <span className="mono-label text-muted">{f.messenger}</span>
          <input
            className={styles.input}
            type="text"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7"
            value={values.messenger}
            onChange={(e) => set('messenger')(formatMessenger(e.target.value))}
            aria-invalid={Boolean(errors.messenger)}
          />
          {errors.messenger && <span className={`caption ${styles.error}`}>{errors.messenger}</span>}
        </label>
        <label className={styles.field}>
          <span className="mono-label text-muted">{variant === 'demo' ? f.industry : f.niche}</span>
          <select
            className={styles.input}
            name="niche"
            value={values.niche}
            onChange={(e) => set('niche')(e.target.value)}
          >
            <option value="" />
            {f.nicheOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className="mono-label text-muted">{f.link}</span>
          <input
            className={styles.input}
            type="url"
            name="url"
            inputMode="url"
            autoComplete="url"
            value={values.link}
            onChange={(e) => set('link')(e.target.value)}
          />
        </label>
        <label className={`${styles.field} ${styles.fieldWide}`}>
          <span className="mono-label text-muted">{f.comment}</span>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            name="comment"
            rows={3}
            value={values.comment}
            onChange={(e) => set('comment')(e.target.value)}
          />
        </label>
      </div>

      {/* Ловушка для ботов — ТЗ §11.3; людям поле не показывается. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={styles.honeypot}
        value={values.honeypot}
        onChange={(e) => set('honeypot')(e.target.value)}
      />

      <label className={styles.consent}>
        <input
          type="checkbox"
          checked={isConsented}
          onChange={(e) => setIsConsented(e.target.checked)}
          className={styles.checkbox}
          aria-invalid={Boolean(errors.consent)}
        />
        <span className="caption">
          {f.consentPrefix}
          <Link href="/privacy" className={styles.consentLink}>
            {f.consentLink}
          </Link>
        </span>
      </label>
      {errors.consent && <p className={`caption ${styles.error}`}>{errors.consent}</p>}

      {status === 'error' && (
        <p className={`caption ${styles.error}`} role="alert">
          {f.errors.submit}
        </p>
      )}

      <div className={styles.actions}>
        <Button type="submit" disabled={status === 'sending'}>
          {variant === 'demo' ? f.submitDemo : f.submitLead}
        </Button>
        <a
          href={dict.contacts.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.altLink}
          data-placement="form"
        >
          {f.orWhatsapp}
        </a>
      </div>
    </form>
  );
}
