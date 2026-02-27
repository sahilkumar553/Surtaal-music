import { Link } from "react-router-dom";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
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
              Premier music and performing arts institute in Gaya, providing structured professional training with certification programs and regular stage performance opportunities.
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
          <a 
            href="" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 sm:p-3 bg-primary/10 rounded-full border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            aria-label="Facebook"
          >
            <SiFacebook className="w-4 sm:w-5 h-4 sm:h-5" />
          </a>
          <a 
            href="https://www.instagram.com/surtaalsangeetacademy?igsh=MXBxcGYyZnV4Zmx4aw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 sm:p-3 bg-primary/10 rounded-full border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            aria-label="Instagram"
          >
            <SiInstagram className="w-4 sm:w-5 h-4 sm:h-5" />
          </a>
          <a 
            href="https://www.youtube.com/@surtaalsangeetacademy"             target="_blank" 
            rel="noopener noreferrer"
            className="p-2 sm:p-3 bg-primary/10 rounded-full border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            aria-label="YouTube"
          >
            <SiYoutube className="w-4 sm:w-5 h-4 sm:h-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs sm:text-sm text-foreground/60">
          <p className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap text-xs sm:text-sm">
            © 2026. Built with <Heart className="w-3 sm:w-4 h-3 sm:h-4 text-primary fill-primary inline" /> in React
          </p>
          <p className="mt-2">
            Sur Taal Sangeet Academy - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
