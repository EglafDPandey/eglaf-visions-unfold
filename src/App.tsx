import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

// Critical route - load immediately
import Index from "./pages/Index";

// Lazy load all other routes
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Careers = lazy(() => import("./pages/Careers"));
const Apply = lazy(() => import("./pages/Apply"));
const Contact = lazy(() => import("./pages/Contact"));

const Portfolio = lazy(() => import("./pages/Portfolio"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const MobileAppDevelopment = lazy(() => import("./pages/services/MobileAppDevelopment"));
const AISolutions = lazy(() => import("./pages/services/AISolutions"));
const CRMDevelopment = lazy(() => import("./pages/services/CRMDevelopment"));
const WebDevelopment = lazy(() => import("./pages/services/WebDevelopment"));
const SEOServices = lazy(() => import("./pages/services/SEOServices"));
const CustomSoftware = lazy(() => import("./pages/services/CustomSoftware"));
const QuoteRequest = lazy(() => import("./pages/QuoteRequest"));
const Methodology = lazy(() => import("./pages/Methodology"));

const queryClient = new QueryClient();

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <GoogleAnalytics />
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/contact" element={<Contact />} />
                
                <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/services/mobile-development" element={<MobileAppDevelopment />} />
                <Route path="/services/ai-solutions" element={<AISolutions />} />
                <Route path="/services/crm-development" element={<CRMDevelopment />} />
                <Route path="/services/web-development" element={<WebDevelopment />} />
                <Route path="/services/seo-services" element={<SEOServices />} />
                <Route path="/services/custom-software" element={<CustomSoftware />} />
                <Route path="/quote" element={<QuoteRequest />} />
                <Route path="/methodology" element={<Methodology />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
