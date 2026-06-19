import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {Search, User, ShoppingBag, Menu as MenuIcon} from 'lucide-react';
import {useAside} from '~/components/Aside';
import {cn} from '~/lib/utils';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex min-h-[74px] max-w-[1320px] items-center justify-between gap-6 px-[clamp(20px,4vw,60px)]">
        <NavLink prefetch="intent" to="/" end className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-gold-soft text-base">
            🐾
          </span>
          <span className="font-heading text-[25px] font-bold leading-none text-brand">
            {shop.name}
          </span>
        </NavLink>
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </header>
  );
}

function navLinkClass({isActive, isPending}: {isActive: boolean; isPending: boolean}) {
  return cn(
    'text-[15px] font-bold transition-colors',
    isPending ? 'text-ink-muted' : 'text-ink hover:text-gold',
    isActive && 'text-gold',
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const {close} = useAside();
  const isMobile = viewport === 'mobile';

  return (
    <nav
      className={cn(
        isMobile
          ? 'flex flex-col'
          : 'hidden items-center gap-7 md:flex',
      )}
      role="navigation"
    >
      {isMobile && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          to="/"
          className={({isActive}) =>
            cn(
              'border-b border-line py-4 text-lg font-bold',
              isActive ? 'text-gold' : 'text-ink',
            )
          }
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            to={url}
            className={
              isMobile
                ? ({isActive}) =>
                    cn(
                      'border-b border-line py-4 text-lg font-bold',
                      isActive ? 'text-gold' : 'text-ink',
                    )
                : navLinkClass
            }
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="flex items-center gap-3 sm:gap-4" role="navigation">
      <SearchToggle />
      <NavLink
        prefetch="intent"
        to="/account"
        aria-label="Account"
        className="hidden text-ink transition-colors hover:text-gold sm:inline-flex"
      >
        <Suspense fallback={<User className="size-5" />}>
          <Await resolve={isLoggedIn} errorElement={<User className="size-5" />}>
            {() => <User className="size-5" />}
          </Await>
        </Suspense>
      </NavLink>
      <CartToggle cart={cart} />
      <HeaderMenuMobileToggle />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="inline-flex items-center text-ink transition-colors hover:text-gold md:hidden"
      aria-label="Open menu"
      onClick={() => open('mobile')}
    >
      <MenuIcon className="size-6" />
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button
      className="inline-flex items-center text-ink transition-colors hover:text-gold"
      aria-label="Search"
      onClick={() => open('search')}
    >
      <Search className="size-5" />
    </button>
  );
}

function CartBadge({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      aria-label={`Cart, ${count} items`}
      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-[14px] font-extrabold text-cream transition-colors hover:bg-brand-2"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      <ShoppingBag className="size-[18px]" />
      <span>{count}</span>
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};
