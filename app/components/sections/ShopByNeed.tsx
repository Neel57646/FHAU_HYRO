import {Link} from 'react-router';
import {Section, Container, Heading, Eyebrow, Lead, Reveal} from '~/components/primitives';

// TODO (Stage 7): point `href` at real collection handles once the live store
// is connected (e.g. /collections/slow-feeders). Safe index link for now.
const NEEDS = [
  {quote: '“Inhales dinner in seconds”', cta: 'Slow Feeders', href: '/collections'},
  {quote: '“Hates baths & grooming”', cta: 'Lick Mats', href: '/collections'},
  {quote: '“Bored & into everything”', cta: 'Enrichment', href: '/collections'},
  {quote: '“Anxious & stressed”', cta: 'Calm', href: '/collections'},
];

/**
 * ShopByNeed — behaviour-led discovery (proven FH pattern). Design: docs/03 S3.
 */
export function ShopByNeed() {
  return (
    <Section tone="cream-2" aria-labelledby="needs-heading">
      <Container>
        <Reveal className="mb-[clamp(28px,3.6vw,48px)] text-center">
          <Eyebrow>Not sure where to start?</Eyebrow>
          <Heading as="h2" id="needs-heading" className="mx-auto mt-4">
            Shop by your dog&rsquo;s needs
          </Heading>
          <Lead className="mx-auto mt-4 text-center">
            Tell us what your dog does, and we&rsquo;ll point you to the right gear.
          </Lead>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NEEDS.map((need, i) => (
            <Reveal key={need.cta} delay={i * 80}>
              <Link
                to={need.href}
                prefetch="intent"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-[0_10px_24px_rgba(47,61,43,0.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_rgba(47,61,43,0.13)]"
              >
                <div className="grid aspect-[4/3] place-items-center overflow-hidden bg-sage-soft text-4xl">
                  <span className="transition-transform duration-500 group-hover:scale-110">
                    🐶
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                  <p className="font-heading text-[18px] font-semibold text-brand">
                    {need.quote}
                  </p>
                  <span className="text-[14px] font-extrabold text-gold transition-all group-hover:tracking-wide">
                    {need.cta} →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
