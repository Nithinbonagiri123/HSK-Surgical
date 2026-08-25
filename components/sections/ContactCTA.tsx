import { Reveal } from '@/components/motion/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { site } from '@/lib/site';

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper py-32 md:py-44">
      <div aria-hidden className="absolute inset-0 opacity-[0.04] bg-grid-fine-dark bg-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-accent blur-3xl"
      />

      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="eyebrow text-paper/50 mb-8">
                <span className="!bg-paper/25 h-px w-8 block" />
                09 · Get in touch
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display font-medium text-display-3xl leading-[0.95] tracking-tighter text-balance">
                Ready to speak
                <br />
                <span className="text-paper/45">to HSK Surgical?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-lg text-paper/70">
                Tell us about the products or specialty you&rsquo;re interested in — a
                member of the HSK team will respond directly.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-12 flex flex-wrap items-center gap-3">
                <LinkButton href="/contact?intent=product" variant="onInk" arrow size="lg">
                  Request information
                </LinkButton>
                <LinkButton
                  href={`mailto:${site.contact.email}`}
                  variant="onInkGhost"
                  arrow
                  size="lg"
                >
                  {site.contact.email}
                </LinkButton>
              </div>
            </Reveal>
          </div>

          {/* Direct channels */}
          <div className="lg:col-span-4">
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-paper/12 bg-paper/[0.03] backdrop-blur-md p-6">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-paper/50">
                  Direct channels
                </div>
                <ul className="mt-6 divide-y divide-paper/10">
                  {[
                    { label: 'Phone', value: site.contact.phone, href: site.contact.phoneHref },
                    { label: 'WhatsApp', value: 'Message HSK', href: site.contact.whatsapp, external: true },
                    { label: 'LinkedIn', value: 'Follow HSK', href: site.contact.linkedin, external: true },
                  ].map((c) => (
                    <li key={c.label} className="py-3">
                      <a
                        href={c.href}
                        target={c.external ? '_blank' : undefined}
                        rel={c.external ? 'noopener noreferrer' : undefined}
                        className="group flex items-baseline justify-between"
                      >
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-paper/50">
                          {c.label}
                        </span>
                        <span className="text-sm text-paper/85 group-hover:text-paper transition-colors">
                          {c.value}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
