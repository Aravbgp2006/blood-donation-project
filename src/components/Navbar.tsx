import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Shield } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Register as Donor', path: '/register' },
    { name: 'Request Blood', path: '/request' },
    { name: 'Find Donors', path: '/search' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-white/80 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Heart className="w-8 h-8 text-primary-600 fill-primary-500 transition-transform group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
            </div>
            <span className="text-2xl font-bold text-secondary-900">
              Blood<span className="text-primary-600">Life</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-secondary-700 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="ml-4 px-4 py-2 bg-secondary-900 text-white rounded-lg text-sm font-medium hover:bg-secondary-800 transition-all duration-200 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Admin
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-secondary-700" />
            ) : (
              <Menu className="w-6 h-6 text-secondary-700" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-slide-down">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary-600 text-white'
                      : 'text-secondary-700 hover:bg-primary-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin"
                className="px-4 py-3 bg-secondary-900 text-white rounded-lg text-sm font-medium hover:bg-secondary-800 transition-all flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
