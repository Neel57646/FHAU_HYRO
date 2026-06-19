import {useRef} from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {EASE} from './motion';
import {HERO_IMAGE} from './data';
import {Magnetic} from './Magnetic';

const LINE_ONE = ['Calm', 'bodies,'];
const LINE_TWO = ['curious', 'minds.'];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  const container = {
    hidden: {},
    visible: {transition: {staggerChildren: 0.08, delayChildren: 0.15}},
  };
  const word = {
    hidden: reduceMotion ? {opacity: 0} : {opacity: 0, y: 28},
    visible: {opacity: 1, y: 0},
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-cream-50 pt-16 pb-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-12 lg:px-8">
        {/* Text — 5 of 12 columns */}
        <motion.div
          className="md:col-span-5"
          style={{y: reduceMotion ? 0 : textY}}
        >
          <motion.p
            className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-terracotta"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.8, delay: 0.1, ease: EASE}}
          >
            Pet enrichment, distilled
          </motion.p>
          <motion.h1
            className="font-serif font-light leading-[0.95] text-earth-900"
            style={{fontSize: 'clamp(3rem, 8vw, 7rem)'}}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <span className="block overflow-hidden">
              {LINE_ONE.map((w) => (
                <motion.span
                  key={w}
                  variants={word}
                  transition={{duration: 0.9, ease: EASE}}
                  className="mr-[0.2em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden italic text-earth-700">
              {LINE_TWO.map((w) => (
                <motion.span
                  key={w}
                  variants={word}
                  transition={{duration: 0.9, ease: EASE}}
                  className="mr-[0.2em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-sm text-lg font-light leading-relaxed text-earth-700"
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.8, ease: EASE}}
          >
            Lick mats, slow feeders and trays that turn mealtimes into calm.
          </motion.p>

          <motion.div
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.95, ease: EASE}}
            className="mt-10"
          >
            <Magnetic strength={14}>
              <a
                href="/collections/all"
                className="group inline-flex items-center gap-2 text-base font-light text-earth-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
              >
                <span className="relative">
                  Explore the range
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-terracotta transition-all duration-300 ease-out group-hover:w-full group-focus-visible:w-full" />
                </span>
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Image — 7 of 12 columns, dropped lower than the text */}
        <div className="md:col-span-7 md:mt-[10vh]">
          <motion.div
            style={{y: reduceMotion ? 0 : imageY}}
            initial={reduceMotion ? {opacity: 0} : {clipPath: 'inset(100% 0 0 0)'}}
            animate={reduceMotion ? {opacity: 1} : {clipPath: 'inset(0% 0 0 0)'}}
            transition={{duration: 1.2, delay: 0.3, ease: EASE}}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-cream-200"
          >
            <img
              src={HERO_IMAGE}
              alt="CalmBite Pro enrichment mat in blush"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1.4, duration: 1}}
      >
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-earth-500">
          Scroll
        </span>
        <motion.span
          className="h-10 w-px bg-earth-400"
          animate={reduceMotion ? undefined : {scaleY: [0.3, 1, 0.3]}}
          transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
          style={{transformOrigin: 'top'}}
        />
      </motion.div>
    </section>
  );
}
