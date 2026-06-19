import {cn} from '~/lib/utils';

type HeadingSize = 'display' | 'h1' | 'h2' | 'h3';

const SIZES: Record<HeadingSize, string> = {
  display:
    'text-[clamp(56px,5.6vw,80px)] leading-[1.02] tracking-[-0.015em]',
  h1: 'text-[clamp(42px,5vw,64px)] leading-[1.05] tracking-[-0.015em]',
  h2: 'text-[clamp(30px,3.6vw,48px)] leading-[1.08] tracking-[-0.01em]',
  h3: 'text-[clamp(20px,2.2vw,26px)] leading-[1.18]',
};

/**
 * Heading — Lora display type at the brand scale, forest-green by default.
 * `as` controls the semantic tag (keep heading order correct per page);
 * `size` controls the visual scale independently. Design source: docs/06.
 */
export function Heading({
  as: Tag = 'h2',
  size = 'h2',
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'p';
  size?: HeadingSize;
}) {
  return (
    <Tag
      className={cn(
        'font-heading font-semibold text-brand',
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/** Eyebrow / kicker — small uppercase gold label above a heading. */
export function Eyebrow({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-gold',
        className,
      )}
      {...props}
    />
  );
}

/** Lead — comfortable intro/body-large paragraph at a readable measure. */
export function Lead({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'max-w-[52ch] text-[clamp(16px,1.4vw,18.5px)] leading-[1.7] text-ink-2',
        className,
      )}
      {...props}
    />
  );
}
