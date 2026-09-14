import { Button } from '@/components/ui/Button';
import { Input, Label, Select, Textarea } from '@/components/ui/Input';

export function BusinessRegistrationForm() {
  return (
    <form className="premium-shell grid gap-5 p-6 sm:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label>Business name</Label><Input placeholder="Nordic Harbor Kitchen"/></div>
        <div><Label>Business type</Label><Select><option>Restaurant</option><option>Hotel</option><option>Bar</option><option>Café</option><option>Food brand</option><option>Beverage brand</option><option>Event organizer</option></Select></div>
        <div><Label>City</Label><Input placeholder="Stockholm"/></div>
        <div><Label>Website</Label><Input placeholder="https://"/></div>
      </div>
      <div><Label>What do you want to promote?</Label><Textarea placeholder="Menus, tasting events, local offers, tourism packages..."/></div>
      <div className="rounded-3xl border border-[rgb(var(--border))]/80 bg-white/45 p-4 text-sm leading-6 text-[rgb(var(--muted-foreground))] dark:bg-white/5">Your first profile can include menus, event formats, offers, map presence, and business categories before billing is connected.</div>
      <Button type="button" className="w-fit">Create business profile</Button>
    </form>
  );
}
