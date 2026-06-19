import {useRef, useState} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import {PRODUCTS} from './data';
import {EASE} from './motion';

interface Step {
  numeral: string;
  title: string;
  body: string;
  image: string;
}

const STEPS: Step[] = [
  {
    numeral: '01',
    title: 'Spread',
    body: 'Smear something good across the grooves — peanut butter, yoghurt, wet or raw food. The texture does the rest.',
    image: PRODUCTS[2].image,
  },
  {
    numeral: '02',
    title: 'Freeze',
    body: 'Pop it in the freezer for a longer, slower session. A frozen mat can turn five minutes of enrichment into thirty.',
    image: PRODUCTS[1].image,
  },
  {
    numeral: '03',
    title: 'Unwind',
    body: 'Licking is a self-soothing motion — it lowers the heart rate and settles the mind. The bowl can wait.',
    image: PRODUCTS[0].image,
  },
];

export function TheRitual() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <section className="bg-cream-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
            The Ritual
          </p>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.numeral}>
                <span className="font-serif text-5xl font-light text-terracotta">
                  {step.numeral}
                </span>
                <h3 className="mt-4 font-serif text-2xl font-light text-earth-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-base font-light leading-relaxed text-earth-700">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return <PinnedRitual />;
}

function PinnedRitual() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
    setStep(next);
  });

  const current = STEPS[step];

  return (
    <section ref={ref} className="relative h-[300vh] bg-cream-100">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {/* Text */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
              The Ritual
            </p>
            <div className="relative mt-8 h-[18rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.numeral}
                  initial={{opacity: 0, y: 24}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -24}}
                  transition={{duration: 0.5, ease: EASE}}
                >
                  <span
                    className="block font-serif font-light leading-none text-terracotta"
                    style={{fontSize: 'clamp(4rem, 10vw, 8rem)'}}
                  >
                    {current.numeral}
                  </span>
                  <h3 className="mt-4 font-serif text-3xl font-light text-earth-900 md:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-4 max-w-md text-lg font-light leading-relaxed text-earth-700">
                    {current.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Progress ticks */}
            <div className="mt-8 flex gap-3">
              {STEPS.map((s, i) => (
                <span
                  key={s.numeral}
                  className={`h-px w-12 transition-colors duration-500 ${
                    i <= step ? 'bg-terracotta' : 'bg-earth-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-cream-200">
            <AnimatePresence>
              <motion.img
                key={current.image}
                src={current.image}
                alt={current.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{opacity: 0, scale: 1.06}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.7, ease: EASE}}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
