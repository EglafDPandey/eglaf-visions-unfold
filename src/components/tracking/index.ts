// Google Tag Manager
export { GoogleTagManager, pushToDataLayer, trackFormSubmission, trackCTAClick, trackPageView, trackGTMConversion } from './GoogleTagManager';

// Facebook Pixel
export { FacebookPixel, fbTrackEvent, fbTrackLead, fbTrackContact, fbTrackCompleteRegistration, fbTrackSchedule, fbTrackViewContent, fbTrackCustom, fbTrackCTAClick } from './FacebookPixel';

// Combined tracking utilities
export function trackConversion(type: 'lead' | 'contact' | 'consultation' | 'quote', data?: Record<string, unknown>) {
  // GTM
  const { pushToDataLayer } = require('./GoogleTagManager');
  pushToDataLayer('conversion', { conversion_type: type, ...data });
  
  // Facebook Pixel
  const { fbTrackLead, fbTrackContact, fbTrackSchedule } = require('./FacebookPixel');
  switch (type) {
    case 'lead':
    case 'quote':
      fbTrackLead(data?.value as number);
      break;
    case 'contact':
      fbTrackContact();
      break;
    case 'consultation':
      fbTrackSchedule();
      break;
  }
}

// Track CTA clicks across both platforms
export function trackCTA(ctaName: string, location?: string) {
  const { trackCTAClick } = require('./GoogleTagManager');
  const { fbTrackCTAClick } = require('./FacebookPixel');
  
  trackCTAClick(ctaName, location);
  fbTrackCTAClick(ctaName, location);
}
