import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/Reveal';
import { WhyHSK } from '@/components/sections/WhyHSK';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'HSK Surgical Ltd is an Ireland-based surgical company supplying instruments and single-use solutions across endoscopy, general surgery, gynaecology, ENT and electrosurgery.',
};

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-24 bg-paper border-b border-ink/8">
        <div className="container mx-auto">
          <div className="eyebrow mb-6">— · About</div>
          <Reveal>
            <h1 className="font-display font-medium text-display-2xl leading-[0.98] tracking-tighter text-balance max-w-5xl">
              A surgical company —{' '}
              <span className="text-ink/45">built in Ireland.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-10 max-w-3xl text-xl md:text-2xl text-ink/70 text-pretty">
              {site.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-50 py-24 md:py-32 border-b border-ink/8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="eyebrow">Overview</div>
            </Reveal>
          </div>
          <div className="lg:col-span-8 space-y-6 text-lg text-ink/75 text-pretty">
            <Reveal>
              <p>
                HSK Surgical Ltd supplies surgical professionals with
                instruments and single-use solutions engineered for reliability,
                sterility and clinical workflow. Our ranges span endoscopy,
                general surgery, gynaecology, ENT and electrosurgery.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                Signature products include ClearView™, an anti-fog scope warmer
                that resolves lens fogging without electricity or hot water,
                and the wider Anoject range of pre-configured injection sets.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Every enquiry is answered directly by the HSK team — whether
                you&rsquo;re specifying a set for procurement, requesting a rep visit,
                or asking for a catalogue.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <WhyHSK />

      <section className="bg-paper-50 py-24 md:py-32">
        <div className="container mx-auto max-w-4xl">
          <Reveal>
            <div className="relative rounded-2xl border border-ink/10 bg-paper p-10 md:p-14">
              <div className="eyebrow mb-8">Company details</div>
              <dl className="divide-y divide-ink/8">
                {[
                  ['Legal name', site.legalName],
                  ['Country', site.country],
                  ['Email', site.contact.email],
                  ['Phone', site.contact.phone],
                  ['LinkedIn', 'linkedin.com/in/hsk-49308728a'],
                  ['Certifications', site.certifications.join(' · ')],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-3 gap-6 py-4">
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/50">
                      {k}
                    </dt>
                    <dd className="col-span-2 text-ink/80 text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
