import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FileText, Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { toast } from 'sonner';
import { trackEvent, trackConversion } from '@/components/GoogleAnalytics';
import { fbTrackLead } from '@/components/tracking/FacebookPixel';
import { trackFormSubmission } from '@/components/tracking/GoogleTagManager';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const quoteRequestSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email is too long'),
  phone: z.string().trim().max(20, 'Phone number is too long').optional().or(z.literal('')),
  company: z.string().trim().max(100, 'Company name is too long').optional().or(z.literal('')),
  projectTitle: z.string().trim().min(5, 'Project title must be at least 5 characters').max(200, 'Project title is too long'),
  projectDescription: z.string().trim().min(20, 'Project description must be at least 20 characters').max(10000, 'Project description is too long'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  existingWebsite: z.string().trim().url('Invalid URL').max(500, 'URL is too long').optional().or(z.literal('')),
  additionalInfo: z.string().trim().max(5000, 'Additional info is too long').optional().or(z.literal('')),
});

const services = [
  { id: 'web-development', label: 'Web Development' },
  { id: 'mobile-app', label: 'Mobile App Development' },
  { id: 'custom-software', label: 'Custom Software Development' },
  { id: 'ai-solutions', label: 'AI Solutions' },
  { id: 'crm-development', label: 'CRM Development' },
  { id: 'seo-services', label: 'SEO Services' },
  { id: 'ui-ux-design', label: 'UI/UX Design' },
  { id: 'other', label: 'Other' },
];

const budgetRanges = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: 'over-100k', label: 'Over $100,000' },
  { value: 'not-sure', label: 'Not Sure Yet' },
];

const timelines = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-month', label: 'Within 1 Month' },
  { value: '1-3-months', label: '1-3 Months' },
  { value: '3-6-months', label: '3-6 Months' },
  { value: '6-plus-months', label: '6+ Months' },
  { value: 'flexible', label: 'Flexible' },
];

