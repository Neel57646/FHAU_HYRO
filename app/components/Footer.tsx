import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-[18px]" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]" aria-hidden="true">
      <path d="M14 9h2.5V6H14c-1.93 0-3.5 1.57-3.5 3.5V11H8v3h2.5v6h3v-6H16l.5-3h-3V9.5c0-.28.22-.5.5-.5z" />
    </svg>
  );
}

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  const shopName = header.shop.name;
  return (
    <footer className="mt-auto bg-brand text-cream">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-[clamp(20px,4vw,60px)] py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand + socials */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-gold-soft text-base">
              🐾
            </span>
            <span className="font-heading text-[22px] font-bold">{shopName}</span>
          </div>
          <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-cream/70">
            Calm, enriching gear that makes every meal an adventure — designed for
            happier dogs and tidier homes.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              rel="noopener noreferrer"
              target="_blank"
              className="grid size-9 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              rel="noopener noreferrer"
              target="_blank"
              className="grid size-9 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        {/* Shop */}
        <FooterColumn title="Shop">
          <FooterLink to="/collections">All collections</FooterLink>
          <FooterLink to="/collections/all">Shop all products</FooterLink>
          <FooterLink to="/search">Search</FooterLink>
          <FooterLink to="/account">Account</FooterLink>
        </FooterColumn>

        {/* Learn */}
        <FooterColumn title="Learn">
          <FooterLink to="/blogs">Journal &amp; guides</FooterLink>
          <FooterLink to="/policies">Policies</FooterLink>
        </FooterColumn>

        {/* Help / dynamic Storefront menu + newsletter */}
        <div>
          <Suspense fallback={null}>
            <Await resolve={footerPromise}>
              {(footer) =>
                footer?.menu && header.shop.primaryDomain?.url ? (
                  <FooterColumn title="Help">
                    <FooterMenu
                      menu={footer.menu}
                      primaryDomainUrl={header.shop.primaryDomain.url}
                      publicStoreDomain={publicStoreDomain}
                    />
                  </FooterColumn>
                ) : null
              }
            </Await>
          </Suspense>

          {/* Newsletter — TODO (Stage 7): wire to Shopify customer/marketing */}
          <form
            className="mt-6"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter signup"
          >
            <p className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-gold">
              Stay in the loop
            </p>
            <div className="mt-3 flex overflow-hidden rounded-full bg-cream/10 p-1">
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-4 text-[14px] text-cream placeholder:text-cream/50 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-gold px-5 py-2 text-[13px] font-extrabold text-brand transition-colors hover:bg-gold-soft"
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-2 px-[clamp(20px,4vw,60px)] py-5 text-[13px] text-cream/60 sm:flex-row">
          <p>
            © {shopName} · Australia
          </p>
          <p>Secure checkout · Powered by Shopify</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-gold">
        {title}
      </p>
      <nav className="mt-4 flex flex-col gap-3" role="navigation">
        {children}
      </nav>
    </div>
  );
}

function FooterLink({to, children}: {to: string; children: React.ReactNode}) {
  return (
    <NavLink
      to={to}
      prefetch="intent"
      className="w-fit text-[14px] text-cream/75 transition-colors hover:text-cream"
    >
      {children}
    </NavLink>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: NonNullable<FooterQuery['menu']>;
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <>
      {menu.items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a
            href={url}
            key={item.id}
            rel="noopener noreferrer"
            target="_blank"
            className="w-fit text-[14px] text-cream/75 transition-colors hover:text-cream"
          >
            {item.title}
          </a>
        ) : (
          <FooterLink key={item.id} to={url}>
            {item.title}
          </FooterLink>
        );
      })}
    </>
  );
}
