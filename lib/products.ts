/**
 * Product catalogue.
 *
 * ALL products, REF numbers, feature bullets, and descriptions in this file are
 * transcribed verbatim (or lightly rephrased for hierarchy) from the existing
 * HSK Surgical website. Do NOT add specifications, clinical claims, or product
 * features that are not present in the source. Placeholders are marked TODO.
 */

export type SpecialtyId =
  | 'endoscopy'
  | 'general-surgery'
  | 'gynaecology'
  | 'ent'
  | 'electrosurgery'
  | 'clearview';

/** Each specialty owns a rich colour identity used across the entire site. */
export type SpecialtyColor = {
  hex: string;        // primary
  contrast: 'ink' | 'cream'; // best text on top of hex
  soft: string;       // background-tinted wash
  gradient: string;   // css gradient for hero cards
  emoji: string;      // shorthand for playful chips
};

export type Specialty = {
  id: SpecialtyId;
  name: string;
  href: string;
  short: string;
  description: string;
  color: SpecialtyColor;
};

export const specialties: Specialty[] = [
  {
    id: 'endoscopy',
    name: 'Endoscopy',
    href: '/specialties/endoscopy',
    short: 'Diagnostic & procedural endoscopy',
    description:
      'Single-use proctoscopes with built-in LED, polypectomy hot snares and injection sets designed for reliable procedural workflow.',
    color: {
      hex: '#00E0D0',
      contrast: 'ink',
      soft: '#D0F7F3',
      gradient: 'linear-gradient(135deg, #00E0D0 0%, #3A8EFF 100%)',
      emoji: '◐',
    },
  },
  {
    id: 'general-surgery',
    name: 'General Surgery',
    href: '/specialties/general-surgery',
    short: 'Instruments, accessories & consumables',
    description:
      'Tapes, tourniquets, catheters, cautery accessories and single-use electrodes for laparoscopic and open procedures.',
    color: {
      hex: '#FF5B2E',
      contrast: 'cream',
      soft: '#FFE0D4',
      gradient: 'linear-gradient(135deg, #FF5B2E 0%, #FFB020 100%)',
      emoji: '✚',
    },
  },
  {
    id: 'gynaecology',
    name: 'Gynaecology',
    href: '/specialties/gynaecology',
    short: 'Single-use speculums & procedural sets',
    description:
      'Sterile Cusco speculums, colposcopy, IUCD, episiotomy and examination sets — pre-packed for clinic and theatre.',
    color: {
      hex: '#6D2AD9',
      contrast: 'cream',
      soft: '#E6D8FA',
      gradient: 'linear-gradient(135deg, #6D2AD9 0%, #FF3D71 100%)',
      emoji: '◈',
    },
  },
  {
    id: 'ent',
    name: 'ENT',
    href: '/specialties/ent',
    short: 'Ears, Nose & Throat — single use',
    description:
      'Single-use ENT instrumentation including Tilley, Thudicum, Rosen and micro ear grasping forceps.',
    color: {
      hex: '#FFB020',
      contrast: 'ink',
      soft: '#FFEBC2',
      gradient: 'linear-gradient(135deg, #FFB020 0%, #FF5B2E 100%)',
      emoji: '❋',
    },
  },
  {
    id: 'electrosurgery',
    name: 'Electrosurgery',
    href: '/specialties/electrosurgery',
    short: 'Electrodes & accessories',
    description:
      'Single-use electrodes and cautery accessories for precise, controlled energy delivery.',
    color: {
      hex: '#FF3D71',
      contrast: 'cream',
      soft: '#FFD7E3',
      gradient: 'linear-gradient(135deg, #FF3D71 0%, #6D2AD9 100%)',
      emoji: '⚡',
    },
  },
  {
    id: 'clearview',
    name: 'ClearView™',
    href: '/clearview',
    short: 'Anti-fog scope warmer',
    description:
      'Pre-heats laparoscopes and endoscopes to body temperature — no electricity, no hot water. See clearly. Perform confidently.',
    color: {
      hex: '#3A8EFF',
      contrast: 'cream',
      soft: '#D5E5FF',
      gradient: 'linear-gradient(135deg, #3A8EFF 0%, #00E0D0 100%)',
      emoji: '◉',
    },
  },
];

