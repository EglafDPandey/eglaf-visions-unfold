import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Terms of Service"
        description="Eglaf Technology's Terms of Service. Read our terms and conditions for using our software development, web development, and consulting services."
      />
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-display font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">Last updated: January 2025</p>
            
            <p>
              Welcome to Eglaf Technology LLP ("Company", "we", "our", or "us"). These Terms of Service ("Terms") govern your access to and use of our website at <Link to="/" className="text-primary hover:underline">eglaftechnology.com</Link> and our software development, consulting, and related technology services. By accessing our website or engaging our services, you agree to be bound by these Terms.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
            <p>
              By accessing and using our website or services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>, and all applicable laws and regulations. If you do not agree with any part of these terms, you must not use our website or services.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">2. Description of Services</h2>
            <p>Eglaf Technology LLP provides comprehensive technology solutions, including but not limited to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><Link to="/services/web-development" className="text-primary hover:underline">Custom web development</Link> and web application development using modern technologies like React, Next.js, Vue.js, and Node.js.</li>
              <li><Link to="/services/mobile-development" className="text-primary hover:underline">Mobile application development</Link> for iOS and Android platforms using Flutter, React Native, Swift, and Kotlin.</li>
              <li><Link to="/services/ai-solutions" className="text-primary hover:underline">AI and machine learning solutions</Link> including custom AI models, chatbots, and intelligent automation.</li>
              <li><Link to="/services/crm-development" className="text-primary hover:underline">CRM development and customization</Link> for Salesforce, HubSpot, and custom CRM platforms.</li>
              <li><Link to="/services/seo-services" className="text-primary hover:underline">SEO and digital marketing services</Link> to improve online visibility and search rankings.</li>
              <li>Technology consulting, software maintenance, and support services.</li>
            </ul>
            <p>Specific terms for individual projects are outlined in separate project proposals, statements of work, or service agreements.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">3. Project Engagement</h2>
            <p>
              All project engagements begin with a discovery phase where we understand your requirements and provide a detailed proposal. Upon acceptance of the proposal and receipt of any required deposits, we will proceed with the project according to the agreed timeline and <Link to="/methodology" className="text-primary hover:underline">methodology</Link>.
            </p>
            <p>
              Changes to project scope, timeline, or requirements after project initiation may result in additional costs and timeline adjustments, which will be communicated and agreed upon before implementation.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">4. Intellectual Property Rights</h2>
            <p>
              <strong>Client Materials:</strong> You retain all rights to any content, data, or materials you provide to us for the project. You grant us a limited license to use these materials solely for the purpose of delivering the agreed services.
            </p>
            <p>
              <strong>Deliverables:</strong> Upon full payment for services rendered, you receive ownership rights to custom-developed solutions, code, and deliverables as specified in the project agreement. Standard terms include full intellectual property transfer upon complete payment.
            </p>
            <p>
              <strong>Third-Party Components:</strong> Some projects may include open-source libraries, frameworks, or third-party components, which remain subject to their respective licenses. We will clearly identify any such components and their licensing terms.
            </p>
            <p>
              <strong>Our Tools and Methods:</strong> We retain ownership of our proprietary tools, methodologies, frameworks, and general knowledge developed independently of your project.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">5. Payment Terms</h2>
            <p>Payment terms are specified in individual project proposals and contracts. Our standard payment structure typically includes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Deposit:</strong> A non-refundable deposit (typically 30-50% of project value) is required before project commencement.</li>
              <li><strong>Milestone Payments:</strong> Additional payments are due upon completion of agreed project milestones.</li>
              <li><strong>Final Payment:</strong> The remaining balance is due upon project completion and delivery.</li>
            </ul>
            <p>
              Invoices are due within 15 days of issuance unless otherwise specified. Late payments may incur interest charges and may result in project suspension. All prices are in USD or INR as specified in the proposal.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">6. Confidentiality</h2>
            <p>
              We maintain strict confidentiality of all client information, project details, business strategies, and proprietary data. We will not disclose your confidential information to any third party without your prior written consent, except as required by law.
            </p>
            <p>
              Mutual Non-Disclosure Agreements (NDAs) are available upon request for projects involving sensitive or proprietary information. Our team members are bound by confidentiality obligations.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">7. Warranties and Representations</h2>
            <p>We warrant that:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Our services will be performed in a professional and workmanlike manner.</li>
              <li>Deliverables will substantially conform to the specifications agreed upon in the project documentation.</li>
              <li>We have the right to provide the services and grant the licenses described herein.</li>
            </ul>
            <p>
              We provide a warranty period (typically 30-90 days as specified in the project agreement) during which we will fix any bugs or defects in the delivered software at no additional cost.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, our total liability for any claims arising from these Terms or our services shall not exceed the total amount paid by you for the specific services giving rise to the claim.
            </p>
            <p>
              We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or goodwill, regardless of whether such damages were foreseeable.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">9. Termination</h2>
            <p>
              Either party may terminate a project engagement with written notice as specified in the project agreement. Upon termination:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You will be responsible for payment for all work completed up to the termination date.</li>
              <li>We will deliver all completed work and work in progress to you.</li>
              <li>Any advance payments for incomplete work will be refunded on a pro-rata basis.</li>
            </ul>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">10. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or our services shall first be attempted to be resolved through good-faith negotiation between the parties.
            </p>
            <p>
              If negotiation fails, disputes shall be resolved through binding arbitration conducted in Ahmedabad, Gujarat, India, in accordance with the Arbitration and Conciliation Act, 1996. The language of arbitration shall be English.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">11. Website Use</h2>
            <p>When using our website, you agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the website for any unlawful purpose or in violation of any applicable laws.</li>
              <li>Attempt to gain unauthorized access to our systems or networks.</li>
              <li>Transmit any viruses, malware, or other malicious code.</li>
              <li>Interfere with the proper functioning of the website.</li>
              <li>Copy, reproduce, or distribute our content without permission.</li>
            </ul>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of significant changes by posting the updated Terms on this page with a revised effective date. Your continued use of our website or services after such changes constitutes acceptance of the modified Terms.
            </p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">13. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li><strong>Email:</strong> legal@eglaftech.com</li>
              <li><strong>General Inquiries:</strong> info@eglaftech.com</li>
              <li><strong>Phone:</strong> +91-9898598257</li>
              <li><strong>Address:</strong> BH F623 Arved Transcube Plaza, Ranip, Ahmedabad, Gujarat 382480, India</li>
            </ul>
            <p className="mt-4">
              For service inquiries, please visit our <Link to="/contact" className="text-primary hover:underline">contact page</Link> or <Link to="/quote" className="text-primary hover:underline">request a quote</Link>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
