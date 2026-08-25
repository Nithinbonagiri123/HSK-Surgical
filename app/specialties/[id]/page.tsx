import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { specialties, getBySpecialty, getSpecialty, type SpecialtyId } from '@/lib/products';
import { Reveal } from '@/components/motion/Reveal';
import { LinkButton } from '@/components/ui/Button';

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return specialties
    .filter((s) => s.id !== 'clearview')
    .map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const s = specialties.find((x) => x.id === id);
  if (!s) return { title: 'Specialty' };
  return { title: s.name, description: s.description };
}

export default async function SpecialtyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const s = getSpecialty(id as SpecialtyId);
  if (!s) notFound();
  const items = getBySpecialty(s.id);

  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-24 bg-paper border-b border-ink/8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <Link
              href="/specialties"
              className="inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/60 hover:text-ink"
            >
              ← Specialties
            </Link>
            <Reveal>
              <h1 className="mt-8 font-display font-medium text-display-2xl leading-[0.98] tracking-tighter text-balance">
                {s.name}
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-8 max-w-xl text-lg md:text-xl text-ink/70 text-pretty">
                {s.description}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-ink/10 bg-paper-50 p-8">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/50">
                  Products in range
                </div>
                <div className="mt-4 font-display font-medium text-[clamp(3.5rem,8vw,6rem)] leading-[0.9] tracking-tighter text-ink">
                  {items.length}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="container mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-paper-50 border border-ink/10 p-6 transition-all duration-500 ease-precision hover:-translate-y-[3px] hover:border-ink/25"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ink/50">
                      {p.ref ?? '—'}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-ink/40 transition-all duration-300 ease-precision group-hover:text-ink group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                    />
                  </div>
                  <h3 className="mt-8 font-display font-medium text-2xl tracking-tight leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink/65 text-pretty">{p.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-16 flex justify-center">
            <LinkButton href="/contact?intent=product" variant="ghost" arrow>
              Request information across {s.name}
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
