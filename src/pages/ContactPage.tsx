import { Button } from '@/components/ui/Button';
import { Input, Label, Select, Textarea } from '@/components/ui/Input';
import { useI18n } from '@/i18n/I18nProvider';

export function ContactPage(){
  const { t } = useI18n();
  return (
    <section className="container-page grid gap-10 py-12 lg:grid-cols-2">
      <div className="premium-shell h-fit p-7 sm:p-10">
        <p className="eyebrow">Contact</p>
        <h1 className="section-title mt-3">{t('contactTitle')}</h1>
        <p className="section-copy mt-4">Use this lead form for hospitality partners, tourism boards, local businesses, brands, and event organizers.</p>
      </div>
      <form className="premium-shell grid gap-4 p-6 sm:p-8">
        <div><Label>Name</Label><Input/></div>
        <div><Label>Email</Label><Input type="email"/></div>
        <div><Label>Request type</Label><Select><option>Business onboarding</option><option>Tourism partnership</option><option>Brand campaign</option><option>Support</option></Select></div>
        <div><Label>Message</Label><Textarea/></div>
        <Button type="button">Send request</Button>
      </form>
    </section>
  );
}
