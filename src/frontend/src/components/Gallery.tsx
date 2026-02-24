import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { loadMediaItems } from "@/lib/mediaStore";

const AUTO_PLAY_INTERVAL_MS = 4000;

export function Gallery() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [adminItems, setAdminItems] = useState(() =>
    loadMediaItems().filter((item) => item.category === "gallery"),
  );

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, AUTO_PLAY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    setAdminItems(loadMediaItems().filter((item) => item.category === "gallery"));
  }, []);

  const staticItems = [
    {
      image: "/image/IMG-20250824-WA0007.jpg.jpeg",
      title: "Class Sessions",
      subtitle: "Daily Music & Dance Classes",
    },
    {
      image: "/image/IMG-20250810-WA0083.jpg.jpeg",
      title: "Stage Events",
      subtitle: "Annual Function Highlights",
    },
    {
      image: "/image/IMG-20250824-WA0010.jpg.jpeg",
      title: "Song Recording",
      subtitle: "Song Recording Session",
    },
    {
      image: "/image/IMG-20250824-WA0005.jpg.jpeg",
      title: "Students Performance",
      subtitle: "Confidence Through Creativity",
    },
    {
      image: "/image/IMG-20250204-WA0030.jpg.jpeg",
      title: "Group Photo",
      subtitle: "Our Team",
    },
    {
      image: "/image/IMG-20250824-WA0008.jpg.jpeg",
      title: "Shooting for Youtube",
      subtitle: "Youtube Channel",
    },
    {
      image: "/image/IMG-20250204-WA0040.jpg.jpeg",
      title: "Instrument Worship",
      subtitle: "Instrument Worship Session",
    },
  ];

  const combinedItems = [
    ...adminItems.map((item) => ({
      image: item.imageRef,
      title: item.title || "Gallery Photo",
      subtitle: "Gallery",
    })),
    ...staticItems,
  ];

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block p-3 bg-primary/10 rounded-full border border-primary/30 mb-4">
            <ImageIcon className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Photo <span className="text-primary">Gallery</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-foreground/70">
            Classes • Stage Events • Certificate Distribution
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-10">
          <Carousel opts={{ align: "start", loop: true }} setApi={setApi}>
            <CarouselContent>
              {combinedItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-card/50 border-primary/20 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-2 overflow-hidden group h-full">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-foreground/70">{item.subtitle}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
