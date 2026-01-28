import { useEffect } from 'react';

// Replace with your actual GTM Container ID
const GTM_ID = 'GTM-XXXXXXX';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export function GoogleTagManager() {
  useEffect(() => {
    // Skip if no valid GTM ID
    if (GTM_ID === 'GTM-XXXXXXX') {
      console.warn('Google Tag Manager: Please add your GTM Container ID');
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Load GTM script if not already loaded
    if (!document.getElementById('gtm-script')) {
      const script = document.createElement('script');
      script.id = 'gtm-script';
      script.async = true;
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `;
      document.head.appendChild(script);

      // Add noscript fallback to body
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.insertBefore(noscript, document.body.firstChild);
    }
  }, []);

  return null;
}

// Push events to GTM dataLayer
export function pushToDataLayer(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...data,
    });
  }
}

// Track form submissions
export function trackFormSubmission(formName: string, formData?: Record<string, unknown>) {
  pushToDataLayer('form_submission', {
    form_name: formName,
    ...formData,
  });
}

// Track CTA clicks
export function trackCTAClick(ctaName: string, ctaLocation?: string) {
  pushToDataLayer('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
}

// Track page views for SPAs
export function trackPageView(pagePath: string, pageTitle?: string) {
  pushToDataLayer('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
}

// Track conversions
export function trackGTMConversion(conversionType: string, value?: number, currency?: string) {
  pushToDataLayer('conversion', {
    conversion_type: conversionType,
    value,
    currency,
  });
}
