import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { site } from '@/lib/site';
import { specialties } from '@/lib/products';

const footerNav = [
  {
    title: 'Explore',
    links: [
      { label: 'Products', href: '/products' },
      { label: 'Specialties', href: '/specialties' },
      { label: 'ClearView™', href: '/clearview' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: site.contact.email, href: `mailto:${site.contact.email}` },
      { label: site.contact.phone, href: site.contact.phoneHref },
      { label: 'WhatsApp', href: site.contact.whatsapp, external: true },
      { label: 'LinkedIn', href: site.contact.linkedin, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden className="absolute inset-0 opacity-[0.04] bg-grid-fine-dark bg-grid" />

      <div className="container mx-auto relative pt-24 pb-10">
        {/* Statement */}
        <div className="pb-16 border-b border-paper/10">
          <div className="eyebrow text-paper/50 mb-8">
            <span className="!bg-paper/25 h-px w-8 block" />
            HSK Surgical Ltd
          </div>
          <p className="font-display font-medium text-[clamp(2.25rem,6vw,5.5rem)] leading-[1] tracking-tighter text-balance max-w-5xl text-paper">
            Precision surgical instruments,{' '}
            <span className="text-paper/45">supplied directly by HSK from Ireland.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 pt-16">
          <div className="md:col-span-4">
            <Logo variant="paper" />
            <p className="mt-6 max-w-sm text-sm text-paper/65 text-pretty">
              {site.tagline}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {site.certifications.map((c) => (
                <li
                  key={c}
                  className="rounded-sm border border-paper/20 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper/75"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-paper/45">
              Specialties
            </h3>
            <ul className="mt-6 space-y-3">
              {specialties.map((s) => (
                <li key={s.id}>
                  <Link
                    href={s.href}
                    className="group inline-flex items-center gap-2 text-sm text-paper/80 hover:text-paper transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-paper/40 group-hover:bg-accent transition-colors" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {footerNav.map((group) => (
            <div key={group.title} className="md:col-span-2">
              <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-paper/45">
                {group.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {group.links.map((link: { label: string; href: string; external?: boolean }) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-paper/80 hover:text-paper transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-paper/80 hover:text-paper transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-paper/45">
              Hours
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-paper/80">
              {site.hours.map((h) => (
                <li key={h.day}>
                  <div className="text-paper/45 text-xs">{h.day}</div>
                  <div>{h.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-paper/10 pt-8 text-xs text-paper/50">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.22em]">
            {site.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
