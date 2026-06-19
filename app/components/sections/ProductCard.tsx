import {motion} from 'motion/react';

interface ProductCardProps {
  id: string;
  title: string;
  image?: string;
  price: number;
  index?: number;
}

export function ProductCard({title, image, price, index = 0}: ProductCardProps) {
  return (
    <motion.div
      className="group"
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-50px'}}
      transition={{duration: 0.6, delay: index * 0.1}}
      whileHover={{y: -8}}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <motion.div
          className="bg-cream-50 aspect-square overflow-hidden"
          whileHover={{scale: 1.05}}
          transition={{duration: 0.4}}
        >
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-cream-600 text-4xl">🐾</div>
          )}
        </motion.div>
        <div className="p-6">
          <h3 className="font-serif text-lg font-semibold text-earth-900 mb-2 line-clamp-2 min-h-[3.5rem]">{title}</h3>
          <p className="text-xl font-bold text-accent-teal mb-4">A${price.toFixed(2)}</p>
          <motion.button
            className="w-full bg-cream-200 text-earth-900 py-2.5 rounded-lg font-semibold hover:bg-cream-300 transition-colors"
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
