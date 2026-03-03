import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, Sparkles, Megaphone } from "lucide-react";
import { getUpcomingCompetitions } from "@/lib/competitionStore";

export function Hero() {
  const navigate = useNavigate();
  const [upcomingTitles, setUpcomingTitles] = useState<string[]>([]);

  useEffect(() => {
    const titles = getUpcomingCompetitions().map((event) => event.title);
    setUpcomingTitles(titles);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/image/Classic_music.jpg"
          alt="Students performing"
          className="w-full h-full object-cover opacity-40 blur-[-2px] scale-105"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>

      {/* Ornamental Corner Accents */}
      <div className="hidden sm:block absolute top-0 left-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border-t-2 border-l-2 border-primary/40 pointer-events-none"></div>
      <div className="hidden sm:block absolute top-0 right-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border-t-2 border-r-2 border-primary/40 pointer-events-none"></div>
      <div className="hidden sm:block absolute bottom-0 left-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border-b-2 border-l-2 border-primary/40 pointer-events-none"></div>
      <div className="hidden sm:block absolute bottom-0 right-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border-b-2 border-r-2 border-primary/40 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {upcomingTitles.length > 0 && (
            <div className="animate-fade-in-up stagger-1">
              <div className="relative overflow-hidden rounded-full border border-primary/30 bg-card/70 backdrop-blur">
                <button
                  type="button"
                  onClick={() => navigate("/competitions")}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm sm:text-base font-semibold text-primary hover:bg-primary/10 transition"
                  aria-label="View upcoming competitions"
                >
                  <Megaphone className="h-4 w-4 sm:h-5 sm:w-5" />
                  <div className="relative flex-1 overflow-hidden">
                    <div
                      className="flex items-center gap-8 whitespace-nowrap"
                      style={{ animation: "hero-ticker 18s linear infinite" }}
                    >
                      {[...upcomingTitles, ...upcomingTitles].map((title, idx) => (
                        <span key={`${title}-${idx}`} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          <span className="text-foreground/80">{title}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-accent">See details</span>
                </button>
              </div>
            </div>
          )}
          {/* Decorative Icon */}
          <div className="flex justify-center animate-fade-in-up stagger-1">
            <div className="p-4 bg-primary/10 rounded-full border border-primary/30 shadow-gold">
              <Music className="w-12 h-12 text-primary animate-shimmer" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-foreground leading-tight animate-fade-in-up stagger-2">
            <span className="block text-primary">Sur Taal</span>
            <span className="block">Sangeet Academy</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic text-primary/90 animate-fade-in-up stagger-3">
            Where Talent Gets Its True Rhythm
          </p>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto animate-fade-in-up stagger-4">
            Certified Music & Dance Training in Gaya
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 py-4 animate-fade-in-up stagger-5">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <Sparkles className="w-5 h-5 text-primary animate-shimmer" />
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up stagger-6">
            <Button
              size="lg"
              onClick={() => navigate("/admissions")}
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-accent text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-gold-lg transition-all hover:scale-105"
            >
              Enroll Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/contact")}
              className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 transition-all hover:scale-105"
            >
              Book Free Demo
            </Button>
          </div>

          {/* Additional Info */}
          <p className="text-xs sm:text-sm text-foreground/60 animate-fade-in-up stagger-6">
            Affiliated with Surobharati Sangeet Kala Kendra, Kolkata
          </p>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>

      <style>
        {`
          @keyframes hero-ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
}
