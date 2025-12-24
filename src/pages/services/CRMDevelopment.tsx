import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link, useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import { ArrowLeft, Database, Users, BarChart3, Settings, Shield, Cloud, Puzzle, LineChart, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SpaceBackground } from '@/components/SpaceBackground';

const technologies = [
  {
    name: 'Salesforce',
    description: 'World\'s leading CRM platform customization and integration',
    color: 'from-[#00A1E0] to-[#0070D2]',
    icon: Cloud,
  },
  {
    name: 'HubSpot',
    description: 'Inbound marketing and sales platform development',
    color: 'from-[#FF7A59] to-[#FF5C35]',
    icon: BarChart3,
  },
  {
    name: 'Microsoft Dynamics',
    description: 'Enterprise-grade CRM solutions on Microsoft stack',
    color: 'from-[#0078D4] to-[#00BCF2]',
    icon: Puzzle,
  },
  {
    name: 'Zoho CRM',
    description: 'Flexible CRM customization for growing businesses',
    color: 'from-[#E42527] to-[#FF6B6B]',
    icon: Settings,
  },
  {
    name: 'Custom CRM',
    description: 'Bespoke CRM solutions built from the ground up',
    color: 'from-primary to-accent',
    icon: Database,
  },
  {
    name: 'Analytics Suite',
    description: 'Advanced reporting and business intelligence tools',
    color: 'from-[#7C3AED] to-[#A855F7]',
    icon: LineChart,
  },
];

const features = [
  { icon: Users, title: 'Contact Management', description: 'Centralized customer data management' },
  { icon: BarChart3, title: 'Sales Pipeline', description: 'Visual deal tracking and forecasting' },
  { icon: Settings, title: 'Automation', description: 'Workflow automation and triggers' },
  { icon: Shield, title: 'Data Security', description: 'Enterprise-grade data protection' },
];

export default function CRMDevelopment() {
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
        service: 'CRM Development',
        from: location.pathname + location.search,
      }).toString()}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden">
        <SpaceBackground />
        
        {/* Additional animated grid overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"
              style={{ top: `${15 + i * 12}%` }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent h-full"
              style={{ left: `${15 + i * 12}%` }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary p-0.5">
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <Database className="w-8 h-8 text-primary" />
                </div>
              </div>
              <span className="px-4 py-2 rounded-full glass-card text-sm text-primary font-medium">
                CRM Development
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              CRM{' '}
              <span className="gradient-text">Development</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Transform customer relationships with powerful CRM solutions. We build and 
              customize CRM systems that streamline sales, improve customer service, and 
              provide actionable insights for business growth.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={handleGetQuote}>
                <FileText className="w-4 h-4 mr-2" />
                Get Quote
              </Button>
              <Button variant="outline" size="lg" onClick={handleGetQuote}>
                <Database className="w-4 h-4 mr-2" />
                Build Your CRM
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
                  boxShadow: '0 20px 40px -15px hsl(var(--primary) / 0.3)'
                }}
                className="glass-card p-6 text-center hover:border-primary/50 transition-colors relative group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="font-display font-semibold text-foreground mb-2 relative">{feature.title}</h3>
                <p className="text-sm text-muted-foreground relative">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Showcase */}
      <section ref={techRef} className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTechInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6">
              CRM Platforms
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Platforms We{' '}
              <span className="gradient-text">Specialize In</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From industry-leading platforms to custom solutions, we deliver CRM excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, rotateX: -30 }}
                animate={isTechInView ? { opacity: 1, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group relative perspective-1000"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`} />
                <div className="glass-card-hover p-8 relative">
                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${tech.color} opacity-10 rounded-bl-full`} />
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} p-0.5 mb-6`}>
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                      <tech.icon className="w-8 h-8 text-foreground" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-muted-foreground">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to Optimize Customer Relations?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's build a CRM solution that perfectly fits your business needs.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Get CRM Consultation
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
