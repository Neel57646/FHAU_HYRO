/**
 * Real Furever Happy catalogue, sourced from the live Shopify store.
 * Copy here is written fresh for the landing experience — it is not lifted
 * verbatim from the product pages — but every fact (materials, sizes, prices,
 * handles, imagery) maps to the actual products.
 */

const CDN = 'https://cdn.shopify.com/s/files/1/0972/6954/7286/files/';

export interface Product {
  id: string;
  handle: string;
  name: string;
  tagline: string;
  blurb: string;
  price: number;
  fromPrice?: boolean;
  image: string;
  hoverImage: string;
  colors: string[];
  spec: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'zenpaw',
    handle: 'lmsl',
    name: 'ZenPaw™ Comfort Feeding Mat',
    tagline: 'The gentle introduction to slow feeding.',
    blurb:
      'A soft, flexible mat with a subtle texture that holds spreads beautifully — made for dogs new to enrichment, or pups who find chunkier mats overwhelming.',
    price: 10.99,
    fromPrice: true,
    image: `${CDN}Hf7b8be0eb375476f85085cdea620b87eh.jpg?v=1767670498`,
    hoverImage: `${CDN}H15fad891f7384bef91a9d98f981c822cB.jpg?v=1767670498`,
    colors: ['#D4A5A5', '#9AA0A6', '#7C6BA0', '#E08A4B', '#7FA67F'],
    spec: 'Small & Large · BPA-free silicone',
  },
  {
    id: 'mindmunch',
    handle: 'sflms',
    name: 'MindMunch™ Multi-Texture Feeding Tray',
    tagline: 'Four textures. One calmer bowl.',
    blurb:
      'Four feeding zones, four surface patterns — turning an ordinary meal into a few focused minutes that settle fast eaters and anxious dogs alike.',
    price: 18.99,
    image: `${CDN}SFLMS-3_f13beeb7-19e4-47aa-98c2-d819c8c4c035.jpg?v=1769139668`,
    hoverImage: `${CDN}H4f0d35d4a1bf44e7a62750ce2f7ac9b3q.jpg?v=1769139668`,
    colors: ['#D4A5A5', '#E08A4B', '#2E2E2E', '#7FA67F', '#9AA0A6'],
    spec: '4 zones · Freezer & microwave safe',
  },
  {
    id: 'calmbite',
    handle: 'lmsfp',
    name: 'CalmBite™ Pro Enrichment Mat',
    tagline: 'Built for the serious licker.',
    blurb:
      'Thicker, more durable, with deep grooves that hold richer spreads — and an integrated suction base that turns even bath time into a calm-down ritual.',
    price: 24.99,
    image: `${CDN}H7c6b147343724c78bb36a570e72aae22A.jpg?v=1767841751`,
    hoverImage: `${CDN}Hbc5d81ae1c6148679cc9a32e8f5f7580v.jpg?v=1767841751`,
    colors: ['#D4A5A5', '#B8CCD4', '#B5C99A', '#7C6BA0', '#9AA0A6'],
    spec: 'Suction base · Dishwasher safe',
  },
  {
    id: 'starter',
    handle: 'calm-starter-pack',
    name: 'PawFlow™ Calm Starter Pack',
    tagline: 'Everything a small dog needs to slow down.',
    blurb:
      'The MindMunch tray and a Small ZenPaw mat, curated to work together across a typical day. Save 15% against buying them apart.',
    price: 29.98,
    image: `${CDN}H72ac8119acfd436aaad023979ee80737i.jpg?v=1769139668`,
    hoverImage: `${CDN}SFLMS-3_f13beeb7-19e4-47aa-98c2-d819c8c4c035.jpg?v=1769139668`,
    colors: ['#D4A5A5', '#E08A4B', '#2E2E2E', '#7FA67F'],
    spec: 'Small breeds · 2-piece set',
  },
  {
    id: 'pro',
    handle: 'pro-enrichment-pack',
    name: 'PawFlow™ Pro Enrichment Pack',
    tagline: 'Sized up for stronger lickers.',
    blurb:
      'A CalmBite Pro mat paired with a Large ZenPaw — the variety and durability medium and large dogs need across mealtimes, calm-downs and bath time. Save 15%.',
    price: 38.98,
    image: `${CDN}He7820fad6e264677a28892e6b5f4dbeeJ.jpg?v=1767841751`,
    hoverImage: `${CDN}H7c6b147343724c78bb36a570e72aae22A.jpg?v=1767841751`,
    colors: ['#D4A5A5', '#B8CCD4', '#B5C99A', '#7C6BA0'],
    spec: 'Medium & large breeds · 2-piece set',
  },
];

export const HERO_IMAGE = `${CDN}H7c6b147343724c78bb36a570e72aae22A.jpg?v=1767841751`;
export const BREAK_IMAGE = `${CDN}He3a20e008fb84b908bf0e4b0e03036b56.jpg?v=1767670498`;

export const ANNOUNCEMENTS = [
  'Enrichment, designed in Australia',
  'Food-grade silicone · freezer & dishwasher safe',
  'Calmer mealtimes, every single day',
];
