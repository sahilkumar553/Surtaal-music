import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music } from "lucide-react";

export function Courses() {
  const courses = [
    {
      name: "Vocal",
      category: "Music",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Tabla",
      category: "Music",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Harmonium",
      category: "Music",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Guitar",
      category: "Music",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Keyboard",
      category: "Music",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Classical Dance",
      category: "Dance",
      image: "https://images.unsplash.com/photo-1508853096304-f46e2b2a1e3e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Bollywood Dance",
      category: "Dance",
      image: "https://images.unsplash.com/photo-1504809369436-c8da1df4251b?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <section id="courses" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <div className="inline-block p-2 sm:p-3 bg-primary/10 rounded-full border border-primary/30 mb-3 sm:mb-4">
            <Music className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
            Our <span className="text-primary">Courses</span>
          </h2>
          <div className="h-1 w-16 sm:w-20 md:w-24 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70">
            Vocal • Tabla • Harmonium • Guitar • Keyboard • Classical Dance • Bollywood Dance
          </p>
        </div>

        <div className="mb-8 sm:mb-12">
          {/* Mobile Horizontal Scroll */}
          <div className="lg:hidden no-scrollbar overflow-x-auto pb-2">
            <div className="flex gap-4 sm:gap-6 min-w-min px-4">
              {courses.map((course, index) => {
                return (
                  <Card 
                    key={index}
                    className="bg-card/50 border-primary/20 hover:border-primary/50 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-2 group flex-shrink-0 w-56 sm:w-64"
                  >
                    <div className="relative overflow-hidden aspect-video border-b border-primary/20">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-3 sm:p-4 text-center">
                      <h4 className="text-sm sm:text-base font-serif font-bold text-foreground mb-2">
                        {course.name}
                      </h4>
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs">
                        {course.category}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {courses.map((course, index) => {
              return (
                <Card 
                  key={index}
                  className="bg-card/50 border-primary/20 hover:border-primary/50 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden aspect-video border-b border-primary/20">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                    <h4 className="text-base sm:text-lg md:text-xl font-serif font-bold text-foreground mb-2">
                      {course.name}
                    </h4>
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 mt-4">
                      {course.category}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Certification Note */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/30 shadow-gold">
            <CardContent className="p-5 sm:p-8 text-center">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-foreground">
                <span className="text-primary">🎓 Proudly Affiliated With</span><br />
                Surobharati Sangeet Kala Kendra, Kolkata
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
