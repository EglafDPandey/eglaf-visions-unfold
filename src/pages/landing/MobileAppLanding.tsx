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
  Smartphone,
  Layers,
  HeartHandshake,
  Gift,
  HelpCircle,
  ChevronDown,
  Tablet,
  Target,
  Sparkles,
  Download,
  Star,
  Globe
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import eglafLogo from '@/assets/eglaf-logo.png';
import { trackCTA, trackConversion } from '@/components/tracking';
import { fbTrackViewContent } from '@/components/tracking/FacebookPixel';
import { pushToDataLayer } from '@/components/tracking/GoogleTagManager';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const MobileAppLanding = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Track page view on mount
  useEffect(() => {
    fbTrackViewContent('Mobile App Development Landing', 'Landing Page');
    pushToDataLayer('landing_page_view', { page_name: 'mobile_app_development' });
  }, []);

  const faqs = [
    {
      question: 'Do you build apps for both iOS and Android?',
      answer: 'Yes. We develop native apps for both platforms, as well as cross-platform solutions using Flutter and React Native that work seamlessly on iOS and Android from a single codebase.'
    },
    {
      question: 'How much does mobile app development cost?',
      answer: 'Costs vary based on complexity, features, and platform requirements. We provide detailed estimates after understanding your requirements. Our focus is on delivering value, not just features.'
    },
    {
      question: 'How long does it take to build a mobile app?',
      answer: 'Typical timelines range from 3-6 months depending on complexity. We use agile development with regular milestones so you see progress throughout the process.'
    },
    {
      question: 'Do you provide app maintenance and updates?',
      answer: 'Yes. We offer ongoing maintenance, bug fixes, performance optimization, and feature updates. We also handle app store submissions and updates for you.'
    },
    {
      question: 'Will my app work offline?',
      answer: 'We can build offline-first functionality into your app, allowing users to access key features without internet connectivity and sync data when back online.'
    }
  ];

  const scrollToContact = () => {
    trackCTA('Get Consultation', 'Mobile App Landing');
    document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHowItWorksClick = () => {
    trackCTA('See How It Works', 'Mobile App Landing');
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Mobile App Development"
        description="Custom mobile app development for iOS and Android. We build high-performance, user-friendly apps using Flutter, React Native, and native technologies. Get a free consultation today."
        keywords="mobile app development, iOS app development, Android app development, Flutter development, React Native, cross-platform apps, mobile app company India, Ahmedabad app developers"
        canonical="https://eglaftechnology.com/lp/mobile-app"
        schema={[
          schemas.service({
            name: 'Mobile App Development',
            description: 'We design and develop custom mobile applications for iOS and Android that deliver exceptional user experiences and drive business growth.',
            url: 'https://eglaftechnology.com/lp/mobile-app'
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
                Mobile Apps That Users Actually
                <span className="text-primary"> Love to Use</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                We design and develop custom mobile apps for iOS and Android that are fast, intuitive, and built to scale — turning your idea into an app your users can't put down.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={scrollToContact} size="xl" className="bg-primary hover:bg-primary/90 text-lg font-semibold">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Get a Free App Consultation
                </Button>
                <Button variant="outline" size="xl" className="text-lg" asChild>
                  <a href="#how-it-works" onClick={handleHowItWorksClick}>
                    See Our Process
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground pt-2">
                iOS & Android | Flutter & React Native | 10+ years experience | 50+ apps delivered
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
                <div className="relative flex items-center justify-center gap-6">
                  {/* Phone mockup */}
                  <div className="relative">
                    <div className="w-48 h-96 bg-card rounded-[2rem] border-4 border-foreground/20 shadow-2xl overflow-hidden">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-foreground/20 rounded-full" />
                      <div className="mt-10 p-4 space-y-3">
                        <div className="h-8 bg-primary/30 rounded-lg" />
                        <div className="h-24 bg-muted/50 rounded-lg" />
                        <div className="h-12 bg-primary/20 rounded-lg" />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-16 bg-muted/40 rounded-lg" />
                          <div className="h-16 bg-muted/40 rounded-lg" />
                        </div>
                        <div className="h-10 bg-primary rounded-lg flex items-center justify-center">
                          <span className="text-xs text-primary-foreground font-medium">Get Started</span>
                        </div>
                      </div>
                    </div>
                    {/* Floating elements */}
                    <div className="absolute -right-4 top-16 bg-green-500 text-white p-2 rounded-full shadow-lg animate-bounce">
                      <Download className="h-4 w-4" />
                    </div>
                    <div className="absolute -left-4 top-32 bg-yellow-500 text-white p-2 rounded-full shadow-lg">
                      <Star className="h-4 w-4" />
                    </div>
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
              Your App Idea Deserves Better Than a Cookie-Cutter Solution
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: XCircle, text: "Template apps look generic and fail to stand out" },
              { icon: Clock, text: "Slow, buggy apps drive users away permanently" },
              { icon: Layers, text: "Poor UX leads to low ratings and bad reviews" },
              { icon: TrendingUp, text: "Apps that can't scale break under user growth" },
              { icon: DollarSign, text: "Cheap development costs more in rewrites later" },
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
            👉 The difference between a <strong className="text-foreground">successful app</strong> and a <strong className="text-foreground">forgotten download</strong> is in the details.
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
                In the App Store, First Impressions Are Everything
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                { text: "77% of users uninstall within 3 days", color: "text-red-500" },
                { text: "One star drop = 9% fewer downloads", color: "text-orange-500" },
                { text: "Slow load times = instant uninstalls", color: "text-yellow-500" },
                { text: "Poor UX = negative reviews forever", color: "text-destructive" },
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
                <strong>The hard truth?</strong><br />
                You don't get a second chance to make a first impression in the app stores.
              </p>
              <p className="text-muted-foreground">
                Users have millions of alternatives. Your app needs to be exceptional from day one.
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
              We Build Apps That Users Love and Businesses Rely On
            </h2>
            <p className="text-lg text-muted-foreground">
              From concept to launch and beyond — we handle everything so you can focus on growing your business.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto mb-10">
            <p className="text-lg text-foreground text-center mb-8">
              At <strong>Eglaf Technology LLP</strong>, our mobile app development process delivers:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Smartphone, text: "Native iOS & Android performance" },
                { icon: Zap, text: "Lightning-fast load times" },
                { icon: Users, text: "Intuitive user experiences" },
                { icon: TrendingUp, text: "Scalable architecture from day one" },
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
            <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium">Flutter</span>
            <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium">React Native</span>
            <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium">Swift</span>
            <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium">Kotlin</span>
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
              What You Get With Our Mobile App Development
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Custom UI/UX designed for your brand",
              "Cross-platform or native — your choice",
              "App store optimization included",
              "Push notifications & analytics built-in",
              "Secure data handling & encryption",
              "Ongoing maintenance & updates"
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
            We don't just build apps. We build <strong className="text-foreground">mobile experiences that drive results</strong>.
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Trusted by Businesses Worldwide
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { number: "10+", label: "Years Experience" },
              { number: "50+", label: "Apps Delivered" },
              { number: "95%", label: "Client Satisfaction" },
              { number: "4.8★", label: "Average App Rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-card rounded-xl border border-border/50"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-primary/20">
              <CardContent className="p-6 md:p-8">
                <p className="text-lg italic text-foreground mb-4">
                  "Eglaf didn't just build our app — they understood our users and created an experience that keeps them coming back. Our retention rate doubled."
                </p>
                <p className="text-sm text-muted-foreground">— Startup Founder, FinTech Industry</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem → Solution Match */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-foreground">If This Sounds Like You…</h3>
              <ul className="space-y-4">
                {[
                  '"I have an app idea but don\'t know where to start"',
                  '"Our current app is slow and users are leaving"',
                  '"We need to reach users on both iOS and Android"',
                  '"I want an app that scales as we grow"',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 text-foreground">Then This Is What You Need</h3>
              <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
                <p className="text-foreground">
                  A <strong>custom mobile app</strong> built specifically for your users, your business model, and your growth plans — with the performance and polish of apps from top tech companies.
                </p>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Businesses Choose Eglaf for Mobile Apps
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Target, title: "User-First Design", desc: "We design for your users, not just your requirements" },
              { icon: Zap, title: "Performance Obsessed", desc: "Every millisecond matters — we optimize relentlessly" },
              { icon: Shield, title: "Security Built-In", desc: "Enterprise-grade security from the ground up" },
              { icon: Layers, title: "Clean Architecture", desc: "Maintainable code that scales without breaking" },
              { icon: Globe, title: "Cross-Platform Expertise", desc: "Flutter, React Native, or native — we master them all" },
              { icon: HeartHandshake, title: "Long-Term Partnership", desc: "We support your app long after launch" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-card hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <item.icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Price/Offer Section */}
      <section id="consultation" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Start With a Free App Consultation
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Instead of guessing, let's discuss your app idea. In a free consultation, we:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
              {[
                "Understand your app vision and goals",
                "Identify the best technology approach",
                "Discuss platform strategy (iOS, Android, both)",
                "Provide realistic timeline & budget estimates",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mb-8">👉 No obligation. No pressure. Just clarity.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" className="bg-primary hover:bg-primary/90 text-lg" asChild>
                <Link to="/quote" onClick={() => trackCTA('Get Consultation CTA', 'Mobile App Landing')}>
                  <Phone className="mr-2 h-5 w-5" />
                  Get Your Free Consultation
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="text-lg" asChild>
                <a href="mailto:contact@eglaftechnology.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Gift className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
              When You Start a Project With Us, You Also Get:
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {[
                "🎁 UX research & competitor analysis",
                "🎁 App store optimization strategy",
                "🎁 Analytics & crash reporting setup",
                "🎁 Post-launch optimization guidance",
              ].map((item, index) => (
                <div key={index} className="p-4 bg-card rounded-lg border border-border/50">
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mt-6">
              These are things most agencies charge extra for. We include them because they matter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-start gap-4 p-6 md:p-8 bg-muted/30 rounded-xl border border-border/50">
              <Shield className="h-10 w-10 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Our Commitment</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Transparent scope & milestones</li>
                  <li>✓ Clear communication at every stage</li>
                  <li>✓ No hidden costs or surprise fees</li>
                  <li>✓ App store submission handled for you</li>
                  <li>✓ Bug fixes included post-launch</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recap + Urgency */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">Quick Recap</h2>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                "Custom mobile apps for iOS & Android",
                "Beautiful UI/UX that users love",
                "Performance-first development",
                "Free consultation to start"
              ].map((item, index) => (
                <span key={index} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  ✔ {item}
                </span>
              ))}
            </div>

            <div className="bg-card p-6 rounded-xl border border-primary/20">
              <p className="text-lg text-foreground font-medium">
                The Real Question Is:
              </p>
              <p className="text-muted-foreground mt-2">
                How much longer will you wait while competitors capture your mobile users?
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left p-4 bg-card rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium text-foreground">{faq.question}</span>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                    </div>
                    {openFaq === index && (
                      <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Build an App Users Will Love?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Stop dreaming about your app. Let's make it real — with the quality and performance your users deserve.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="xl" className="bg-primary hover:bg-primary/90 text-lg font-semibold" asChild>
                <Link to="/quote" onClick={() => trackCTA('Final CTA', 'Mobile App Landing')}>
                  Get Your Free App Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a href="tel:+919898598257" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" />
                +91-9898598257
              </a>
              <a href="mailto:contact@eglaftechnology.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                contact@eglaftechnology.com
              </a>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Eglaf Technology LLP
            </p>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-6 bg-background border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Eglaf Technology LLP. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MobileAppLanding;
