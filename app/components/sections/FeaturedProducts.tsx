import {Link} from 'react-router';
import {Section, Container, Heading, Reveal} from '~/components/primitives';
import {HomeProductCard, type HomeProduct} from './HomeProductCard';

/**
 * FeaturedProducts — bestsellers grid wired to real Storefront products.
 * Design source: docs/03 S5.
 */
export function FeaturedProducts({
  products,
  title = 'Bestsellers',
  viewAllHref = '/collections/all',
}: {
  products: HomeProduct[];
  title?: string;
  viewAllHref?: string;
}) {
  if (!products?.length) return null;

  return (
    <Section tone="surface" aria-labelledby="featured-heading">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6">
          <Reveal>
            <Heading as="h2" id="featured-heading">
              {title}
            </Heading>
          </Reveal>
          <Link
            to={viewAllHref}
            prefetch="intent"
            className="shrink-0 text-[15px] font-extrabold text-brand transition-all hover:text-gold"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <HomeProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
