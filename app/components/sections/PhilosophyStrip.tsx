import {useRef} from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';

const VALUES = ['Calmer dogs.', 'Slower meals.', 'Brighter days.'];

export function PhilosophyStrip() {
  const x = useMotionValue(0);
  const paused = useRef(false);
  const reduceMotion = useReducedMotion();

  // Percentage transform: the row holds two identical sets, so one full set is
  // exactly 50% of the row's width. Wrapping at -50 yields a seamless loop.
  const transform = useTransform(x, (v) => `translateX(${v}%)`);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || paused.current) return;
    const speed = 0.0025; // % of row width per ms — slow, unhurried
    let next = x.get() - delta * speed;
    if (next <= -50) next += 50;
    x.set(next);
  });

  return (
    <section
      className="overflow-hidden border-y border-earth-200/50 bg-cream-100 py-10"
      aria-label="Brand values"
    >
      <motion.div
        className="flex w-max whitespace-nowrap"
        style={reduceMotion ? undefined : {transform}}
        onHoverStart={() => (paused.current = true)}
        onHoverEnd={() => (paused.current = false)}
      >
        {[0, 1].map((set) => (
          <div key={set} className="flex items-center" aria-hidden={set === 1}>
            {VALUES.map((value) => (
              <span key={value} className="flex items-center">
                <span
                  className="px-8 font-serif font-light italic text-earth-800"
                  style={{fontSize: 'clamp(1.75rem, 4vw, 3rem)'}}
                >
                  {value}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta/60" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
