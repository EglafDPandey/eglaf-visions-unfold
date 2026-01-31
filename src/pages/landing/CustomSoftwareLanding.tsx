import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SEO, schemas } from '@/components/SEO';
import { 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp,
  AlertTriangle,
  XCircle,
  Clock,
  DollarSign,
  Settings,
  Database,
  Layers,
  HeartHandshake,
  Gift,
  HelpCircle,
  ChevronDown,
  Workflow,
  Target,
  Sparkles
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import eglafLogo from '@/assets/eglaf-logo.png';
import { trackCTA, trackConversion } from '@/components/tracking';
import { fbTrackViewContent } from '@/components/tracking/FacebookPixel';
import { pushToDataLayer } from '@/components/tracking/GoogleTagManager';
import { useUTMTracking, getUTMParamsForTracking } from '@/hooks/useUTMTracking';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const CustomSoftwareLanding = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Capture UTM parameters from URL
  useUTMTracking();

  // Track page view on mount with UTM params
  useEffect(() => {
    const utmParams = getUTMParamsForTracking();
    fbTrackViewContent('Custom Software Landing', 'Landing Page');
    pushToDataLayer('landing_page_view', { page_name: 'custom_software', ...utmParams });
  }, []);

  const faqs = [
    {
      question: 'Do you build fully custom software from scratch?',
      answer: 'Yes. We design and develop software tailored to your exact business requirements. Every feature, workflow, and integration is built specifically for how your business operates.'
    },
    {
      question: 'Is custom software expensive?',
      answer: "It's often more cost-effective long term than paying monthly for multiple tools that don't scale. Custom software eliminates subscription fees, reduces manual work, and grows with your business."
    },
    {
      question: 'Do you provide support after launch?',
      answer: 'Yes. We offer ongoing support, optimization, and enhancements. We believe in long-term partnerships, not just project handoffs.'
    },
    {
      question: 'How long does custom software development take?',
      answer: 'Timelines depend on complexity, but we always define clear milestones upfront. Most projects range from 2-6 months, with phased delivery so you see progress early.'
    }
  ];

  const scrollToContact = () => {
    trackCTA('Get Consultation', 'Custom Software Landing');
    document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHowItWorksClick = () => {
    trackCTA('See How It Works', 'Custom Software Landing');
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Custom Software Development"
        description="Custom software built exactly for your business. We design and develop software that removes manual work, fixes broken processes, and scales as you grow. Get a free consultation today."
        keywords="custom software development, bespoke software, business automation, custom CRM, enterprise software, software development company India, Ahmedabad software company"
        canonical="https://eglaftechnology.com/lp/custom-software"
        schema={[
          schemas.service({
            name: 'Custom Software Development',
            description: 'We design and develop custom software solutions that automate processes, centralize data, and scale with your business growth.',
            url: 'https://eglaftechnology.com/lp/custom-software'
          })
        ]}
      />

      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={eglafLogo} alt="Eglaf Technology" className="h-8 w-auto" />
            <span className="font-semibold text-foreground hidden sm:inline">Eglaf Technology LLP</span>
          </div>
          <Button onClick={scrollToContact} size="sm" className="bg-primary hover:bg-primary/90">
            Get Free Consultation
          </Button>
        </div>
      </header>

      {/* Hero Section - Above the Fold */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Copy */}
            <motion.div {...fadeInUp} className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Custom Software Built Exactly for Your Business — 
                <span className="text-primary"> Not Someone Else's</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                We design and develop custom software that removes manual work, fixes broken processes, and scales as your business grows — without bloated features or vendor lock-in.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={scrollToContact} size="xl" className="bg-primary hover:bg-primary/90 text-lg font-semibold">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Get a Free Software Consultation
                </Button>
                <Button variant="outline" size="xl" className="text-lg" asChild>
                  <a href="#how-it-works" onClick={handleHowItWorksClick}>
                    See How It Works
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground pt-2">
                Trusted by startups & growing businesses | 10+ years experience | 35+ projects delivered
              </p>
            </motion.div>

            {/* Right Side - Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-2xl p-8 border border-border/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
                <div className="relative space-y-6">
                  {/* Workflow visualization */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 bg-card/80 rounded-lg p-4 text-center border border-border/50">
                      <Workflow className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Manual Workflow</span>
                    </div>
                    <ArrowRight className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="flex-1 bg-card/80 rounded-lg p-4 text-center border border-border/50">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <span className="text-sm font-medium">Automation</span>
                    </div>
                    <ArrowRight className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="flex-1 bg-card/80 rounded-lg p-4 text-center border border-border/50">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <span className="text-sm font-medium">Growth</span>
                    </div>
                  </div>

                  {/* Dashboard preview */}
                  <div className="bg-card/90 rounded-lg p-4 border border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-xs text-muted-foreground ml-2">Custom Dashboard</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-muted/50 rounded p-2 h-16" />
                      <div className="bg-primary/20 rounded p-2 h-16" />
                      <div className="bg-muted/50 rounded p-2 h-16" />
                    </div>
                    <div className="mt-2 bg-muted/30 rounded h-24" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section (PAS - P) */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Your Business Is Forced to Work Around Software That Was Never Built for You
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: XCircle, text: "Off-the-shelf tools don't match your workflows" },
              { icon: Clock, text: "Teams waste hours on manual work and spreadsheets" },
              { icon: Layers, text: "Multiple tools don't talk to each other" },
              { icon: TrendingUp, text: "Scaling becomes painful and expensive" },
              { icon: DollarSign, text: "You're paying for features you never use" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card/50 border-destructive/20 hover:border-destructive/40 transition-colors">
                  <CardContent className="p-6 flex items-start gap-4">
                    <item.icon className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                    <p className="text-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <p className="text-center mt-10 text-lg text-muted-foreground max-w-2xl mx-auto">
            👉 Most businesses don't have a <strong className="text-foreground">software problem</strong>. They have a <strong className="text-foreground">fit problem</strong>.
          </p>
        </div>
      </section>

      {/* Agitation Section (PAS - A) */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground">
                And Every Month You Delay, It Gets Worse
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                { text: "More manual work = more errors", color: "text-red-500" },
                { text: "More tools = more confusion", color: "text-orange-500" },
                { text: "More users = slower systems", color: "text-yellow-500" },
                { text: "More growth = higher operational cost", color: "text-destructive" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg"
                >
                  <ArrowRight className={`h-5 w-5 ${item.color}`} />
                  <span className="text-foreground font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 md:p-8 text-center">
              <p className="text-lg text-foreground mb-4">
                <strong>Worst part?</strong><br />
                You start designing your business around software limitations instead of letting software support your business.
              </p>
              <p className="text-muted-foreground">
                That's not scalable. And it's definitely not competitive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section (PAS - S) */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground">
              That's Exactly Why Custom Software Exists
            </h2>
            <p className="text-lg text-muted-foreground">
              Custom software is built around how your business actually works — not the other way around.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto mb-10">
            <p className="text-lg text-foreground text-center mb-8">
              At <strong>Eglaf Technology LLP</strong>, we design and develop custom software solutions that:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Zap, text: "Automate repetitive processes" },
                { icon: Database, text: "Centralize data & workflows" },
                { icon: Layers, text: "Integrate with your existing systems" },
                { icon: TrendingUp, text: "Scale with your business growth" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border/50"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-center">
            <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium">No unnecessary features</span>
            <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium">No vendor lock-in</span>
            <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium">No shortcuts</span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
              What You Get With Our Custom Software
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Software tailored to your exact workflows",
              "Faster operations with fewer errors",
              "One system instead of 5 disconnected tools",
              "Full control over features and data",
              "Scalable architecture for future growth",
              "Long-term cost savings vs. subscriptions"
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4"
              >
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-center mt-10 text-lg text-muted-foreground">
            This isn't "development". This is <strong className="text-foreground">business enablement through technology</strong>.
          </p>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Trusted by Growing Businesses
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { value: "10+", label: "Years of Experience" },
              { value: "35+", label: "Custom Projects Delivered" },
              { value: "100%", label: "Startup & SMB Focus" },
              { value: "Long-Term", label: "Client Partnerships" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-card rounded-xl border border-border/50"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <blockquote className="max-w-3xl mx-auto text-center">
            <p className="text-xl italic text-foreground mb-4">
              "Eglaf didn't just build software — they understood our process and fixed the real problem."
            </p>
            <cite className="text-muted-foreground">— Happy Client</cite>
          </blockquote>
        </div>
      </section>

      {/* Problem → Solution Match */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 md:p-8"
            >
              <h3 className="text-xl font-bold mb-6 text-foreground">If This Sounds Like You…</h3>
              <ul className="space-y-4">
                {[
                  "Our tools don't match our process",
                  "Everything is manual and slow",
                  "We've outgrown our current system",
                  "We need something scalable, not temporary"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">"{item}"</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8"
            >
              <h3 className="text-xl font-bold mb-6 text-foreground">Then This Is What You Need</h3>
              <p className="text-muted-foreground mb-6">
                A custom-built software solution designed specifically for your operations, users, and growth plans.
              </p>
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                <span className="font-semibold text-foreground">Built for YOU, not the masses</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Eglaf Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <HeartHandshake className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Businesses Choose Eglaf Technology
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Target, text: "We start with business understanding, not code" },
              { icon: Settings, text: "We design before we develop" },
              { icon: Layers, text: "We build scalable, maintainable systems" },
              { icon: Users, text: "We communicate clearly — no tech confusion" },
              { icon: Shield, text: "We support you after launch" },
              { icon: HeartHandshake, text: "We don't disappear after delivery" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border/50"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-center mt-10 text-lg text-muted-foreground">
            We don't disappear after delivery. <strong className="text-foreground">We partner for the long term.</strong>
          </p>
        </div>
      </section>

      {/* Consultation CTA Section */}
      <section id="consultation" className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Start With a Free Software Consultation
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Instead of pushing proposals blindly, we begin with a free consultation where we:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
              {[
                "Understand your business process",
                "Identify automation opportunities",
                "Suggest the right software approach",
                "Estimate scope & timeline realistically"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mb-8">👉 No obligation. No pressure.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" className="bg-primary hover:bg-primary/90 text-lg font-semibold" asChild>
                <Link to="/quote">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Get a Free Consultation
                </Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8 text-muted-foreground">
              <a href="tel:+919898598257" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
                +91 98985 98257
              </a>
              <a href="mailto:contact@eglaftechnology.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                contact@eglaftechnology.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Gift className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground">
              When You Start a Project With Us, You Also Get:
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                "🎁 Architecture planning session",
                "🎁 Scalability & security recommendations",
                "🎁 Integration roadmap",
                "🎁 Post-launch optimization guidance"
              ].map((item, index) => (
                <div key={index} className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-left">
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground">
              These are things most agencies charge extra for. <strong className="text-foreground">We include them because they matter.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Our Commitment
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Transparent scope & milestones",
                "Clear communication at every stage",
                "No hidden costs",
                "No overengineering"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-muted-foreground">
              If something doesn't make sense, we explain it — <strong className="text-foreground">plainly</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Recap Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-foreground">
              Quick Recap
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
              {[
                "Custom software built for your business",
                "Designed for scalability, not shortcuts",
                "Business-first, not code-first",
                "Free consultation to start"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 md:p-8">
              <p className="text-xl font-semibold text-foreground">
                The Real Question Is:
              </p>
              <p className="text-lg text-muted-foreground mt-2">
                How much longer can your business afford to work around bad software?
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg border border-border/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-4 md:px-6 pb-4 md:pb-6">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
              Ready to Build Software That Actually Works for You?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Stop forcing your business to adapt to software.<br />
              Build software that adapts to your business.
            </p>

            <Button size="xl" variant="secondary" className="text-lg font-semibold mb-8" asChild>
              <Link to="/quote">
                <ArrowRight className="mr-2 h-5 w-5" />
                Get a Free Software Consultation
              </Link>
            </Button>

            <div className="flex flex-col sm:flex-row gap-6 justify-center text-primary-foreground/80">
              <a href="tel:+919898598257" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Phone className="h-5 w-5" />
                +91 98985 98257
              </a>
              <a href="mailto:contact@eglaftechnology.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Mail className="h-5 w-5" />
                contact@eglaftechnology.com
              </a>
            </div>

            <p className="mt-8 text-primary-foreground/60 text-sm">
              Eglaf Technology LLP
            </p>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 bg-background border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={eglafLogo} alt="Eglaf Technology" className="h-6 w-auto" />
              <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Eglaf Technology LLP</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomSoftwareLanding;
