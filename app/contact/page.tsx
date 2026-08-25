import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { site } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact HSK Surgical Ltd for product enquiries, catalogues, representative visits and general questions across our surgical instrument ranges.',
};

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-12 bg-paper border-b border-ink/8">
        <div className="container mx-auto">
          <div className="eyebrow mb-6">— · Contact</div>
          <Reveal>
            <h1 className="font-display font-medium text-display-2xl leading-[0.98] tracking-tighter text-balance max-w-5xl">
              Speak to the{' '}
              <span className="text-ink/45">HSK team.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-8 max-w-xl text-lg text-ink/70">
              To find out more about a product or to request a representative
              visit, send us a message — we&rsquo;ll get back to you directly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper pb-32 pt-20">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="rounded-2xl border border-ink/10 bg-paper-50 p-10 h-96" />}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-ink/10 bg-paper-50 p-8">
              <div className="eyebrow mb-6">Direct channels</div>
              <ul className="divide-y divide-ink/8">
                {[
                  { label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
                  { label: 'Phone', value: site.contact.phone, href: site.contact.phoneHref },
                  { label: 'WhatsApp', value: 'Message HSK on WhatsApp', href: site.contact.whatsapp, external: true },
                  { label: 'LinkedIn', value: 'Follow HSK Surgical', href: site.contact.linkedin, external: true },
                ].map((c) => (
                  <li key={c.label} className="py-4">
                    <a
                      href={c.href}
                      target={c.external ? '_blank' : undefined}
                      rel={c.external ? 'noopener noreferrer' : undefined}
                      className="group flex items-baseline justify-between gap-4"
                    >
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/50">
                        {c.label}
                      </span>
                      <span className="text-ink/85 group-hover:text-ink transition-colors text-right">
                        {c.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-paper-50 p-8">
              <div className="eyebrow mb-6">Opening hours</div>
              <dl className="divide-y divide-ink/8">
                {site.hours.map((h) => (
                  <div key={h.day} className="grid grid-cols-3 gap-4 py-3">
                    <dt className="text-ink/60 text-sm">{h.day}</dt>
                    <dd className="col-span-2 text-ink font-medium text-sm">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-ink text-paper p-8">
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-paper/50 mb-6">
                Certifications
              </div>
              <ul className="flex flex-wrap gap-2">
                {site.certifications.map((c) => (
                  <li key={c} className="rounded-sm border border-paper/20 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em]">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
