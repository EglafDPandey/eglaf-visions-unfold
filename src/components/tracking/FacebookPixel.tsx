import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Replace with your actual Facebook Pixel ID
const FB_PIXEL_ID = 'XXXXXXXXXXXXXXXXX';

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

export function FacebookPixel() {
  const location = useLocation();

  useEffect(() => {
    // Skip if no valid Pixel ID
    if (FB_PIXEL_ID === 'XXXXXXXXXXXXXXXXX') {
      console.warn('Facebook Pixel: Please add your Pixel ID');
      return;
    }

    // Load Facebook Pixel script if not already loaded
    if (!document.getElementById('fb-pixel-script')) {
      const script = document.createElement('script');
      script.id = 'fb-pixel-script';
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${FB_PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      // Add noscript fallback
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1"/>`;
      document.body.appendChild(noscript);
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (FB_PIXEL_ID !== 'XXXXXXXXXXXXXXXXX' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
}

// Standard Facebook Pixel Events
export function fbTrackEvent(eventName: string, parameters?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq && FB_PIXEL_ID !== 'XXXXXXXXXXXXXXXXX') {
    window.fbq('track', eventName, parameters);
  }
}

// Track Lead (form submissions, quote requests)
export function fbTrackLead(value?: number, currency = 'USD') {
  fbTrackEvent('Lead', { value, currency });
}

// Track Contact (contact form, phone clicks)
export function fbTrackContact() {
  fbTrackEvent('Contact');
}

// Track Complete Registration
export function fbTrackCompleteRegistration(value?: number, currency = 'USD') {
  fbTrackEvent('CompleteRegistration', { value, currency });
}

// Track Schedule (consultation bookings)
export function fbTrackSchedule() {
  fbTrackEvent('Schedule');
}

// Track View Content (specific page/service views)
export function fbTrackViewContent(contentName: string, contentCategory?: string, value?: number) {
  fbTrackEvent('ViewContent', {
    content_name: contentName,
    content_category: contentCategory,
    value,
    currency: 'USD',
  });
}

// Track custom events
export function fbTrackCustom(eventName: string, parameters?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq && FB_PIXEL_ID !== 'XXXXXXXXXXXXXXXXX') {
    window.fbq('trackCustom', eventName, parameters);
  }
}

// Track CTA Click as custom event
export function fbTrackCTAClick(ctaName: string, pageName?: string) {
  fbTrackCustom('CTAClick', {
    cta_name: ctaName,
    page_name: pageName,
  });
}
