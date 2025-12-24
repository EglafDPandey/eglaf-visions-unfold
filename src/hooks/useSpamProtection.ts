import { useRef, useCallback } from 'react';

const RATE_LIMIT_KEY = 'contact_form_submissions';
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_SUBMISSIONS_PER_WINDOW = 3;

interface SubmissionRecord {
  timestamps: number[];
}

/**
 * Hook for spam protection with honeypot and rate limiting
 */
export function useSpamProtection() {
  const formLoadTime = useRef(Date.now());

  /**
   * Check if honeypot field is filled (bots fill hidden fields)
   */
  const checkHoneypot = useCallback((honeypotValue: string): boolean => {
    // If honeypot is filled, it's likely a bot
    return honeypotValue.trim() !== '';
  }, []);

  /**
   * Check if form was submitted too quickly (bots are fast)
   */
  const checkSubmitTiming = useCallback((): boolean => {
    const timeSinceLoad = Date.now() - formLoadTime.current;
    // If submitted in less than 2 seconds, likely a bot
    return timeSinceLoad < 2000;
  }, []);

  /**
   * Check and update rate limit
   */
  const checkRateLimit = useCallback((): { allowed: boolean; waitTime?: number } => {
    try {
      const now = Date.now();
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      const record: SubmissionRecord = stored ? JSON.parse(stored) : { timestamps: [] };
      
      // Filter to only recent timestamps within the window
      const recentTimestamps = record.timestamps.filter(
        (ts) => now - ts < RATE_LIMIT_WINDOW_MS
      );
      
      if (recentTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
        // Calculate how long until the oldest submission expires
        const oldestTimestamp = Math.min(...recentTimestamps);
        const waitTime = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldestTimestamp)) / 1000);
        return { allowed: false, waitTime };
      }
      
      // Update with new submission
      recentTimestamps.push(now);
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ timestamps: recentTimestamps }));
      
      return { allowed: true };
    } catch {
      // If localStorage fails, allow the submission
      return { allowed: true };
    }
  }, []);

  /**
   * Reset the form load time (call when form is displayed/reset)
   */
  const resetFormLoadTime = useCallback(() => {
    formLoadTime.current = Date.now();
  }, []);

  /**
   * Validate submission against all spam checks
   */
  const validateSubmission = useCallback((honeypotValue: string): { 
    valid: boolean; 
    error?: string 
  } => {
    // Check honeypot
    if (checkHoneypot(honeypotValue)) {
      // Silently reject - don't tell bots why
      return { valid: false, error: 'Unable to submit. Please try again later.' };
    }

    // Check timing
    if (checkSubmitTiming()) {
      return { valid: false, error: 'Please take a moment to fill out the form properly.' };
    }

    // Check rate limit
    const rateLimit = checkRateLimit();
    if (!rateLimit.allowed) {
      return { 
        valid: false, 
        error: `Too many submissions. Please wait ${rateLimit.waitTime} seconds before trying again.` 
      };
    }

    return { valid: true };
  }, [checkHoneypot, checkSubmitTiming, checkRateLimit]);

  return {
    validateSubmission,
    resetFormLoadTime,
  };
}
