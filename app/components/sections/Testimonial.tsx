import {motion} from 'motion/react';
import {EASE} from './motion';

export function Testimonial() {
  return (
    <section className="bg-cream-100 py-28 md:py-44">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.blockquote
          className="font-serif font-light italic leading-tight text-earth-900"
          style={{fontSize: 'clamp(2rem, 4vw, 4rem)'}}
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-100px'}}
          transition={{duration: 1, ease: EASE}}
        >
          “For the first time in years, dinner is a quiet event in our house.”
        </motion.blockquote>
        <motion.p
          className="mt-10 text-xs font-medium uppercase tracking-[0.25em] text-earth-600"
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{duration: 0.8, delay: 0.3, ease: EASE}}
        >
          Rachel &amp; Moose, Melbourne
        </motion.p>
      </div>
    </section>
  );
}
