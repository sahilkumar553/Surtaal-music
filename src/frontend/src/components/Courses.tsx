import { Card, CardContent } from "@/components/ui/card";
import { Music } from "lucide-react";

export function Courses() {
  const courses = [
    {
      name: "Vocal",
      image: "https://www.musicclassonline.in/images/img/music13.jpg",
    },
    {
      name: "Tabla",
      image: "https://i.pinimg.com/736x/66/05/01/660501a5857ed3601bb2a50ba2433bbe.jpg",
    },
    {
      name: "Harmonium",
      image: "https://i.pinimg.com/736x/92/2b/9c/922b9cf3074cd1d2c45f0e392bc391bf.jpg",
    },
    {
      name: "Guitar",
      image: "https://i.pinimg.com/1200x/c7/11/67/c7116760013e63d865fa6ec55a66b324.jpg",
    },
    {
      name: "Keyboard",
      image: "https://i.pinimg.com/736x/ea/95/0b/ea950b6b4127b3cc9aef5815eaf2a8bb.jpg",
    },
    {
      name: "Bollywood Dance",
      image: "https://thumbs.dreamstime.com/b/indian-bollywood-couple-dancing-vector-dancers-silhouette-cartoon-dancer-people-white-64896102.jpg?w=768",
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
                    style={{ backgroundImage: `url(${course.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    className="relative border-primary/20 hover:border-primary/50 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-2 group flex-shrink-0 w-72 sm:w-96 h-64 sm:h-80"
                  >
                    <CardContent className="relative p-6 sm:p-8 text-center z-10 flex flex-col justify-center h-full">
                      {/* No category property, so Badge removed */}
                      <div className="absolute bottom-4 left-0 w-full flex justify-center">
                        <h4 className="text-lg sm:text-xl font-serif font-bold text-black drop-shadow-md bg-white/80 px-3 py-1 rounded">
                          {course.name}
                        </h4>
                      </div>
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
                  style={{ backgroundImage: `url(${course.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  className="relative border-primary/20 hover:border-primary/50 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-2 group h-72 md:h-96"
                >
                  <CardContent className="relative p-8 sm:p-10 md:p-12 text-center z-10 flex flex-col justify-center h-full">
                    {/* No category property, so Badge removed */}
                    <div className="absolute bottom-8 left-0 w-full flex justify-center">
                      <h4 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-black drop-shadow-md bg-white/80 px-4 py-2 rounded">
                        {course.name}
                      </h4>
                    </div>
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
