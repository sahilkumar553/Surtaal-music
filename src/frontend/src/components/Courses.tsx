import { Card, CardContent } from "@/components/ui/card";
import { Music } from "lucide-react";

type CoursesProps = {
  showPricing?: boolean;
};

export function Courses({ showPricing = true }: CoursesProps) {
  const courseHighlights = [
    {
      title: "Vocal Music",
      icon: "🎤",
      description:
        "Hindustani classical, light classical, devotional, and contemporary styles with expressive technique training.",
      image: "/image/image5-19.jpg.jpeg",
    },
    {
      title: "Tabla",
      icon: "🪘",
      description:
        "Master taals, compositions, accompaniment, and rhythmic control on this quintessential percussion instrument.",
      image: "/image/ethnic-musical-instrument-tabla-on-260nw-1222137799.jpg.jpeg",
    },
    {
      title: "Harmonium & Keyboard",
      icon: "🎹",
      description:
        "Perfect for accompaniment and solo play—learn scales, chords, progressions, and vocal support beautifully.",
      image: "/image/images (7).jpeg",
    },
    {
      title: "Guitar",
      icon: "🎸",
      description:
        "Acoustic and classical paths from basic chords to fingerstyle. Build tone, timing, and confident stage presence.",
      image: "/image/TYLR-GTE-BLKTP-3_900x.jpg.jpeg",
    },
    {
      title: "All Age Groups",
      icon: "👨‍👩‍👧",
      description:
        "Specialized batches for kids (5+), teens, adults, and seniors—beginner to advanced with personalized attention.",
      image: "/image/Gemini_Generated_Image_srcjsasrcjsasrcj.png",
    },
    {
      title: "Online & Offline",
      icon: "💻",
      description:
        "Learn in-person at the academy or from home via live online sessions with the same structured curriculum.",
      image: "/image/Gemini_Generated_Image_4ec9pc4ec9pc4ec9.png",
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

        <div className="mb-12 sm:mb-14">
          <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
            {courseHighlights.map((course) => (
              <Card
                key={course.title}
                className={`relative overflow-hidden shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-1 min-h-[220px] ${
                  course.image ? "border-transparent" : "border-primary/20 bg-card/60"
                }`}
              >
                {course.image && (
                  <>
                    <img
                      src={course.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                  </>
                )}
                <CardContent className={`relative z-10 p-6 sm:p-7 text-center space-y-3 flex flex-col items-center justify-center h-full ${
                  course.image ? "text-white" : ""
                }`}>
                  <div className="text-4xl" aria-hidden>
                    {course.icon}
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-serif font-bold ${
                    course.image ? "text-white" : "text-foreground"
                  }`}>
                    {course.title}
                  </h3>
                  <p className={`text-sm sm:text-base leading-relaxed ${
                    course.image ? "text-white/90" : "text-foreground/70"
                  }`}>
                    {course.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {showPricing && (
          <div className="mb-12 sm:mb-16">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3">
                Fee Structure
              </h3>
              <p className="text-foreground/70 text-sm sm:text-base">
                Transparent and affordable pricing for all learners.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="border-primary/20 shadow-gold-lg">
                <CardContent className="p-6 sm:p-8">
                  <div className="space-y-3">
                    {[
                      { classes: "1 Class", fee: "₹500" },
                      { classes: "2 Classes", fee: "₹800" },
                      { classes: "3 Classes", fee: "₹1,000" },
                      { classes: "4 Classes", fee: "₹1,200" },
                      { classes: "5 Classes", fee: "₹1,500" },
                    ].map((item) => (
                      <div
                        key={item.classes}
                        className="flex items-center justify-between py-3 border-b border-primary/10 last:border-0"
                      >
                        <span className="text-foreground font-medium text-sm sm:text-base">
                          Monthly {item.classes}
                        </span>
                        <span className="text-primary font-bold text-lg sm:text-xl">
                          {item.fee}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-2 text-sm sm:text-base text-foreground/80 bg-primary/5 rounded-lg p-4">
                    <p className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">●</span>
                      One single class — face to face online
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">●</span>
                      Admission fee ₹500/- and Security ₹1,000/- deposit (Refundable)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

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
