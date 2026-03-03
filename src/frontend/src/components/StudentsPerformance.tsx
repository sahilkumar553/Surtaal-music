import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Award, Video, ChevronLeft, ChevronRight } from "lucide-react";
import { getCategoryLabel, loadMediaItems, type MediaItem } from "@/lib/mediaStore";

export function StudentsPerformance() {
    // Video carousel state for student performance videos
    const videoIds = [
      "c2avzJ5OHxA", // https://www.youtube.com/watch?v=c2avzJ5OHxA
      "m315UJflORo", // https://www.youtube.com/watch?v=m315UJflORo
      "t4JHxlMCn-k", // https://www.youtube.com/watch?v=t4JHxlMCn-k
      "DAZX_Bk8dZc"
    ];
    const [currentVideo, setCurrentVideo] = useState(0);
    const handlePrevVideo = () => setCurrentVideo((prev) => (prev === 0 ? videoIds.length - 1 : prev - 1));
    const handleNextVideo = () => setCurrentVideo((prev) => (prev === videoIds.length - 1 ? 0 : prev + 1));
    const [activeTab, setActiveTab] = useState("stage");
    const [adminItems, setAdminItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    const mediaItems = loadMediaItems().filter((item) =>
      ["stage", "competition", "achievement"].includes(item.category),
    );
    setAdminItems(mediaItems);
  }, []);

  const categories = [
    { id: "stage", label: "Stage Show", icon: Video },
    { id: "competition", label: "Competitions", icon: Award },
    { id: "achievements", label: "Achievements", icon: Award },
  ];

  const performances = {
    stage: [
      {
        title: "Annual Function 2025",
        image: "/image/IMG-20250810-WA0083.jpg.jpeg",
        description: "Classical Song Performance",
      },
      {
        title: "Vocal Music Recital",
        image: "/image/WhatsApp Image 2026-02-23 at 10.02.16 PM.jpeg",
        description: "Group vocal performance",
      },
      {
        title: "Solo Singing",
        image: "/image/IMG-20250824-WA0010.jpg.jpeg",
        description: "Advanced Recording performance",
      },
    ],
    competition: [
      {
        title: "District Music Competition 2025",
        image: "/image/WhatsApp Image 2026-02-23 at 10.02.10 PM.jpeg",
        description: "Multiple students won prizes",
      },
    ],
    achievements: [
      {
        title: "Meeting with the Mithu Sir",
        image: "/image/IMG-20250813-WA0030.jpg.jpeg",
        description: "Meeting with the Mithu Sir",
      },
    ],
  };

  const dynamicPerformances = {
    stage: adminItems
      .filter((item) => item.category === "stage")
      .map((item) => ({
        title: item.title,
        image: item.imageRef,
        description: getCategoryLabel(item.category),
      })),
    competition: adminItems
      .filter((item) => item.category === "competition")
      .map((item) => ({
        title: item.title,
        image: item.imageRef,
        description: getCategoryLabel(item.category),
      })),
    achievements: adminItems
      .filter((item) => item.category === "achievement")
      .map((item) => ({
        title: item.title,
        image: item.imageRef,
        description: getCategoryLabel(item.category),
      })),
  };

  const mergedPerformances = {
    stage: [...dynamicPerformances.stage, ...performances.stage],
    competition: [...dynamicPerformances.competition, ...performances.competition],
    achievements: [...dynamicPerformances.achievements, ...performances.achievements],
  };

  return (
    <section id="students-performance" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block p-3 bg-primary/10 rounded-full border border-primary/30 mb-4">
            <Video className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Students <span className="text-primary">Performances</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-foreground/70">
            Real student performance videos and annual function highlights
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-card/50 border border-primary/20">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(mergedPerformances).map(([key, items]) => {
            const scrollable = items.length > 3;
            const scrollRef = useRef<HTMLDivElement>(null);
            const scrollBy = (amount: number) => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
              }
            };
            return (
              <TabsContent key={key} value={key} className="space-y-8">
                {scrollable && (
                  <div className="flex justify-end gap-2 mb-2">
                    <button
                      type="button"
                      className="p-2 rounded-full border border-primary/30 bg-background hover:bg-primary hover:text-primary-foreground transition-all"
                      onClick={() => scrollBy(-320)}
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-full border border-primary/30 bg-background hover:bg-primary hover:text-primary-foreground transition-all"
                      onClick={() => scrollBy(320)}
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
                <div
                  ref={scrollRef}
                  className={
                    scrollable
                      ? "flex gap-8 overflow-x-auto pb-2 px-1 no-scrollbar"
                      : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  }
                  style={scrollable ? { WebkitOverflowScrolling: "touch" } : undefined}
                >
                  {items.map((item, index) => (
                    <Card
                      key={index}
                      className={scrollable
                        ? "bg-card/50 border-primary/20 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-2 overflow-hidden group min-w-[320px] max-w-xs flex-shrink-0"
                        : "bg-card/50 border-primary/20 shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-2 overflow-hidden group"
                      }
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-foreground/70">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
          {/* Video Carousel (responsive) */}
<div className="max-w-5xl mx-auto mt-16 px-2 sm:px-4">
  <Card className="bg-card/50 border-primary/20 shadow-gold overflow-hidden">
    <CardContent className="p-0">
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        
        {/* ✅ IFRAME */}
        <iframe
          className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
          src={`https://www.youtube.com/embed/${videoIds[currentVideo]}`}
          title={`Real Student Performance Video ${currentVideo + 1}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* ✅ FIXED OVERLAY */}
        <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 pointer-events-none">
          
          {/* LEFT BUTTON */}
          <button
            type="button"
            className="pointer-events-auto bg-primary/80 hover:bg-primary text-white rounded-full p-2 sm:p-3 shadow-lg transition border border-primary/40"
            onClick={handlePrevVideo}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* RIGHT BUTTON */}
          <button
            type="button"
            className="pointer-events-auto bg-primary/80 hover:bg-primary text-white rounded-full p-2 sm:p-3 shadow-lg transition border border-primary/40"
            onClick={handleNextVideo}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

        </div>
      </div>
    </CardContent>
  </Card>
  </div>
      </div>
    </section>
  );
}
