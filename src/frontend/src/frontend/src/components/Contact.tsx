import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block p-3 bg-primary/10 rounded-full border border-primary/30 mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Contact <span className="text-primary">Us</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-foreground/70">
            Sur Taal Sangeet Academy, Durgabari, Gaya, Bihar
          </p>
        </div>

        {/* Contact Info & Map */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Details */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-primary/20 shadow-gold">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/30 shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-foreground mb-2">Address</h4>
                    <p className="text-foreground/70">
                      Durgabari, Gaya<br />
                      Bihar, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-primary/20 shadow-gold">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/30 shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-foreground mb-2">Phone</h4>
                    <p className="text-foreground/70">
                    7654767376
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-primary/20 shadow-gold">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/30 shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-foreground mb-2">Email</h4>
                    <p className="text-foreground/70">
                    surtaalsangeet9270@gmail.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-primary/20 shadow-gold">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/30 shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-foreground mb-2">Timings</h4>
                    <p className="text-foreground/70">
                      Monday – Saturday<br />
                      4:00 PM – 8:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d226.37765153720784!2d85.0044031491354!3d24.794000775242598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32b838dd528e1%3A0x8026e224dd5ca4f3!2sSur%20Taal%20Sangeet%20Academy!5e0!3m2!1sen!2sin!4v1771859439181!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>
        </div>
      </div>
    </section>
  );
}
