'use client';
import {useEffect, useRef, useState} from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      render: (container: HTMLElement, params: Record<string, unknown>) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
    };
    onRecaptchaApiLoad?: () => void;
  }
}

// Test-only key that always validates — replace with the real site key once issued.
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const recaptchaBox = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || widgetId.current !== null) return;

    const renderWidget = () => {
      if (!recaptchaBox.current || !window.grecaptcha || widgetId.current !== null) return;
      widgetId.current = window.grecaptcha.render(recaptchaBox.current, {sitekey: RECAPTCHA_SITE_KEY});
    };

    if (window.grecaptcha) {
      renderWidget();
      return;
    }

    window.onRecaptchaApiLoad = renderWidget;
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaApiLoad&render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback('');

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never fill this hidden field, bots often do.
    if ((data.get('hp_field') as string || '').trim() !== '') {
      setStatus('success');
      setFeedback('Thank you. Your message has been sent — we will be in touch soon.');
      form.reset();
      return;
    }

    const recaptchaToken = window.grecaptcha && widgetId.current !== null
      ? window.grecaptcha.getResponse(widgetId.current)
      : '';

    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setStatus('error');
      setFeedback('Please confirm you are not a robot.');
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('/submit.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          recaptchaToken,
          hp_field: data.get('hp_field'),
        }),
      });
      const result = await res.json().catch(() => null);

      if (res.ok && result?.success) {
        setStatus('success');
        setFeedback(result.message || 'Thank you. Your message has been sent — we will be in touch soon.');
        form.reset();
      } else {
        setStatus('error');
        setFeedback(result?.message || 'Sorry, something went wrong. Please try again or call us directly.');
      }
    } catch {
      setStatus('error');
      setFeedback('Sorry, something went wrong. Please try again or call us directly.');
    } finally {
      if (window.grecaptcha && widgetId.current !== null) window.grecaptcha.reset(widgetId.current);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-5">
        <label htmlFor="name" className="block font-bold mb-2">Your Name <span className="text-bronze">*</span></label>
        <input id="name" name="name" type="text" required minLength={2} maxLength={100} placeholder="Enter your name" className="w-full rounded-xl border border-line px-4 py-3 focus:outline-none focus:border-bronze" />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block font-bold mb-2">Email Address <span className="text-bronze">*</span></label>
        <input id="email" name="email" type="email" required placeholder="your@email.com" className="w-full rounded-xl border border-line px-4 py-3 focus:outline-none focus:border-bronze" />
      </div>
      <div className="mb-5">
        <label htmlFor="message" className="block font-bold mb-2">Your Message <span className="text-bronze">*</span></label>
        <textarea id="message" name="message" required minLength={5} maxLength={2000} rows={6} placeholder="Tell us how we can help..." className="w-full rounded-xl border border-line px-4 py-3 focus:outline-none focus:border-bronze" />
      </div>

      {/* Honeypot field — hidden from real visitors, left blank by them, often filled by bots */}
      <div aria-hidden="true" style={{position: 'absolute', left: '-9999px', top: 0, height: 0, overflow: 'hidden'}}>
        <label htmlFor="hp_field">Leave this field blank</label>
        <input id="hp_field" name="hp_field" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mb-5 overflow-x-auto">
        <div ref={recaptchaBox} className="recaptcha-scale" />
      </div>

      {feedback && (
        <p className={`mb-5 text-sm font-semibold ${status === 'success' ? 'text-green-700' : 'text-bronze'}`} role="status">{feedback}</p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn w-full justify-center disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
