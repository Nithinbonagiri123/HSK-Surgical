import type { Metadata } from 'next';
import { SpecialtiesGrid } from '@/components/sections/SpecialtiesGrid';
import { ContactCTA } from '@/components/sections/ContactCTA';

export const metadata: Metadata = {
  title: 'Specialties',
  description:
    'HSK Surgical ranges across endoscopy, general surgery, gynaecology, ENT and electrosurgery, plus the ClearView™ anti-fog scope warmer.',
};

export default function SpecialtiesPage() {
  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-20 bg-paper border-b border-ink/8">
        <div className="container mx-auto">
          <div className="eyebrow mb-6">— · Specialties</div>
          <h1 className="font-display font-medium text-display-2xl leading-[0.98] tracking-tighter text-balance max-w-5xl">
            Six specialties.{' '}
            <span className="text-ink/45">One catalogue.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink/70">
            Instruments and single-use ranges organised the way surgical teams work.
          </p>
        </div>
      </section>
      <SpecialtiesGrid />
      <ContactCTA />
    </>
  );
}
