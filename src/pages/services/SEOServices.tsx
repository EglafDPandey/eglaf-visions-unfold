import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, TrendingUp, Target, BarChart3, Globe, Zap, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SpaceBackground } from '@/components/SpaceBackground';

const services = [
  {
    name: 'Technical SEO',
    description: 'Site speed, mobile optimization, and crawlability improvements',
    icon: Zap,
    color: 'from-primary to-accent',
  },
  {
    name: 'On-Page SEO',
    description: 'Content optimization, meta tags, and internal linking strategies',
    icon: Target,
    color: 'from-accent to-secondary',
  },
  {
    name: 'Off-Page SEO',
    description: 'Link building, brand mentions, and authority development',
    icon: Globe,
    color: 'from-secondary to-primary',
  },
  {
    name: 'Local SEO',
    description: 'Google Business Profile, local citations, and reviews management',
    icon: Search,
    color: 'from-primary to-secondary',
  },
  {
    name: 'Content Strategy',
    description: 'Keyword research, content planning, and topic clustering',
    icon: BarChart3,
    color: 'from-accent to-primary',
  },
  {
    name: 'Analytics & Reporting',
    description: 'Performance tracking, insights, and data-driven recommendations',
    icon: TrendingUp,
    color: 'from-secondary to-accent',
  },
];

export default function SEOServices() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isServicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate('/contact?service=SEO Services&subject=Quote Request: SEO Services');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden">
        <SpaceBackground />
        
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/#services">
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary p-0.5">
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <Search className="w-8 h-8 text-accent" />
                </div>
              </div>
              <span className="px-4 py-2 rounded-full glass-card text-sm text-accent font-medium">
                SEO Services
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              SEO{' '}
              <span className="gradient-text">Services</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Boost your online visibility and drive organic traffic with our comprehensive 
              SEO strategies. We help businesses rank higher and attract quality leads 
              through proven optimization techniques.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={handleGetQuote}>
                <FileText className="w-4 h-4 mr-2" />
                Get Quote
              </Button>
              <Button variant="outline" size="lg" onClick={handleGetQuote}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Get SEO Audit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-20 right-20 w-24 h-24 border border-accent/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-16 h-16 border border-primary/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-accent font-medium mb-6">
              Our SEO Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Comprehensive SEO{' '}
              <span className="gradient-text">Solutions</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 50, rotateY: -10 }}
                animate={isServicesInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.02,
                  boxShadow: '0 25px 50px -15px hsl(var(--accent) / 0.25)'
                }}
                className="group glass-card-hover p-8 relative overflow-hidden"
              >
                {/* Animated background glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                <motion.div 
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} p-0.5 mb-6 relative`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                </motion.div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-accent transition-colors relative">
                  {service.name}
                </h3>
                <p className="text-muted-foreground relative">{service.description}</p>
                
                {/* Decorative corner accent */}
                <motion.div
                  className={`absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 rounded-tl-full transition-opacity duration-500`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to Dominate Search Results?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get a free SEO audit and discover opportunities to grow your organic traffic.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Get Free SEO Audit
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
