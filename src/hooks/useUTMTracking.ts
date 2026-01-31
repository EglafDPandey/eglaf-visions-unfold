import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string; // Google Click ID
  fbclid?: string; // Facebook Click ID
}

const UTM_STORAGE_KEY = 'utm_params';

// Extract UTM parameters from URL
function extractUTMParams(searchParams: URLSearchParams): UTMParams {
  const params: UTMParams = {};
  
  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'fbclid',
  ];

  utmKeys.forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
    }
  });

  return params;
}

// Get stored UTM params from sessionStorage
export function getStoredUTMParams(): UTMParams {
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Store UTM params in sessionStorage
function storeUTMParams(params: UTMParams): void {
  try {
    const existing = getStoredUTMParams();
    // Merge new params with existing (new params take precedence)
    const merged = { ...existing, ...params };
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // Ignore storage errors
  }
}

// Hook to capture and persist UTM parameters
export function useUTMTracking(): UTMParams {
  const location = useLocation();

  const utmParams = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return extractUTMParams(searchParams);
  }, [location.search]);

  useEffect(() => {
    // Only store if we have new UTM params
    if (Object.keys(utmParams).length > 0) {
      storeUTMParams(utmParams);
    }
  }, [utmParams]);

  // Return merged params (stored + current)
  return useMemo(() => {
    const stored = getStoredUTMParams();
    return { ...stored, ...utmParams };
  }, [utmParams]);
}

// Utility to get UTM params for tracking events (can be used outside React)
export function getUTMParamsForTracking(): Record<string, string> {
  const params = getStoredUTMParams();
  const result: Record<string, string> = {};
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      result[key] = value;
    }
  });

  return result;
}
