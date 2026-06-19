import {useEffect, useState} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {EASE} from './motion';

const SESSION_KEY = 'fh_intro_seen';

/**
 * A one-time intro curtain. The wordmark draws in over a cream field, then the
 * field lifts away to reveal the page — the first-impression moment. Plays once
 * per session (sessionStorage), and collapses instantly for reduced-motion or
 * returning visitors so it never gets in the way.
 */
export function Preloader() {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion || window.sessionStorage.getItem(SESSION_KEY)) {
      setDone(true);
      return;
    }
    window.sessionStorage.setItem(SESSION_KEY, '1');
    document.body.style.overflow = 'hidden';
    const id = window.setTimeout(() => setDone(true), 2200);
    return () => window.clearTimeout(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-cream-50"
          initial={{y: 0}}
          exit={{y: '-100%'}}
          transition={{duration: 0.9, ease: EASE}}
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex items-baseline gap-3"
              initial={{y: '110%'}}
              animate={{y: '0%'}}
              transition={{duration: 0.9, ease: EASE, delay: 0.1}}
            >
              <span className="font-serif text-4xl font-light tracking-tight text-earth-900 md:text-6xl">
                Furever Happy
              </span>
              <motion.span
                className="h-2 w-2 rounded-full bg-terracotta md:h-3 md:w-3"
                animate={{opacity: [0.2, 1, 0.2]}}
                transition={{duration: 1.4, repeat: Infinity, ease: 'easeInOut'}}
              />
            </motion.div>
            <motion.div
              className="mt-4 h-px bg-earth-300"
              initial={{scaleX: 0}}
              animate={{scaleX: 1}}
              transition={{duration: 1.4, ease: EASE, delay: 0.3}}
              style={{transformOrigin: 'left'}}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
