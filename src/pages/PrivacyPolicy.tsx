import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-display font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">Last updated: December 2024</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">1. Information We Collect</h2>
            <p>We collect information you provide directly, including name, email, phone number, and any other information you choose to provide when contacting us or using our services.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and protect our company and users.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">3. Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">5. Cookies</h2>
            <p>We use cookies to enhance your experience on our website. You can choose to disable cookies through your browser settings.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. Contact us at privacy@eglaftech.com for any requests.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at info@eglaftech.com.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
