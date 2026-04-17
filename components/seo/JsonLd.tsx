export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Heroes Inc.',
        url: 'https://medalhero.com',
        logo: 'https://medalhero.com/logo.png',
        sameAs: ['https://twitter.com/heroesapp', 'https://instagram.com/heroesapp'],
      },
      {
        '@type': 'MobileApplication',
        name: 'Heroes',
        operatingSystem: 'iOS, Android',
        applicationCategory: 'HealthApplication',
        description:
          'Virtual challenge fitness app. Walk Mt. Fuji, follow the 47 Ronin path, ride Japanese railways. Every step becomes an adventure.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        inLanguage: ['ja', 'en'],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
