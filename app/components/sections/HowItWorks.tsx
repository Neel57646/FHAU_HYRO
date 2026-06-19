import {Section, Container, Heading, Eyebrow, Reveal} from '~/components/primitives';

const STEPS = [
  {
    n: '01',
    title: 'Slows fast eating',
    body: 'Maze-like channels turn a 10-second gulp into a calm, paced meal — easier on the tummy.',
  },
  {
    n: '02',
    title: 'Engages the brain',
    body: 'Sniffing, licking and problem-solving tire dogs out mentally, not just physically.',
  },
  {
    n: '03',
    title: 'Calms & occupies',
    body: 'Licking is naturally soothing — perfect for vet visits, grooming, or alone time.',
  },
  {
    n: '04',
    title: 'Easy to clean',
    body: 'Dishwasher-safe, food-grade materials. Adventure for them, no fuss for you.',
  },
];

/**
 * HowItWorks — the signature sticky scroll-story: image pins while the steps
 * reveal beside it. Pure CSS `position: sticky`. Design: docs/03 S4 + docs/05.
 */
export function HowItWorks() {
  return (
    <Section tone="cream" aria-labelledby="how-heading">
      <Container className="grid gap-[clamp(28px,4vw,64px)] md:grid-cols-2">
        <div className="md:sticky md:top-[110px] md:self-start">
          <div className="grid aspect-square place-items-center overflow-hidden rounded-3xl bg-gold-soft text-7xl shadow-[0_22px_44px_rgba(47,61,43,0.13)]">
            🥣
          </div>
        </div>
        <div>
          <Reveal>
            <Eyebrow>How Furever Happy works</Eyebrow>
            <Heading as="h2" id="how-heading" className="mt-4">
              One bowl, four happy changes
            </Heading>
          </Reveal>
          <div className="mt-8 flex flex-col">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 80}>
                <div className="flex gap-5 border-t border-line py-6">
                  <span className="font-heading text-[22px] font-semibold text-gold">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-heading text-[20px] font-semibold text-brand">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">
                      {step.body}
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
