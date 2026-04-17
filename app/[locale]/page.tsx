import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Hero');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-void text-ivory">
      <p className="text-label text-stone">{t('label')}</p>
      <h1 className="text-hero text-heroes-gradient mt-6 text-center">
        {t('titleLine1')}
        <br />
        {t('titleLine2')}
      </h1>
      <p className="text-body-lg mt-4 max-w-md text-center text-stone">{t('subtitle')}</p>
      <div className="mt-10 flex gap-4">
        <button className="btn-primary">{t('ctaPrimary')}</button>
        <button className="btn-ghost">{t('ctaSecondary')}</button>
      </div>
    </main>
  );
}
