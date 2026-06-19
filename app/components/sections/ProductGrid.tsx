import {motion} from 'motion/react';
import {ProductCard} from './ProductCard';

interface Product {
  id: string;
  title: string;
  image?: string;
  price: number;
}

interface ProductGridProps {
  title: string;
  products: Product[];
}

export function ProductGrid({title, products}: ProductGridProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{opacity: 0, y: -20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
          viewport={{once: true, margin: '-100px'}}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-earth-900">{title}</h2>
          <motion.div
            className="h-1 bg-accent-teal mt-4 rounded-full"
            initial={{width: 0}}
            whileInView={{width: 96}}
            transition={{duration: 0.8, delay: 0.2}}
            viewport={{once: true}}
          />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