export default function QuoteRequest() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQuickMode, setIsQuickMode] = useState(true);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [quickFormData, setQuickFormData] = useState({ name: '', phone: '', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectTitle: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    existingWebsite: '',
    additionalInfo: '',
  });

  useEffect(() => {
    const service = searchParams.get('service');
    if (service) {
      const matchedService = services.find(s => 
        s.label.toLowerCase().includes(service.toLowerCase()) ||
        service.toLowerCase().includes(s.label.toLowerCase())
      );
      if (matchedService) {
        setSelectedServices([matchedService.id]);
      }
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, phone, message } = quickFormData;
    if (!name.trim() || name.trim().length < 2) { toast.error('Please enter your name'); return; }
    if (!phone.trim() || phone.trim().length < 7) { toast.error('Please enter a valid phone number'); return; }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contacts').insert({
        name: name.trim(),
        email: `${phone.trim()}@phone-lead.local`,
        phone: phone.trim(),
        message: message.trim() || 'Quick enquiry from quote page',
      });
      if (error) throw error;
      trackConversion('quick_enquiry', { source: 'quote_page' });
      trackEvent('form_submit', 'Quick Enquiry', 'quote_page');
      fbTrackLead();
      trackFormSubmission('quick_enquiry', { source: 'quote_page' });
      toast.success('Thank you! We\'ll call you back within 2 hours.');
      setQuickFormData({ name: '', phone: '', message: '' });
    } catch {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedServices.length === 0) {
      toast.error('Please select at least one service');
      return;
    }
    
    if (!formData.budget) {
      toast.error('Please select a budget range');
      return;
    }
    
    if (!formData.timeline) {
      toast.error('Please select a timeline');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Validate form data
      const validatedData = quoteRequestSchema.parse(formData);
      
      // Save to database
      const { error } = await supabase
        .from('quote_requests')
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          company: validatedData.company || null,
          services: selectedServices,
          project_title: validatedData.projectTitle,
          project_description: validatedData.projectDescription,
          budget: validatedData.budget,
          timeline: validatedData.timeline,
          existing_website: validatedData.existingWebsite || null,
          additional_info: validatedData.additionalInfo || null,
        });

      if (error) {
        throw error;
      }
      
      // Track conversion for quote request (GA4)
      trackConversion('quote_request', {
        services: selectedServices.join(', '),
        budget: validatedData.budget,
        timeline: validatedData.timeline,
      });
      
      // Track event for detailed analytics (GA4)
      trackEvent('form_submit', 'Quote Request', selectedServices.join(', '));
      
      // Track lead for Facebook Pixel
      fbTrackLead();
      
      // Track form submission for GTM
      trackFormSubmission('quote_request', {
        services: selectedServices,
        budget: validatedData.budget,
        timeline: validatedData.timeline,
      });
      
      toast.success('Quote request submitted successfully! We\'ll get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectTitle: '',
        projectDescription: '',
        budget: '',
        timeline: '',
        existingWebsite: '',
        additionalInfo: '',
      });
      setSelectedServices([]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error('Error submitting quote request:', error);
        toast.error('Failed to submit quote request. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Request a Quote"
        description="Get a free quote for your software development project from Eglaf Technology. Web, mobile, AI, and custom software solutions."
        keywords="get quote, project estimate, software development cost, free consultation"
      />
      <Navbar />
      
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Button 
            variant="ghost" 
            className="mb-8 text-muted-foreground hover:text-primary"
            onClick={() => {
              const from = searchParams.get('from');
              if (from && from.startsWith('/')) {
                navigate(from);
                return;
              }

              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate('/');
              }
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent p-0.5">
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Get a <span className="gradient-text">Free Quote</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your project and we'll provide a detailed quote within 24 hours.
            </p>

            {/* Quick / Detailed Toggle */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => setIsQuickMode(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isQuickMode ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                ⚡ Quick Enquiry
              </button>
              <button
                type="button"
                onClick={() => setIsQuickMode(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!isQuickMode ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                📋 Detailed Quote
              </button>
            </div>
          </motion.div>

          {/* Quick Enquiry Form */}
          {isQuickMode ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg mx-auto"
            >
              <form onSubmit={handleQuickSubmit} className="glass-card p-8 space-y-5">
                <div className="text-center mb-2">
                  <p className="text-sm text-muted-foreground">Just 3 fields — we'll call you back!</p>
                </div>
                <Input
                  name="name"
                  placeholder="Your Name *"
                  required
                  value={quickFormData.name}
                  onChange={(e) => setQuickFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-muted/50 h-12"
                />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone / WhatsApp Number *"
                  required
                  value={quickFormData.phone}
                  onChange={(e) => setQuickFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-muted/50 h-12"
                />
                <Textarea
                  name="message"
                  placeholder="What do you need help with?"
                  rows={3}
                  value={quickFormData.message}
                  onChange={(e) => setQuickFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="bg-muted/50 resize-none"
                />
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : <>📞 Get Free Callback</>}
                </Button>
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span>✓ Free Consultation</span>
                  <span>✓ No Obligation</span>
                  <span>✓ Reply in 2 Hours</span>
                </div>
              </form>
            </motion.div>
          ) : (

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 space-y-8">
              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">1</span>
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-muted/50"
                    />
                  </div>
                </div>
              </div>

              {/* Services Selection */}
              <div>
                <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">2</span>
                  Services Required *
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedServices.includes(service.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 bg-muted/30'
                      }`}
                    >
                      <Checkbox
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                      />
                      <span className="text-sm font-medium">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">3</span>
                  Project Details
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectTitle">Project Title *</Label>
                    <Input
                      id="projectTitle"
                      name="projectTitle"
                      placeholder="e.g., E-commerce Website Redesign"
                      required
                      value={formData.projectTitle}
                      onChange={handleChange}
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectDescription">Project Description *</Label>
                    <Textarea
                      id="projectDescription"
                      name="projectDescription"
                      placeholder="Describe your project goals, features, and any specific requirements..."
                      required
                      rows={5}
                      value={formData.projectDescription}
                      onChange={handleChange}
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="existingWebsite">Existing Website (if any)</Label>
                    <Input
                      id="existingWebsite"
                      name="existingWebsite"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={formData.existingWebsite}
                      onChange={handleChange}
                      className="bg-muted/50"
                    />
                  </div>
                </div>
              </div>

              {/* Budget & Timeline */}
              <div>
                <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">4</span>
                  Budget & Timeline
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Budget Range *</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                    >
                      <SelectTrigger className="bg-muted/50">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Project Timeline *</Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}
                    >
                      <SelectTrigger className="bg-muted/50">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelines.map((timeline) => (
                          <SelectItem key={timeline.value} value={timeline.value}>
                            {timeline.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">5</span>
                  Additional Information
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Anything else we should know?</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    placeholder="Share any additional details, references, or specific requirements..."
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="bg-muted/50"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Quote Request
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  We'll respond within 24 hours with a detailed proposal.
                </p>
              </div>
            </form>
          </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}