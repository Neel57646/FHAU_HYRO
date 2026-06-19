import {useEffect, useRef, useState} from 'react';
import {cn} from '~/lib/utils';

/**
 * useReveal — toggles a `.is-visible` state the first time the element scrolls
 * into view. CSS does the actual animation (see [data-reveal] in tailwind.css).
 * No animation library. Design source: docs/05-animation-plan.md.
 */
export function useReveal<T extends HTMLElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    // SSR / unsupported / reduced-motion: just show it.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      {rootMargin: '0px 0px -10% 0px', threshold: 0.15, ...options},
    );

    io.observe(el);
    return () => io.disconnect();
  }, [shown, options]);

  return {ref, shown};
}

/**
 * Reveal — fade-up on first view. Wrap a block; pass `delay` (ms) for stagger.
 */
export function Reveal({
  delay,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {delay?: number}) {
  const {ref, shown} = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal
      className={cn(shown && 'is-visible', className)}
      style={
        delay
          ? ({'--reveal-delay': `${delay}ms`} as React.CSSProperties)
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  );
}
