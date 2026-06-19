import {useRef, type ReactNode} from 'react';
import {motion, useMotionValue, useReducedMotion, useSpring} from 'motion/react';

interface MagneticProps {
  children: ReactNode;
  /** How far the element is allowed to drift toward the cursor, in px. */
  strength?: number;
  className?: string;
}

/**
 * Wraps a child so it subtly pulls toward the cursor while hovered — the kind
 * of micro-interaction that signals "considered" rather than "assembled".
 * Falls back to a static wrapper when reduced motion is requested.
 */
export function Magnetic({children, strength = 18, className}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, {stiffness: 200, damping: 15, mass: 0.3});
  const sy = useSpring(y, {stiffness: 200, damping: 15, mass: 0.3});

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{x: sx, y: sy, display: 'inline-block'}}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        x.set((relX / (rect.width / 2)) * strength);
        y.set((relY / (rect.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
