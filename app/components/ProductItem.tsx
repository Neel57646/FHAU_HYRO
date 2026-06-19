import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

/**
 * ProductItem — premium brand product card. Shared by collection, catalog and
 * search results. Image-zoom hover + lift; CSS-first. Design source: docs/06.
 */
export function ProductItem({
  product,
  loading,
}: {
  product: CollectionItemFragment | ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <Link
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-[0_14px_32px_rgba(47,61,43,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_rgba(47,61,43,0.13)]"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      <div className="aspect-square overflow-hidden bg-gold-soft">
        {image ? (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid size-full place-items-center text-5xl">🐾</div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-heading text-[16px] font-semibold leading-snug text-brand">
          {product.title}
        </h3>
        <div className="mt-auto text-[15px] font-bold text-ink">
          <Money data={product.priceRange.minVariantPrice} />
        </div>
      </div>
    </Link>
  );
}
