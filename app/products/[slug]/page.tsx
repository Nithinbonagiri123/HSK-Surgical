import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getProduct, products, specialties, getSpecialty, primarySpecialtyId } from '@/lib/products';
import { LinkButton } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: 'Product' };
  return { title: p.name, description: p.tagline };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const specIds = Array.isArray(p.specialty) ? p.specialty : [p.specialty];
  const primarySpecialty = getSpecialty(primarySpecialtyId(p));
  const related = products
    .filter(
      (x) =>
        x.slug !== p.slug &&
        (Array.isArray(x.specialty)
          ? x.specialty.some((id) => specIds.includes(id))
          : specIds.includes(x.specialty)),
    )
    .slice(0, 3);

  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-16 bg-paper border-b border-ink/8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/60 hover:text-ink"
            >
              ← Products
              {primarySpecialty && (
                <>
                  <span className="text-ink/25">/</span>
                  <span>{primarySpecialty.name}</span>
                </>
              )}
            </Link>
            <Reveal>
              <h1 className="mt-8 font-display font-medium text-display-2xl leading-[0.98] tracking-tighter text-balance">
                {p.name}
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-8 max-w-lg text-lg md:text-xl text-ink/70 text-pretty">
                {p.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-10 grid grid-cols-2 gap-6 max-w-md">
                {p.ref && (
                  <div className="border-t border-ink/10 pt-4">
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/50">REF</dt>
                    <dd className="mt-2 font-mono text-sm text-ink">{p.ref}</dd>
                  </div>
                )}
                <div className="border-t border-ink/10 pt-4">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/50">Specialty</dt>
                  <dd className="mt-2 text-sm text-ink">
                    {specIds
                      .map((id) => specialties.find((s) => s.id === id)?.name)
                      .filter(Boolean)
                      .join(' · ')}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap gap-3">
                <LinkButton href={`/contact?intent=product&ref=${p.ref ?? p.slug}`} variant="primary" arrow>
                  Request information
                </LinkButton>
                <LinkButton href="/products" variant="ghost" arrow>
                  Back to explorer
                </LinkButton>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative aspect-square rounded-2xl border border-ink/10 bg-paper-50 overflow-hidden">
                {['tl', 'tr', 'bl', 'br'].map((c) => (
                  <span
                    key={c}
                    aria-hidden
                    className={
                      'absolute h-4 w-4 border-ink/25 pointer-events-none ' +
                      (c === 'tl' ? 'top-3 left-3 border-l border-t' : '') +
                      (c === 'tr' ? 'top-3 right-3 border-r border-t' : '') +
                      (c === 'bl' ? 'bottom-3 left-3 border-l border-b' : '') +
                      (c === 'br' ? 'bottom-3 right-3 border-r border-b' : '')
                    }
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="h-56 w-56 text-ink/25" aria-hidden>
                    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.75" fill="none" />
                    <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.75" fill="none" />
                    <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.75" fill="none" />
                    <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>
                <div className="absolute inset-x-6 top-6 flex items-center justify-between font-mono text-[0.58rem] uppercase tracking-[0.24em] text-ink/50">
                  <span>Product visual · Placeholder</span>
                  <span>{p.ref ?? p.slug}</span>
                </div>
                <div className="absolute inset-x-6 bottom-6 text-center font-mono text-[0.58rem] uppercase tracking-[0.24em] text-ink/45">
                  Real imagery slots into <code className="font-mono">public/products/{p.slug}</code>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-paper-50 py-24 md:py-32 border-b border-ink/8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-3">
            <nav className="sticky top-32 flex flex-col gap-3 text-sm">
              <a href="#overview" className="text-ink/70 hover:text-ink">Overview</a>
              {p.features && <a href="#features" className="text-ink/70 hover:text-ink">Features</a>}
              {p.applications && <a href="#applications" className="text-ink/70 hover:text-ink">Applications</a>}
              {p.contents && <a href="#contents" className="text-ink/70 hover:text-ink">Set contents</a>}
              {p.variants && <a href="#variants" className="text-ink/70 hover:text-ink">Variants</a>}
              <a href="#enquire" className="text-ink/70 hover:text-ink">Enquire</a>
            </nav>
          </aside>

          <div className="lg:col-span-9 space-y-20">
            <div id="overview">
              <div className="eyebrow mb-6">Overview</div>
              <p className="font-display font-medium text-2xl md:text-3xl tracking-tight leading-[1.2] text-balance">
                {p.overview}
              </p>
            </div>

            {p.features && (
              <div id="features">
                <div className="eyebrow mb-6">Features</div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {p.features.map((f) => (
                    <li key={f} className="rounded-2xl border border-ink/10 bg-paper p-6 text-ink/85">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent mr-3 align-middle" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.applications && (
              <div id="applications">
                <div className="eyebrow mb-6">Applications</div>
                <ul className="flex flex-wrap gap-2">
                  {p.applications.map((a) => (
                    <li key={a} className="rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm text-ink/80">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.contents && (
              <div id="contents">
                <div className="eyebrow mb-6">Set contents</div>
                <ol className="rounded-2xl border border-ink/10 bg-paper divide-y divide-ink/8">
                  {p.contents.map((c, i) => (
                    <li key={c} className="flex items-center gap-4 px-6 py-4">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/50 w-8">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-ink/85">{c}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {p.variants && (
              <div id="variants">
                <div className="eyebrow mb-6">Variants</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {p.variants.map((v) => (
                    <li
                      key={`${v.label}-${v.ref ?? ''}`}
                      className="flex items-center justify-between rounded-2xl border border-ink/10 bg-paper px-5 py-4"
                    >
                      <span className="text-ink/85">{v.label}</span>
                      {v.ref && <span className="font-mono text-xs text-ink/60">{v.ref}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div id="enquire" className="rounded-2xl bg-ink text-paper p-10 md:p-14">
              <div className="eyebrow text-paper/50 mb-6">
                <span className="!bg-paper/25 h-px w-8 block" />
                Enquire · {p.ref ?? p.slug}
              </div>
              <h2 className="font-display font-medium text-display-lg leading-[1.02] text-balance">
                Interested in <span className="text-paper/45">{p.name}?</span>
              </h2>
              <p className="mt-4 max-w-lg text-paper/70">
                Request pricing, availability, or a representative visit — a member of the HSK team will respond directly.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton
                  href={`/contact?intent=product&ref=${encodeURIComponent(p.ref ?? p.slug)}`}
                  variant="onInk"
                  arrow
                >
                  Request information
                </LinkButton>
                <LinkButton
                  href="mailto:info@hsksurgical.ie"
                  variant="onInkGhost"
                  arrow
                >
                  Email HSK
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-paper py-24 md:py-32">
          <div className="container mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="eyebrow mb-6">Related products</div>
                <h2 className="font-display font-medium text-display-lg leading-[1.02] text-balance">
                  Also in {primarySpecialty?.name}.
                </h2>
              </div>
              <Link
                href={primarySpecialty?.href ?? '/products'}
                className="group inline-flex items-center gap-2 text-sm text-ink/70 hover:text-ink"
              >
                View more
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 ease-precision group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                />
              </Link>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/products/${r.slug}`}
                    className="group block h-full rounded-2xl border border-ink/10 bg-paper-50 p-6 transition-all duration-500 ease-precision hover:-translate-y-[3px] hover:border-ink/25"
                  >
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ink/50">
                      {r.ref ?? '—'}
                    </div>
                    <h3 className="mt-4 font-display font-medium text-2xl tracking-tight">{r.name}</h3>
                    <p className="mt-2 text-sm text-ink/65 text-pretty">{r.tagline}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
