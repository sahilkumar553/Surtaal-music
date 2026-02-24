import { SiWhatsapp } from "react-icons/si";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/917654767376"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-gold-lg hover:brightness-105 transition-all"
    >
      <SiWhatsapp className="h-7 w-7" />
    </a>
  );
}
