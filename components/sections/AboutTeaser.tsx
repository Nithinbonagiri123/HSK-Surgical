import { Reveal } from '@/components/motion/Reveal';
import { LinkButton } from '@/components/ui/Button';

export function AboutTeaser() {
  return (
    <section className="relative bg-paper-50 py-28 md:py-40 border-t border-ink/8">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-6">
          <Reveal>
            <div className="eyebrow mb-8">08 · About HSK Surgical Ltd</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display font-medium text-display-xl leading-[1.02] text-balance">
              Ireland-based.{' '}
              <span className="text-ink/45">Clinically-focused.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-lg text-lg text-ink/70 text-pretty">
              HSK Surgical Ltd supplies surgical professionals across Ireland
              with instruments and single-use solutions engineered for
              precision, reliability and clinical workflow.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              <LinkButton href="/about" variant="primary" arrow>More about HSK</LinkButton>
              <LinkButton href="/contact" variant="ghost" arrow>Speak to the team</LinkButton>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.15}>
            <div className="relative rounded-2xl border border-ink/10 bg-paper p-8 md:p-10">
              <div className="corner-marks absolute inset-0 text-ink" />
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/50">
                Company card
              </div>
              <dl className="mt-8 divide-y divide-ink/8">
                {[
                  ['Company', 'HSK Surgical Limited'],
                  ['Country', 'Ireland'],
                  ['Specialties', 'Endoscopy · General Surgery · Gynaecology · ENT · Electrosurgery'],
                  ['Signature product', 'ClearView™ Anti-Fog Scope Warmer'],
                  ['Certifications', 'CE Mark · EO Sterilised · ISO Certified'],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-3 gap-6 py-4">
                    <dt className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/50">
                      {k}
                    </dt>
                    <dd className="col-span-2 text-ink/80 text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
