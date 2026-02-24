import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Parent Testimonial",
      course: "Music Program",
      rating: 5,
      text: "Best music academy in Gaya!",
    },
    {
      name: "Parent Testimonial",
      course: "Stage Performance",
      rating: 5,
      text: "My child gained confidence and stage presence.",
    },
    {
      name: "Student Testimonial",
      course: "Academy Experience",
      rating: 5,
      text: "Professional and disciplined environment.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block p-3 bg-primary/10 rounded-full border border-primary/30 mb-4">
            <Star className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            What Our <span className="text-primary">Students Say</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-foreground/70">
            Hear from our students and their families
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card/50 border-primary/20 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-2"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/30 bg-primary/10">
                    <AvatarFallback className="text-primary text-xl font-bold">
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl font-serif text-foreground">
                      {testimonial.name}
                    </CardTitle>
                    <p className="text-sm text-primary/80">{testimonial.course}</p>
                  </div>
                </div>
                
                {/* Rating Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-foreground/70 leading-relaxed italic">
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
