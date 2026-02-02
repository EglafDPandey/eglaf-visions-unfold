import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Privacy Policy"
        description="Eglaf Technology's Privacy Policy. Learn how we collect, use, and protect your personal information when using our software development services."
      />
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-display font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">Last updated: January 2025</p>
            
            <p>
              At Eglaf Technology LLP ("we", "our", or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at <Link to="/" className="text-primary hover:underline">eglaftechnology.com</Link> or use our software development and consulting services.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Personal Information:</strong> Name, email address, phone number, company name, and job title when you contact us or request a quote.</li>
              <li><strong>Project Information:</strong> Details about your project requirements, budget, and timeline when submitting quote requests.</li>
              <li><strong>Communication Data:</strong> Records of correspondence when you contact us via email, phone, or our contact forms.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage patterns collected automatically when you visit our website.</li>
              <li><strong>Cookie Data:</strong> Information collected through cookies and similar tracking technologies to improve your browsing experience.</li>
            </ul>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide, maintain, and improve our <Link to="/services/web-development" className="text-primary hover:underline">web development</Link>, <Link to="/services/mobile-development" className="text-primary hover:underline">mobile app development</Link>, and other technology services.</li>
              <li>To process and respond to your inquiries, quote requests, and support tickets.</li>
              <li>To send you technical notices, updates, security alerts, and administrative messages.</li>
              <li>To communicate with you about services, promotions, and events that may interest you.</li>
              <li>To analyze usage patterns and improve our website functionality and user experience.</li>
              <li>To detect, prevent, and address technical issues, fraud, or security threats.</li>
              <li>To comply with legal obligations and enforce our terms of service.</li>
            </ul>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">3. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our website and delivering services, bound by confidentiality agreements.</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of company assets.</li>
              <li><strong>With Your Consent:</strong> When you have given us explicit permission to share your information.</li>
            </ul>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, firewalls, and regular security audits. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our website. Cookies help us understand how you interact with our site, remember your preferences, and provide personalized content. You can control cookie settings through your browser preferences. Disabling cookies may affect certain features of our website.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">6. Your Rights and Choices</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal requirements.</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time.</li>
              <li><strong>Data Portability:</strong> Request your data in a structured, commonly used format.</li>
            </ul>
            <p>To exercise these rights, please contact us at privacy@eglaftech.com.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">7. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. Project-related data is typically retained for the duration of our business relationship plus any applicable legal retention periods.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">8. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information promptly.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">9. International Data Transfers</h2>
            <p>
              As a company based in India serving clients globally, your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page with a revised "Last updated" date. We encourage you to review this policy periodically.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">11. Contact Us</h2>
            <p>
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li><strong>Email:</strong> privacy@eglaftech.com</li>
              <li><strong>General Inquiries:</strong> info@eglaftech.com</li>
              <li><strong>Phone:</strong> +91-9898598257</li>
              <li><strong>Address:</strong> BH F623 Arved Transcube Plaza, Ranip, Ahmedabad, Gujarat 382480, India</li>
            </ul>
            <p className="mt-4">
              You can also reach us through our <Link to="/contact" className="text-primary hover:underline">contact page</Link> for any privacy-related inquiries.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
