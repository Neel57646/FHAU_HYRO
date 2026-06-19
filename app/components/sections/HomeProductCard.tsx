import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {cn} from '~/lib/utils';

export interface HomeProduct {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    id?: string | null;
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  priceRange: {minVariantPrice: Pick<MoneyV2, 'amount' | 'currencyCode'>};
  variants: {nodes: Array<{id: string; availableForSale: boolean}>};
}

/**
 * HomeProductCard — premium product card with image-zoom hover, lift, and a
 * quick-add that opens the cart drawer. Real Storefront data. Design: docs/03 S5.
 */
export function HomeProductCard({product}: {product: HomeProduct}) {
  const {open} = useAside();
  const variant = product.variants.nodes[0];
  const url = `/products/${product.handle}`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-[0_14px_32px_rgba(47,61,43,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_rgba(47,61,43,0.13)]">
      <Link
        to={url}
        prefetch="intent"
        className="relative block aspect-square overflow-hidden bg-gold-soft"
      >
        {product.featuredImage ? (
          <Image
            data={product.featuredImage}
            aspectRatio="1/1"
            sizes="(min-width: 1080px) 300px, (min-width: 560px) 45vw, 90vw"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid size-full place-items-center text-5xl">🐾</div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link to={url} prefetch="intent" className="flex-1">
          <h3 className="font-heading text-[17px] font-semibold leading-snug text-brand">
            {product.title}
          </h3>
        </Link>
        <div className="mt-3 text-[15px] font-bold text-ink">
          <Money data={product.priceRange.minVariantPrice} />
        </div>
        <div className="mt-4">
          {variant ? (
            <AddToCartButton
              lines={[{merchandiseId: variant.id, quantity: 1}]}
              disabled={!variant.availableForSale}
              onClick={() => open('cart')}
            >
              <span
                className={cn(
                  'block w-full rounded-full bg-secondary py-2.5 text-center text-[14px] font-extrabold text-brand transition-colors group-hover:bg-brand group-hover:text-cream',
                  !variant.availableForSale && 'opacity-50',
                )}
              >
                {variant.availableForSale ? 'Add to cart' : 'Sold out'}
              </span>
            </AddToCartButton>
          ) : (
            <Link
              to={url}
              prefetch="intent"
              className="block w-full rounded-full bg-secondary py-2.5 text-center text-[14px] font-extrabold text-brand transition-colors hover:bg-brand hover:text-cream"
            >
              View product
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
