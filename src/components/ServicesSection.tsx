import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Globe, 
  Bot, 
  Search, 
  Database, 
  Code2,
  ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Custom iOS and Android applications built with React Native and native technologies for seamless user experiences.',
    gradient: 'from-primary to-accent',
    href: '/services/mobile-development',
  },
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Modern, responsive websites and web applications using cutting-edge frameworks and technologies.',
    gradient: 'from-accent to-secondary',
    href: '/services/web-development',
  },
  {
    icon: Bot,
    title: 'AI Agents Development',
    description: 'Intelligent automation solutions powered by advanced AI and machine learning for business optimization.',
    gradient: 'from-secondary to-primary',
    href: '/services/ai-solutions',
  },
  {
    icon: Database,
    title: 'CRM Development',
    description: 'Custom CRM solutions tailored to your business needs, enhancing customer relationships and sales.',
    gradient: 'from-primary to-secondary',
    href: '/services/crm-development',
  },
  {
    icon: Search,
    title: 'SEO Services',
    description: 'Data-driven SEO strategies that boost your online visibility and drive organic traffic growth.',
    gradient: 'from-accent to-primary',
    href: '/services/seo-services',
  },
  {
    icon: Code2,
    title: 'Custom Software',
    description: 'Bespoke enterprise solutions designed to streamline operations and accelerate growth.',
    gradient: 'from-secondary to-accent',
    href: '/services/custom-software',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <Link to={service.href}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group glass-card-hover p-6 md:p-8 cursor-pointer h-full"
      >
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6`}>
          <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
            <service.icon className="w-7 h-7 text-primary" />
          </div>
        </div>
        
        <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {service.description}
        </p>
        
        <div className="flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>
    </Link>
  );
}

export function ServicesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10" ref={sectionRef}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6"
          >
            Our Services
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
          >
            Transforming Ideas into{' '}
            <span className="gradient-text">Digital Reality</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            We deliver end-to-end technology solutions that help businesses innovate, 
            scale, and succeed in the digital age.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
