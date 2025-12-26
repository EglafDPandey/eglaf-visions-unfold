import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Smartphone, Globe, Bot, Database, TrendingUp } from 'lucide-react';
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
  'greenleaf-organic-store': {
    title: 'GreenLeaf Organic Store',
    category: 'Web Development',
    icon: Globe,
    heroImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop',
    client: 'GreenLeaf Organics',
    duration: '4 months',
    year: '2024',
    overview: 'GreenLeaf Organics wanted to expand their local organic farm business online with a subscription-based e-commerce platform. They needed a solution that could handle recurring orders, fresh produce inventory, and local delivery logistics.',
    challenge: 'Managing perishable inventory with variable availability, coordinating delivery schedules for fresh produce, and building customer loyalty through a subscription model presented unique challenges. The platform needed to handle seasonal variations in product availability.',
    solution: 'We built a Next.js e-commerce platform with Stripe subscription management, real-time inventory tracking for perishable goods, and an intelligent delivery scheduling system. The platform includes a customer portal for subscription management and recipe suggestions based on seasonal availability.',
    technologies: ['Next.js', 'Stripe', 'Supabase', 'Tailwind CSS', 'React Query', 'Vercel'],
    results: [
      { metric: '300%', label: 'Revenue Growth' },
      { metric: '2,500+', label: 'Active Subscribers' },
      { metric: '95%', label: 'Retention Rate' },
      { metric: '4.9★', label: 'Customer Rating' },
    ],
    testimonial: {
      quote: "The subscription platform transformed our business. We went from a local farm stand to a thriving online business serving thousands of families.",
      author: "Maria Santos",
      role: "Founder, GreenLeaf Organics"
    },
    features: [
      'Flexible subscription management',
      'Seasonal product availability',
      'Smart delivery scheduling',
      'Recipe recommendations',
      'Customer loyalty rewards',
      'Farm-to-table tracking',
    ],
  },
  'fittrack-fitness-app': {
    title: 'FitTrack Fitness App',
    category: 'Mobile Development',
    icon: Smartphone,
    heroImage: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&h=600&fit=crop',
    client: 'FitTrack Health',
    duration: '7 months',
    year: '2024',
    overview: 'FitTrack Health envisioned a comprehensive fitness application that could integrate with popular wearables and provide personalized workout and nutrition plans. The app needed to motivate users through gamification and social features.',
    challenge: 'Integrating with multiple wearable devices (Apple Watch, Fitbit, Garmin), providing accurate calorie and activity tracking, and creating engaging content that keeps users motivated long-term were the primary challenges.',
    solution: 'We developed a Flutter app with seamless HealthKit and Google Fit integration, AI-powered workout recommendations, social challenges, and detailed progress analytics. The app syncs data from multiple sources to provide a unified health dashboard.',
    technologies: ['Flutter', 'HealthKit', 'Firebase', 'TensorFlow Lite', 'Node.js', 'PostgreSQL'],
    results: [
      { metric: '150K+', label: 'Active Users' },
      { metric: '85%', label: 'Weekly Retention' },
      { metric: '45min', label: 'Avg. Daily Use' },
      { metric: '4.7★', label: 'App Store Rating' },
    ],
    testimonial: {
      quote: "FitTrack has become an essential part of my daily routine. The wearable integration and personalized plans keep me motivated every day.",
      author: "Jake Morrison",
      role: "Beta Tester & Fitness Enthusiast"
    },
    features: [
      'Multi-device wearable sync',
      'AI workout recommendations',
      'Nutrition tracking & meal plans',
      'Social challenges & leaderboards',
      'Progress analytics dashboard',
      'Guided workout videos',
    ],
  },
  'propmanage-real-estate-crm': {
    title: 'PropManage Real Estate CRM',
    category: 'CRM Development',
    icon: Database,
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop',
    client: 'PropManage Realty',
    duration: '5 months',
    year: '2023',
    overview: 'PropManage Realty needed a comprehensive CRM to manage their growing portfolio of properties, track leads, and streamline communication with tenants and property owners. They required a system that could scale with their expansion plans.',
    challenge: 'Managing multiple property listings, tracking tenant interactions, coordinating maintenance requests, and providing property owners with transparent reporting were creating operational bottlenecks with their existing spreadsheet-based system.',
    solution: 'We built a custom CRM with property portfolio management, lead tracking, automated tenant communications, maintenance request workflows, and owner reporting dashboards. The system includes a tenant portal and mobile app for property managers.',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'AWS', 'Twilio'],
    results: [
      { metric: '500+', label: 'Properties Managed' },
      { metric: '60%', label: 'Time Saved on Admin' },
      { metric: '40%', label: 'Faster Lead Response' },
      { metric: '98%', label: 'Tenant Satisfaction' },
    ],
    testimonial: {
      quote: "This CRM has revolutionized how we manage properties. Our team is more efficient and our property owners love the transparency.",
      author: "Robert Chen",
      role: "Managing Director, PropManage Realty"
    },
    features: [
      'Property portfolio dashboard',
      'Lead management & scoring',
      'Tenant communication portal',
      'Maintenance request tracking',
      'Owner reporting & analytics',
      'Mobile app for field agents',
    ],
  },
  'travelbuddy-companion-app': {
    title: 'TravelBuddy Companion App',
    category: 'Mobile Development',
    icon: Smartphone,
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop',
    client: 'TravelBuddy Inc.',
    duration: '8 months',
    year: '2024',
    overview: 'TravelBuddy Inc. wanted to create the ultimate travel companion app that uses AI to provide personalized itineraries, real-time recommendations, and seamless booking experiences for travelers worldwide.',
    challenge: 'Aggregating data from multiple travel APIs, providing offline functionality for travelers in areas with poor connectivity, and creating truly personalized recommendations based on user preferences and travel history.',
    solution: 'We developed a React Native app with an AI-powered recommendation engine, offline maps and itinerary access, multi-language support, and integration with major booking platforms. The app learns user preferences to provide increasingly personalized suggestions.',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'OpenAI', 'Google Maps', 'Amadeus API'],
    results: [
      { metric: '200K+', label: 'Downloads' },
      { metric: '50+', label: 'Countries Supported' },
      { metric: '4.8★', label: 'App Rating' },
      { metric: '35%', label: 'Booking Conversion' },
    ],
    testimonial: {
      quote: "TravelBuddy made our trip to Japan absolutely seamless. The AI recommendations were spot-on and the offline features were a lifesaver.",
      author: "Sophie & Mark Davis",
      role: "Travel Bloggers"
    },
    features: [
      'AI-powered itinerary planning',
      'Offline maps & guides',
      'Real-time flight tracking',
      'Local recommendation engine',
      'Multi-language translation',
      'Expense tracking & splitting',
    ],
  },
  'edulearn-online-academy': {
    title: 'EduLearn Online Academy',
    category: 'Web Development',
    icon: Globe,
    heroImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=600&fit=crop',
    client: 'EduLearn Academy',
    duration: '6 months',
    year: '2024',
    overview: 'EduLearn Academy needed a comprehensive learning management system to deliver online courses, manage students, and provide live virtual classrooms. The platform needed to support thousands of concurrent users with interactive features.',
    challenge: 'Building a platform that could handle live video classes with hundreds of participants, provide interactive assessments, track student progress, and offer a seamless experience across devices while maintaining engagement.',
    solution: 'We created a full-featured LMS with live HD video classes, interactive whiteboards, automated assessments, progress tracking, and certificate generation. The platform includes a mobile-responsive design and native apps for iOS and Android.',
    technologies: ['React', 'WebRTC', 'Node.js', 'PostgreSQL', 'Redis', 'AWS MediaLive'],
    results: [
      { metric: '25K+', label: 'Active Students' },
      { metric: '500+', label: 'Courses Available' },
      { metric: '92%', label: 'Completion Rate' },
      { metric: '4.9★', label: 'Student Rating' },
    ],
    testimonial: {
      quote: "The platform exceeded our expectations. Our students love the interactive features and our instructors find it intuitive to use.",
      author: "Dr. Emily Watson",
      role: "Academic Director, EduLearn Academy"
    },
    features: [
      'Live HD video classes',
      'Interactive whiteboard',
      'Automated assessments',
      'Progress tracking dashboard',
      'Certificate generation',
      'Discussion forums',
    ],
  },
  'smarthome-iot-dashboard': {
    title: 'SmartHome IoT Dashboard',
    category: 'AI Development',
    icon: Bot,
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
    client: 'SmartHome Solutions',
    duration: '5 months',
    year: '2024',
    overview: 'SmartHome Solutions needed an intelligent dashboard to control and monitor various IoT devices across smart homes. The platform needed to use AI to optimize energy consumption and provide predictive maintenance alerts.',
    challenge: 'Integrating with dozens of different IoT protocols and devices, processing real-time sensor data at scale, and providing actionable AI-driven insights for energy optimization while maintaining a simple user interface.',
    solution: 'We built a React-based dashboard with Python backend for AI processing, supporting multiple IoT protocols (MQTT, Zigbee, Z-Wave). The system uses machine learning to predict energy usage patterns and provides automated routines for optimization.',
    technologies: ['React', 'Python', 'MQTT', 'TensorFlow', 'InfluxDB', 'Grafana', 'Raspberry Pi'],
    results: [
      { metric: '30%', label: 'Energy Savings' },
      { metric: '10K+', label: 'Devices Connected' },
      { metric: '99.9%', label: 'Uptime' },
      { metric: '5 sec', label: 'Avg Response Time' },
    ],
    testimonial: {
      quote: "The AI-powered insights have helped our users save significantly on energy bills while enjoying a seamless smart home experience.",
      author: "Thomas Anderson",
      role: "CEO, SmartHome Solutions"
    },
    features: [
      'Multi-protocol device support',
      'AI energy optimization',
      'Predictive maintenance alerts',
      'Custom automation routines',
      'Voice assistant integration',
      'Real-time monitoring',
    ],
  },
  'localbiz-seo-campaign': {
    title: 'LocalBiz SEO Campaign',
    category: 'SEO & Marketing',
    icon: TrendingUp,
    heroImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&h=600&fit=crop',
    client: 'LocalBiz Network',
    duration: '6 months',
    year: '2024',
    overview: 'LocalBiz Network, a coalition of small businesses, needed a comprehensive local SEO strategy to compete with larger chains. They wanted to increase foot traffic and online visibility across their 50+ member businesses.',
    challenge: 'Small businesses were losing customers to big chains with larger marketing budgets. Inconsistent NAP (Name, Address, Phone) data across directories, poor Google Business Profile optimization, and lack of local content were hurting visibility.',
    solution: 'We implemented a comprehensive local SEO strategy including Google Business Profile optimization, citation building and cleanup, local content creation, review management, and local link building campaigns for all member businesses.',
    technologies: ['SEMrush', 'Ahrefs', 'Google Analytics', 'Google Search Console', 'BrightLocal', 'Moz Local'],
    results: [
      { metric: '300%', label: 'Visibility Increase' },
      { metric: '150%', label: 'Organic Traffic Growth' },
      { metric: '85%', label: 'Keywords in Top 10' },
      { metric: '200%', label: 'Lead Generation' },
    ],
    testimonial: {
      quote: "Our local visibility has transformed completely. We now compete effectively with big chains and our foot traffic has never been better.",
      author: "Jennifer Walsh",
      role: "President, LocalBiz Network"
    },
    features: [
      'Google Business Profile optimization',
      'Local citation building',
      'Review management system',
      'Local content strategy',
      'Competitor analysis',
      'Monthly performance reporting',
    ],
  },
  'fashionhub-marketplace': {
    title: 'FashionHub Marketplace',
    category: 'Web Development',
    icon: Globe,
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    client: 'FashionHub Inc.',
    duration: '7 months',
    year: '2024',
    overview: 'FashionHub wanted to create a multi-vendor marketplace connecting independent fashion designers with customers worldwide. The platform needed to handle inventory from multiple vendors, support various payment methods, and provide a seamless shopping experience.',
    challenge: 'Managing inventory and orders across hundreds of independent vendors, ensuring consistent product quality and sizing information, handling international shipping, and providing a unified customer experience despite multiple sellers.',
    solution: 'We built a Next.js marketplace with vendor management dashboards, unified cart and checkout, integrated shipping calculations, size recommendation AI, and a review system. The platform uses Algolia for fast product search and filtering.',
    technologies: ['Next.js', 'Stripe Connect', 'Algolia', 'Supabase', 'Cloudinary', 'ShipStation API'],
    results: [
      { metric: '500+', label: 'Active Vendors' },
      { metric: '$2M+', label: 'Monthly GMV' },
      { metric: '150K+', label: 'Registered Users' },
      { metric: '4.7★', label: 'Customer Rating' },
    ],
    testimonial: {
      quote: "FashionHub gave us access to a global audience we never could have reached on our own. The platform is intuitive and the support is excellent.",
      author: "Isabella Romano",
      role: "Independent Designer & Vendor"
    },
    features: [
      'Multi-vendor management',
      'Unified shopping cart',
      'AI size recommendations',
      'International shipping',
      'Vendor analytics dashboard',
      'Wishlist & favorites',
    ],
  },
  'clinicpro-management-system': {
    title: 'ClinicPro Management System',
    category: 'CRM Development',
    icon: Database,
    heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=600&fit=crop',
    client: 'ClinicPro Healthcare',
    duration: '8 months',
    year: '2024',
    overview: 'ClinicPro Healthcare needed a comprehensive clinic management system to streamline patient scheduling, medical records, billing, and staff management across their network of clinics.',
    challenge: 'Managing patient flow across multiple locations, coordinating staff schedules, maintaining accurate medical records, handling insurance claims, and providing patients with convenient access to their health information.',
    solution: 'We developed an Angular-based clinic management system with appointment scheduling, electronic medical records, billing and insurance processing, staff scheduling, and a patient portal. The system integrates with popular EHR systems.',
    technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Redis', 'HL7 FHIR', 'AWS HIPAA'],
    results: [
      { metric: '40%', label: 'Admin Time Saved' },
      { metric: '25%', label: 'Patient Wait Reduction' },
      { metric: '99%', label: 'Billing Accuracy' },
      { metric: '4.8★', label: 'Staff Satisfaction' },
    ],
    testimonial: {
      quote: "ClinicPro has streamlined our entire operation. From scheduling to billing, everything just works. Our staff loves it.",
      author: "Dr. Patricia Nguyen",
      role: "Medical Director, ClinicPro Healthcare"
    },
    features: [
      'Smart appointment scheduling',
      'Electronic medical records',
      'Insurance claim processing',
      'Staff scheduling system',
      'Patient portal access',
      'Multi-location support',
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
