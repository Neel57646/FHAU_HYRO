import {Link} from 'react-router';
import {Section, Container, Heading, Reveal} from '~/components/primitives';
import {buttonVariants} from '~/components/ui/button';
import {cn} from '~/lib/utils';

/**
 * FinalCTA — conversion-focused close. Design source: docs/03 S10.
 */
export function FinalCTA() {
  return (
    <Section tone="cream-2">
      <Container>
        <Reveal className="mx-auto max-w-[42rem] text-center">
          <Heading as="h2" size="h1" className="mx-auto">
            Give your dog a happier bowl.
          </Heading>
          <p className="mx-auto mt-4 max-w-[44ch] text-[clamp(16px,1.4vw,18.5px)] leading-relaxed text-ink-2">
            Join thousands of calmer dinners. Free AU shipping over $60, 30-day
            happiness guarantee.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
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
              Browse collections →
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
