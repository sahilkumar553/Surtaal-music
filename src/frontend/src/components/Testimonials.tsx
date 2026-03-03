import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, StarHalf } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Rajarshi Chatterjee",
      course: "Music Program",
      rating: 5,
      text: "Music is the medicine of the mind and soul. Best music teaching academy. Homely environment and personal attention to every student by very humble and talented teacher...Nilanjan sir...🙏🙏",
    },
    {
      name: "Sarita Kumari",
      course: "Stage Performance",
      rating: 4.5,
      text: "Excellent environment in class....Very good teaching technique",
    },
    {
      name: "Shrawan Rock official",
      course: "Academy Experience",
      rating: 5,
      text: "Sur taal sangeet academy is Best music academy in bihar ❤",
    },
  ];

  const renderStars = (rating: number) => {
    const clamped = Math.max(0, Math.min(5, rating));
    const full = Math.floor(clamped);
    const hasHalf = clamped - full >= 0.5;
    const empty = Math.max(0, 5 - full - (hasHalf ? 1 : 0));

    return (
      <div className="flex gap-1" aria-label={`Rated ${clamped} out of 5`}>
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`full-${i}`} className="w-5 h-5 fill-primary text-primary" />
        ))}
        {hasHalf && (
          <StarHalf key="half" className="w-5 h-5 fill-primary text-primary" />
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className="w-5 h-5 text-primary/30"
            strokeWidth={1.5}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <div className="inline-block p-2 sm:p-3 bg-primary/10 rounded-full border border-primary/30 mb-3 sm:mb-4">
            <Star className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
            What Our <span className="text-primary">Students Say</span>
          </h2>
          <div className="h-1 w-16 sm:w-20 md:w-24 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70">
            Hear from our students and their families
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card/50 border-primary/20 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-2"
            >
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <Avatar className="w-12 sm:w-16 h-12 sm:h-16 border-2 border-primary/30 bg-primary/10">
                    <AvatarFallback className="text-primary text-sm sm:text-xl font-bold">
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base sm:text-lg md:text-xl font-serif text-foreground">
                      {testimonial.name}
                    </CardTitle>
                    <p className="text-xs sm:text-sm text-primary/80">{testimonial.course}</p>
                  </div>
                </div>
                
                {/* Rating Stars */}
                {renderStars(testimonial.rating)}
              </CardHeader>
              
              <CardContent>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
