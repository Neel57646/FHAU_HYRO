import {Section, Container, Heading, Eyebrow, Reveal} from '~/components/primitives';

const FEATURES = [
  {title: 'Food-grade & BPA-free', body: 'Safe materials your dog can lick and nuzzle every day.'},
  {title: 'Non-slip base', body: 'Stays put through the most enthusiastic dinners.'},
  {title: 'Dishwasher safe', body: 'Top-rack clean in seconds — no scrubbing grooves.'},
  {title: 'Vet-informed shapes', body: 'Designed with real canine behaviour in mind.'},
];

/**
 * QualityMaterials — answers "is it safe & well-made?". Design: docs/03 S8.
 */
export function QualityMaterials() {
  return (
    <Section tone="cream-2" aria-labelledby="quality-heading">
      <Container className="grid items-center gap-[clamp(28px,4vw,64px)] md:grid-cols-2">
        <Reveal>
          <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-3xl bg-gold-soft text-7xl shadow-[0_14px_32px_rgba(47,61,43,0.08)]">
            ✨
          </div>
        </Reveal>
        <div>
          <Reveal>
            <Eyebrow>Built to be loved (and chewed)</Eyebrow>
            <Heading as="h2" id="quality-heading" className="mt-4">
              Quality you can feel
            </Heading>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 70}>
                <div className="flex gap-3">
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-gold-soft text-[13px] font-extrabold text-brand">
                    ✓
                  </span>
                  <div>
                    <h3 className="font-heading text-[16px] font-semibold text-brand">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-2">
                      {f.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
