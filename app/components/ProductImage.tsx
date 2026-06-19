import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export function ProductImage({
  image,
}: {
  image: ProductVariantFragment['image'];
}) {
  if (!image) {
    return <div className="aspect-square w-full bg-gold-soft" />;
  }
  return (
    <Image
      alt={image.altText || 'Product Image'}
      aspectRatio="1/1"
      data={image}
      key={image.id}
      sizes="(min-width: 45em) 50vw, 100vw"
      className="h-auto w-full object-cover"
    />
  );
}
