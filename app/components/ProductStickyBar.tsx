import {Money} from '@shopify/hydrogen';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';
import type {ProductFragment} from 'storefrontapi.generated';

/**
 * ProductStickyBar — mobile conversion-first persistent add-to-cart.
 * Hidden on desktop; fixed to the bottom on mobile. Reuses the exact same
 * variant + AddToCartButton logic as the main buy box. Design: docs/04 PDP.
 */
export function ProductStickyBar({
  title,
  selectedVariant,
}: {
  title: string;
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
}) {
  const {open} = useAside();
  const available = !!selectedVariant?.availableForSale;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-[1320px] items-center gap-3 px-[clamp(20px,4vw,60px)] py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-bold text-ink">{title}</p>
          <div className="text-[15px] font-extrabold text-brand">
            {selectedVariant?.price ? (
              <Money data={selectedVariant.price} />
            ) : null}
          </div>
        </div>
        <AddToCartButton
          disabled={!available}
          onClick={() => open('cart')}
          lines={
            selectedVariant
              ? [{merchandiseId: selectedVariant.id, quantity: 1, selectedVariant}]
              : []
          }
        >
          <span
            className={
              'inline-flex h-12 items-center rounded-full bg-brand px-7 text-[15px] font-extrabold text-cream' +
              (available ? '' : ' opacity-50')
            }
          >
            {available ? 'Add to cart' : 'Sold out'}
          </span>
        </AddToCartButton>
      </div>
    </div>
  );
}
