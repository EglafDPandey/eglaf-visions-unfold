import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import DevelopersSection from '@/components/DevelopersSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { SEO, faqSchema, localBusinessSchema, websiteSchema } from '@/components/SEO';
import { StatsSection, DataFlowSection } from '@/components/MethodologyPreview';

const homeFaqs = [
  {
    question: 'What services does Eglaf Technology offer?',
    answer: 'Eglaf Technology offers comprehensive software development services including custom web development, mobile app development (iOS & Android), AI/ML solutions, CRM development (Salesforce, HubSpot), enterprise software development, and professional SEO services.',
  },
  {
    question: 'Where is Eglaf Technology located?',
    answer: 'Eglaf Technology is headquartered in Ahmedabad, Gujarat, India. We serve clients globally across USA, UK, Europe, Middle East, and Asia Pacific regions.',
  },
  {
    question: 'How much does custom software development cost?',
    answer: 'Custom software development costs vary based on project complexity, features, and timeline. We offer competitive pricing starting from $5,000 for small projects. Contact us for a free consultation and detailed quote.',
  },
  {
    question: 'How long does it take to develop a mobile app?',
    answer: 'Mobile app development typically takes 3-6 months depending on complexity. Simple apps may take 2-3 months, while complex enterprise apps can take 6-12 months. We follow agile methodology for faster delivery.',
  },
  {
    question: 'Do you offer ongoing support and maintenance?',
    answer: 'Yes, we provide comprehensive post-launch support and maintenance packages including bug fixes, security updates, performance optimization, and feature enhancements with 24/7 technical support.',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO 
        description="Eglaf Technology - Top software development company in Ahmedabad, India. Expert web development, mobile app development, AI solutions, CRM development & SEO services. 10+ years experience. 500+ projects delivered. Get free quote!"
        keywords="software development company India, web development services Ahmedabad, mobile app development company, AI solutions provider, custom software development, CRM development services, SEO services India, React development, Flutter app development, enterprise software solutions, IT consulting India, digital transformation services"
        canonical="https://eglaftechnology.com/"
        schema={[localBusinessSchema, websiteSchema, faqSchema(homeFaqs)]}
      />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <DataFlowSection />
      <DevelopersSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