export type Product = {
  slug: string;
  name: string;
  ref?: string;
  specialty: SpecialtyId | SpecialtyId[];
  tagline: string;
  overview: string;
  features?: string[];
  applications?: string[];
  variants?: { label: string; ref?: string }[];
  contents?: string[];
  image?: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: 'clearview-scope-warmer',
    name: 'ClearView™ Laparoscope & Endoscope Scope Warmer',
    ref: 'HSK-CVW',
    specialty: ['clearview', 'general-surgery'],
    tagline: 'Resolve lens fogging during surgery.',
    overview:
      'ClearView™ addresses condensation on surgical scopes caused by the temperature differential between a cold instrument and the warm patient environment.',
    features: [
      'Pre-heats scope to body temperature',
      'No electricity or hot water required',
      'Easy to use',
    ],
    applications: ['Laparoscopy', 'Endoscopy'],
    featured: true,
  },
  {
    slug: 'haemorrhoid-injection-set',
    name: 'Haemorrhoid Injection Set',
    specialty: 'endoscopy',
    tagline: 'Pre-configured injection set for haemorrhoid management.',
    overview:
      'A complete injection set for the treatment of haemorrhoids. Includes a 12 ml syringe, an 18G haemorrhoid needle, and suction tubing.',
    contents: ['12 ml syringe', '18G haemorrhoid needle', 'Suction tube'],
    featured: true,
  },
  {
    slug: 'single-use-proctoscope-led',
    name: 'Single-Use Proctoscope with Built-In LED Light',
    specialty: 'endoscopy',
    tagline: 'Self-illuminating single-use proctoscope.',
    overview:
      'A self-illuminating proctoscope with a smooth bezel opening for patient comfort. The LED activates with a simple pull-tab. Intended for theatre, day-ward and private-room use.',
    features: [
      'Built-in LED — pull the tab to activate',
      'Smooth bezel opening for patient comfort',
      'Single-use, ready-to-use',
    ],
    applications: ['Theatres', 'Day wards', 'Private rooms'],
    variants: [{ label: 'Medium' }, { label: 'Large' }],
  },
  {
    slug: 'polypectomy-hot-snare-360',
    name: '360° Rotatable Polypectomy Hot Snare',
    specialty: 'endoscopy',
    tagline: 'Full 360-degree rotation for precise polyp capture.',
    overview:
      'A polypectomy hot snare with a rotating wheel mechanism allowing full 360° rotation. Available in multiple loop sizes for procedural flexibility.',
    variants: [
      { label: '10 mm' },
      { label: '15 mm' },
      { label: '25 mm' },
      { label: '32 mm' },
    ],
    featured: true,
  },
  {
    slug: 'surgitapes-nylon-tape',
    name: 'Surgitapes Nylon Tape',
    ref: 'HSK-ST6',
    specialty: 'general-surgery',
    tagline: 'Real nylon surgical tape.',
    overview: '6 mm × 60 cm nylon tape, manufactured from real nylon.',
  },
  {
    slug: 'mushroom-pezzer-malecot-catheters',
    name: 'Mushroom / Pezzer / Malecot Catheters',
    ref: 'MC-FR12-36-HSK',
    specialty: 'general-surgery',
    tagline: 'Sizes FR12 – FR36.',
    overview:
      'Mushroom-tip catheters suitable for drainage of perianal or ischiorectal abscesses, nephrostomy, and open renal or bladder procedures.',
    applications: [
      'Perianal / ischiorectal abscess drainage',
      'Nephrostomy',
      'Open renal or bladder procedures',
    ],
  },
  {
    slug: 'podiatry-tourniquet',
    name: 'Podiatry Tourniquet',
    ref: 'HSK-PODT',
    specialty: 'general-surgery',
    tagline: 'Designed for ingrown toenail procedures.',
    overview: 'Single-use podiatry tourniquet intended for ingrown toenail procedures.',
  },
  {
    slug: 'cautery-scratch-pad',
    name: 'Cautery Scratch Pad',
    ref: 'HSK-CSP',
    specialty: ['general-surgery', 'electrosurgery'],
    tagline: 'Electrode cleaning accessory.',
    overview: 'Scratch pad accessory for cleaning electrosurgical electrodes intraoperatively.',
  },
  {
    slug: 'buckle-band-tourniquet',
    name: 'Buckle Band Tourniquet',
    ref: 'HSK-BUC001',
    specialty: 'general-surgery',
    tagline: 'Simple, secure buckle-band tourniquet.',
    overview: 'Buckle band tourniquet for general surgical use.',
  },
  {
    slug: 'l-hook-electrode',
    name: 'L-Hook Electrode',
    ref: 'HSK-LH45',
    specialty: ['general-surgery', 'electrosurgery'],
    tagline: 'Single-use L-hook electrode for laparoscopic surgery.',
    overview:
      'Single-use L-Hook electrode designed for use in laparoscopic surgery.',
    applications: ['Laparoscopic surgery'],
    featured: true,
  },
  {
    slug: 'single-use-cusco-speculums',
    name: 'Single-Use Cusco Speculums',
    specialty: 'gynaecology',
    tagline: 'EO-sterile Cusco range — steel & plastic.',
    overview:
      'A single-use, EO-sterile range of Cusco speculums, available in both steel and plastic constructions.',
    featured: true,
  },
  {
    slug: 'colposcopy-set',
    name: 'Colposcopy Set',
    specialty: 'gynaecology',
    tagline: 'Complete colposcopy set — medium & large.',
    overview:
      'Sterile procedural set for colposcopy, supplied ready-to-use.',
    variants: [
      { label: 'Medium', ref: 'HSK-70M' },
      { label: 'Large', ref: 'HSK-70L' },
    ],
    contents: [
      '10 × non-woven sponges',
      '2 × sterile drapes',
      '1 × Cusco steel speculum with plume (Med / Large)',
      '1 × Rampley sponge-holding forcep, 24 cm',
    ],
  },
  {
    slug: 'episiotomy-set',
    name: 'Episiotomy Set',
    ref: 'HSK-10-321',
    specialty: 'gynaecology',
    tagline: 'Pre-configured episiotomy procedural set.',
    overview: 'Sterile, single-use procedural set for episiotomy.',
    contents: [
      '1 × procedure tray, blue / transparent',
      '2 × Spencer Wells forceps, straight, 13 cm',
      '1 × Mayo needle holder, 20 cm',
      '1 × Bonney non-toothed dissecting forceps, 18 cm',
      '1 × Mayo scissor, straight, 15 cm',
      '1 × waste bag',
      '2 × sterile drapes',
      '10 × non-woven sponges',
    ],
  },
  {
    slug: 'iucd-set',
    name: 'IUCD Set',
    specialty: 'gynaecology',
    tagline: 'Sterile set for IUCD insertion and removal.',
    overview: 'Pre-packed sterile set supporting IUCD procedures.',
    contents: [
      '1 × procedure tray, blue / transparent',
      '2 × sterile drapes',
      '10 × non-woven sponges',
      '1 × Cusco steel speculum (Med / Large)',
      '1 × Mayo scissor, straight, 17 / 19 cm',
      '1 × uterine sound, 32 cm',
      '1 × Rampley sponge-holding forcep, 24 cm',
      '1 × Vulsellum forcep, 23 cm',
      '1 × waste bag',
    ],
  },
  {
    slug: 'plastic-examination-set',
    name: 'Plastic Examination Set',
    specialty: 'gynaecology',
    tagline: 'Plastic speculum examination set.',
    overview: 'Compact examination set with a plastic speculum and cervical swab brush.',
    variants: [
      { label: 'Medium', ref: 'HSK-80-821M' },
      { label: 'Large', ref: 'HSK-80-821L' },
    ],
    contents: [
      'Plastic speculum (Med / Large)',
      'Cervical swab brush',
      'Gloves',
      'Drape, 50 cm × 50 cm',
    ],
  },
  {
    slug: 'gynaecology-examination-kit',
    name: 'Gynaecology Examination Kit',
    specialty: 'gynaecology',
    tagline: 'General gynaecology examination kit.',
    overview: 'Examination kit for routine gynaecology, supplied in medium and large.',
    variants: [
      { label: 'Medium', ref: 'HSK-GEK-M' },
      { label: 'Large', ref: 'HSK-GEK-L' },
    ],
  },
  {
    slug: 'cervical-biopsy-forceps',
    name: 'Cervical Biopsy Forceps',
    specialty: 'gynaecology',
    tagline: 'One-piece design with a sharp precision tip.',
    overview:
      'A lightweight, one-piece cervical biopsy forcep with a sharp tip designed for a clean, precise biopsy.',
    features: ['One-piece construction', 'Sharp precision tip', 'Lightweight design'],
  },
  {
    slug: 'ent-micro-ear-grasping-forceps',
    name: 'Micro Ear Grasping Forceps',
    specialty: 'ent',
    tagline: 'Single-use micro ear grasping forceps.',
    overview: 'Single-use micro ear grasping forceps for ENT use.',
  },
  {
    slug: 'ent-aural-tilley',
    name: 'Aural Tilley',
    specialty: 'ent',
    tagline: 'Single-use aural Tilley forceps.',
    overview: 'Single-use aural Tilley forceps for ENT procedures.',
  },
  {
    slug: 'ent-nasal-tilley',
    name: 'Nasal Tilley',
    specialty: 'ent',
    tagline: 'Single-use nasal Tilley forceps.',
    overview: 'Single-use nasal Tilley forceps for ENT procedures.',
  },
  {
    slug: 'ent-thudicum',
    name: 'Thudicum Nasal Speculum',
    specialty: 'ent',
    tagline: 'Single-use Thudicum nasal speculum.',
    overview: 'Single-use Thudicum for ENT examination.',
  },
  {
    slug: 'ent-rosen',
    name: 'Rosen',
    specialty: 'ent',
    tagline: 'Single-use Rosen instrument.',
    overview: 'Single-use Rosen instrument for ENT use.',
  },
];

export const getBySpecialty = (id: SpecialtyId) =>
  products.filter((p) =>
    Array.isArray(p.specialty) ? p.specialty.includes(id) : p.specialty === id,
  );

export const getFeatured = () => products.filter((p) => p.featured);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getSpecialty = (id: SpecialtyId | string) =>
  specialties.find((s) => s.id === id);

export const primarySpecialtyId = (p: Product): SpecialtyId =>
  Array.isArray(p.specialty) ? p.specialty[0] : p.specialty;
