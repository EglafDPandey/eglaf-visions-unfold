import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link, useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import { ArrowLeft, Globe, Palette, Code, Zap, Lock, Gauge, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO, schemas, faqSchema } from '@/components/SEO';
import { SpaceBackground } from '@/components/SpaceBackground';

const technologies = [
  {
    name: 'React',
    description: 'Modern UI library for building interactive web apps',
    color: 'from-[#61DAFB] to-[#00D8FF]',
  },
  {
    name: 'Next.js',
    description: 'Full-stack React framework with SSR/SSG support',
    color: 'from-[#000000] to-[#434343]',
  },
  {
    name: 'Vue.js',
    description: 'Progressive framework for versatile web development',
    color: 'from-[#42B883] to-[#35495E]',
  },
  {
    name: 'Node.js',
    description: 'JavaScript runtime for scalable backend services',
    color: 'from-[#339933] to-[#68A063]',
  },
  {
    name: 'TypeScript',
    description: 'Type-safe JavaScript for robust applications',
    color: 'from-[#3178C6] to-[#235A97]',
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid styling',
    color: 'from-[#06B6D4] to-[#0284C7]',
  },
];

const features = [
  { icon: Palette, title: 'Beautiful Design', description: 'Stunning visuals that captivate users' },
  { icon: Zap, title: 'Fast Performance', description: 'Optimized for speed and efficiency' },
  { icon: Lock, title: 'Secure', description: 'Built with security best practices' },
  { icon: Gauge, title: 'SEO Optimized', description: 'Rank higher in search results' },
];

const webDevFaqs = [
  {
    question: 'How much does web development cost in India?',
    answer: 'Web development costs in India range from $2,000 for basic websites to $50,000+ for complex web applications. Factors include features, design complexity, and timeline. Contact us for a free quote.',
  },
  {
    question: 'How long does it take to build a website?',
    answer: 'A simple website takes 2-4 weeks, while complex web applications may take 3-6 months. Timeline depends on features, design requirements, and content availability.',
  },
  {
    question: 'Which technologies do you use for web development?',
    answer: 'We use modern technologies including React, Next.js, Vue.js, Node.js, TypeScript, and Tailwind CSS. We choose the best tech stack based on your project requirements.',
  },
  {
    question: 'Do you provide website maintenance and support?',
    answer: 'Yes, we offer comprehensive maintenance packages including updates, security patches, performance optimization, and 24/7 support.',
  },
];

export default function WebDevelopment() {
  const heroRef = useRef(null);
  const techRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isTechInView = useInView(techRef, { once: true, margin: '-100px' });
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetQuote = () => {
    navigate({
      pathname: '/quote',
      search: `?${createSearchParams({
        service: 'Web Development',
        from: location.pathname + location.search,
      }).toString()}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Web Development Services - Custom Website Development Company India"
        description="Professional web development services in India. Custom React, Next.js, Vue.js websites. Responsive design, SEO-optimized, fast-loading websites. 500+ websites delivered. Get free quote!"
        keywords="web development company India, custom website development, React development services, Next.js development, Vue.js developers, responsive web design, ecommerce website development, WordPress development, web application development, frontend development services, full stack development India"
        canonical="https://eglaftechnology.com/services/web-development"
        schema={[
          schemas.service({
            name: 'Professional Web Development Services',
            description: 'Custom web development services in India. We build responsive, SEO-optimized websites using React, Next.js, Vue.js. From landing pages to complex web applications.',
            url: 'https://eglaftechnology.com/services/web-development',
          }),
          schemas.breadcrumb([
            { name: 'Home', url: 'https://eglaftechnology.com/' },
            { name: 'Services', url: 'https://eglaftechnology.com/#services' },
            { name: 'Web Development', url: 'https://eglaftechnology.com/services/web-development' },
          ]),
          faqSchema(webDevFaqs),
        ]}
      />
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-secondary p-0.5">
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <Globe className="w-8 h-8 text-accent" />
                </div>
              </div>
              <span className="px-4 py-2 rounded-full glass-card text-sm text-accent font-medium">
                Web Development
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Website{' '}
              <span className="gradient-text">Development</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Create stunning, high-performance websites that engage users and drive 
              conversions. From landing pages to complex web applications, we deliver 
              exceptional digital experiences.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={handleGetQuote}>
                <FileText className="w-4 h-4 mr-2" />
                Get Quote
              </Button>
              <Button variant="outline" size="lg" onClick={handleGetQuote}>
                <Code className="w-4 h-4 mr-2" />
                Start Your Project
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: '0 20px 40px -15px hsl(var(--accent) / 0.3)'
                }}
                className="glass-card p-6 text-center hover:border-accent/50 transition-colors relative group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center mx-auto mb-4 relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-7 h-7 text-accent" />
                </motion.div>
                <h3 className="font-display font-semibold text-foreground mb-2 relative">{feature.title}</h3>
                <p className="text-sm text-muted-foreground relative">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section ref={techRef} className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTechInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-accent font-medium mb-6">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Modern{' '}
              <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We use the latest web technologies to build fast, scalable, and maintainable applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isTechInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`} />
                <div className="glass-card-hover p-8 relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} p-0.5 mb-6`}>
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                      <span className="font-display font-bold text-xl text-foreground">
                        {tech.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-muted-foreground">{tech.description}</p>
                </div>
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
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to Build Your Website?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's create a digital presence that sets you apart from the competition.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Get Free Quote
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
