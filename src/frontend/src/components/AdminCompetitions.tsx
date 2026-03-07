import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trophy, Trash2, Plus, Pencil, Check, X } from "lucide-react";
import {
  addCompetition,
  deleteCompetition,
  updateCompetition,
  splitCompetitions,
  subscribeToCompetitions,
  formatEventDate,
  type CompetitionEvent,
} from "@/lib/competitionStore";
import { getCurrentUser, isAdmin } from "@/lib/authStore";

export function AdminCompetitions() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("10:00");
  const [imageRef, setImageRef] = useState("");
  const [googleFormLink, setGoogleFormLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<CompetitionEvent[]>([]);
  const [previousEvents, setPreviousEvents] = useState<CompetitionEvent[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !isAdmin(user)) {
      toast.error("Admin access required");
      navigate("/login", { replace: true });
      return;
    }

    const unsubscribe = subscribeToCompetitions((events) => {
      const { upcoming, previous } = splitCompetitions(events);
      setUpcomingEvents(upcoming);
      setPreviousEvents(previous);
    }, () => {
      toast.error("Failed to load competitions");
    });

    setIsAuthorized(true);
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !description || !eventDate || (!imageRef && !file)) {
      toast.error("Please fill all fields and select an image");
      return;
    }

    let finalImageRef = imageRef.trim();

    if (file) {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        toast.error("Cloudinary is not configured");
        return;
      }

      try {
        setIsSaving(true);

        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", uploadPreset);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: uploadData,
          },
        );

        if (!res.ok) {
          throw new Error("Upload failed");
        }

        const json = (await res.json()) as { secure_url?: string };
        if (!json.secure_url) {
          throw new Error("No image URL returned from Cloudinary");
        }

        finalImageRef = json.secure_url;
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload image to Cloudinary");
        setIsSaving(false);
        return;
      }
    }

    try {
      setIsSaving(true);
      // Combine date and time
      const [year, month, day] = eventDate.split("-");
      const [hours, minutes] = eventTime.split(":");
      const eventTimestamp = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes),
      ).getTime();

      await addCompetition({
        title,
        description,
        eventDate: eventTimestamp,
        imageRef: finalImageRef,
        googleFormLink: googleFormLink.trim() || undefined,
      });
      setTitle("");
      setDescription("");
      setEventDate("");
      setEventTime("10:00");
      setImageRef("");
      setGoogleFormLink("");
      setFile(null);
      toast.success("Event added successfully");
    } catch {
      toast.error("Failed to save event");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      await deleteCompetition(eventId);
      toast.success("Event deleted successfully");
    } catch {
      toast.error("Failed to delete event");
    }
  };

  const handleEditStart = (event: CompetitionEvent) => {
    setEditingId(event.id);
    setEditDescription(event.description);
  };

  const handleEditSave = async (eventId: string) => {
    try {
      await updateCompetition(eventId, { description: editDescription });
      setEditingId(null);
      toast.success("Description updated successfully");
    } catch {
      toast.error("Failed to update description");
    }
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <section className="py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <Card className="bg-card/50 border-primary/20 shadow-lg mb-10">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-primary flex items-center gap-2">
              <Trophy className="w-7 h-7" />
              Competitions Admin Panel
            </CardTitle>
            <p className="text-sm text-foreground/70">
              Create upcoming events. They automatically move to "Previous Events" after the event date.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Inter-School Music Competition 2026"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Event Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the event, prize details, registration info, etc."
                  className="min-h-24"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventTime">Event Time</Label>
                  <Input
                    id="eventTime"
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={imageRef}
                    onChange={(e) => setImageRef(e.target.value)}
                    placeholder="Paste image URL or upload file below"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Or Upload Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  {file && (
                    <p className="text-xs text-foreground/60">{file.name}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="googleFormLink">Google Form Link (Optional)</Label>
                <Input
                  id="googleFormLink"
                  value={googleFormLink}
                  onChange={(e) => setGoogleFormLink(e.target.value)}
                  placeholder="Paste your Google Form link here for registration/participation"
                  type="url"
                />
                <p className="text-xs text-foreground/60">
                  This will show a "Click Here" button on the upcoming event card
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSaving}
                className="w-full bg-primary text-primary-foreground hover:bg-accent"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isSaving ? "Adding..." : "Add Event"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <Card className="bg-card/50 border-primary/20 shadow-lg mb-10">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-primary">
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex gap-4 p-4 bg-background border border-primary/20 rounded-lg"
                  >
                    <img
                      src={event.imageRef}
                      alt={event.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{event.title}</h3>
                      <p className="text-sm text-foreground/70 mb-2">
                        {formatEventDate(event.eventDate)}
                      </p>
                      {editingId === event.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="text-xs min-h-20"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleEditSave(event.id)} className="bg-primary text-primary-foreground">
                              <Check className="w-3 h-3 mr-1" /> Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                              <X className="w-3 h-3 mr-1" /> Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-foreground/60 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                      {event.googleFormLink && (
                        <p className="text-xs text-accent mt-2">
                          📝 Google Form: {event.googleFormLink.substring(0, 30)}...
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditStart(event)}
                        className="text-primary hover:bg-primary/10"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(event.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Previous Events */}
        {previousEvents.length > 0 && (
          <Card className="bg-card/50 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-primary">
                Previous Events (Completed)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previousEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex gap-4 p-4 bg-background border border-primary/20 rounded-lg opacity-75"
                  >
                    <img
                      src={event.imageRef}
                      alt={event.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{event.title}</h3>
                      <p className="text-sm text-foreground/70 mb-2">
                        {formatEventDate(event.eventDate)}
                      </p>
                      {editingId === event.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="text-xs min-h-20"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleEditSave(event.id)} className="bg-primary text-primary-foreground">
                              <Check className="w-3 h-3 mr-1" /> Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                              <X className="w-3 h-3 mr-1" /> Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-foreground/60 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                      {event.googleFormLink && (
                        <p className="text-xs text-accent mt-2">
                          📝 Google Form: {event.googleFormLink.substring(0, 30)}...
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditStart(event)}
                        className="text-primary hover:bg-primary/10"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(event.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
