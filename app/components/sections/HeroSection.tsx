import {motion} from 'motion/react';

export function HeroSection() {
  return (
    <section className="bg-cream-100 py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{opacity: 0, x: -30}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.8, ease: 'easeOut'}}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-serif font-bold text-earth-900 mb-6"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8, delay: 0.2}}
            >
              Enrichment Mats
            </motion.h1>
            <motion.p
              className="text-xl text-earth-700 mb-8 leading-relaxed"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.8, delay: 0.4}}
            >
              Designed for your pet's happiness. Explore our curated collection of enrichment products that bring joy and engagement to your furry friends.
            </motion.p>
            <motion.button
              className="bg-accent-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-sage transition-colors"
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.6}}
            >
              Shop Now
            </motion.button>
          </motion.div>
          <motion.div
            initial={{opacity: 0, x: 30}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.8, delay: 0.2}}
          >
            <motion.div
              className="aspect-square bg-gradient-to-br from-cream-200 to-cream-400 rounded-2xl shadow-lg flex items-center justify-center"
              whileHover={{scale: 1.02}}
              transition={{duration: 0.6}}
            >
              <span className="text-earth-700 text-2xl font-serif">🐾 Furever Happy</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
