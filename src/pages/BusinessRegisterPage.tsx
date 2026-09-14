import { BusinessRegistrationForm } from '@/components/forms/BusinessRegistrationForm';

export function BusinessRegisterPage(){
  return (
    <section className="container-page grid gap-10 py-12 lg:grid-cols-[.82fr_1.18fr]">
      <div className="premium-shell h-fit p-7 sm:p-9">
        <p className="eyebrow">Business onboarding</p>
        <h1 className="section-title mt-3">Register your hospitality business</h1>
        <p className="section-copy mt-4">Create a premium profile for restaurants, hotels, bars, cafés, food and beverage brands, event organizers, and tourism partners.</p>
        <div className="mt-8 grid gap-3 text-sm text-[rgb(var(--muted-foreground))]">
          <p>✓ Marketplace storefront</p><p>✓ Menu and offer publishing</p><p>✓ Tasting event visibility</p><p>✓ Location-based discovery</p>
        </div>
      </div>
      <BusinessRegistrationForm/>
    </section>
  );
}
