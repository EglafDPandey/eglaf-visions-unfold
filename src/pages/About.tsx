import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Lightbulb, Users, Award, TrendingUp, Calendar, CheckCircle, Sparkles, Rocket, Heart, Globe, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO, faqSchema } from '@/components/SEO';
import { JourneyToSuccessPreview, ProjectTimeline, StatsSection, DataFlowSection } from '@/components/MethodologyPreview';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const aboutFaqs = [
  {
    question: 'What services does Eglaf Technology offer?',
    answer: 'Eglaf Technology offers comprehensive software development services including custom web development, mobile app development (iOS & Android), AI/ML solutions, CRM development (Salesforce, HubSpot), enterprise software development, and professional SEO services. We work with modern technologies like React, Flutter, Node.js, and Python.',
  },
  {
    question: 'Where is Eglaf Technology located?',
    answer: 'Eglaf Technology is headquartered in Ahmedabad, Gujarat, India. Our office is located at BH F623 Arved Transcube Plaza, Ranip, Ahmedabad 382480. We serve clients globally across USA, UK, Europe, Middle East, and Asia Pacific regions.',
  },
  {
    question: 'How much experience does Eglaf Technology have?',
    answer: 'Founded in 2014, Eglaf Technology has over 10 years of experience in software development. We have successfully delivered 500+ projects for clients worldwide, with a team of 50+ expert developers, designers, and project managers.',
  },
  {
    question: 'What is your development methodology?',
    answer: 'We follow an Agile development methodology with iterative sprints, regular client communication, and continuous delivery. Our process includes discovery, design, development, testing, deployment, and ongoing support phases to ensure high-quality deliverables.',
  },
  {
    question: 'Do you provide ongoing support and maintenance?',
    answer: 'Yes, we offer comprehensive post-launch support and maintenance packages. This includes bug fixes, security updates, performance optimization, feature enhancements, and 24/7 technical support to ensure your software runs smoothly.',
  },
  {
    question: 'How can I get a quote for my project?',
    answer: 'You can request a free quote by visiting our quote request page, calling us at +91-9898598257, or emailing info@eglaftech.com. We typically respond within 24 hours with an initial assessment and consultation scheduling.',
  },
  {
    question: 'What industries do you serve?',
    answer: 'We serve diverse industries including healthcare, fintech, e-commerce, education, real estate, logistics, manufacturing, and startups. Our solutions are tailored to meet industry-specific requirements and compliance standards.',
  },
  {
    question: 'Do you work with startups and small businesses?',
    answer: 'Absolutely! We work with businesses of all sizes, from early-stage startups to Fortune 500 enterprises. We offer flexible engagement models and scalable solutions that grow with your business needs and budget.',
  },
];
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
        title="About Us - Software Development Company India"
        description="About Eglaf Technology - Premier software development company in Ahmedabad, India since 2014. 10+ years experience, 500+ projects delivered, 50+ expert developers. Learn about our mission, vision, and journey."
        keywords="about Eglaf Technology, software company India, IT company Ahmedabad, technology company history, software development firm, tech startup India, Eglaf Technology team, company profile"
        canonical="https://eglaftechnology.com/about"
        schema={[faqSchema(aboutFaqs)]}
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

      {/* Stats Section */}
      <StatsSection />
      
      {/* Data Flow Section */}
      <DataFlowSection />
      
      {/* Our Development Methodology */}
      <JourneyToSuccessPreview />
      
      {/* Project Timeline */}
      <ProjectTimeline />

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about Eglaf Technology and our services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {aboutFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="glass-card border-border/50 px-6 rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-display font-semibold hover:text-primary transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                    {index === 0 && (
                      <span className="block mt-3">
                        <Link to="/services/web-development" className="text-primary hover:underline mr-3">Web Development</Link>
                        <Link to="/services/mobile-development" className="text-primary hover:underline mr-3">Mobile Apps</Link>
                        <Link to="/services/ai-solutions" className="text-primary hover:underline">AI Solutions</Link>
                      </span>
                    )}
                    {index === 3 && (
                      <span className="block mt-3">
                        <Link to="/methodology" className="text-primary hover:underline">Learn more about our methodology →</Link>
                      </span>
                    )}
                    {index === 5 && (
                      <span className="block mt-3">
                        <Link to="/quote" className="text-primary hover:underline mr-3">Request a Quote</Link>
                        <Link to="/contact" className="text-primary hover:underline">Contact Us</Link>
                      </span>
                    )}
                    {index === 6 && (
                      <span className="block mt-3">
                        <Link to="/portfolio" className="text-primary hover:underline">View our Portfolio →</Link>
                      </span>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA after FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">Have more questions?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 px-6 py-3 glass-card rounded-lg font-medium hover:border-primary/50 transition-colors"
              >
                Meet Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}