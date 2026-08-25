import { Reveal, RevealGroup } from '@/components/motion/Reveal';

const pillars = [
  { n: '01', title: 'Clinical focus', body: 'Every range is chosen for its fit inside real surgical workflows — from theatre to day-ward.' },
  { n: '02', title: 'Single-use, sterile', body: 'EO-sterilised, ready-to-use products across our injection, endoscopy and gynaecology ranges.' },
  { n: '03', title: 'Precision instruments', body: 'Fine-gauge needles, purpose-built electrodes, LED-illuminated scopes — designed for control.' },
  { n: '04', title: 'Irish presence', body: 'Locally responsive support and product enquiries answered directly by HSK Surgical Ltd.' },
  { n: '05', title: 'Breadth of range', body: 'From procedural sets to individual instruments — pre-packed or supplied as required.' },
  { n: '06', title: 'Direct enquiries', body: 'Request a rep visit, catalogue or product information — direct, quickly answered.' },
];

export function WhyHSK() {
  return (
    <section className="relative bg-paper py-28 md:py-40 border-t border-ink/8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-3">
            <Reveal>
              <div className="eyebrow">07 · Why HSK</div>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <Reveal delay={0.05}>
              <h2 className="font-display font-medium text-display-xl leading-[1.02] text-balance max-w-3xl">
                A partner built around{' '}
                <span className="text-ink/45">your surgical workflow.</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/8 rounded-2xl overflow-hidden border border-ink/8">
          {pillars.map((p) => (
            <div key={p.n} className="bg-paper p-8 md:p-10">
              <div className="flex items-baseline justify-between">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/50">
                  {p.n}
                </div>
                <div className="h-px flex-1 ml-4 bg-ink/10" />
              </div>
              <h3 className="mt-8 font-display font-medium text-2xl md:text-3xl tracking-tight leading-[1.05]">
                {p.title}
              </h3>
              <p className="mt-3 text-ink/60 text-pretty">{p.body}</p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
