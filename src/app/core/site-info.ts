/**
 * Single source of truth for club contact details, social links and the map
 * embed. Consumed by the header, footer, contact/about pages and the JSON-LD.
 */
export const SITE_INFO = {
  name: 'Legacy Lau Gar',
  shortName: 'Legacy Lau Gar',
  tagline: 'Lau Gar Kung Fu in Nuneaton',
  domain: 'https://legacylaugar.com',

  venue: 'Elite Sports Center',
  street: 'Charnwood Ave',
  town: 'Nuneaton',
  postcode: 'CV10 7NS',

  /** Primary contact number (shown across the site). */
  phonePrimary: '07724 635 552',
  /** Secondary contact number (listed on the About page). */
  phoneSecondary: '07966 666 699',
  /** tel: href for the primary number. */
  phonePrimaryHref: 'tel:+447724635552',

  phoneSecondaryHref: 'tel:+447966666699',

  email: 'legacylgkf@gmail.com',
  /** FormSubmit.co endpoint for the contact form (no backend required). */
  contactFormAction: 'https://formsubmit.co/legacylgkf@gmail.com',

  trainingDay: 'Monday',
  trainingTime: '7PM',

  geo: { lat: 52.51377946681281, lng: -1.5021447966691497 },

  social: {
    facebook: 'https://www.facebook.com/LegacyLauGar',
    instagram: 'https://www.instagram.com/legacylaugar_nuneaton/',
    instagramHandle: '@legacylaugar_nuneaton',
    facebookName: 'Legacy Lau Gar - Nuneaton',
  },

  bkfa: {
    // The British Kung Fu Association site moved to britishkungfuassociation.com.
    // TODO(links): confirm the deep-link paths below still resolve on the new
    // domain — adjust if the BKFA changed its URL structure in the move.
    home: 'https://britishkungfuassociation.com',
    label: 'britishkungfuassociation.com',
    origin: 'https://britishkungfuassociation.com/style-laugar-origin',
    safeguarding: 'https://britishkungfuassociation.com/contact',
    calendar: 'https://britishkungfuassociation.com/calendar',
  },

  mapEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d943.5581338361959!2d-1.5021447966691497!3d52.51377946681281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48774d696c601023%3A0xdc7e7d832a107c68!2sLegacy%20Lau%20Gar%20-%20Nuneaton!5e0!3m2!1sen!2suk!4v1776507550364!5m2!1sen!2suk',
} as const;

export const NAV_LINKS: ReadonlyArray<{ path: string; label: string }> = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/socials', label: 'Socials' },
  { path: '/sessions', label: 'Sessions' },
];
