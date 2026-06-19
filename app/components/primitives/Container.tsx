import {cn} from '~/lib/utils';

/**
 * Container — centers content at the brand max-width with fluid gutters.
 * Design source: docs/06-component-inventory.md (container max 1320, gutter clamp).
 */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1320px] px-[clamp(20px,4vw,60px)]',
        className,
      )}
      {...props}
    />
  );
}
