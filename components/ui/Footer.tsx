import { useTranslations } from 'next-intl';

const socialLinks = [
  { name: 'Twitter', href: '#' },
  { name: 'Instagram', href: '#' },
];

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="border-t border-border bg-void px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 md:flex-row md:justify-between">
        {/* Links */}
        <ul className="flex gap-6">
          {(['privacy', 'terms', 'contact'] as const).map((key) => (
            <li key={key}>
              <a
                href="#"
                className="footer-link text-footer text-stone transition-colors duration-300 hover:text-ivory"
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Social */}
        <div className="flex gap-5">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="footer-link text-footer text-stone transition-colors duration-300 hover:text-ivory"
              aria-label={link.name}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-footer text-ash">{t('copyright')}</p>
      </div>
    </footer>
  );
}
