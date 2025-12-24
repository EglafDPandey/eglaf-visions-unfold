import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link, useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import { ArrowLeft, Bot, Brain, Cpu, Network, Sparkles, Workflow, MessageSquare, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';

const technologies = [
  {
    name: 'TensorFlow',
    description: 'Open-source machine learning framework by Google',
    color: 'from-[#FF6F00] to-[#FFA000]',
    icon: Brain,
  },
  {
    name: 'PyTorch',
    description: 'Deep learning framework for flexible AI development',
    color: 'from-[#EE4C2C] to-[#FF6B4A]',
    icon: Network,
  },
  {
    name: 'OpenAI GPT',
    description: 'Advanced language models for natural conversations',
    color: 'from-[#10A37F] to-[#1ED9A4]',
    icon: MessageSquare,
  },
  {
    name: 'LangChain',
    description: 'Framework for building AI-powered applications',
    color: 'from-[#1C3C3C] to-[#2D5A5A]',
    icon: Workflow,
  },
  {
    name: 'Computer Vision',
    description: 'Image recognition and visual AI solutions',
    color: 'from-[#6366F1] to-[#8B5CF6]',
    icon: Eye,
  },
  {
    name: 'Hugging Face',
    description: 'State-of-the-art NLP models and transformers',
    color: 'from-[#FFD21E] to-[#FF9E00]',
    icon: Sparkles,
  },
];

const useCases = [
  {
    title: 'Chatbots & Virtual Assistants',
    description: 'Intelligent conversational AI that understands context and provides accurate responses',
  },
  {
    title: 'Predictive Analytics',
    description: 'Data-driven insights that help businesses make informed decisions',
  },
  {
    title: 'Process Automation',
    description: 'AI-powered workflows that reduce manual work and increase efficiency',
  },
  {
    title: 'Content Generation',
    description: 'Automated creation of text, images, and multimedia content',
  },
];

export default function AISolutions() {
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
        service: 'AI Solutions',
        from: location.pathname + location.search,
      }).toString()}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="AI Solutions"
        description="Harness the power of AI with Eglaf Technology. We develop intelligent solutions for chatbots, predictive analytics, process automation, and more."
        keywords="AI solutions, artificial intelligence, machine learning, chatbots, predictive analytics"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden">
        {/* Animated Neural Network Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * 500,
              }}
              animate={{
                x: [null, Math.random() * window.innerWidth],
                y: [null, Math.random() * 500],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
          <div className="absolute top-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
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
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-primary p-0.5"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <Bot className="w-8 h-8 text-secondary" />
                </div>
              </motion.div>
              <span className="px-4 py-2 rounded-full glass-card text-sm text-secondary font-medium">
                AI Solutions
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Artificial Intelligence{' '}
              <span className="gradient-text">Solutions</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Harness the power of AI to transform your business. We develop intelligent 
              solutions that automate processes, enhance decision-making, and create 
              personalized experiences for your customers.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={handleGetQuote}>
                <FileText className="w-4 h-4 mr-2" />
                Get Quote
              </Button>
              <Button variant="outline" size="lg" onClick={handleGetQuote}>
                <Cpu className="w-4 h-4 mr-2" />
                Explore AI Solutions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold text-center mb-12"
          >
            AI <span className="gradient-text">Use Cases</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:border-secondary/50 transition-colors"
              >
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Showcase */}
      <section ref={techRef} className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTechInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-secondary font-medium mb-6">
              AI Technologies
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Powered by{' '}
              <span className="gradient-text">Innovation</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We leverage the most advanced AI frameworks and tools to build intelligent solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isTechInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-30 rounded-2xl blur-2xl transition-opacity duration-500`}
                />
                <div className="glass-card-hover p-8 relative overflow-hidden">
                  {/* Animated background particles */}
                  <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${tech.color}`}
                        animate={{
                          y: [100, -100],
                          x: [Math.random() * 200, Math.random() * 200],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        style={{ left: `${20 + i * 15}%` }}
                      />
                    ))}
                  </div>
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} p-0.5 mb-6`}>
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                      <tech.icon className="w-8 h-8 text-foreground" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
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
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to Embrace AI?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's explore how AI can transform your business operations and customer experience.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Schedule AI Consultation
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
