import { Link } from "react-router-dom";
import {
  SiGooglemaps,
  SiGmail,
  SiWhatsapp,
  SiGoogle,
  SiInstagram,
  SiYoutube,
} from "react-icons/si";
import { Heart } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { label: "About", path: "/about" },
    { label: "Courses", path: "/courses" },
    { label: "Faculty", path: "/faculty" },
    { label: "Gallery", path: "/gallery" },
    { label: "Certificates", path: "/certificates" },
    { label: "Admissions", path: "/admissions" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-card border-t border-primary/20 py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* About Column */}
          <div className="sm:col-span-2 md:col-span-2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-primary mb-3 sm:mb-4">
              Sur Taal Sangeet Academy
            </h3>
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-3 sm:mb-4">
              Premier music and performing arts institute in Gaya, providing
              structured professional training with certification programs and
              regular stage performance opportunities.
            </p>
            <p className="text-xs sm:text-sm text-foreground/60">
              Affiliated with Surobharati Sangeet Kala Kendra, Kolkata
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-serif font-bold text-foreground mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-1 sm:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs sm:text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-serif font-bold text-foreground mb-3 sm:mb-4">
              Contact
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-foreground/70">
              <li>Durgabari, Gaya</li>
              <li>Bihar, India</li>
              <li className="pt-2">+91 76547 67376</li>
              <li>surtaalsangeet9270@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-primary/20">
          {/* Google */}
          <a
            href="https://www.google.com/search?kgmid=/g/11y7wsjbn8&hl=en-IN&q=Sur+Taal+Sangeet+Academy&shndl=30&source=sh/x/loc/osrp/m5/4&kgs=efba670ad04159e9"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:p-3 bg-[#4285F4] rounded-full text-white hover:scale-110 transition-all"
            aria-label="Google Profile"
          >
            <SiGoogle className="w-4 sm:w-5 h-4 sm:h-5" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/surtaalsangeetacademy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:p-3 rounded-full text-white hover:scale-110 transition-all"
            style={{
              background:
                "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
            }}
            aria-label="Instagram"
          >
            <SiInstagram className="w-4 sm:w-5 h-4 sm:h-5" />
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@surtaalsangeetacademy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:p-3 bg-[#FF0000] rounded-full text-white hover:scale-110 transition-all"
            aria-label="YouTube"
          >
            <SiYoutube className="w-4 sm:w-5 h-4 sm:h-5" />
          </a>

          {/* WhatsApp */}
          <a
            href="https://www.whatsapp.com/channel/0029Vaw8nph1t90i0uQL952Q"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:p-3 bg-[#25D366] rounded-full text-white hover:scale-110 transition-all"
            aria-label="WhatsApp Channel"
          >
            <SiWhatsapp className="w-4 sm:w-5 h-4 sm:h-5" />
          </a>
          {/*Email*/}
          <a
            href="mailto:surtaalsangeet9270@gmail.com"
            className="p-2 sm:p-3 bg-[#EA4335] rounded-full text-white hover:scale-110 transition-all"
            aria-label="Send Email"
          >
            <SiGmail className="w-4 sm:w-5 h-4 sm:h-5" />
          </a>
          {/* Google Maps */}
          <a
            href="https://maps.app.goo.gl/4d4nvC38svgZvDm79"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:p-3 bg-[#EA4335] rounded-full text-white hover:scale-110 transition-all"
            aria-label="Google Maps Location"
          >
            <SiGooglemaps className="w-4 sm:w-5 h-4 sm:h-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs sm:text-sm text-foreground/60">
          <p className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap text-xs sm:text-sm">
          <u>Designed & Developed by Sahil Kumar Gupta</u>
          </p>
          <p className="mt-2">© Sur Taal Sangeet Academy - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
