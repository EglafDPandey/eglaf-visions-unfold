import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Smartphone, Zap, Shield, Layers, Code2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const technologies = [
  {
    name: 'Flutter',
    description: 'Google\'s UI toolkit for building natively compiled applications',
    color: 'from-[#02569B] to-[#13B9FD]',
  },
  {
    name: 'React Native',
    description: 'Meta\'s framework for building native apps using React',
    color: 'from-[#61DAFB] to-[#21232A]',
  },
  {
    name: 'Swift',
    description: 'Apple\'s powerful language for iOS development',
    color: 'from-[#F05138] to-[#FFA648]',
  },
  {
    name: 'Kotlin',
    description: 'Modern language for Android app development',
    color: 'from-[#7F52FF] to-[#C711E1]',
  },
  {
    name: 'Ionic',
    description: 'Cross-platform mobile development framework',
    color: 'from-[#3880FF] to-[#5260FF]',
  },
  {
    name: 'Xamarin',
    description: 'Microsoft\'s platform for .NET mobile apps',
    color: 'from-[#3498DB] to-[#9B59B6]',
  },
];

const features = [
  { icon: Zap, title: 'Lightning Fast', description: 'Optimized performance for smooth user experiences' },
  { icon: Shield, title: 'Secure', description: 'Enterprise-grade security implementations' },
  { icon: Layers, title: 'Scalable', description: 'Architecture designed for growth' },
  { icon: Code2, title: 'Clean Code', description: 'Maintainable and well-documented codebase' },
];

export default function MobileAppDevelopment() {
  const heroRef = useRef(null);
  const techRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isTechInView = useInView(techRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent p-0.5">
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
              </div>
              <span className="px-4 py-2 rounded-full glass-card text-sm text-primary font-medium">
                Mobile Development
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Mobile App{' '}
              <span className="gradient-text">Development</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              We build stunning, high-performance mobile applications for iOS and Android 
              that delight users and drive business growth. Our expert team leverages the 
              latest technologies to create apps that stand out in the marketplace.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg">
                <Rocket className="w-4 h-4 mr-2" />
                Start Your Project
              </Button>
              <Button variant="outline" size="lg">
                View Case Studies
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 text-center hover:border-primary/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
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
              Our Tech Stack
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Technologies We{' '}
              <span className="gradient-text">Master</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We use cutting-edge technologies to build world-class mobile applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
                animate={isTechInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
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
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-muted-foreground">{tech.description}</p>
                  
                  {/* Animated border */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${tech.color} rounded-b-2xl`}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
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
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to Build Your Mobile App?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss your project and create something amazing together.
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
