import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, Eye } from "lucide-react";

interface AboutProps {
  preview?: boolean;
}

export function About({ preview = false }: AboutProps) {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-block p-3 bg-primary/10 rounded-full border border-primary/30 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            About <span className="text-primary">Our Academy</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
        </div>

        {/* Main About Content */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-card/50 backdrop-blur border-primary/20 shadow-gold">
            <CardContent className="p-8 md:p-12">
              <p className="text-lg leading-relaxed text-foreground/90 text-center mb-5">
                Sur Taal Sangeet Academy is a premier music and performing arts institute 
                established in April 2024 in Durgabari, Gaya. We provide structured 
                professional training in music and dance for students aged 5 years and above.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90 text-center mb-5">
                Our courses include Vocal, Tabla, Harmonium, Guitar, Keyboard, Classical Dance,
                and Bollywood Dance with a structured curriculum focused on confidence and stage presence.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90 text-center">
                We are proudly affiliated with
                <span className="text-primary font-semibold"> Surobharati Sangeet Kala Kendra, Kolkata</span>,
                with certification programs, annual function highlights, and real performance opportunities.
              </p>
              <div className="flex justify-center mt-8">
                <Button 
                  variant="outline"
                  onClick={() => navigate("/about")}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission & Vision */}
        {!preview && (
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mission */}
          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/30 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-primary">Our Mission</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Provide high-quality music education that builds confidence, creativity, 
                and cultural values. Promote Indian classical and contemporary arts and 
                provide stage exposure to nurture well-rounded performers.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/30 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-primary">Our Vision</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                To become the most trusted and recognized music academy in Gaya and 
                surrounding regions by nurturing future performers and building a strong 
                artistic community rooted in tradition and excellence.
              </p>
            </CardContent>
          </Card>
        </div>
        )}
      </div>
    </section>
  );
}
