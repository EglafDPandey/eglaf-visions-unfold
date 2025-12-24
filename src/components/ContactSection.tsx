import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'dpandey@eglaftechnology.com',
    href: 'mailto:dpandey@eglaftechnology.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9898598257',
    href: 'tel:+919898598257',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 9898598257',
    href: 'https://wa.me/919898598257',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'BH F623 Arved Transcube Plaza, Ranip, Ahmedabad, Gujarat 382480, India',
    href: 'https://maps.google.com/?q=Arved+Transcube+Plaza+Ranip+Ahmedabad',
  },
];

export function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    const { error } = await supabase.from('contacts').insert({
      name,
      email,
      phone: phone || null,
      message,
    });

    if (error) {
      toast.error('Failed to send message. Please try again.');
    } else {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      (e.target as HTMLFormElement).reset();
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/30 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10" ref={sectionRef}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary font-medium mb-6"
          >
            Get In Touch
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
          >
            Let's Build Something{' '}
            <span className="gradient-text">Amazing</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Ready to transform your ideas into reality? Get in touch with our team 
            and let's discuss your project.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-display font-semibold text-foreground mb-6">
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    name="name"
                    placeholder="John Doe"
                    required
                    className="bg-muted/50 border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="bg-muted/50 border-border focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="bg-muted/50 border-border focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Your Message
                </label>
                <Textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  required
                  rows={5}
                  className="bg-muted/50 border-border focus:border-primary resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-card p-8">
              <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map */}
            <motion.a
              href="https://maps.google.com/?q=Arved+Transcube+Plaza+Ranip+Ahmedabad"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-card p-4 h-64 flex items-center justify-center hover:border-primary/50 transition-colors"
            >
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">
                  BH F623 Arved Transcube Plaza, Opp. Ranip BRTS Stand,<br />
                  Bandhu Nagar, Vijay Nagar, Ranip, Ahmedabad,<br />
                  Gujarat 382480, India
                </p>
                <p className="text-primary text-sm mt-2">Click to view on map →</p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
