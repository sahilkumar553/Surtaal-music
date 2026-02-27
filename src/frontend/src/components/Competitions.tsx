import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Trophy, ExternalLink } from "lucide-react";
import {
  getUpcomingCompetitions,
  getPreviousCompetitions,
  formatEventDate,
  type CompetitionEvent,
} from "@/lib/competitionStore";

export function Competitions() {
  const [upcomingEvents, setUpcomingEvents] = useState<CompetitionEvent[]>([]);
  const [previousEvents, setPreviousEvents] = useState<CompetitionEvent[]>([]);

  useEffect(() => {
    setUpcomingEvents(getUpcomingCompetitions());
    setPreviousEvents(getPreviousCompetitions());
  }, []);

  return (
    <section id="competitions" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <div className="inline-block p-2 sm:p-3 bg-primary/10 rounded-full border border-primary/30 mb-3 sm:mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
            Competitions & <span className="text-primary">Events</span>
          </h2>
          <div className="h-1 w-16 sm:w-20 md:w-24 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70">
            Participate in exciting music and dance competitions
          </p>
        </div>

        {/* Tabs for Upcoming and Previous */}
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm sm:text-base"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Upcoming Events
              </TabsTrigger>
              <TabsTrigger
                value="previous"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm sm:text-base"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Previous Events
              </TabsTrigger>
            </TabsList>

            {/* Upcoming Events */}
            <TabsContent value="upcoming" className="space-y-4 sm:space-y-6">
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {upcomingEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="bg-card/50 border-primary/20 shadow-lg hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden group"
                    >
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={event.imageRef}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                          <div className="inline-flex items-center gap-2 bg-accent/90 text-accent-foreground px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            {formatEventDate(event.eventDate)}
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4 sm:p-5">
                        <h3 className="text-base sm:text-lg font-serif font-bold text-foreground mb-2">
                          {event.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-foreground/70 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="mt-4 flex flex-col gap-3">
                          <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold w-fit">
                            Upcoming
                          </span>
                          {event.googleFormLink && (
                            <Button
                              asChild
                              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-xs sm:text-sm"
                            >
                              <a
                                href={event.googleFormLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2"
                              >
                                <span>Click Here</span>
                                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-foreground/30 mx-auto mb-3" />
                  <p className="text-foreground/60">No upcoming events at the moment</p>
                </div>
              )}
            </TabsContent>

            {/* Previous Events */}
            <TabsContent value="previous" className="space-y-4 sm:space-y-6">
              {previousEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {previousEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="bg-card/50 border-primary/20 shadow-lg hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden group opacity-90"
                    >
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={event.imageRef}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                          <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-accent drop-shadow-lg" />
                        </div>
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                          <div className="inline-flex items-center gap-2 bg-secondary/90 text-secondary-foreground px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            {formatEventDate(event.eventDate)}
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4 sm:p-5">
                        <h3 className="text-base sm:text-lg font-serif font-bold text-foreground mb-2">
                          {event.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-foreground/70 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="mt-4">
                          <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                            Completed
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-12 h-12 text-foreground/30 mx-auto mb-3" />
                  <p className="text-foreground/60">No previous events yet</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
