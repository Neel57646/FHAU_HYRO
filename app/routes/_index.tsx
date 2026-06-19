import type {Route} from './+types/_index';
import {Preloader} from '~/components/sections/Preloader';
import {CustomCursor} from '~/components/sections/CustomCursor';
import {Atmosphere} from '~/components/sections/Atmosphere';
import {AnnouncementBar} from '~/components/sections/AnnouncementBar';
import {Header} from '~/components/sections/Header';
import {HeroSection} from '~/components/sections/HeroSection';
import {PhilosophyStrip} from '~/components/sections/PhilosophyStrip';
import {ProductShowcase} from '~/components/sections/ProductShowcase';
import {TheRitual} from '~/components/sections/TheRitual';
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
        'Premium enrichment for dogs — lick mats, slow feeders and multi-texture trays that turn mealtimes into calm. Food-grade silicone, designed in Australia.',
    },
  ];
};

export default function HomePage() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <Atmosphere />
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <PhilosophyStrip />
        <ProductShowcase />
        <TheRitual />
        <WhyEnrichment />
        <ImageBreak />
        <ProductGrid title="Shop the range" />
        <Testimonial />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
