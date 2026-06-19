import {Section, Container, Heading, Reveal} from '~/components/primitives';

const REVIEWS = [
  {quote: 'Dinner used to be over in 8 seconds. Now it’s a happy 10-minute project.', name: 'Sara & Miso'},
  {quote: 'The lick mat is our secret weapon for nail trims. Total game-changer.', name: 'Tom & Bluey'},
  {quote: 'Beautifully made and so easy to clean. Feels like a premium brand.', name: 'Priya & Coco'},
];

/**
 * SocialProof — reviews & UGC before the final CTA. Design: docs/03 S9.
 */
export function SocialProof() {
  return (
    <Section tone="surface" aria-labelledby="proof-heading">
      <Container>
        <Reveal className="mb-[clamp(28px,3.6vw,48px)] text-center">
          <Heading as="h2" id="proof-heading" className="mx-auto">
            Loved by 12,000+ Aussie dogs
          </Heading>
          <p className="mt-3 text-[15px] font-bold text-ink-2">
            <span className="text-gold">★★★★★</span> 4.9 average rating
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <figure className="flex h-full flex-col gap-4 rounded-3xl border border-line bg-cream p-7">
                <div className="text-gold" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote className="flex-1 font-heading text-[18px] leading-snug text-brand">
                  “{r.quote}”
                </blockquote>
                <figcaption className="text-[14px] font-bold text-ink-2">
                  {r.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
