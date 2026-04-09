import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Replace with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-23Z45778ZM';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Skip if no valid measurement ID
    if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      console.warn('Google Analytics: Please add your GA4 Measurement ID');
      return;
    }

    // Load gtag script if not already loaded
    if (!document.getElementById('gtag-script')) {
      const script = document.createElement('script');
      script.id = 'gtag-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

// Helper function to track custom events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (window.gtag && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Track conversions (e.g., form submissions, quote requests)
export function trackConversion(conversionType: string, details?: Record<string, unknown>) {
  if (window.gtag && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('event', 'conversion', {
      send_to: GA_MEASUREMENT_ID,
      conversion_type: conversionType,
      ...details,
    });
  }
}
