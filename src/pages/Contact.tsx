import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'dpandey@eglaftechnology.com', href: 'mailto:dpandey@eglaftechnology.com' },
  { icon: Phone, label: 'Phone', value: '+91 9898598257', href: 'tel:+919898598257' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+91 9898598257', href: 'https://wa.me/919898598257' },
  { icon: MapPin, label: 'Location', value: 'BH F623 Arved Transcube Plaza, Ranip, Ahmedabad, Gujarat 382480, India', href: 'https://maps.google.com/?q=Arved+Transcube+Plaza+Ranip+Ahmedabad' },
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prefills = useMemo(() => {
    const state = (location.state as { service?: string; subject?: string } | null) ?? null;
    const service = state?.service ?? searchParams.get('service') ?? undefined;
    const subject = state?.subject ?? searchParams.get('subject') ?? undefined;

    return { service, subject };
  }, [location.state, searchParams]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const { service, subject } = prefills;

    if (service || subject) {
      setFormData((prev) => ({
        ...prev,
        subject: subject || `Inquiry about ${service}`,
        message: service
          ? `Hi, I'm interested in ${service}. Please provide more details about availability and rates.`
          : prev.message,
      }));
    }
  }, [prefills]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Message sent successfully!');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to transform your ideas into reality? Get in touch with our team.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8">
              <h3 className="text-xl font-display font-semibold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input name="name" placeholder="Your Name" required className="bg-muted/50" value={formData.name} onChange={handleChange} />
                  <Input name="email" type="email" placeholder="Email Address" required className="bg-muted/50" value={formData.email} onChange={handleChange} />
                </div>
                <Input name="phone" placeholder="Phone Number" className="bg-muted/50" value={formData.phone} onChange={handleChange} />
                <Input name="subject" placeholder="Subject" required className="bg-muted/50" value={formData.subject} onChange={handleChange} />
                <Textarea name="message" placeholder="Your Message" required rows={5} className="bg-muted/50" value={formData.message} onChange={handleChange} />
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : <><Send className="w-4 h-4 mr-2" />Send Message</>}
                </Button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="glass-card p-8">
                <h3 className="text-xl font-display font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <a key={item.label} href={item.href} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
