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
    },
    {
      title: "Tabla",
      icon: "🪘",
      description:
        "Master taals, compositions, accompaniment, and rhythmic control on this quintessential percussion instrument.",
    },
    {
      title: "Harmonium & Keyboard",
      icon: "🎹",
      description:
        "Perfect for accompaniment and solo play—learn scales, chords, progressions, and vocal support beautifully.",
    },
    {
      title: "Guitar",
      icon: "🎸",
      description:
        "Acoustic and classical paths from basic chords to fingerstyle. Build tone, timing, and confident stage presence.",
    },
    {
      title: "All Age Groups",
      icon: "👨‍👩‍👧",
      description:
        "Specialized batches for kids (5+), teens, adults, and seniors—beginner to advanced with personalized attention.",
    },
    {
      title: "Online & Offline",
      icon: "💻",
      description:
        "Learn in-person at the academy or from home via live online sessions with the same structured curriculum.",
    },
  ];

  const plans = [
    {
      name: "Beginner",
      price: "1500",
      cta: "Start Now",
      accent: "border-sky-200",
      features: [
        "Music lessons",
        "Personalized lesson plans",
      ],
    },
    {
      name: "Professional",
      price: "2000",
      cta: "Start Now",
      accent: "border-sky-300",
      features: [
        "Comprehensive music education",
        "Access all courses",
        "Email support",
      ],
    },
    {
      name: "Expert",
      price: "2500",
      cta: "Contact Us",
      accent: "border-emerald-300",
      features: [
        "Unlimited lesson support",
        "All instruments & styles",
        "24/7 dedicated support",
      ],
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
                className="border-primary/20 bg-card/60 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-1"
              >
                <CardContent className="p-6 sm:p-7 text-center space-y-3">
                  <div className="text-4xl" aria-hidden>
                    {course.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
                    {course.title}
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
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
                Affordable tuition rates
              </h3>
              <p className="text-foreground/70 text-sm sm:text-base">
                Transparent monthly plans to match your learning goals.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`border-primary/20 shadow-gold-lg hover:shadow-gold transition-all hover:-translate-y-1 ${plan.accent}`}
                >
                  <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                    <div className="mb-6">
                      <p className="text-lg font-semibold text-foreground/80">{plan.name}</p>
                      <div className="mt-3 flex items-end gap-1">
                        <span className="text-4xl sm:text-5xl font-bold text-foreground">{plan.price}.00</span>
                        <span className="text-foreground/60 text-sm">/ month</span>
                      </div>
                      <p className="mt-4 text-foreground/70 text-sm">
                        Tailored features to support your musical journey at this level.
                      </p>
                    </div>

                    <button className="w-full rounded-md bg-primary/10 text-primary font-semibold py-3 hover:bg-primary hover:text-primary-foreground transition">
                      {plan.cta}
                    </button>

                    <div className="mt-6 space-y-3 text-foreground/80 text-sm">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <span className="text-emerald-500">✔</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
