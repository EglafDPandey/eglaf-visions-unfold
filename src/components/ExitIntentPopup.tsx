import { useEffect, useState, useCallback } from 'react';
import { X, Phone, User, MessageSquare, Zap, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent, trackConversion } from '@/components/GoogleAnalytics';
import { fbTrackLead } from '@/components/tracking/FacebookPixel';
import { motion, AnimatePresence } from 'framer-motion';

const POPUP_STORAGE_KEY = 'exit_popup_dismissed';
const POPUP_COOLDOWN_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const shouldShow = useCallback(() => {
    const dismissed = localStorage.getItem(POPUP_STORAGE_KEY);
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      if (Date.now() - dismissedAt < POPUP_COOLDOWN_MS) return false;
    }
    return true;
  }, []);

  useEffect(() => {
    if (!shouldShow()) return;

    let triggered = false;
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile: trigger after 60% scroll if user hasn't interacted with forms
      const handleScroll = () => {
        if (triggered) return;
        const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
        if (scrollPercent > 0.6) {
          triggered = true;
          setTimeout(() => setIsOpen(true), 1000);
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // Desktop: exit intent (mouse leaves viewport top)
      const handleMouseLeave = (e: MouseEvent) => {
        if (triggered) return;
        if (e.clientY <= 0) {
          triggered = true;
          setIsOpen(true);
        }
      };
      // Delay listener to avoid triggering immediately
      const timer = setTimeout(() => {
        document.addEventListener('mouseleave', handleMouseLeave);
      }, 5000);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [shouldShow]);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData(e.currentTarget);
    const name = (form.get('name') as string).trim();
    const phone = (form.get('phone') as string).trim();
    const message = (form.get('message') as string || '').trim();

    if (!name || name.length < 2) {
      toast.error('Please enter your name');
      setIsSubmitting(false);
      return;
    }
    if (!phone || phone.length < 7) {
      toast.error('Please enter a valid phone number');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from('contacts').insert({
        name,
        email: `${phone}@phone-lead.local`,
        phone,
        message: message || 'Quick enquiry from exit popup',
      });

      if (error) throw error;

      trackConversion('exit_popup_lead', { source: 'exit_intent' });
      trackEvent('form_submit', 'Exit Popup', 'quick_enquiry');
      fbTrackLead();

      setSubmitted(true);
      localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString());
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-md bg-background border border-border rounded-2xl shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Thank You! 🎉</h3>
                <p className="text-muted-foreground mb-4">
                  Our team will call you within 2 hours during business hours.
                </p>
                <Button variant="hero" onClick={handleDismiss} className="w-full">
                  Continue Browsing
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                    🎁 LIMITED OFFER
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-2">
                    Wait! Get a <span className="gradient-text">Free Consultation</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Just leave your number — we'll call you back with a custom solution.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input name="name" placeholder="Your Name" required className="pl-10 bg-muted/50" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input name="phone" type="tel" placeholder="Phone / WhatsApp Number" required className="pl-10 bg-muted/50" />
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Textarea name="message" placeholder="Brief about your project (optional)" rows={2} className="pl-10 bg-muted/50 resize-none" />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : '📞 Get Free Callback'}
                  </Button>
                </form>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> No Spam</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Reply in 2hrs</span>
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> 100% Free</span>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
