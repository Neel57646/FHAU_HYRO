import {cn} from '~/lib/utils';

type Tone = 'cream' | 'cream-2' | 'surface' | 'brand';

const TONES: Record<Tone, string> = {
  cream: 'bg-cream text-ink',
  'cream-2': 'bg-cream-2 text-ink',
  surface: 'bg-card text-card-foreground',
  brand: 'bg-brand text-cream',
};

/**
 * Section — vertical rhythm + background tone.
 * Design source: docs/06 (section pad clamp 56–104; tight 36–64).
 */
export function Section({
  tone = 'cream',
  tight = false,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {tone?: Tone; tight?: boolean}) {
  return (
    <section
      className={cn(
        TONES[tone],
        tight
          ? 'py-[clamp(36px,4vw,64px)]'
          : 'py-[clamp(56px,7vw,104px)]',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
