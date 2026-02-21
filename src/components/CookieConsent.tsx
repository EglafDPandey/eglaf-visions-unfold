import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_KEY = 'cookie_consent';

function getStoredPreferences(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(COOKIE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = getStoredPreferences();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
    setVisible(false);
    setShowSettings(false);
    // Dispatch event so tracking scripts can react
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: prefs }));
  };

  const acceptAll = () => {
    savePreferences({ necessary: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    savePreferences({ necessary: true, analytics: false, marketing: false });
  };

  const saveCustom = () => {
    savePreferences(preferences);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 shadow-2xl border border-border/50">
            {!showSettings ? (
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <Cookie className="w-8 h-8 text-primary shrink-0" />
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.{' '}
                    <a href="/privacy-policy" className="text-primary underline hover:text-primary/80">
                      Privacy Policy
                    </a>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
                    <Settings className="w-4 h-4 mr-1" />
                    Customize
                  </Button>
                  <Button variant="outline" size="sm" onClick={rejectAll}>
                    Reject All
                  </Button>
                  <Button variant="hero" size="sm" onClick={acceptAll}>
                    Accept All
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-foreground">Cookie Preferences</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <Label className="font-medium text-foreground">Necessary</Label>
                      <p className="text-xs text-muted-foreground">Essential for the website to function properly.</p>
                    </div>
                    <Switch checked disabled />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <Label className="font-medium text-foreground">Analytics</Label>
                      <p className="text-xs text-muted-foreground">Help us understand how visitors interact with the website.</p>
                    </div>
                    <Switch
                      checked={preferences.analytics}
                      onCheckedChange={(checked) => setPreferences((p) => ({ ...p, analytics: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <Label className="font-medium text-foreground">Marketing</Label>
                      <p className="text-xs text-muted-foreground">Used to track visitors across websites for advertising.</p>
                    </div>
                    <Switch
                      checked={preferences.marketing}
                      onCheckedChange={(checked) => setPreferences((p) => ({ ...p, marketing: checked }))}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={rejectAll}>
                    Reject All
                  </Button>
                  <Button variant="hero" size="sm" onClick={saveCustom}>
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export helper for tracking scripts to check consent
export function hasConsent(type: 'analytics' | 'marketing'): boolean {
  const prefs = getStoredPreferences();
  return prefs ? prefs[type] : false;
}
