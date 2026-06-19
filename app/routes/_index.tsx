import {motion} from 'motion/react';
import {HeroSection} from '~/components/sections/HeroSection';
import {ProductGrid} from '~/components/sections/ProductGrid';

export default function HomePage() {
  const recommendedProducts = [
    {id: '1', title: 'PawFlow™ Pro Enrichment Pack – Medium & Large Breeds', price: 38.98},
    {id: '2', title: 'PawFlow™ Calm Starter Pack – Small Breeds', price: 29.98},
    {id: '3', title: 'CalmBite™ Pro Enrichment Mat', price: 24.99},
    {id: '4', title: 'ZenPaw™ Comfort Feeding Mat', price: 10.99},
  ];

  return (
    <motion.main initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.4}}>
      <HeroSection />
      <ProductGrid title="Recommended Products" products={recommendedProducts} />
    </motion.main>
  );
}
