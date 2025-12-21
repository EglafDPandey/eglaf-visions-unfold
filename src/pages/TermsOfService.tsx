import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-display font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">Last updated: December 2024</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
            <p>By accessing and using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">2. Services</h2>
            <p>Eglaf Technology LLP provides software development, consulting, and related technology services. Specific terms for individual projects are outlined in separate agreements.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">3. Intellectual Property</h2>
            <p>All intellectual property rights in our services and deliverables are governed by the specific project agreements. Generally, clients receive full rights to custom-developed solutions upon full payment.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">4. Payment Terms</h2>
            <p>Payment terms are specified in individual project proposals and contracts. Standard terms require a deposit before project commencement.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">5. Confidentiality</h2>
            <p>We maintain strict confidentiality of all client information and project details. Mutual NDAs are available upon request.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">6. Limitation of Liability</h2>
            <p>Our liability is limited to the amount paid for services. We are not liable for indirect, incidental, or consequential damages.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">7. Termination</h2>
            <p>Either party may terminate services with written notice as specified in the project agreement.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">8. Governing Law</h2>
            <p>These terms are governed by applicable laws. Any disputes will be resolved through arbitration.</p>
            
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">9. Contact</h2>
            <p>For questions about these terms, contact us at legal@eglaftech.com.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
