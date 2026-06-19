import {useEffect, useState} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {EASE} from './motion';
import {ANNOUNCEMENTS as MESSAGES} from './data';

const ROTATE_MS = 5000;

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="bg-earth-900 text-cream-100">
      <div
        className="relative mx-auto flex h-9 max-w-7xl items-center justify-center overflow-hidden px-4"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            className="text-[0.7rem] font-light uppercase tracking-[0.18em]"
            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: '110%'}}
            animate={{opacity: 1, y: '0%'}}
            exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: '-110%'}}
            transition={{duration: 0.5, ease: EASE}}
          >
            {MESSAGES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
