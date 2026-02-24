import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music } from "lucide-react";

export function Courses() {
  const courses = [
    {
      name: "Vocal",
      category: "Music",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Tabla",
      category: "Music",
      image: "https://images.unsplash.com/photo-1458560871784-56d23406c091?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Harmonium",
      category: "Music",
      image: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Guitar",
      category: "Music",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Keyboard",
      category: "Music",
      image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Classical Dance",
      category: "Dance",
      image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Bollywood Dance",
      category: "Dance",
      image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <section id="courses" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block p-3 bg-primary/10 rounded-full border border-primary/30 mb-4">
            <Music className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Our <span className="text-primary">Courses</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-foreground/70">
            Vocal • Tabla • Harmonium • Guitar • Keyboard • Classical Dance • Bollywood Dance
          </p>
        </div>

        <div className="mb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {courses.map((course, index) => {
              return (
                <Card 
                  key={index}
                  className="bg-card/50 border-primary/20 hover:border-primary/50 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden aspect-[4/3] border-b border-primary/20">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-8 text-center">
                    <h4 className="text-xl font-serif font-bold text-foreground mb-2">
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
            <CardContent className="p-8 text-center">
              <p className="text-lg font-semibold text-foreground">
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
