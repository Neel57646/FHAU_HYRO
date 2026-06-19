import {Link} from 'react-router';
import {Reveal} from '~/components/primitives';
import {buttonVariants} from '~/components/ui/button';
import {cn} from '~/lib/utils';

/**
 * LifestyleBanner — full-bleed emotional moment (pet + owner). Design: docs/03 S7.
 */
export function LifestyleBanner() {
  return (
    <section className="relative overflow-hidden bg-brand">
      <div className="absolute inset-0 grid place-items-center text-[20vw] opacity-10" aria-hidden="true">
        🐾
      </div>
      <div className="relative mx-auto max-w-[1320px] px-[clamp(20px,4vw,60px)] py-[clamp(72px,10vw,140px)]">
        <Reveal className="max-w-[34ch]">
          <p className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-gold">
            More good days together
          </p>
          <h2 className="mt-4 font-heading text-[clamp(30px,3.6vw,48px)] font-semibold leading-tight text-cream">
            Calmer mornings, happier evenings.
          </h2>
          <p className="mt-4 max-w-[40ch] text-[16px] leading-relaxed text-cream/75">
            The little rituals that make a house feel like home — for them and for you.
          </p>
          <Link
            to="/collections/all"
            prefetch="intent"
            className={cn(buttonVariants({variant: 'gold', size: 'pill'}), 'mt-8')}
          >
            Shop the range →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
