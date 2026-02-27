import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import { getCategoryLabel, loadMediaItems } from "@/lib/mediaStore";
import { ImageModal } from "@/components/ui/ImageModal";

export function Certificates() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const [modalAlt, setModalAlt] = useState("");
  const [adminCertificateItems, setAdminCertificateItems] = useState<
    { title: string; subtitle: string; image: string }[]
  >([]);

  useEffect(() => {
    const mediaItems = loadMediaItems()
      .filter((item) => item.category === "certificate")
      .map((item) => ({
        title: item.title,
        subtitle: getCategoryLabel(item.category),
        image: item.imageRef,
      }));
    setAdminCertificateItems(mediaItems);
  }, []);

  const certificateItems = [
    {
      title: "Certificate Of Affiliation",
      subtitle: "Surobharati Sangeet Kala Kendra, Kolkata",
      image: "/image/Certificate.jpg",
    },
    {
      title: "Certificate Of Achievement",
      subtitle: "Annual recognition and merit awards",
      image: "/image/WhatsApp Image 2025-04-18 at 15.33.36_09d227d1.jpg.jpeg",
    },
  ];

  const mergedCertificateItems = [...adminCertificateItems, ...certificateItems];

  return (
    <section id="certificates" className="py-12 sm:py-16 md:py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <div className="inline-block p-2 sm:p-3 bg-primary/10 rounded-full border border-primary/30 mb-3 sm:mb-4">
            <Award className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
            Our <span className="text-primary">Certificates</span>
          </h2>
          <div className="h-1 w-16 sm:w-20 md:w-24 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70">
            Certified & affiliated institute with recognized student certifications
          </p>
        </div>

        <ImageModal open={modalOpen} image={modalImage} alt={modalAlt} onClose={() => setModalOpen(false)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {mergedCertificateItems.map((item, index) => (
            <Card
              key={index}
              className="bg-card/50 border-primary/20 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-2 overflow-hidden group"
            >
              <div className="relative overflow-hidden aspect-[4/3] border-b border-primary/20 cursor-pointer"
                onClick={() => {
                  setModalImage(item.image);
                  setModalAlt(item.title);
                  setModalOpen(true);
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4 sm:p-5 md:p-6 text-center">
                <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-foreground/70">{item.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
