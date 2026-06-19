import {useRef} from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {EASE} from './motion';

export function ImageBreak() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Gentle parallax on the backdrop for a sense of depth, not motion sickness.
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      ref={ref}
      className="relative flex h-[70vh] items-center justify-center overflow-hidden"
      aria-label="A dog enjoying a lick mat"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 scale-110 bg-gradient-to-br from-earth-300 via-earth-400 to-earth-600"
        style={{y: reduceMotion ? 0 : bgY}}
      />
      <motion.div
        className="relative z-10"
        initial={{opacity: 0, scale: 0.96}}
        whileInView={{opacity: 1, scale: 1}}
        viewport={{once: true, margin: '-100px'}}
        transition={{duration: 1, ease: EASE}}
      >
        <p
          className="rounded-full bg-cream-50/90 px-8 py-4 font-serif font-light italic text-earth-900 backdrop-blur-sm"
          style={{fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)'}}
        >
          The bowl can wait.
        </p>
      </motion.div>
    </section>
  );
}
