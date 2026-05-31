import {
  FAQ_ITEMS,
  PAGE_SECTIONS,
  PERSON,
  SITE,
  SITE_URL,
  VIDEOS,
  absoluteUrl,
  ogImageUrl,
} from './site';

type JsonLd = Record<string, unknown>;

function graph(...nodes: JsonLd[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes,
  });
}

export function buildJsonLdGraph(): JsonLd[] {
  const url = absoluteUrl();
  const image = ogImageUrl();

  const organization: JsonLd = {
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name: SITE.name,
    url,
    description: SITE.tagline,
    founder: { '@id': `${url}/#person` },
  };

  const webSite: JsonLd = {
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.lang,
    publisher: { '@id': `${url}/#organization` },
  };

  const webPage: JsonLd = {
    '@type': 'WebPage',
    '@id': `${url}/#webpage`,
    url,
    name: SITE.title,
    description: SITE.description,
    inLanguage: SITE.lang,
    isPartOf: { '@id': `${url}/#website` },
    about: { '@id': `${url}/#person` },
    primaryImageOfPage: { '@type': 'ImageObject', url: image },
  };

  const person: JsonLd = {
    '@type': 'Person',
    '@id': `${url}/#person`,
    name: `${PERSON.givenName} ${PERSON.familyName}`,
    alternateName: PERSON.alternateName,
    jobTitle: PERSON.jobTitle,
    description: SITE.description,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone,
    url,
    image,
    knowsAbout: [...PERSON.knowsAbout],
    sameAs: [...SITE.sameAs],
    alumniOf: PERSON.alumniOf.map((a) => ({
      '@type': 'EducationalOrganization',
      name: a.name,
    })),
    worksFor: { '@id': `${url}/#organization` },
  };

  const professionalService: JsonLd = {
    '@type': 'ProfessionalService',
    '@id': `${url}/#service`,
    name: SITE.name,
    alternateName: SITE.brand,
    description: SITE.description,
    url,
    image,
    telephone: SITE.phone,
    email: SITE.email,
    areaServed: SITE.areaServed,
    availableLanguage: SITE.lang,
    provider: { '@id': `${url}/#person` },
    serviceType: [...SITE.serviceType],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      description: 'Séances de soutien scolaire individualisé — sur devis / contact direct',
    },
  };

  const faqPage: JsonLd = {
    '@type': 'FAQPage',
    '@id': `${url}/#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const itemList: JsonLd = {
    '@type': 'ItemList',
    '@id': `${url}/#sections`,
    name: 'Sections du site',
    itemListElement: PAGE_SECTIONS.map((section, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: section.name,
      url: `${url}/#${section.id}`,
    })),
  };

  const videos: JsonLd[] = VIDEOS.map((video, index) => ({
    '@type': 'VideoObject',
    '@id': `${url}/#video-${index + 1}`,
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    embedUrl: video.embedUrl,
    uploadDate: video.uploadDate,
    inLanguage: SITE.lang,
    publisher: { '@id': `${url}/#person` },
  }));

  return [organization, webSite, webPage, person, professionalService, faqPage, itemList, ...videos];
}

export function buildJsonLdScriptContent(): string {
  return graph(...buildJsonLdGraph());
}

/** Balises <meta> et <link> injectées dans index.html au build. */
export function buildHeadTags(): string {
  const url = absoluteUrl();
  const image = ogImageUrl();
  const keywords = SITE.keywords.join(', ');

  const tags: string[] = [
    `<title>${escapeHtml(SITE.title)}</title>`,
    `<meta name="description" content="${escapeAttr(SITE.description)}" />`,
    `<meta name="keywords" content="${escapeAttr(keywords)}" />`,
    `<meta name="author" content="${escapeAttr(SITE.author)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta name="googlebot" content="index, follow" />`,
    `<meta name="theme-color" content="#3d5a4c" />`,
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
    `<link rel="alternate" hreflang="${SITE.lang}" href="${escapeAttr(url)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeAttr(url)}" />`,

    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE.name)}" />`,
    `<meta property="og:title" content="${escapeAttr(SITE.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(SITE.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta property="og:image" content="${escapeAttr(image)}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(SITE.shortTitle)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,

    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(SITE.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(SITE.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(image)}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttr(SITE.shortTitle)}" />`,

    `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.svg" />`,
    `<link rel="manifest" href="/site.webmanifest" />`,
  ];

  if (SITE.twitterHandle) {
    tags.push(`<meta name="twitter:site" content="${escapeAttr(SITE.twitterHandle)}" />`);
  }

  return tags.join('\n    ');
}

export function buildJsonLdScriptTag(): string {
  return `<script type="application/ld+json">\n${buildJsonLdScriptContent()}\n    </script>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/"/g, '&quot;');
}
