import {Link} from 'react-router';
import {motion} from 'motion/react';
import {EASE} from './motion';
import type {Product} from './data';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({product, index = 0}: ProductCardProps) {
  return (
    <motion.article
      className="group relative pb-5"
      initial={{opacity: 0, y: 28}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-50px'}}
      transition={{duration: 0.6, delay: index * 0.08, ease: EASE}}
    >
      <Link to={`/products/${product.handle}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-cream-100">
          {/* Base image */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
          />
          {/* Second image revealed on hover */}
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
          />
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            className="absolute bottom-3 right-3 z-10 rounded-full bg-cream-50/95 px-4 py-1.5 text-sm font-light text-earth-900 opacity-0 shadow-sm transition-all duration-300 ease-out group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
          >
            + Add
          </button>
        </div>

        <div className="mt-5 flex items-start justify-between gap-3">
          <h3 className="font-serif text-base font-light leading-snug text-earth-900">
            {product.name.split('™')[0]}
            <span className="align-super text-[0.6em]">™</span>
          </h3>
          <div className="mt-1 flex shrink-0 gap-1">
            {product.colors.slice(0, 5).map((c) => (
              <span
                key={c}
                className="h-2.5 w-2.5 rounded-full ring-1 ring-earth-900/10"
                style={{backgroundColor: c}}
              />
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm font-light tabular-nums text-earth-700">
          {product.fromPrice ? 'from ' : ''}A${product.price.toFixed(2)}
        </p>
      </Link>

      <span className="absolute bottom-0 left-0 h-px w-0 bg-earth-300 transition-all duration-500 ease-out group-hover:w-full" />
    </motion.article>
  );
}
