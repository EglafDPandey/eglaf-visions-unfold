import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Lightbulb, Users, Award, TrendingUp, Calendar, CheckCircle, Sparkles, Rocket, Heart, Globe } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';

const milestones = [
  { year: '2014', title: 'Company Founded', description: 'Started with a vision to transform digital landscapes', icon: Rocket },
  { year: '2016', title: 'First Major Client', description: 'Partnered with Fortune 500 company', icon: Award },
  { year: '2018', title: 'Global Expansion', description: 'Opened offices in 3 new countries', icon: Globe },
  { year: '2020', title: 'AI Division Launch', description: 'Launched dedicated AI solutions team', icon: Sparkles },
  { year: '2022', title: '500+ Projects', description: 'Milestone of 500 successful projects', icon: TrendingUp },
  { year: '2024', title: 'Industry Leader', description: 'Recognized as top tech solutions provider', icon: Heart },
];

const stats = [
  { value: '10+', label: 'Years Experience', icon: Calendar },
  { value: '35+', label: 'Projects Delivered', icon: CheckCircle },
  { value: '21+', label: 'Happy Clients', icon: Users },
  { value: '14+', label: 'Expert Developers', icon: Award },
];

const values = [
  { icon: Target, title: 'Mission', desc: 'Empower businesses with innovative technology solutions', color: 'from-blue-500 to-cyan-500' },
  { icon: Eye, title: 'Vision', desc: 'Be the leading technology partner globally', color: 'from-purple-500 to-pink-500' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Push boundaries with cutting-edge solutions', color: 'from-orange-500 to-yellow-500' },
  { icon: Users, title: 'Partnership', desc: 'Build lasting relationships with clients', color: 'from-green-500 to-emerald-500' },
];

function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">
        Our <span className="gradient-text">Journey</span>
      </h2>
      
      {/* Animated timeline line */}
      <div className="absolute left-1/2 top-24 bottom-0 w-1 bg-muted/30 -translate-x-1/2">
        <motion.div 
          className="w-full bg-gradient-to-b from-primary via-secondary to-accent"
          style={{ height: lineHeight }}
        />
      </div>
      
      <div className="space-y-12">
        {milestones.map((m, i) => {
          const isLeft = i % 2 === 0;
          return (
            <MilestoneCard key={m.year} milestone={m} index={i} isLeft={isLeft} />
          );
        })}
      </div>
    </div>
  );
}

function MilestoneCard({ milestone, index, isLeft }: { milestone: typeof milestones[0]; index: number; isLeft: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
        <motion.div 
          className="glass-card p-6 inline-block group cursor-pointer relative overflow-hidden"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2" style={{ justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
              <milestone.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-primary font-bold text-lg">{milestone.year}</span>
            </div>
            <div className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{milestone.title}</div>
            <div className="text-sm text-muted-foreground">{milestone.description}</div>
          </div>
        </motion.div>
      </div>
      
      {/* Center dot with pulse animation */}
      <motion.div 
        className="relative z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
      >
        <div className="w-5 h-5 rounded-full bg-primary shadow-lg shadow-primary/50">
          <motion.div
            className="absolute inset-0 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          />
        </div>
      </motion.div>
      
      <div className="flex-1" />
    </motion.div>
  );
}

export default function About() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <SEO 
        title="About Us - Leading Software Development Company India"
        description="About Eglaf Technology - Premier software development company in Ahmedabad, India since 2014. 10+ years experience, 500+ projects delivered, 50+ expert developers. Learn about our mission, vision, and journey."
        keywords="about Eglaf Technology, software company India, IT company Ahmedabad, technology company history, software development firm, tech startup India, Eglaf Technology team, company profile"
        canonical="https://eglaftechnology.com/about"
      />
      <Navbar />
      
      <section className="pt-32 pb-20 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, 50, 0], 
              y: [0, 30, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, -40, 0], 
              y: [0, -20, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Section */}
          <motion.div 
            ref={heroRef}
            initial={{ opacity: 0, y: 50 }} 
            animate={heroInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <motion.span 
              className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6"
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="inline w-4 h-4 mr-2" />
              About Us
            </motion.span>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              We Are <span className="gradient-text">Eglaf Technology</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              A forward-thinking technology company transforming businesses through innovative digital solutions since 2014.
            </motion.p>
          </motion.div>

          {/* Stats with staggered animation */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, y: 40, scale: 0.9 }} 
                animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}} 
                transition={{ delay: i * 0.15, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="glass-card p-6 text-center group cursor-pointer relative overflow-hidden"
              >
                {/* Animated background on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative z-10">
                  <stat.icon className="w-8 h-8 text-primary/50 mx-auto mb-3 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  <motion.div 
                    className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Values with enhanced animations */}
          <div ref={valuesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {values.map((v, i) => (
              <motion.div 
                key={v.title} 
                initial={{ opacity: 0, y: 50, rotateY: -15 }} 
                animate={valuesInView ? { opacity: 1, y: 0, rotateY: 0 } : {}} 
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5,
                }}
                className="glass-card p-6 group cursor-pointer relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <v.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-xl mb-2 group-hover:text-primary transition-colors">{v.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Journey Timeline */}
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <JourneyTimeline />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}