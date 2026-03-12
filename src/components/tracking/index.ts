import { getUTMParamsForTracking } from '@/hooks/useUTMTracking';
import { pushToDataLayer, trackCTAClick as gtmTrackCTAClick } from './GoogleTagManager';
import { fbTrackLead, fbTrackContact, fbTrackSchedule, fbTrackCTAClick as fbTrackCTA } from './FacebookPixel';

// Google Tag Manager
export { GoogleTagManager, pushToDataLayer, trackFormSubmission, trackCTAClick, trackPageView, trackGTMConversion } from './GoogleTagManager';

// Facebook Pixel
export { FacebookPixel, fbTrackEvent, fbTrackLead, fbTrackContact, fbTrackCompleteRegistration, fbTrackSchedule, fbTrackViewContent, fbTrackCustom, fbTrackCTAClick } from './FacebookPixel';

// Combined tracking utilities with UTM parameters
export function trackConversion(type: 'lead' | 'contact' | 'consultation' | 'quote', data?: Record<string, unknown>) {
  const utmParams = getUTMParamsForTracking();
  
  pushToDataLayer('conversion', { conversion_type: type, ...utmParams, ...data });
  
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

// Track CTA clicks across both platforms with UTM params
export function trackCTA(ctaName: string, location?: string) {
  const utmParams = getUTMParamsForTracking();
  
  gtmTrackCTAClick(ctaName, location);
  fbTrackCTA(ctaName, location);
  
  if (Object.keys(utmParams).length > 0) {
    pushToDataLayer('cta_attribution', { cta_name: ctaName, cta_location: location, ...utmParams });
  }
}
