import { useState, useEffect, forwardRef } from 'react';
import { Link, useLocation, createSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import eglafLogo from '@/assets/eglaf-logo.png';

const navItems = [
  { name: 'Home', href: '/', isHash: false },
  { name: 'Services', href: '#services', isHash: true },
  { name: 'Portfolio', href: '/portfolio', isHash: false },
  { name: 'About', href: '/about', isHash: false },
  { name: 'Blog', href: '/blog', isHash: false },
  { name: 'Contact', href: '/contact', isHash: false },
];

export const Navbar = forwardRef<HTMLElement, object>(function Navbar(_props, ref) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const quoteTo = {
    pathname: '/quote',
    search: `?${createSearchParams({ from: location.pathname + location.search }).toString()}`,
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <motion.nav
      ref={ref}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-card py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={eglafLogo} 
              alt="Eglaf Technology" 
              width={255}
              height={98}
              className="h-14 md:h-16 lg:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
              fetchPriority="high"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            item.isHash ? (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={{ pathname: '/', hash: item.href }}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            )
          ))}
        </div>

        <div className="hidden md:block">
          <Link to={quoteTo}>
            <Button variant="hero" size="lg">
              Get Quote
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navItems.map((item) => (
                item.isHash ? (
                  <Link
                    key={item.name}
                    to={{ pathname: '/', hash: item.href }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Link to={quoteTo} onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="hero" className="mt-2 w-full">
                  Get Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

export default Navbar;
