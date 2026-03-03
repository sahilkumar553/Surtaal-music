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
import { subscribeToMediaItems, type MediaItem } from "@/lib/mediaStore";

const AUTO_PLAY_INTERVAL_MS = 4000;

export function Gallery() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [adminItems, setAdminItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, AUTO_PLAY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    const unsubscribe = subscribeToMediaItems((items) => {
      setAdminItems(items.filter((item) => item.category === "gallery"));
    });

    return () => unsubscribe();
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
    <section id="gallery" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <div className="inline-block p-2 sm:p-3 bg-primary/10 rounded-full border border-primary/30 mb-3 sm:mb-4">
            <ImageIcon className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
            Photo <span className="text-primary">Gallery</span>
          </h2>
          <div className="h-1 w-16 sm:w-20 md:w-24 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70">
            Classes • Stage Events • Certificate Distribution
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <Carousel opts={{ align: "start", loop: true }} setApi={setApi}>
            <CarouselContent>
              {combinedItems.map((item, index) => (
                <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="bg-card/50 border-primary/20 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-2 overflow-hidden group h-full">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-3 sm:p-4 md:p-5">
                      <h3 className="text-sm sm:text-base md:text-lg font-serif font-bold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground/70">{item.subtitle}</p>
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
