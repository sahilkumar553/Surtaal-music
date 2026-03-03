import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiFacebook, SiInstagram, SiYoutube, SiSpotify, SiApplemusic } from "react-icons/si";
import { Music2 } from "lucide-react";


export function SocialMedia() {
  const academySocials = [
    { name: "Instagram", icon: SiInstagram, url: "https://www.instagram.com/surtaalsangeetacademy?igsh=MXBxcGYyZnV4Zmx4aw%3D%3D", color: "hover:text-[#E4405F]" },
    { name: "YouTube", icon: SiYoutube, url: "https://www.youtube.com/@surtaalsangeetacademy", color: "hover:text-[#FF0000]" },
  ];

  const directorSocials = [
    { name: "Spotify", icon: SiSpotify, url: "https://open.spotify.com/artist/0vHg1huhz4Kgku2sJuhh5X?si=lVv6MUbHSiKzoH1Fc8keFQ&referral=labelaffiliate&utm_source=1100lC3a8eao&utm_medium=Indie_Routenote&utm_campaign=labelaffiliate&nd=1&dlsi=31cee96eeca2449a", color: "hover:text-[#1DB954]" },
    { name: "YouTube", icon: SiYoutube, url: "https://www.youtube.com/@official_nilanjanray", color: "hover:text-[#FF0000]" },
    {name: "JioSaavn", icon: Music2,url: "https://www.jiosaavn.com/artist/nilanjan-ray-albums/cSXsF6GZjvo_?referrer=svn_source%3Dshare&svn_medium=com.whatsapp&utm_source=share&utm_medium=com.whatsapp",color: "hover:text-[#2BC5B4]"},
    { name: "Instagram", icon: SiInstagram, url: "https://www.instagram.com/nilanjanray0/?utm_source=ig_embed&ig_rid=b479c0a1-3b29-487b-9459-ba6fae92779c", color: "hover:text-[#E4405F]" },
    { name: "Facebook", icon: SiFacebook, url: "https://www.facebook.com/nilanjan.roy.773", color: "hover:text-[#1877F2]" },
    {name: "Apple Music", icon:SiApplemusic ,url: "https://music.apple.com/us/artist/nilanjan-ray/1402090277?at=11l65W&ct=push",color: "hover:text-[#FA233B]"}
  ];

  const studentsSocials = [
    { name: "YouTube", icon: SiYoutube, url: "https://www.youtube.com/@surtaalsangeetacademy", color: "hover:text-[#FF0000]" },
    { name: "Instagram", icon: SiInstagram, url: "https://www.instagram.com/surtaalsangeetacademy?igsh=MXBxcGYyZnV4Zmx4aw%3D%3D", color: "hover:text-[#E4405F]" },
    { name: "Spotify", icon: SiSpotify, url: "https://open.spotify.com/artist/7mXil36ag7Mh8yP332sucz?si=qghHX138TIaelUvYEegpVA&nd=1&dlsi=3a6c29002d814446", color: "hover:text-[#1DB954]" }

  ];

  return (
    <section id="social-media" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block p-3 bg-primary/10 rounded-full border border-primary/30 mb-4">
            <Music2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Connect With <span className="text-primary">Us</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-foreground/70">
            Follow us on social media for updates and performances
          </p>
        </div>

        {/* Social Media Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Academy Official */}
          <Card className="bg-card/50 border-primary/20 shadow-gold hover:shadow-gold-lg transition-all">
            <CardHeader className="text-center border-b border-primary/20">
              <CardTitle className="text-2xl font-serif text-primary">
                Sur Taal Sangeet Academy
              </CardTitle>
              <p className="text-sm text-foreground/70">Official Channel</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {academySocials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`p-3 rounded-full border border-primary/30 bg-background/60 text-foreground hover:border-primary ${social.color} transition-colors`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Director Personal */}
          <Card className="bg-card/50 border-primary/20 shadow-gold hover:shadow-gold-lg transition-all">
            <CardHeader className="text-center border-b border-primary/20">
              <CardTitle className="text-2xl font-serif text-primary">
                Nilanjan Ray
              </CardTitle>
              <p className="text-sm text-foreground/70">Director's Channel</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {directorSocials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`p-3 rounded-full border border-primary/30 bg-background/60 text-foreground hover:border-primary ${social.color} transition-colors`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Students Performances */}
          <Card className="bg-card/50 border-primary/20 shadow-gold hover:shadow-gold-lg transition-all">
            <CardHeader className="text-center border-b border-primary/20">
              <CardTitle className="text-2xl font-serif text-primary">
                Student Performances
              </CardTitle>
              <p className="text-sm text-foreground/70">Watch Our Students</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {studentsSocials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`p-3 rounded-full border border-primary/30 bg-background/60 text-foreground hover:border-primary ${social.color} transition-colors`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
