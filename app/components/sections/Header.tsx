import {useState} from 'react';
import {Link} from 'react-router';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import {EASE} from './motion';

const NAV_LINKS = [
  {label: 'Shop', to: '/collections/all'},
  {label: 'Collections', to: '/collections'},
  {label: 'Journal', to: '/blogs/journal'},
  {label: 'About', to: '/pages/about'},
];

interface HeaderProps {
  cartCount?: number;
}

export function Header({cartCount = 2}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const {scrollY} = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <motion.header
      className="sticky top-0 z-50"
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(255,251,247,0.85)' : 'rgba(255,251,247,0)',
        boxShadow: scrolled
          ? '0 1px 0 rgba(67,58,36,0.08), 0 8px 24px -16px rgba(67,58,36,0.25)'
          : '0 0 0 rgba(0,0,0,0)',
      }}
      transition={{duration: 0.4, ease: EASE}}
      style={{backdropFilter: scrolled ? 'blur(10px)' : 'none'}}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        {/* Wordmark */}
        <Link
          to="/"
          className="font-serif text-xl font-medium tracking-tight text-earth-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
        >
          Furever Happy
        </Link>

        {/* Center nav */}
        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="group relative text-sm font-light tracking-wide text-earth-800 transition-colors hover:text-earth-900 focus-visible:outline-none"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-terracotta transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-5 text-earth-900">
          <button
            type="button"
            aria-label="Search"
            className="transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
          >
            <SearchIcon />
          </button>
          <Link
            to="/account"
            aria-label="Account"
            className="hidden transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta sm:block"
          >
            <UserIcon />
          </Link>
          <Link
            to="/cart"
            aria-label={`Cart, ${cartCount} items`}
            className="relative transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
          >
            <BagIcon />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta px-1 text-[0.6rem] font-medium text-cream-50">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="md:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-cream-50 md:hidden"
            initial={reduceMotion ? {opacity: 0} : {x: '100%'}}
            animate={reduceMotion ? {opacity: 1} : {x: 0}}
            exit={reduceMotion ? {opacity: 0} : {x: '100%'}}
            transition={{duration: 0.5, ease: EASE}}
          >
            <div className="flex items-center justify-between px-4 py-5">
              <span className="font-serif text-xl font-medium tracking-tight text-earth-900">
                Furever Happy
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="text-earth-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
              >
                <CloseIcon />
              </button>
            </div>
            <motion.ul
              className="flex flex-col px-4 pt-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {transition: {staggerChildren: 0.08, delayChildren: 0.15}},
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.label}
                  variants={{
                    hidden: reduceMotion ? {opacity: 0} : {opacity: 0, y: 20},
                    visible: {opacity: 1, y: 0},
                  }}
                  transition={{duration: 0.5, ease: EASE}}
                  className="border-b border-earth-200/60"
                >
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="block py-5 font-serif text-3xl font-light text-earth-900"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8a3 3 0 0 1 6 0" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M4 8h16M4 16h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}
