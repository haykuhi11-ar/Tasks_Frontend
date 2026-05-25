import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navLinks = [
  {
    label: 'Home',
    href: '/',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Add',
    href: '/add-product',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    label: 'About',
    href: '/about',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
      </svg>
    ),
  },
];

export const Layout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>

      <header
        className={`nav-font fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? 'bg-emerald-950/95 backdrop-blur-md shadow-[0_1px_32px_rgba(16,185,129,0.15)] border-b border-emerald-800'
            : 'bg-emerald-950 border-b border-emerald-900'
          }`}
      >
        {/* Top accent strip */}
        <div className="h-[3px] bg-gradient-to-r from-emerald-400 via-orange-400 to-emerald-400" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="logo-font flex items-center gap-2.5 group">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500 group-hover:bg-emerald-400 shadow-lg shadow-emerald-900/50 transition-all duration-300">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.25c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-light text-orange-400 tracking-[0.18em] uppercase" style={{ fontFamily: 'Lato, sans-serif' }}>Bookstore</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`ink-line flex items-center gap-1.5 text-[13px] tracking-wide transition-colors duration-200
                    ${active
                      ? 'active text-orange-400 font-semibold'
                      : 'text-emerald-200 hover:text-white font-light'
                    }`}
                >
                  <span className={`transition-colors ${active ? 'text-orange-400' : 'text-emerald-500'}`}>
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md shadow-emerald-900/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              Login
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 text-emerald-300 hover:text-white hover:bg-emerald-800 rounded-lg transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden menu-in bg-emerald-950 border-t border-emerald-800">
            <div className="max-w-6xl mx-auto px-5 py-3 flex flex-col gap-1">
              {navLinks.map(link => {
                const active = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-colors
                      ${active
                        ? 'bg-emerald-800 text-orange-400 font-medium'
                        : 'text-emerald-200 hover:bg-emerald-900 hover:text-white'
                      }`}
                  >
                    <span className={active ? 'text-orange-400' : 'text-emerald-500'}>
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-2 pt-2 border-t border-emerald-800">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 py-2.5 w-full text-[13px] font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                >
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="h-[67px]" />

      <div>
        <Outlet />
      </div>
    </>
  );
};