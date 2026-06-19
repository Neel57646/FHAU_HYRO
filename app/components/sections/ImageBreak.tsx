import {useRef} from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {EASE} from './motion';
import {BREAK_IMAGE} from './data';

export function ImageBreak() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Gentle parallax on the backdrop for a sense of depth, not motion sickness.
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={ref}
      className="relative flex h-[70vh] items-center justify-center overflow-hidden"
      aria-label="ZenPaw comfort feeding mat"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 scale-125"
        style={{y: reduceMotion ? 0 : bgY}}
      >
        <img
          src={BREAK_IMAGE}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-earth-900/25" />
      </motion.div>
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
