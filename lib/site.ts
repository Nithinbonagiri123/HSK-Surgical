/**
 * Site-wide constants. All values verified against https://www.hsksurgical.ie/
 * If not verified, mark with `// PLACEHOLDER:` and leave for later confirmation.
 */

export const site = {
  name: 'HSK Surgical Ltd',
  shortName: 'HSK Surgical',
  legalName: 'HSK Surgical Limited',
  url: 'https://www.hsksurgical.ie',
  locale: 'en-IE',
  country: 'Ireland',

  // Verified tagline from existing site
  tagline:
    'We strive to provide surgical professionals with the best tools to help them achieve the best results.',

  // Site concept — new
  concept: 'Precision in Motion',

  contact: {
    email: 'info@hsksurgical.ie',
    phone: '+353 83 033 5143',
    phoneHref: 'tel:+353830335143',
    whatsapp: 'https://wa.me/message/K4NSLY2KI2NAF1',
    linkedin: 'http://www.linkedin.com/in/hsk-49308728a',
  },

  hours: [
    { day: 'Monday – Friday', time: '8:00 – 18:00' },
    { day: 'Saturday', time: '10:00 – 18:00' },
    { day: 'Sunday', time: 'Closed' },
  ],

  certifications: ['CE Mark', 'EO Sterilised', 'ISO Certified'],
} as const;

export const nav = {
  primary: [
    { label: 'Products', href: '/products' },
    { label: 'Specialties', href: '/specialties' },
    { label: 'ClearView™', href: '/clearview' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: { label: 'Request Information', href: '/contact?intent=product' },
} as const;
