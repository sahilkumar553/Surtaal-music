import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, Eye, ChevronDown } from "lucide-react";

interface AboutProps {
  preview?: boolean;
}

export function About({ preview = false }: AboutProps) {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "Admission Process",
      answer:
        "To join the academy, prospective students are required to submit a 90-second video without music. Once selected, they can proceed with the formal admission process.",
    },
    {
      question: "Program Overview",
      answer:
        "Our curriculum is designed to provide a balance of classical music training and the necessary grooming to become a professional performer.Students are enrolled in a 5-year diploma program, with exams conducted annually. Upon completion, a certificate is awarded,which is recognized in both government and private sectors.The institute offers a combination of online and offline classes, with afocus on vocal enhancement and performance skills.",
    },
    {
      question: "Admission and Fees",
      answer:
        "The initial admission fee is ₹2000, followed by a monthly fee of ₹1500, payable between the 5th and 15th of each month. This entitles students to four classes per month: one online and three offline. Regular assessments are conducted every three months to ensure students are progressing in their vocal training. Students must pass quarterly tests to continue their enrollment, as the academy's focus is on developing professional singers, not merely increasing the student count.",
    },
    {
      question: "Essential Equipment Required",
      answer:
        "Students are required to have a harmonium and a mobile tanpura to facilitate their learning.",
    },
    {
      question: "Rules and Regulations",
      answer:
        "Mobile phones are strictly prohibited during class sessions.Punctuality is crucial, and students are expected to arrive on time for every class.Students must maintain two separate diaries: one for classical music notes and another for song guidelines.Participation in events and performances is mandatory if nominated by the academy.",
    },
    {
      question: "Additional Opportunities",
      answer:
        "As students progress, the academy may recommend them for cover songs or new compositions,further enhancing their exposure and performance experience.",
    },
    {
      question: "Registration Policy",
      answer:
        "We offer One Free Offline Demo Class . Students must pay after demo class and register in our Institute.",
    },
    {
      question: "Contacting Administration",
      answer:
        "You can reach our support team by emailing surtaalsangeet9270@gmail.com, calling +917654767376, or using the live chat on our website. Our dedicated team is available 24/7 to assist with any inquiries or issues.We're committed to providing prompt and effective solutions to ensure your musicalsatisfaction.",
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16 animate-fade-in-up">
          <div className="inline-block p-2 sm:p-3 bg-primary/10 rounded-full border border-primary/30 mb-3 sm:mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
            About <span className="text-primary">Our Academy</span>
          </h2>
          <div className="h-1 w-16 sm:w-20 md:w-24 bg-primary mx-auto mb-6 sm:mb-8"></div>
        </div>

        {/* Main About Content */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-card/50 backdrop-blur border-primary/20 shadow-gold">
            <CardContent className="p-5 sm:p-8 md:p-12">
              <p className="text-lg leading-relaxed text-foreground/90 text-center mb-5">
                Sur Taal Sangeet Academy is a premier music and performing arts
                institute established in April 2024 near Sambhu Gharana, Durga
                Bari, Gaya. We provide structured professional training in music
                and dance for students aged 5 years and above.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90 text-center mb-5">
                Our courses include Vocal, Tabla, Harmonium, Guitar, Keyboard,
                Classical Dance, and Bollywood Dance with a structured
                curriculum focused on confidence and stage presence.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90 text-center">
                We are proudly affiliated with
                <span className="text-primary font-semibold">
                  {" "}
                  Surobharati Sangeet Kala Kendra, Kolkata
                </span>
                , with certification programs, annual function highlights, and
                real performance opportunities.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Mission */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-primary/30 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary">
                    Our Mission
                  </h3>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  Provide high-quality music education that builds confidence,
                  creativity, and cultural values. Promote Indian classical and
                  contemporary arts and provide stage exposure to nurture
                  well-rounded performers.
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
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary">
                    Our Vision
                  </h3>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  To become the most trusted and recognized music academy in
                  Gaya and surrounding regions by nurturing future performers
                  and building a strong artistic community rooted in tradition
                  and excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {!preview && (
          <div className="mt-16 max-w-5xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 sm:mb-6 text-center">
              Frequently Asked Questions
            </h3>
            <p className="text-center text-foreground/70 mb-6 sm:mb-8">
              Quick answers about admissions, fees, equipment, and more.
            </p>
            <div className="space-y-3">
              {faqs.map((item, index) => (
                <details
                  key={item.question}
                  className="group rounded-lg border border-primary/20 bg-card/50 shadow-gold overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-4 sm:px-5 py-4 sm:py-5 text-left">
                    <span className="font-semibold text-foreground">
                      {item.question}
                    </span>
                    <ChevronDown className="h-5 w-5 text-primary transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-primary/10 px-4 sm:px-5 py-4 text-foreground/80 bg-card">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
