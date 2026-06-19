import {motion} from 'motion/react';
import {ProductCard} from './ProductCard';
import {PRODUCTS} from './data';
import {EASE} from './motion';

interface ProductGridProps {
  title: string;
}

export function ProductGrid({title}: ProductGridProps) {
  return (
    <section className="bg-cream-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14 flex items-end justify-between"
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-80px'}}
          transition={{duration: 0.7, ease: EASE}}
        >
          <h2
            className="font-serif font-light text-earth-900"
            style={{fontSize: 'clamp(2rem, 4vw, 3rem)'}}
          >
            {title}
          </h2>
          <a
            href="/collections/all"
            className="group hidden items-center gap-2 text-sm font-light text-earth-700 sm:flex"
          >
            <span className="relative">
              View all
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-terracotta transition-all duration-300 ease-out group-hover:w-full" />
            </span>
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
