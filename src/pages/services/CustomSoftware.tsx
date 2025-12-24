import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Code2, Server, Cloud, Shield, Workflow, Settings, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SpaceBackground } from '@/components/SpaceBackground';

const technologies = [
  { name: '.NET Core', description: 'Enterprise-grade Microsoft framework', color: 'from-[#512BD4] to-[#68217A]' },
  { name: 'Java Spring', description: 'Robust backend development framework', color: 'from-[#6DB33F] to-[#4A8B2C]' },
  { name: 'Python Django', description: 'Rapid development with Python', color: 'from-[#092E20] to-[#0C4B33]' },
  { name: 'AWS', description: 'Cloud infrastructure and services', color: 'from-[#FF9900] to-[#232F3E]' },
  { name: 'Docker', description: 'Containerization for deployments', color: 'from-[#2496ED] to-[#003F8C]' },
  { name: 'Kubernetes', description: 'Container orchestration at scale', color: 'from-[#326CE5] to-[#1D4899]' },
];

const services = [
  { icon: Code2, title: 'Enterprise Applications', description: 'Large-scale business software solutions' },
  { icon: Cloud, title: 'Cloud Solutions', description: 'Scalable cloud-native applications' },
  { icon: Server, title: 'API Development', description: 'Robust API design and integration' },
  { icon: Workflow, title: 'Process Automation', description: 'Streamline business workflows' },
];

export default function CustomSoftware() {
  const heroRef = useRef(null);
  const techRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isTechInView = useInView(techRef, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate('/contact?service=Custom Software Development&subject=Quote Request: Custom Software Development');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent p-0.5">
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <Code2 className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <span className="px-4 py-2 rounded-full glass-card text-sm text-secondary font-medium">
                Custom Software
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Custom Software{' '}
              <span className="gradient-text">Development</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Bespoke enterprise solutions designed to streamline your operations and 
              accelerate growth. We build software that perfectly fits your unique 
              business requirements.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={handleGetQuote}>
                <FileText className="w-4 h-4 mr-2" />
                Get Quote
              </Button>
              <Button variant="outline" size="lg" onClick={handleGetQuote}>
                <Settings className="w-4 h-4 mr-2" />
                Discuss Your Project
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: '0 20px 40px -15px hsl(var(--secondary) / 0.3)'
                }}
                className="glass-card p-6 text-center hover:border-secondary/50 transition-colors relative group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon className="w-7 h-7 text-secondary" />
                </motion.div>
                <h3 className="font-display font-semibold text-foreground mb-2 relative">{service.title}</h3>
                <p className="text-sm text-muted-foreground relative">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section ref={techRef} className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTechInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Enterprise{' '}
              <span className="gradient-text">Technologies</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isTechInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group glass-card-hover p-8"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} p-0.5 mb-6`}>
                  <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                    <span className="font-display font-bold text-xl text-foreground">{tech.name.charAt(0)}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                  {tech.name}
                </h3>
                <p className="text-muted-foreground">{tech.description}</p>
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
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Need Custom Software?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss your requirements and build the perfect solution for your business.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Get Free Consultation
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
