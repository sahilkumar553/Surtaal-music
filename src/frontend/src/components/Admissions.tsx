import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, GraduationCap } from "lucide-react";

export function Admissions() {
  const navigate = useNavigate();

  const highlights = [
    { label: "Age Group", value: "5 Years & Above" },
    { label: "Levels", value: "Beginner to Advanced" },
    { label: "Batch Size", value: "Small Groups" },
    { label: "Demo Class", value: "Free" },
  ];

  return (
    <section id="admissions" className="py-12 sm:py-16 md:py-20 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <div className="inline-block p-2 sm:p-3 bg-primary/10 rounded-full border border-primary/30 mb-3 sm:mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
            <span className="text-primary">Admissions</span> Open
          </h2>
          <div className="h-1 w-16 sm:w-20 md:w-24 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70">
            Join us and begin your musical journey today
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto mb-8 sm:mb-12">
          {highlights.map((item, index) => (
            <Card 
              key={index}
              className="bg-card/50 border-primary/20 shadow-gold"
            >
              <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                <p className="text-xs sm:text-sm text-foreground/60 mb-2">{item.label}</p>
                <p className="text-base sm:text-lg md:text-xl font-serif font-bold text-primary">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main CTA Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-card via-primary/5 to-card border-primary/30 shadow-gold-lg overflow-hidden">
            <CardContent className="p-6 sm:p-10 md:p-12 text-center relative">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/20"></div>
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/20"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/20"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/20"></div>

              <Badge className="bg-primary text-primary-foreground mb-4 sm:mb-6 text-sm sm:text-base px-4 sm:px-6 py-2">
                Admissions Open 2026
              </Badge>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 sm:mb-6">
                Start Your Musical Journey
              </h3>
              
              <p className="text-sm sm:text-base md:text-lg text-foreground/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Limited Seats Available. Join today to secure your spot and start your musical journey.
              </p>

              <p className="text-sm sm:text-base font-semibold text-secondary mb-6 sm:mb-8">
                Early Admission Discount Offer Available
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Button
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById("registration");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-accent text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 shadow-gold-lg"
                >
                  <CheckCircle className="mr-2 w-5 h-5" />
                  Join Today
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/contact")}
                  className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6"
                >
                  Book Free Demo
                </Button>
              </div>

              <p className="text-sm text-foreground/60">
                Call us or fill the registration form below to get started
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
