import {motion, useReducedMotion} from 'motion/react';
import {EASE} from './motion';

interface EditProduct {
  id: string;
  name: string;
  price: number;
  blurb?: string;
}

const PRODUCTS: EditProduct[] = [
  {id: '1', name: 'PawFlow™ Pro Enrichment Pack', price: 38.98},
  {id: '2', name: 'CalmBite™ Pro Enrichment Mat', price: 24.99},
  {
    id: '3',
    name: 'ZenPaw™ Comfort Feeding Mat',
    price: 10.99,
    blurb:
      'Our everyday hero. A gentle ritual that slows the fastest eater and softens the loudest dinner.',
  },
];

export function FeaturedCollection() {
  return (
    <section className="bg-cream-50 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta"
          initial={{opacity: 0, y: 12}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-80px'}}
          transition={{duration: 0.6, ease: EASE}}
        >
          The Enrichment Edit
        </motion.p>
        <motion.h2
          className="mt-4 max-w-2xl font-serif font-light leading-tight text-earth-900"
          style={{fontSize: 'clamp(2rem, 4.5vw, 3.5rem)'}}
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-80px'}}
          transition={{duration: 0.8, delay: 0.1, ease: EASE}}
        >
          Tools for slower, happier feeding
        </motion.h2>

        {/* Asymmetric editorial layout */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Large hero product */}
          <EditCard product={PRODUCTS[0]} className="md:col-span-8" aspect="aspect-[4/3]" />
          {/* Small, offset lower */}
          <EditCard
            product={PRODUCTS[1]}
            className="md:col-span-4 md:mt-24"
            aspect="aspect-[3/4]"
          />
        </div>

        {/* Full-width, text wrapped beside */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
          <EditCard
            product={PRODUCTS[2]}
            className="md:col-span-8"
            aspect="aspect-[16/9]"
            hideMeta
          />
          <div className="md:col-span-4">
            <h3 className="font-serif text-2xl font-light text-earth-900">
              {PRODUCTS[2].name}
            </h3>
            <p className="mt-4 text-base font-light leading-relaxed text-earth-700">
              {PRODUCTS[2].blurb}
            </p>
            <p className="mt-6 font-light tabular-nums text-earth-900">
              A${PRODUCTS[2].price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditCard({
  product,
  className = '',
  aspect,
  hideMeta = false,
}: {
  product: EditProduct;
  className?: string;
  aspect: string;
  hideMeta?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      className={`group ${className}`}
      initial={{opacity: 0, y: 28}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-60px'}}
      transition={{duration: 0.8, ease: EASE}}
    >
      <div className={`relative ${aspect} overflow-hidden rounded-2xl bg-gradient-to-br from-cream-200 to-earth-200`}>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={reduceMotion ? undefined : {scale: 1.03}}
          transition={{duration: 0.6, ease: EASE}}
        >
          <span className="font-serif text-lg font-light italic text-earth-600/60">
            {product.name.split('™')[0]}
          </span>
        </motion.div>

        {!hideMeta && (
          <>
            {/* Name slides up from bottom on hover */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden">
              <div className="translate-y-full bg-gradient-to-t from-earth-900/80 to-transparent p-5 transition-transform duration-500 ease-out group-hover:translate-y-0">
                <span className="font-serif text-base font-light text-cream-50">
                  {product.name}
                </span>
              </div>
            </div>
            {/* Price, bottom-right */}
            <span className="absolute bottom-4 right-4 rounded-full bg-cream-50/90 px-3 py-1 text-sm font-light tabular-nums text-earth-900">
              A${product.price.toFixed(2)}
            </span>
          </>
        )}
      </div>
    </motion.article>
  );
}
