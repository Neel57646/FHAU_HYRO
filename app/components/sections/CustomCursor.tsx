import {useEffect, useState} from 'react';
import {motion, useMotionValue, useReducedMotion, useSpring} from 'motion/react';

/**
 * A two-part custom cursor — a precise dot and a lagging ring that swells over
 * anything interactive. Uses mix-blend-difference so it reads on light and dark
 * sections alike. Desktop + fine-pointer only; it bows out entirely on touch
 * devices and when reduced motion is requested.
 *
 * The motion values drive each layer's position via x/y; the visible shape is a
 * child centered with CSS translate, so motion's transform never fights the
 * centering offset.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, {stiffness: 350, damping: 28, mass: 0.4});
  const ringY = useSpring(y, {stiffness: 350, damping: 28, mass: 0.4});

  useEffect(() => {
    if (reduceMotion) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest('a, button, [data-cursor]')));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      style={{mixBlendMode: 'difference'}}
    >
      <motion.div className="fixed left-0 top-0" style={{x, y}}>
        <span className="block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </motion.div>
      <motion.div className="fixed left-0 top-0" style={{x: ringX, y: ringY}}>
        <motion.span
          className="block -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
          animate={{
            width: active ? 56 : 32,
            height: active ? 56 : 32,
            opacity: active ? 0.9 : 0.5,
          }}
          transition={{type: 'spring', stiffness: 250, damping: 20}}
        />
      </motion.div>
    </div>
  );
}
