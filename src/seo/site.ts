/** URL canonique — remplacée au build via VITE_SITE_URL (voir vite.config.ts). */
export let SITE_URL = 'https://www.dys-ponible.fr';

export function setSiteUrl(url: string): void {
  SITE_URL = url.replace(/\/$/, '');
}

export const SITE = {
  lang: 'fr',
  locale: 'fr_FR',
  name: 'Dys-ponible',
  brand: 'Dys-ponible — Souhad Ayouaz',
  tagline: 'Soutien scolaire spécialisé & éducation inclusive',
  title:
    'Dys-ponible | Soutien scolaire DYS, TSA, TDA/H — Souhad Ayouaz',
  shortTitle: 'Dys-ponible — Soutien scolaire spécialisé',
  description:
    'Dys-ponible : soutien scolaire individualisé et accompagnement en éducation inclusive pour enfants DYS (dyslexie, dysorthographie, dyscalculie), TSA et TDA/H. Séances à domicile ou à distance, de la maternelle au collège, par Souhad Ayouaz (DU Éducation inclusive, INSPE Lyon 1).',
  keywords: [
    'Dys-ponible',
    'soutien scolaire DYS',
    'dyslexie',
    'dysorthographie',
    'dyscalculie',
    'troubles des apprentissages',
    'éducation inclusive',
    'accompagnement TSA',
    'TDA/H',
    'soutien scolaire à domicile',
    'Souhad Ayouaz',
    'remédiation pédagogique',
    'PAP',
    'PPRE',
    'Makaton',
    'TEACCH',
    'soutien scolaire en ligne',
  ],
  author: 'Souhad Ayouaz',
  email: 'ayouazsouhad@gmail.com',
  phone: '+33609490143',
  phoneDisplay: '06 09 49 01 43',
  imagePath: '/images/tri-couleurs.jpeg',
  twitterHandle: '',
  sameAs: [
    'https://www.linkedin.com/in/souhad-abdelhadi-1714a9283',
    'https://www.facebook.com/profile.php?id=100076505979771',
  ],
  areaServed: 'France',
  serviceType: [
    'Soutien scolaire spécialisé',
    'Accompagnement troubles DYS',
    'Accompagnement TSA',
    'Accompagnement TDA/H',
    'Éducation inclusive',
    'Personne ressource ESS',
  ],
} as const;

export const PERSON = {
  givenName: 'Souhad',
  familyName: 'Ayouaz',
  alternateName: 'Souhad Abdelhadi',
  jobTitle: 'Éducatrice spécialisée — Soutien scolaire & éducation inclusive',
  knowsAbout: [
    'Troubles DYS',
    'Dyslexie',
    'Dysorthographie',
    'Dyscalculie',
    'TSA',
    'TDA/H',
    'Éducation inclusive',
    'ABA',
    'TEACCH',
    'Makaton',
    'PAP',
    'PPRE',
    'PPS',
  ],
  alumniOf: [
    { name: 'INSPE Lyon 1', credential: 'DU Éducation inclusive' },
    { name: 'INSEI', credential: 'DU Troubles du langage et des apprentissages' },
    { name: 'INSPE Clermont-Auvergne', credential: "DU Enseignement français à l'étranger" },
  ],
} as const;

export const FAQ_ITEMS = [
  {
    question: 'Quels troubles accompagnez-vous ?',
    answer:
      'DYS (dyslexie, dysorthographie, dyspraxie, dysgraphie, dyscalculie), TSA (spectre de l’autisme), TDA/H, ainsi que les difficultés scolaires sans diagnostic.',
  },
  {
    question: 'Pour quels niveaux scolaires ?',
    answer: 'De la maternelle au collège, avec des séances individualisées adaptées au profil de chaque enfant.',
  },
  {
    question: 'Les séances se font-elles à domicile ou à distance ?',
    answer:
      'Les deux : accompagnement à domicile ou en visioconférence selon vos besoins et votre localisation.',
  },
  {
    question: 'Travaillez-vous avec les établissements et les familles ?',
    answer:
      'Oui : soutien individualisé, interventions en milieu scolaire ou médico-social, animation ESS, rédaction et suivi des PAP/PPS, coordination avec orthophonistes et équipes.',
  },
] as const;

export const VIDEOS = [
  {
    name: 'Dyslexie, dysorthographie, dyscalculie — comprendre les troubles',
    description: 'Vidéo Inserm sur les troubles DYS.',
    thumbnailUrl: 'https://i.ytimg.com/vi/fFQ1vmkebNA/sddefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/fFQ1vmkebNA',
    uploadDate: '2020-01-01',
  },
  {
    name: "Troubles DYS à l'école — témoignage",
    description: 'Témoignage France Culture.',
    thumbnailUrl: 'https://i.ytimg.com/vi/wJ24ip01MPg/sddefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/wJ24ip01MPg',
    uploadDate: '2020-01-01',
  },
] as const;

export const PAGE_SECTIONS = [
  { id: 'about', name: 'Profil' },
  { id: 'en-images', name: 'Approche pédagogique' },
  { id: 'expertises', name: 'Expertises DYS, TSA, soutien scolaire' },
  { id: 'ressources', name: 'Ressources vidéo' },
  { id: 'formations', name: 'Formations et diplômes' },
  { id: 'faq', name: 'Questions fréquentes' },
  { id: 'contact', name: 'Contact' },
] as const;

export function absoluteUrl(path = ''): string {
  const base = SITE_URL.replace(/\/$/, '');
  if (!path) return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function ogImageUrl(): string {
  return absoluteUrl(SITE.imagePath);
}
