import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import DevelopersSection from '@/components/DevelopersSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO 
        description="Eglaf Technology - Transform your business with custom software development, AI solutions, mobile apps, and web development services."
        keywords="software development, AI solutions, mobile app development, web development, custom software, CRM development"
      />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <DevelopersSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
