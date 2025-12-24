import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Globe, Bot, Database } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const categories = [
  { name: 'Mobile Development', icon: Smartphone, color: 'from-primary to-accent' },
  { name: 'Web Development', icon: Globe, color: 'from-accent to-secondary' },
  { name: 'AI Development', icon: Bot, color: 'from-secondary to-primary' },
  { name: 'CRM Development', icon: Database, color: 'from-primary to-secondary' },
];

const caseStudies = [
  { title: 'E-Commerce Mobile App', slug: 'e-commerce-mobile-app', category: 'Mobile Development', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', description: 'Built a high-performance shopping app with 1M+ downloads' },
  { title: 'Healthcare Platform', slug: 'healthcare-platform', category: 'Web Development', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', description: 'Telemedicine platform serving 50,000+ patients monthly' },
  { title: 'Predictive Analytics System', slug: 'predictive-analytics-system', category: 'AI Development', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', description: 'AI-powered forecasting reducing costs by 30%' },
  { title: 'Sales CRM Solution', slug: 'sales-crm-solution', category: 'CRM Development', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', description: 'Custom CRM increasing sales efficiency by 45%' },
  { title: 'Fintech Mobile App', slug: 'fintech-mobile-app', category: 'Mobile Development', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop', description: 'Digital banking app with advanced security features' },
  { title: 'AI Chatbot Platform', slug: 'ai-chatbot-platform', category: 'AI Development', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop', description: 'Conversational AI handling 10,000+ queries daily' },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6">Case Studies</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Our <span className="gradient-text">Success Stories</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore how we've helped businesses transform through technology.
            </p>
          </motion.div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <motion.button key={cat.name} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:border-primary/50 transition-colors">
                <cat.icon className="w-4 h-4 text-primary" />
                <span className="text-sm">{cat.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Case Studies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, i) => (
              <Link key={study.title} to={`/case-studies/${study.slug}`}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10 }} className="group glass-card overflow-hidden h-full">
                  <div className="aspect-video overflow-hidden">
                    <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-primary font-medium">{study.category}</span>
                    <h3 className="font-display font-semibold text-lg mt-2 mb-2 group-hover:text-primary transition-colors">{study.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{study.description}</p>
                    <span className="flex items-center gap-2 text-primary text-sm font-medium">
                      Read Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
