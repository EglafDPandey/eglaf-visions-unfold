import { motion } from 'framer-motion';
import { Link, useLocation, createSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { lazy, Suspense, useState, useEffect, useRef, useCallback } from 'react';

// Lazy load the heavy 3D scene to improve FCP
const HeroScene = lazy(() => import('./HeroScene'));

// Preload QuoteRequest page for faster navigation
const preloadQuoteRequest = () => import('@/pages/QuoteRequest');

// Simple gradient fallback while 3D loads
function HeroSceneFallback() {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/10" />
  );
}

export function HeroSection() {
  const location = useLocation();
  const quoteTo = {
    pathname: '/quote',
    search: `?${createSearchParams({ from: location.pathname + location.search }).toString()}`,
  };

  // Track visibility to pause 3D animations when not in view
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  
  // Delay loading the 3D scene until after initial paint
  const [showScene, setShowScene] = useState(false);
  
  useEffect(() => {
    // Wait for initial content to fully paint before loading heavy 3D
    // This improves Speed Index by prioritizing visible content
    const timer = setTimeout(() => {
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => setShowScene(true), { timeout: 3000 });
      } else {
        setShowScene(true);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Use Intersection Observer to pause 3D when not visible
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background - lazy loaded, pauses when not visible */}
      {showScene ? (
        <Suspense fallback={<HeroSceneFallback />}>
          <HeroScene isVisible={isVisible} />
        </Suspense>
      ) : (
        <HeroSceneFallback />
      )}
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 z-10" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-primary font-medium">
              <Sparkles className="w-4 h-4" />
              Innovative Technology Solutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
          >
            Building the{' '}
            <span className="gradient-text">Future</span>
            <br />
            of Digital Innovation
          </motion.h1>

          {/* LCP element - minimal delay for fast paint */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Eglaf Technology LLP delivers cutting-edge mobile apps, web solutions, 
            AI agents, and enterprise software that transform your business vision into reality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to={quoteTo} onMouseEnter={preloadQuoteRequest} onFocus={preloadQuoteRequest}>
              <Button variant="hero" size="xl" className="group">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="glass" size="xl">
                View Our Work
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {[
              { value: '35+', label: 'Projects Delivered' },
              { value: '21+', label: 'Happy Clients' },
              { value: '14+', label: 'Expert Developers' },
              { value: '10+', label: 'Years Experience' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
