import type {Route} from './+types/_index';
import {AnnouncementBar} from '~/components/sections/AnnouncementBar';
import {Header} from '~/components/sections/Header';
import {HeroSection} from '~/components/sections/HeroSection';
import {PhilosophyStrip} from '~/components/sections/PhilosophyStrip';
import {FeaturedCollection} from '~/components/sections/FeaturedCollection';
import {WhyEnrichment} from '~/components/sections/WhyEnrichment';
import {ImageBreak} from '~/components/sections/ImageBreak';
import {ProductGrid} from '~/components/sections/ProductGrid';
import {Testimonial} from '~/components/sections/Testimonial';
import {Newsletter} from '~/components/sections/Newsletter';
import {Footer} from '~/components/sections/Footer';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Furever Happy — Calm bodies, curious minds'},
    {
      name: 'description',
      content:
        'Premium enrichment for pets — lick mats, snuffle mats and slow feeders that turn mealtimes into calm. Designed in Melbourne.',
    },
  ];
};

const PRODUCTS = [
  {id: '1', title: 'PawFlow™ Pro Enrichment Pack – Medium & Large Breeds', price: 38.98},
  {id: '2', title: 'PawFlow™ Calm Starter Pack – Small Breeds', price: 29.98},
  {id: '3', title: 'CalmBite™ Pro Enrichment Mat', price: 24.99},
  {id: '4', title: 'ZenPaw™ Comfort Feeding Mat', price: 10.99},
];

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <PhilosophyStrip />
        <FeaturedCollection />
        <WhyEnrichment />
        <ImageBreak />
        <ProductGrid title="Shop the range" products={PRODUCTS} />
        <Testimonial />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
