import {useState} from 'react';
import {motion} from 'motion/react';
import {EASE} from './motion';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-cream-200 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
        <motion.h2
          className="font-serif font-light leading-tight text-earth-900"
          style={{fontSize: 'clamp(2rem, 4vw, 3.25rem)'}}
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-80px'}}
          transition={{duration: 0.8, ease: EASE}}
        >
          Slow letters, occasionally.
        </motion.h2>

        <motion.div
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-80px'}}
          transition={{duration: 0.8, delay: 0.1, ease: EASE}}
        >
          <form
            className="group relative"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubmitted(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border-0 border-b border-earth-400 bg-transparent pb-3 pr-10 text-lg font-light text-earth-900 placeholder:text-earth-400 transition-colors duration-300 focus:border-terracotta focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="absolute bottom-3 right-0 text-earth-900 transition-transform duration-300 ease-out hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            >
              →
            </button>
          </form>
          <p className="mt-4 text-xs font-light text-earth-600">
            {submitted
              ? 'Thank you — keep an eye on your inbox.'
              : 'No spam. Unsubscribe in one click.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
