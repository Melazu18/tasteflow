import { FormEvent, useState } from 'react';
import { ArrowUpRight, Mail, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Label, Select, Textarea } from '@/components/ui/Input';
import { useI18n } from '@/i18n/I18nProvider';

export function ContactPage(){
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `${formData.get('requestType')} from ${formData.get('name')}`;
    const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nRequest: ${formData.get('requestType')}\n\n${formData.get('message')}`;
    window.location.href = `mailto:info@ahumani.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <section className="container-page py-12">
      <div className="premium-shell grid gap-10 p-7 sm:p-10 lg:grid-cols-[.85fr_1.15fr] lg:p-12">
        <div className="h-fit">
        <div className="chip w-fit"><Sparkles size={14} /> {t('contactEyebrow')}</div>
        <h1 className="section-title mt-3">{t('contactTitle')}</h1>
        <p className="section-copy mt-4">{t('contactText')}</p>
        <a href="mailto:info@ahumani.com" className="mt-8 flex items-center gap-3 rounded-2xl border border-[rgb(var(--border))]/80 bg-white/55 p-4 font-semibold shadow-innerGlow dark:bg-white/5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]"><Mail size={18} /></span><span><span className="block text-xs font-medium uppercase tracking-[.16em] text-[rgb(var(--muted-foreground))]">{t('emailUs')}</span><span>info@ahumani.com</span></span><ArrowUpRight className="ml-auto" size={18} /></a>
        <div className="mt-8 grid gap-3 text-sm text-[rgb(var(--muted-foreground))]"><p className="flex gap-3"><MessageCircle size={18} className="shrink-0 text-[rgb(var(--accent))]" />{t('contactPrompt')}</p></div>
        </div>
        <form className="grid gap-5 rounded-[1.75rem] border border-[rgb(var(--border))]/80 bg-white/50 p-5 shadow-soft sm:p-7 dark:bg-white/5" onSubmit={handleSubmit}>
          <div><h2 className="text-2xl font-semibold">{t('contactFormTitle')}</h2><p className="mt-2 text-sm text-[rgb(var(--muted-foreground))]">{t('contactFormText')}</p></div>
          <div className="grid gap-5 sm:grid-cols-2"><div><Label htmlFor="contact-name">{t('nameLabel')}</Label><Input id="contact-name" name="name" required placeholder={t('namePlaceholder')} /></div><div><Label htmlFor="contact-email">{t('emailLabel')}</Label><Input id="contact-email" name="email" type="email" required placeholder="you@example.com" /></div></div>
          <div><Label htmlFor="contact-request">{t('requestLabel')}</Label><Select id="contact-request" name="requestType"><option>{t('businessOption')}</option><option>{t('collaborationOption')}</option><option>{t('sponsorOption')}</option><option>{t('supportOption')}</option></Select></div>
          <div><Label htmlFor="contact-message">{t('messageLabel')}</Label><Textarea id="contact-message" name="message" required placeholder={t('messagePlaceholder')} /></div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><Button type="submit" className="w-full sm:w-fit">{t('sendMessage')} <ArrowUpRight size={17} /></Button>{submitted && <p className="text-sm font-semibold text-[rgb(var(--primary))]">{t('emailReady')}</p>}</div>
        </form>
      </div>
    </section>
  );
}
