import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Smartphone, Globe, Bot, Database, Code, TrendingUp } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO, schemas, collectionPageSchema } from '@/components/SEO';
import { Input } from '@/components/ui/input';

const categories = [
  { id: 'all', name: 'All Projects', icon: Code },
  { id: 'mobile', name: 'Mobile Apps', icon: Smartphone },
  { id: 'web', name: 'Web Development', icon: Globe },
  { id: 'ai', name: 'AI Solutions', icon: Bot },
  { id: 'crm', name: 'CRM Systems', icon: Database },
  { id: 'seo', name: 'SEO & Marketing', icon: TrendingUp },
];

const portfolioItems = [
  {
    id: 1,
    title: 'RetailMax E-Commerce App',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    description: 'Cross-platform shopping app with AI recommendations',
    technologies: ['Flutter', 'Firebase', 'Node.js'],
    link: '/case-studies/e-commerce-mobile-app',
  },
  {
    id: 2,
    title: 'MediCare Telemedicine Platform',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    description: 'HIPAA-compliant healthcare platform with video consultations',
    technologies: ['React', 'WebRTC', 'PostgreSQL'],
    link: '/case-studies/healthcare-platform',
  },
  {
    id: 3,
    title: 'LogiTech Analytics Engine',
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    description: 'ML-powered demand forecasting system',
    technologies: ['Python', 'TensorFlow', 'GCP'],
    link: '/case-studies/predictive-analytics-system',
  },
  {
    id: 4,
    title: 'TechStart Sales CRM',
    category: 'crm',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    description: 'Custom CRM with AI-powered lead scoring',
    technologies: ['React', 'GraphQL', 'MongoDB'],
    link: '/case-studies/sales-crm-solution',
  },
  {
    id: 5,
    title: 'NeoBank Digital Banking',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
    description: 'Secure fintech app with biometric authentication',
    technologies: ['React Native', 'Golang', 'AWS'],
    link: '/case-studies/fintech-mobile-app',
  },
  {
    id: 6,
    title: 'ServiceFirst AI Chatbot',
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop',
    description: 'Conversational AI for customer support',
    technologies: ['Python', 'LangChain', 'OpenAI'],
    link: '/case-studies/ai-chatbot-platform',
  },
  {
    id: 7,
    title: 'GreenLeaf Organic Store',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
    description: 'E-commerce platform with subscription model',
    technologies: ['Next.js', 'Stripe', 'Supabase'],
    link: '/case-studies/greenleaf-organic-store',
  },
  {
    id: 8,
    title: 'FitTrack Fitness App',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop',
    description: 'Health tracking with wearable integration',
    technologies: ['Flutter', 'HealthKit', 'Firebase'],
    link: '/case-studies/fittrack-fitness-app',
  },
  {
    id: 9,
    title: 'PropManage Real Estate CRM',
    category: 'crm',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    description: 'Property management and lead tracking system',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    link: '/case-studies/propmanage-real-estate-crm',
  },
  {
    id: 10,
    title: 'TravelBuddy Companion App',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
    description: 'AI-powered travel planning and booking',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    link: '/case-studies/travelbuddy-companion-app',
  },
  {
    id: 11,
    title: 'EduLearn Online Academy',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop',
    description: 'Learning management system with live classes',
    technologies: ['React', 'WebRTC', 'PostgreSQL'],
    link: '/case-studies/edulearn-online-academy',
  },
  {
    id: 12,
    title: 'SmartHome IoT Dashboard',
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    description: 'AI-powered home automation control center',
    technologies: ['React', 'Python', 'MQTT'],
    link: '/case-studies/smarthome-iot-dashboard',
  },
  {
    id: 13,
    title: 'LocalBiz SEO Campaign',
    category: 'seo',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop',
    description: 'Local SEO strategy increasing visibility by 300%',
    technologies: ['SEMrush', 'Ahrefs', 'Analytics'],
    link: '/case-studies/localbiz-seo-campaign',
  },
  {
    id: 14,
    title: 'FashionHub Marketplace',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    description: 'Multi-vendor fashion marketplace platform',
    technologies: ['Next.js', 'Stripe', 'Algolia'],
    link: '/case-studies/fashionhub-marketplace',
  },
  {
    id: 15,
    title: 'ClinicPro Management System',
    category: 'crm',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
    description: 'Complete clinic management with patient portal',
    technologies: ['Angular', 'Node.js', 'PostgreSQL'],
    link: '/case-studies/clinicpro-management-system',
  },
];

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = useMemo(() => {
    return portfolioItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Portfolio - Our Work & Case Studies"
        description="Explore Eglaf Technology's portfolio of 500+ successful projects. Mobile apps, web development, AI solutions, CRM systems, and enterprise software. See our work across healthcare, fintech, e-commerce, and more."
        keywords="software development portfolio, mobile app examples, web development projects, AI project case studies, custom software examples, Flutter apps portfolio, React projects, enterprise software portfolio, tech company work samples"
        canonical="https://eglaftechnology.com/portfolio"
        schema={[
          collectionPageSchema({
            name: 'Eglaf Technology Portfolio',
            description: 'Explore our portfolio of 500+ successful projects across mobile apps, web development, AI solutions, and enterprise software.',
            url: 'https://eglaftechnology.com/portfolio',
          }),
          schemas.breadcrumb([
            { name: 'Home', url: 'https://eglaftechnology.com/' },
            { name: 'Portfolio', url: 'https://eglaftechnology.com/portfolio' },
          ]),
        ]}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6">
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Project <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our diverse portfolio of successful projects across mobile, web, AI, and enterprise solutions.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base bg-card border-border"
              />
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'glass-card hover:border-primary/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    layout
                  >
                    <Link to={item.link} className="block h-full">
                      <motion.div
                        whileHover={{ y: -10 }}
                        className="group glass-card overflow-hidden h-full flex flex-col"
                      >
                        <div className="aspect-video overflow-hidden relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                            <span className="p-2 rounded-full bg-primary text-primary-foreground">
                              <ExternalLink className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            {categories.find(c => c.id === item.category) && (
                              <>
                                {(() => {
                                  const CategoryIcon = categories.find(c => c.id === item.category)!.icon;
                                  return <CategoryIcon className="w-4 h-4 text-primary" />;
                                })()}
                                <span className="text-xs text-primary font-medium">
                                  {categories.find(c => c.id === item.category)?.name}
                                </span>
                              </>
                            )}
                          </div>
                          <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 flex-grow">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="text-primary hover:underline"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          {filteredItems.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground mt-8"
            >
              Showing {filteredItems.length} of {portfolioItems.length} projects
            </motion.p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how we can bring your vision to life with our expertise.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get in Touch
              <ExternalLink className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
