import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Smartphone, Zap, Shield, Layers, Code2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SpaceBackground } from '@/components/SpaceBackground';

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
                {/* Glow effect on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4 relative"
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
      <section className="py-24 relative overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl"
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 text-center relative overflow-hidden group"
          >
            {/* Animated gradient background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 border border-primary/20 rounded-2xl"
              animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="relative z-10">
              <motion.h2 
                className="text-3xl md:text-4xl font-display font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Ready to Build Your Mobile App?
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Let's discuss your project and create something amazing together.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="relative overflow-hidden group/btn">
                    <span className="relative z-10">Get Free Consultation</span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      style={{ opacity: 0.3 }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
