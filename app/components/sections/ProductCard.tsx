import {motion, useReducedMotion} from 'motion/react';
import {EASE} from './motion';

export interface ProductCardProps {
  id: string;
  title: string;
  image?: string;
  price: number;
  index?: number;
}

export function ProductCard({title, image, price, index = 0}: ProductCardProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      className="group relative pb-5"
      initial={{opacity: 0, y: 28}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-50px'}}
      transition={{duration: 0.6, delay: index * 0.08, ease: EASE}}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-cream-100">
        <motion.div
          className="h-full w-full"
          whileHover={reduceMotion ? undefined : {scale: 1.04}}
          transition={{duration: 0.6, ease: EASE}}
        >
          {image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cream-200 to-earth-200 font-serif text-sm font-light italic text-earth-600/60">
              {title.split('™')[0]}
            </div>
          )}
        </motion.div>

        {/* "+ Add" reveals on hover, bottom-right of the image */}
        <button
          type="button"
          aria-label={`Add ${title} to cart`}
          className="absolute bottom-3 right-3 rounded-full bg-cream-50/95 px-4 py-1.5 text-sm font-light text-earth-900 opacity-0 shadow-sm transition-all duration-300 ease-out group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
        >
          + Add
        </button>
      </div>

      <h3 className="mt-5 font-serif text-base font-light leading-snug text-earth-900">
        {title}
      </h3>
      <p className="mt-2 text-sm font-light tabular-nums text-earth-700">
        A${price.toFixed(2)}
      </p>

      {/* Hairline bottom border animates in on hover */}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-earth-300 transition-all duration-500 ease-out group-hover:w-full" />
    </motion.article>
  );
}
