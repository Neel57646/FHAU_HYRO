import {motion} from 'motion/react';
import {ProductCard, type ProductCardProps} from './ProductCard';
import {EASE} from './motion';

type Product = Omit<ProductCardProps, 'index'>;

interface ProductGridProps {
  title: string;
  products: Product[];
}

export function ProductGrid({title, products}: ProductGridProps) {
  return (
    <section className="bg-cream-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="mb-14 font-serif font-light text-earth-900"
          style={{fontSize: 'clamp(2rem, 4vw, 3rem)'}}
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-80px'}}
          transition={{duration: 0.7, ease: EASE}}
        >
          {title}
        </motion.h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
