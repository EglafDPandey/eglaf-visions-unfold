import { MessageCircle } from 'lucide-react';
import { trackEvent } from '@/components/GoogleAnalytics';

const WHATSAPP_NUMBER = '919898598257';
const DEFAULT_MESSAGE = 'Hi, I visited your website and I\'m interested in your services. Can we discuss my project?';

export function FloatingWhatsApp() {
  const handleClick = () => {
    trackEvent('whatsapp_click', 'Lead Generation', window.location.pathname);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`,
      '_blank'
    );
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group animate-bounce-slow"
    >
      <MessageCircle className="w-7 h-7 fill-white stroke-white" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      {/* Tooltip */}
      <span className="absolute right-16 bg-foreground text-background text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
        Chat with us
      </span>
    </button>
  );
}
