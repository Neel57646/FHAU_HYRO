import {Container, Reveal} from '~/components/primitives';

const ITEMS = [
  'Vet-informed design',
  'Food-safe materials',
  'Fast AU shipping',
  '30-day happiness guarantee',
];

/**
 * TrustBar — calm row of confidence signals. Design source: docs/03 S2.
 */
export function TrustBar() {
  return (
    <section className="border-y border-line bg-cream-2">
      <Container className="py-5">
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center justify-center gap-2 text-center text-[14px] font-bold text-ink-2"
              >
                <span className="text-gold" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
