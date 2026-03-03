import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Faculty() {
  const [showJourney, setShowJourney] = useState(false);

  const facultyMembers = [
    {
      name: "Nilanjan Ray",
      role: "Director",
      specialization: "Vocal Music & Harmonium",
      imageUrl: "/image/Screenshot 2026-02-23 212322.png",
      bio: "Founder and Director of Sur Taal Sangeet Academy. Accomplished musician with years of performance and teaching experience in classical and contemporary music.",
      featured: true,
    },
    {
      name: "Sunil Kumar Gupta",
      role: "Instructor",
      specialization: "Motivator",
      imageUrl: "/image/WhatsApp Image 2026-02-23 at 10.01.01 PM.jpeg",
      bio: "Sunil Kumar Gupta is the visionary motivator at Sur Taal Sangeet Academy, dedicated to transforming raw talent into musical excellence. He believes that discipline and passion are the twin pillars of every great artist. Under his guidance, students are encouraged to find their unique voice and the confidence to share it with the world.",
      featured: true,
    },
  ];

  return (
    <section id="faculty" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block p-3 bg-primary/10 rounded-full border border-primary/30 mb-4">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Our <span className="text-primary">Faculty</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-foreground/70">
            Learn from experienced and accomplished artists
          </p>
        </div>

        {/* Faculty Cards */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {facultyMembers.map((member, index) => (
            <Card
              key={index}
              className="bg-card/50 border-primary/20 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-2 overflow-hidden"
            >
              <CardContent className="p-8">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-14">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-110"></div>
                    <Avatar className="w-48 h-48 border-4 border-primary/30 relative">
                      <AvatarImage src={member.imageUrl} alt={member.name} />
                      <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-2 text-center">
                    {member.name}
                  </h3>
                  <Badge className="bg-primary/20 text-primary border-primary/30 mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-primary/80 font-medium">
                    {member.specialization}
                  </p>
                </div>

                {/* Bio */}
                <div className="border-t border-primary/20 pt-6">
                  <p className="text-foreground/70 text-center leading-relaxed">
                    {member.bio}
                  </p>
                  {member.name === "Nilanjan Ray" && (
                    <div className="mt-6 flex justify-center">
                      <Button
                        type="button"
                        onClick={() => setShowJourney(true)}
                        className="bg-primary text-primary-foreground hover:bg-accent"
                      >
                        View Journey
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showJourney && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="w-full max-w-5xl max-h-[90vh] rounded-2xl border border-primary/30 bg-card shadow-gold overflow-hidden flex flex-col">
              <div className="flex items-center justify-between border-b border-primary/20 px-6 py-4">
                <div>
                  <p className="text-sm text-foreground/60">Director</p>
                  <h3 className="text-2xl font-serif font-bold text-primary">
                    Nilanjan Ray
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowJourney(false)}
                  className="text-foreground/70 hover:text-foreground"
                >
                  Close
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4 text-foreground/80">
                    <p>
                      Nilanjan Ray: From Childhood Passion to Rohtas Got Talent
                      Winner Nilanjan Ray's journey into the world of music
                      began in his early childhood, where he was immersed in a
                      rich culture of singing and instrumental performance.
                      Growing up in an environment that celebrated musical
                      expression, Nilanjan was inspired by the melodies that
                      filled his home and community. From a young age, he
                      displayed a natural affinity for music, often found
                      strumming on instruments or singing along to his favorite
                      tunes. His passion was nurtured by family members and
                      local musicians, who encouraged him to explore his talents
                      further. This early exposure laid the foundation for his
                      future endeavors in the music industry. As he honed his
                      skills, Nilanjan participated in various local
                      competitions and events, showcasing his talent and gaining
                      recognition within his community. His dedication and hard
                      work culminated in a significant milestone when he entered
                      the prestigious "Rohtas Got Talent" competition. With a
                      blend of traditional and contemporary styles, Nilanjan
                      captivated the judges and audience alike, ultimately
                      earning the title of Rohtas Got Talent Winner. This
                      achievement not only marked a turning point in his musical
                      career but also solidified his status as a rising star in
                      the local music scene. Nilanjan Ray's story is a testament
                      to the power of passion, perseverance, and the influence
                      of a supportive community. As he continues to pursue his
                      dreams, he remains committed to sharing his love for music
                      with the world, inspiring others to follow their own
                      passions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Image 1 */}
                    <div className="overflow-hidden rounded-xl border border-primary/20">
                      <img
                        src="/image/WhatsApp Image 2026-03-03 at 8.30.48 PM.jpeg"
                        alt="Nilanjan Ray lighting a ceremonial lamp on stage"
                        className="w-full h-60 sm:h-64 md:h-72 object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Image 2 */}
                    <div className="overflow-hidden rounded-xl border border-primary/20">
                      <img
                        src="/image/WhatsApp Image 2025-01-13 at 18.45.27_acbad238.jpg"
                        alt="Nilanjan Ray with students and team after a TV performance"
                        className="w-full h-60 sm:h-64 md:h-72 object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Image 3 */}
                    <div className="overflow-hidden rounded-xl border border-primary/20 sm:col-span-2">
                      <img
                        src="/image/WhatsApp Image 2026-03-03 at 8.31.22 PM.jpeg"
                        alt="Nilanjan Ray singing on stage"
                        className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
