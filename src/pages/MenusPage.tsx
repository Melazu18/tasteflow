import { MenuCard } from '@/components/marketplace/MenuCard';
import { menuItems } from '@/data/mock';
import { useI18n } from '@/i18n/I18nProvider';

export function MenusPage() {
  const { t } = useI18n();
  return (
    <section className="container-page py-12">
      <div className="premium-shell p-7 sm:p-10">
        <p className="eyebrow">Menu discovery</p>
        <h1 className="section-title mt-3">{t('menusTitle')}</h1>
        <p className="section-copy mt-4">{t('menusText')}</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">{menuItems.map(i=><MenuCard key={i.id} item={i}/>)}</div>
    </section>
  );
}
