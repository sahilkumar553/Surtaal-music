import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Faculty() {
  const facultyMembers = [
    {
      name: "Nilanjan Ray",
      role: "Director",
      specialization: "Vocal Music & Tabla",
      imageUrl: "/image/Screenshot 2026-02-23 212322.png",
      bio: "Founder and Director of Sur Taal Sangeet Academy. Accomplished musician with years of performance and teaching experience in classical and contemporary music.",
      featured: true,
    },
    {
      name: "Sunil Sir",
      role: "Senior Faculty",
      specialization: "Tabla & Percussion",
      imageUrl: "/image/WhatsApp Image 2026-02-23 at 10.01.01 PM.jpeg",
      bio: "Expert tabla player with extensive experience in teaching traditional percussion instruments. Known for patient teaching methods and deep knowledge of rhythmic compositions.",
      featured: true,
    },
  ];

  return (
    <section id="faculty" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block p-3 bg-primary/10 rounded-full border border-primary/30 mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
                        {member.name.split(" ").map(n => n[0]).join("")}
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
