import {Link} from 'react-router';
import {Section, Container, Heading, Eyebrow, Reveal} from '~/components/primitives';

const CARDS = [
  {emoji: '🦴', title: 'How to use your feeder', body: 'Simple setups for first-timers.', href: '/blogs'},
  {emoji: '🥕', title: 'Food & topper ideas', body: 'Vet-friendly fillings dogs love.', href: '/blogs'},
  {emoji: '🧠', title: 'Enrichment 101', body: 'Beat boredom in 10 minutes a day.', href: '/blogs'},
];

/**
 * EducationCards — supportive content that builds trust & SEO. Design: docs/03 S6.
 */
export function EducationCards() {
  return (
    <Section tone="surface" aria-labelledby="learn-heading">
      <Container>
        <Reveal className="mb-[clamp(28px,3.6vw,48px)] text-center">
          <Eyebrow>Make every meal an adventure</Eyebrow>
          <Heading as="h2" id="learn-heading" className="mx-auto mt-4">
            Learn the little wins
          </Heading>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <Link
                to={card.href}
                prefetch="intent"
                className="group flex h-full flex-col gap-3 rounded-3xl border border-line bg-cream p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_rgba(47,61,43,0.13)]"
              >
                <span className="text-4xl">{card.emoji}</span>
                <h3 className="font-heading text-[19px] font-semibold text-brand">
                  {card.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-2">{card.body}</p>
                <span className="mt-auto pt-2 text-[14px] font-extrabold text-gold transition-all group-hover:tracking-wide">
                  Read more →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
