import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingCart, Download } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { navLinks } from '@/config/business';
import { businessSettings } from '@/config/business';
import { useCart } from '@/context/CartContext';

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-md transition-shadow ${
          scrolled ? 'shadow-soft' : ''
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link to="/" className="shrink-0" aria-label="Synergy Seeds home">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-forest-50 text-forest-700'
                    : 'text-charcoal hover:bg-botanical hover:text-forest-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to="/catalogue"
              className="btn-ghost text-sm"
            >
              <Download className="h-4 w-4" />
              Catalogue
            </Link>
            <Link to="/cart" className="relative btn-ghost" aria-label={`Cart with ${itemCount} items`}>
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-400 px-1 text-[10px] font-bold text-forest-900">
                  {itemCount}
                </span>
              )}
            </Link>
            <a
              href={`tel:${businessSettings.phone.replace(/\s/g, '')}`}
              className="btn-primary text-sm"
            >
              <Phone className="h-4 w-4" />
              {businessSettings.phone}
            </a>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/cart" className="relative btn-ghost p-2" aria-label={`Cart with ${itemCount} items`}>
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-400 px-1 text-[10px] font-bold text-forest-900">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="btn-ghost p-2"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="lg:hidden">
            <div className="border-t border-forest-100 bg-cream">
              <nav className="container-page flex flex-col gap-1 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-forest-50 text-forest-700'
                        : 'text-charcoal hover:bg-botanical'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/catalogue" className="rounded-lg px-4 py-3 text-base font-medium text-charcoal hover:bg-botanical">
                  Download Catalogue
                </Link>
                <a
                  href={`tel:${businessSettings.phone.replace(/\s/g, '')}`}
                  className="btn-primary mt-2 w-full"
                >
                  <Phone className="h-4 w-4" />
                  {businessSettings.phone}
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
