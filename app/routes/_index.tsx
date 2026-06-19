import {useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import {Hero} from '~/components/sections/Hero';
import {TrustBar} from '~/components/sections/TrustBar';
import {ShopByNeed} from '~/components/sections/ShopByNeed';
import {FeaturedProducts} from '~/components/sections/FeaturedProducts';
import {HowItWorks} from '~/components/sections/HowItWorks';
import {EducationCards} from '~/components/sections/EducationCards';
import {LifestyleBanner} from '~/components/sections/LifestyleBanner';
import {QualityMaterials} from '~/components/sections/QualityMaterials';
import {SocialProof} from '~/components/sections/SocialProof';
import {FinalCTA} from '~/components/sections/FinalCTA';
import type {HomeProduct} from '~/components/sections/HomeProductCard';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Furever Happy | Calm, enriching gear for happier dogs'},
    {
      name: 'description',
      content:
        'Enrichment feeders and lick mats that slow fast eaters, ease boredom, and turn every meal into a calm little adventure.',
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const {storefront} = args.context;
  const {products} = await storefront.query(RECOMMENDED_PRODUCTS_QUERY);
  return {recommendedProducts: products};
}

export default function HomePage() {
  const {recommendedProducts} = useLoaderData<typeof loader>();
  const products = (recommendedProducts?.nodes ?? []) as HomeProduct[];

  return (
    <main>
      <Hero />
      <TrustBar />
      <ShopByNeed />
      <FeaturedProducts products={products} />
      <HowItWorks />
      <EducationCards />
      <LifestyleBanner />
      <QualityMaterials />
      <SocialProof />
      <FinalCTA />
    </main>
  );
}

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment HomeRecommendedProduct on Product {
    id
    title
    handle
    featuredImage {
      id
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
      }
    }
  }
  query HomeRecommendedProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: BEST_SELLING) {
      nodes {
        ...HomeRecommendedProduct
      }
    }
  }
` as const;
