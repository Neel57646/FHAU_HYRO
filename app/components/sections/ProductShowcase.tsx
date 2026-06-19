import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router';
import {motion, useReducedMotion} from 'motion/react';
import {PRODUCTS} from './data';
import {EASE} from './motion';

/**
 * The signature moment: the range presented as a draggable editorial reel
 * rather than a grid. Drag (or swipe) horizontally to move through it. On
 * reduced-motion / no-JS it degrades to a normal horizontal scroll container.
 */
export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;
      setMaxDrag(Math.max(0, track.scrollWidth - container.offsetWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section className="overflow-hidden bg-earth-900 py-24 text-cream-50 md:py-36">
      <div className="mx-auto mb-14 flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <motion.p
            className="text-xs font-medium uppercase tracking-[0.25em] text-cream-400"
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-80px'}}
            transition={{duration: 0.6, ease: EASE}}
          >
            The Collection
          </motion.p>
          <motion.h2
            className="mt-4 max-w-xl font-serif font-light leading-tight"
            style={{fontSize: 'clamp(2rem, 4.5vw, 3.5rem)'}}
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-80px'}}
            transition={{duration: 0.8, delay: 0.1, ease: EASE}}
          >
            Five ways to make the bowl wait
          </motion.h2>
        </div>
        <span className="hidden items-center gap-2 text-xs font-light uppercase tracking-[0.2em] text-cream-400 md:flex">
          Drag to explore
          <span aria-hidden="true">→</span>
        </span>
      </div>

      <div ref={containerRef} className="cursor-grab active:cursor-grabbing">
        <motion.div
          ref={trackRef}
          className="flex gap-6 px-4 sm:px-6 lg:px-8"
          drag={reduceMotion || maxDrag === 0 ? false : 'x'}
          dragConstraints={{left: -maxDrag, right: 0}}
          dragElastic={0.08}
          data-cursor="hover"
          style={{width: 'max-content'}}
        >
          {PRODUCTS.map((product, i) => (
            <motion.article
              key={product.id}
              className="group w-[78vw] shrink-0 sm:w-[58vw] md:w-[40vw] lg:w-[30vw]"
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-40px'}}
              transition={{duration: 0.7, delay: i * 0.06, ease: EASE}}
            >
              <Link to={`/products/${product.handle}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 text-sm font-light tabular-nums text-earth-900">
                    {product.fromPrice ? 'from ' : ''}A${product.price.toFixed(2)}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-block rounded-full bg-terracotta px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-cream-50">
                      View
                    </span>
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-light text-cream-50">
                      {product.name.split('™')[0]}
                      <span className="align-super text-xs">™</span>
                    </h3>
                    <p className="mt-1 text-sm font-light text-cream-100/70">
                      {product.tagline}
                    </p>
                  </div>
                  <div className="mt-1 flex shrink-0 gap-1.5">
                    {product.colors.map((c) => (
                      <span
                        key={c}
                        className="h-3 w-3 rounded-full ring-1 ring-cream-50/20"
                        style={{backgroundColor: c}}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-xs font-light uppercase tracking-[0.15em] text-cream-400">
                  {product.spec}
                </p>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
