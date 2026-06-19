import {Link} from 'react-router';
import {Container, Heading, Eyebrow, Lead, Reveal} from '~/components/primitives';
import {buttonVariants} from '~/components/ui/button';
import {cn} from '~/lib/utils';

/**
 * Hero — cinematic above-the-fold. Fade-up stagger via Reveal delays; floating
 * chip via CSS. Design source: docs/03 S1 + docs/05.
 */
export function Hero() {
  return (
    <section className="overflow-hidden bg-cream">
      <Container className="grid items-center gap-[clamp(28px,4vw,64px)] py-[clamp(40px,5vw,80px)] md:grid-cols-[1.02fr_0.98fr]">
        <div>
          <Reveal>
            <Eyebrow>Calm, happy dogs</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <Heading as="h1" size="display" className="mt-4">
              Calmer dinners.
              <br />
              Happier dogs.
            </Heading>
          </Reveal>
          <Reveal delay={160}>
            <Lead className="mt-6">
              Enrichment feeders and lick mats that slow fast eaters, ease boredom,
              and turn every meal into a calm little adventure.
            </Lead>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Link
                to="/collections/all"
                prefetch="intent"
                className={cn(buttonVariants({variant: 'brand', size: 'pill'}))}
              >
                Shop bestsellers
              </Link>
              <Link
                to="/collections"
                prefetch="intent"
                className={cn(buttonVariants({variant: 'brandGhost', size: 'pill'}))}
              >
                How it works →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-9 flex items-center gap-3.5">
              <div className="flex">
                {['bg-gold-soft', 'bg-sage', 'bg-sage-soft'].map((c, i) => (
                  <span
                    key={c}
                    className={cn(
                      'size-9 rounded-full border-[3px] border-cream',
                      c,
                      i > 0 && '-ml-2.5',
                    )}
                  />
                ))}
              </div>
              <p className="text-[13.5px] font-bold text-ink-2">
                <span className="text-brand">★ 4.9</span> · loved by 12,000+ happy dogs
              </p>
            </div>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal delay={160} className="relative aspect-square md:aspect-[1/0.92]">
          <div className="absolute right-[2%] top-0 size-[72%] rounded-[44%_56%_54%_46%] bg-gold-soft" />
          <div className="absolute bottom-[2%] left-0 h-[56%] w-[80%] rounded-[44%_56%_54%_46%] bg-sage-soft" />
          <div className="absolute inset-[7%_5%] grid place-items-center overflow-hidden rounded-3xl bg-cream-2 shadow-[0_30px_60px_rgba(39,59,42,0.19)]">
            <span className="text-6xl">🐾</span>
          </div>
          <span className="fh-float absolute left-[-2%] top-[6%] z-[3] rounded-full border border-line bg-card px-4 py-2.5 text-[13px] font-extrabold text-brand shadow-[0_12px_26px_rgba(47,61,43,0.12)]">
            No more gulping
          </span>
        </Reveal>
      </Container>
    </section>
  );
}
