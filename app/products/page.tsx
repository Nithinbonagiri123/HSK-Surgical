import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductExplorer } from '@/components/products/ProductExplorer';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse the full HSK Surgical catalogue — endoscopy, general surgery, gynaecology, ENT and electrosurgery instruments and single-use sets.',
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-16 bg-paper border-b border-ink/8">
        <div className="container mx-auto">
          <div className="eyebrow mb-6">— · Catalogue</div>
          <h1 className="font-display font-medium text-display-2xl leading-[0.98] tracking-tighter text-balance max-w-5xl">
            The full range,{' '}
            <span className="text-ink/45">clearly indexed.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink/70">
            Search or filter by specialty to find the instrument, procedural set
            or accessory you need.
          </p>
        </div>
      </section>
      <section className="bg-paper pb-32 pt-16">
        <div className="container mx-auto">
          <Suspense fallback={<div className="h-40" />}>
            <ProductExplorer />
          </Suspense>
        </div>
      </section>
    </>
  );
}
