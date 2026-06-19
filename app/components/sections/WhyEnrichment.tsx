import {motion, useReducedMotion} from 'motion/react';
import {EASE} from './motion';

interface Reason {
  numeral: string;
  heading: string;
  body: string;
}

const REASONS: Reason[] = [
  {
    numeral: '01',
    heading: 'Mental work tires them out',
    body: 'A 15-minute lick mat session can calm a dog the way a 30-minute walk would. Stimulation isn’t a substitute for exercise — it’s the missing half.',
  },
  {
    numeral: '02',
    heading: 'Slower eating, happier guts',
    body: 'Snuffle mats and slow feeders turn meals into moments. Less gulping, less bloat, less anxiety around food.',
  },
  {
    numeral: '03',
    heading: 'Built for everyday use',
    body: 'Food-safe silicone, dishwasher friendly, designed in Melbourne. Made to live with you, not in a cupboard.',
  },
];

export function WhyEnrichment() {
  const reduceMotion = useReducedMotion();

  const item = {
    hidden: {},
    visible: {transition: {staggerChildren: 0.12}},
  };
  const child = {
    hidden: reduceMotion ? {opacity: 0} : {opacity: 0, y: 18},
    visible: {opacity: 1, y: 0},
  };

  return (
    <section className="bg-cream-100 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-12">
          {REASONS.map((reason) => (
            <motion.div
              key={reason.numeral}
              variants={item}
              initial="hidden"
              whileInView="visible"
              viewport={{once: true, margin: '-80px'}}
            >
              <motion.span
                className="block font-serif text-6xl font-light text-terracotta"
                variants={child}
                transition={{duration: 0.7, ease: EASE}}
              >
                {reason.numeral}
              </motion.span>
              <motion.h3
                className="mt-6 font-serif text-2xl font-light leading-snug text-earth-900"
                variants={child}
                transition={{duration: 0.7, ease: EASE}}
              >
                {reason.heading}
              </motion.h3>
              <motion.p
                className="mt-4 text-base font-light leading-relaxed text-earth-700"
                variants={child}
                transition={{duration: 0.7, ease: EASE}}
              >
                {reason.body}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
