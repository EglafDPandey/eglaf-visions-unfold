import { Link, useLocation, createSearchParams } from 'react-router-dom';
import { FileText, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/components/GoogleAnalytics';

export function StickyMobileCTA() {
  const location = useLocation();

  // Don't show on quote, contact, or admin pages
  const hiddenPaths = ['/quote', '/contact', '/admin', '/apply'];
  if (hiddenPaths.some(p => location.pathname.startsWith(p))) return null;

  const quoteTo = {
    pathname: '/quote',
    search: createSearchParams({ from: location.pathname }).toString(),
  };

  const handleQuoteClick = () => {
    trackEvent('sticky_cta_click', 'Lead Generation', 'mobile_quote');
  };

  const handleCallClick = () => {
    trackEvent('sticky_cta_click', 'Lead Generation', 'mobile_call');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-border px-3 py-2.5 safe-area-bottom">
      <div className="flex gap-2">
        <a
          href="tel:+919898598257"
          onClick={handleCallClick}
          className="flex-1"
        >
          <Button variant="outline" size="sm" className="w-full text-xs gap-1.5 h-10">
            <Phone className="w-3.5 h-3.5" />
            Call Now
          </Button>
        </a>
        <Link to={quoteTo} onClick={handleQuoteClick} className="flex-[2]">
          <Button variant="hero" size="sm" className="w-full text-xs gap-1.5 h-10 font-semibold">
            <FileText className="w-3.5 h-3.5" />
            Get Free Quote
          </Button>
        </Link>
      </div>
    </div>
  );
}
