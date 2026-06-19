import {motion, useScroll, useSpring} from 'motion/react';

/**
 * Page-wide finish: a thin scroll-progress hairline and a fixed film-grain
 * wash. Grain is the cheapest way to make flat color feel like print — it
 * lives at very low opacity so it reads as texture, never noise.
 */
export function Atmosphere() {
  const {scrollYProgress} = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[90] h-0.5 w-full origin-left bg-terracotta"
        style={{scaleX: progress}}
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </>
  );
}
