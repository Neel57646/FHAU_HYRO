import {Link} from 'react-router';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      {label: 'Lick Mats', to: '/collections/all'},
      {label: 'Snuffle Mats', to: '/collections/all'},
      {label: 'Slow Feeders', to: '/collections/all'},
      {label: 'Bundles', to: '/collections/all'},
    ],
  },
  {
    title: 'About',
    links: [
      {label: 'Our Story', to: '/pages/about'},
      {label: 'Enrichment 101', to: '/blogs/journal'},
      {label: 'Sustainability', to: '/pages/about'},
    ],
  },
  {
    title: 'Support',
    links: [
      {label: 'Shipping', to: '/policies'},
      {label: 'Returns', to: '/policies'},
      {label: 'Contact', to: '/pages/about'},
      {label: 'FAQ', to: '/pages/about'},
    ],
  },
  {
    title: 'Connect',
    links: [
      {label: 'Instagram', to: 'https://instagram.com'},
      {label: 'TikTok', to: 'https://tiktok.com'},
      {label: 'Newsletter', to: '#newsletter'},
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-earth-900 text-cream-100">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-cream-400">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm font-light text-cream-100/80 transition-colors hover:text-cream-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 h-px w-full bg-cream-100/15" />

        <div className="mt-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <span className="font-serif text-lg font-medium tracking-tight">
            Furever Happy
          </span>
          <p className="text-xs font-light text-cream-100/60">
            © {new Date().getFullYear()} Furever Happy. Designed in Melbourne.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-cream-100/70 transition-colors hover:text-cream-50"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://tiktok.com"
              aria-label="TikTok"
              className="text-cream-100/70 transition-colors hover:text-cream-50"
            >
              <TikTokIcon />
            </a>
            <span className="ml-2 flex gap-1.5 text-[0.6rem] font-light uppercase tracking-wider text-cream-100/50">
              <span>Visa</span>
              <span>·</span>
              <span>MC</span>
              <span>·</span>
              <span>Amex</span>
              <span>·</span>
              <span>PayPal</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path
        d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5M14 7c.8 1.4 2.3 2.4 4 2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
