import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Smartphone, Globe, Bot, Database } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

const caseStudiesData = {
  'e-commerce-mobile-app': {
    title: 'E-Commerce Mobile App',
    category: 'Mobile Development',
    icon: Smartphone,
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
    client: 'RetailMax Inc.',
    duration: '6 months',
    year: '2023',
    overview: 'RetailMax approached us with a challenge: their existing mobile presence was fragmented and underperforming. They needed a unified, high-performance mobile shopping experience that could handle millions of users while providing a seamless checkout process.',
    challenge: 'The client faced multiple pain points including slow app performance, high cart abandonment rates (78%), poor user engagement, and difficulty managing inventory across multiple channels. They needed a solution that could scale during peak shopping seasons and integrate with their existing ERP system.',
    solution: 'We developed a cross-platform mobile application using Flutter, ensuring native-like performance on both iOS and Android. The app features an AI-powered recommendation engine, real-time inventory sync, one-tap checkout with multiple payment options, and offline browsing capabilities.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Stripe'],
    results: [
      { metric: '1M+', label: 'App Downloads' },
      { metric: '45%', label: 'Increase in Sales' },
      { metric: '60%', label: 'Reduction in Cart Abandonment' },
      { metric: '4.8★', label: 'App Store Rating' },
    ],
    testimonial: {
      quote: "EGLAF transformed our mobile commerce strategy. The app they built exceeded all our expectations and has become our primary sales channel.",
      author: "Sarah Chen",
      role: "CTO, RetailMax Inc."
    },
    features: [
      'AI-powered product recommendations',
      'One-tap checkout with saved payment methods',
      'Real-time inventory synchronization',
      'Push notification campaigns',
      'Offline product browsing',
      'AR-powered product visualization',
    ],
  },
  'healthcare-platform': {
    title: 'Healthcare Platform',
    category: 'Web Development',
    icon: Globe,
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop',
    client: 'MediCare Solutions',
    duration: '8 months',
    year: '2023',
    overview: 'MediCare Solutions needed a comprehensive telemedicine platform to connect patients with healthcare providers remotely. The platform had to be HIPAA-compliant, scalable, and accessible to users of all technical abilities.',
    challenge: 'Healthcare providers were struggling with patient no-shows, limited reach to rural areas, and inefficient appointment scheduling. The existing system couldn\'t handle video consultations and lacked proper patient data management.',
    solution: 'We built a full-featured telemedicine platform with HD video consultations, electronic health records integration, appointment scheduling, prescription management, and a patient portal. The platform includes a mobile-responsive design for accessibility across all devices.',
    technologies: ['React', 'TypeScript', 'Node.js', 'WebRTC', 'PostgreSQL', 'Docker', 'AWS HIPAA', 'Twilio'],
    results: [
      { metric: '50K+', label: 'Monthly Patients' },
      { metric: '70%', label: 'Reduction in No-Shows' },
      { metric: '35%', label: 'Increase in Patient Reach' },
      { metric: '99.9%', label: 'Platform Uptime' },
    ],
    testimonial: {
      quote: "The platform has revolutionized how we deliver healthcare. We can now reach patients in remote areas and provide care more efficiently than ever.",
      author: "Dr. Michael Torres",
      role: "Medical Director, MediCare Solutions"
    },
    features: [
      'HD video consultations',
      'Electronic health records integration',
      'Automated appointment reminders',
      'E-prescription management',
      'Patient portal with health tracking',
      'Multi-provider scheduling system',
    ],
  },
  'predictive-analytics-system': {
    title: 'Predictive Analytics System',
    category: 'AI Development',
    icon: Bot,
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
    client: 'LogiTech Supply Chain',
    duration: '5 months',
    year: '2024',
    overview: 'LogiTech Supply Chain was losing millions annually due to inventory mismanagement and demand forecasting errors. They needed an AI-powered solution to optimize their supply chain operations and reduce waste.',
    challenge: 'The company faced chronic overstocking in some locations while experiencing stockouts in others. Manual forecasting was time-consuming and often inaccurate, leading to significant financial losses and customer dissatisfaction.',
    solution: 'We implemented a machine learning-based predictive analytics system that analyzes historical sales data, seasonal trends, market conditions, and external factors to provide accurate demand forecasts. The system integrates with their existing ERP for automated inventory optimization.',
    technologies: ['Python', 'TensorFlow', 'scikit-learn', 'Apache Kafka', 'PostgreSQL', 'Docker', 'Kubernetes', 'GCP'],
    results: [
      { metric: '30%', label: 'Cost Reduction' },
      { metric: '92%', label: 'Forecast Accuracy' },
      { metric: '25%', label: 'Inventory Reduction' },
      { metric: '$2M+', label: 'Annual Savings' },
    ],
    testimonial: {
      quote: "The predictive analytics system has transformed our operations. We've seen immediate ROI and our customers are happier than ever with product availability.",
      author: "James Wilson",
      role: "VP Operations, LogiTech Supply Chain"
    },
    features: [
      'Real-time demand forecasting',
      'Automated reorder suggestions',
      'Seasonal trend analysis',
      'Supply chain optimization',
      'Interactive dashboards',
      'Anomaly detection alerts',
    ],
  },
  'sales-crm-solution': {
    title: 'Sales CRM Solution',
    category: 'CRM Development',
    icon: Database,
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
    client: 'TechStart Ventures',
    duration: '4 months',
    year: '2023',
    overview: 'TechStart Ventures, a rapidly growing B2B company, was struggling with fragmented customer data and inefficient sales processes. They needed a custom CRM solution that could adapt to their unique sales methodology.',
    challenge: 'The sales team was using spreadsheets and disconnected tools, leading to lost leads, duplicate entries, and no visibility into the sales pipeline. Management couldn\'t track performance or forecast revenue accurately.',
    solution: 'We developed a custom CRM tailored to their specific needs, featuring lead scoring, pipeline management, automated follow-ups, email integration, and comprehensive reporting. The system was designed for easy adoption with minimal training.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'GraphQL', 'AWS', 'SendGrid', 'OAuth 2.0'],
    results: [
      { metric: '45%', label: 'Sales Efficiency Increase' },
      { metric: '60%', label: 'Lead Response Time Reduction' },
      { metric: '35%', label: 'Revenue Growth' },
      { metric: '95%', label: 'User Adoption Rate' },
    ],
    testimonial: {
      quote: "This CRM was a game-changer for our sales team. The custom features fit our workflow perfectly and the adoption was seamless.",
      author: "Amanda Rodriguez",
      role: "Sales Director, TechStart Ventures"
    },
    features: [
      'AI-powered lead scoring',
      'Visual pipeline management',
      'Automated email sequences',
      'Revenue forecasting',
      'Team performance analytics',
      'Mobile app for field sales',
    ],
  },
  'fintech-mobile-app': {
    title: 'Fintech Mobile App',
    category: 'Mobile Development',
    icon: Smartphone,
    heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop',
    client: 'NeoBank Financial',
    duration: '10 months',
    year: '2024',
    overview: 'NeoBank Financial aimed to disrupt traditional banking with a mobile-first digital banking experience. They needed an app that combined security, speed, and a delightful user experience.',
    challenge: 'The fintech space is highly competitive with strict regulatory requirements. The app needed bank-grade security while maintaining a frictionless user experience. Integration with legacy banking systems posed additional challenges.',
    solution: 'We built a secure, feature-rich mobile banking app with biometric authentication, real-time transactions, budgeting tools, and investment features. The app uses end-to-end encryption and complies with PCI-DSS and local banking regulations.',
    technologies: ['React Native', 'TypeScript', 'Golang', 'PostgreSQL', 'Redis', 'AWS', 'Plaid', 'Stripe'],
    results: [
      { metric: '500K+', label: 'Active Users' },
      { metric: '$50M+', label: 'Monthly Transactions' },
      { metric: '4.9★', label: 'App Store Rating' },
      { metric: '0', label: 'Security Incidents' },
    ],
    testimonial: {
      quote: "EGLAF delivered a banking app that rivals the best in the industry. Their security-first approach gave us confidence to launch with zero concerns.",
      author: "David Park",
      role: "CEO, NeoBank Financial"
    },
    features: [
      'Biometric authentication',
      'Real-time transaction notifications',
      'AI-powered spending insights',
      'Investment portfolio management',
      'Peer-to-peer payments',
      'Virtual card management',
    ],
  },
  'ai-chatbot-platform': {
    title: 'AI Chatbot Platform',
    category: 'AI Development',
    icon: Bot,
    heroImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=600&fit=crop',
    client: 'ServiceFirst Corp',
    duration: '6 months',
    year: '2024',
    overview: 'ServiceFirst Corp needed to scale their customer support without proportionally increasing costs. They wanted an AI-powered chatbot that could handle complex queries while maintaining their brand voice.',
    challenge: 'The customer support team was overwhelmed with repetitive queries, leading to long wait times and customer frustration. They needed automation that could handle complex, multi-turn conversations without losing the human touch.',
    solution: 'We developed a conversational AI platform using advanced NLP and machine learning. The chatbot handles 80% of queries autonomously, seamlessly escalates complex issues to human agents, and continuously learns from interactions.',
    technologies: ['Python', 'PyTorch', 'LangChain', 'OpenAI', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    results: [
      { metric: '10K+', label: 'Daily Queries Handled' },
      { metric: '80%', label: 'Automation Rate' },
      { metric: '40%', label: 'Cost Reduction' },
      { metric: '95%', label: 'Customer Satisfaction' },
    ],
    testimonial: {
      quote: "The AI chatbot has transformed our customer service. Our customers get instant answers while our team focuses on complex issues.",
      author: "Lisa Thompson",
      role: "Head of Customer Success, ServiceFirst Corp"
    },
    features: [
      'Natural language understanding',
      'Multi-turn conversation handling',
      'Sentiment analysis',
      'Seamless human handoff',
      'Multi-language support',
      'Analytics dashboard',
    ],
  },
};

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = slug ? caseStudiesData[slug as keyof typeof caseStudiesData] : null;

  if (!study) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Case Study Not Found</h1>
          <p className="text-muted-foreground mb-8">The case study you're looking for doesn't exist.</p>
          <Link to="/case-studies">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Case Studies
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = study.icon;
  const studySlugs = Object.keys(caseStudiesData);
  const currentIndex = studySlugs.indexOf(slug!);
  const prevStudy = currentIndex > 0 ? studySlugs[currentIndex - 1] : null;
  const nextStudy = currentIndex < studySlugs.length - 1 ? studySlugs[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Case Studies
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-primary font-medium">{study.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {study.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-muted-foreground">
              <div><span className="text-foreground font-medium">Client:</span> {study.client}</div>
              <div><span className="text-foreground font-medium">Duration:</span> {study.duration}</div>
              <div><span className="text-foreground font-medium">Year:</span> {study.year}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden mb-16"
          >
            <img
              src={study.heroImage}
              alt={study.title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {study.results.map((result, i) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                  {result.metric}
                </div>
                <div className="text-muted-foreground text-sm">{result.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-display font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{study.overview}</p>
            </motion.div>

            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-display font-bold mb-4">The Challenge</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{study.challenge}</p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-display font-bold mb-4">Our Solution</h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">{study.solution}</p>

              <div className="grid md:grid-cols-2 gap-4">
                {study.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-display font-bold mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {study.technologies.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-12 mb-16"
            >
              <div className="text-4xl text-primary mb-4">"</div>
              <blockquote className="text-xl md:text-2xl font-display mb-6 leading-relaxed">
                {study.testimonial.quote}
              </blockquote>
              <div>
                <div className="font-semibold">{study.testimonial.author}</div>
                <div className="text-muted-foreground">{study.testimonial.role}</div>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center pt-8 border-t border-border"
            >
              {prevStudy ? (
                <Link
                  to={`/case-studies/${prevStudy}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Case Study</span>
                </Link>
              ) : (
                <div />
              )}
              {nextStudy ? (
                <Link
                  to={`/case-studies/${nextStudy}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>Next Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <div />
              )}
            </motion.div>
          </div>
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
              Ready to Build Your Success Story?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how we can help transform your business with cutting-edge technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View More Case Studies
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
