import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    data: {
      seo: {
        description:
          'Legacy Lau Gar — Lau Gar Kung Fu in Nuneaton, established for over 40 years. ' +
          'New members welcome. Monday training 7PM at Elite Sports Center.',
      },
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    data: {
      seo: {
        title: 'About Us',
        description:
          'About Legacy Lau Gar and Lau Gar Kung Fu — our Nuneaton club, our instructors, ' +
          'and the British Kung Fu Association.',
      },
    },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    data: {
      seo: {
        title: 'Contact Us',
        description:
          'Contact Legacy Lau Gar in Nuneaton — call, text, or send a message to join the ' +
          'club or ask about classes.',
      },
    },
  },
  {
    path: 'sessions',
    loadComponent: () => import('./pages/sessions/sessions').then((m) => m.Sessions),
    data: {
      seo: {
        title: 'Sessions',
        description:
          'Upcoming Legacy Lau Gar training sessions and British Kung Fu Association events.',
      },
    },
  },
  {
    path: 'socials',
    loadComponent: () => import('./pages/socials/socials').then((m) => m.Socials),
    data: {
      seo: {
        title: 'Social Media',
        description:
          'Follow Legacy Lau Gar on Instagram and Facebook for training highlights, events ' +
          'and community news.',
      },
    },
  },
  {
    path: 'thankyou',
    loadComponent: () => import('./pages/thank-you/thank-you').then((m) => m.ThankYou),
    data: { seo: { title: 'Message Sent' } },
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
    data: { seo: { title: 'Privacy Policy' } },
  },
  {
    path: 'terms-of-service',
    loadComponent: () =>
      import('./pages/terms-of-service/terms-of-service').then((m) => m.TermsOfService),
    data: { seo: { title: 'Terms of Service' } },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    data: { seo: { title: 'Page Not Found' } },
  },
];
