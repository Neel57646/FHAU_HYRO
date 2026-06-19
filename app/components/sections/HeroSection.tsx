import {useRef} from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {EASE} from './motion';

const LINE_ONE = ['Calm', 'bodies,'];
const LINE_TWO = ['curious', 'minds.'];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // Subtle parallax: the image drifts up ~10% as the hero scrolls away.
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  const container = {
    hidden: {},
    visible: {transition: {staggerChildren: 0.08, delayChildren: 0.1}},
  };
  const word = {
    hidden: reduceMotion ? {opacity: 0} : {opacity: 0, y: 24},
    visible: {opacity: 1, y: 0},
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-cream-50 pt-16 pb-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-12 lg:px-8">
        {/* Text — 5 of 12 columns */}
        <div className="md:col-span-5">
          <motion.h1
            className="font-serif font-light leading-[0.95] text-earth-900"
            style={{fontSize: 'clamp(3rem, 8vw, 7rem)'}}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <span className="block">
              {LINE_ONE.map((w) => (
                <motion.span key={w} variants={word} transition={{duration: 0.8, ease: EASE}} className="mr-[0.2em] inline-block">
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="block italic text-earth-700">
              {LINE_TWO.map((w) => (
                <motion.span key={w} variants={word} transition={{duration: 0.8, ease: EASE}} className="mr-[0.2em] inline-block">
                  {w}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-sm text-lg font-light leading-relaxed text-earth-700"
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.7, ease: EASE}}
          >
            Enrichment that turns mealtimes into calm.
          </motion.p>

          <motion.div
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.85, ease: EASE}}
          >
            <a
              href="/collections/all"
              className="group mt-10 inline-flex items-center gap-2 text-base font-light text-earth-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
            >
              <span className="relative">
                Explore the range
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-terracotta transition-all duration-300 ease-out group-hover:w-full group-focus-visible:w-full" />
              </span>
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Image — 7 of 12 columns, offset lower than the text */}
        <div className="md:col-span-7 md:mt-[10vh]">
          <motion.div
            style={{y: reduceMotion ? 0 : imageY}}
            initial={reduceMotion ? {opacity: 0} : {clipPath: 'inset(100% 0 0 0)'}}
            animate={reduceMotion ? {opacity: 1} : {clipPath: 'inset(0% 0 0 0)'}}
            transition={{duration: 1.1, delay: 0.2, ease: EASE}}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-cream-200 via-cream-300 to-earth-200"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-2xl font-light italic text-earth-600/70">
                a quiet moment
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
