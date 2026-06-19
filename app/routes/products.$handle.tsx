import {redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {ProductForm} from '~/components/ProductForm';
import {ProductStickyBar} from '~/components/ProductStickyBar';
import {Container, Section, Heading, Eyebrow, Reveal} from '~/components/primitives';
import {FinalCTA} from '~/components/sections/FinalCTA';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `${data?.product.title ?? 'Product'} | Furever Happy`},
    {
      name: 'description',
      content:
        data?.product.seo?.description ??
        data?.product.description?.slice(0, 155) ??
        '',
    },
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: Route.LoaderArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {title, descriptionHtml} = product;

  return (
    <div className="bg-cream pb-24 md:pb-0">
      {/* Buy section — sticky gallery + buy box (docs/03 PDP) */}
      <Container className="grid gap-[clamp(28px,4vw,64px)] py-[clamp(32px,4vw,64px)] md:grid-cols-2">
        <div className="md:sticky md:top-[100px] md:self-start">
          <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-[0_22px_44px_rgba(47,61,43,0.10)]">
            <ProductImage image={selectedVariant?.image} />
          </div>
        </div>

        <div className="md:self-start">
          <Heading as="h1" size="h2">
            {title}
          </Heading>
          <p className="mt-3 text-[14px] font-bold text-ink-2">
            <span className="text-gold">★★★★★</span> Furever Happy favourite
          </p>
          <div className="mt-5 text-[24px] font-extrabold text-brand">
            <ProductPrice
              price={selectedVariant?.price}
              compareAtPrice={selectedVariant?.compareAtPrice}
            />
          </div>

          <div className="mt-7">
            <ProductForm
              productOptions={productOptions}
              selectedVariant={selectedVariant}
            />
          </div>

          <ul className="mt-7 flex flex-col gap-2.5 text-[14px] text-ink-2">
            {[
              'Free AU shipping over $60',
              '30-day happiness guarantee',
              'Food-safe & dishwasher safe',
            ].map((line) => (
              <li key={line} className="flex items-center gap-2.5">
                <span className="text-gold" aria-hidden="true">
                  ✓
                </span>
                {line}
              </li>
            ))}
          </ul>

          {descriptionHtml ? (
            <div className="mt-9 border-t border-line pt-7">
              <Heading as="h2" size="h3">
                Overview
              </Heading>
              <div
                className="prose-fh mt-4 text-[15px] leading-relaxed text-ink-2 [&_a]:text-brand [&_a]:underline [&_h2]:mt-5 [&_h2]:font-heading [&_li]:my-1 [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{__html: descriptionHtml}}
              />
            </div>
          ) : null}
        </div>
      </Container>

      <ProductBenefits />
      <ProductFaqs />
      <FinalCTA />

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />

      <ProductStickyBar title={title} selectedVariant={selectedVariant} />
    </div>
  );
}

// --- PDP narrative sections ---------------------------------------------------
// Curated, brand-true content. TODO (real store): drive from product metafields.

const BENEFITS = [
  {emoji: '🐢', title: 'Slows fast eating', body: 'Paced meals are gentler on the tummy and far less gulpy.'},
  {emoji: '🧠', title: 'Enriches the mind', body: 'Sniffing and problem-solving tire dogs out the healthy way.'},
  {emoji: '🫧', title: 'Easy to clean', body: 'Dishwasher-safe, food-grade materials. No fuss for you.'},
];

function ProductBenefits() {
  return (
    <Section tone="surface" aria-labelledby="pdp-benefits">
      <Container>
        <Reveal className="mb-[clamp(28px,3.6vw,48px)] text-center">
          <Eyebrow>Why dogs (and owners) love it</Eyebrow>
          <Heading as="h2" id="pdp-benefits" className="mx-auto mt-4">
            Built for happier mealtimes
          </Heading>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <div className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-cream p-7">
                <span className="text-4xl">{b.emoji}</span>
                <h3 className="font-heading text-[19px] font-semibold text-brand">
                  {b.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-2">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const FAQS = [
  {q: 'Is it dishwasher safe?', a: 'Yes — top-rack dishwasher safe and made from food-grade, BPA-free materials.'},
  {q: 'What size should I choose?', a: 'Most breeds do well with Medium. For very small or very large dogs, check the size guide on the variant selector.'},
  {q: 'How does shipping work?', a: 'Fast AU shipping, free on orders over $60. Most orders arrive within a few business days.'},
  {q: 'What if my dog doesn’t love it?', a: 'We back every product with a 30-day happiness guarantee.'},
];

function ProductFaqs() {
  return (
    <Section tone="cream-2" aria-labelledby="pdp-faqs">
      <Container className="max-w-[820px]">
        <Reveal className="mb-8 text-center">
          <Heading as="h2" id="pdp-faqs" className="mx-auto">
            Common questions
          </Heading>
        </Reveal>
        <div className="flex flex-col gap-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-line bg-card px-6 py-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-[17px] font-semibold text-brand">
                {item.q}
                <span className="text-gold transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
