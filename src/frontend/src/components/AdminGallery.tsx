import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImagePlus, Trash2 } from "lucide-react";
import {
  addMediaItem,
  deleteMediaItem,
  getCategoryLabel,
  loadMediaItems,
  MEDIA_CATEGORY_OPTIONS,
  type MediaCategory,
  type MediaItem,
} from "@/lib/mediaStore";
import { getCurrentUser, isAdmin } from "@/lib/authStore";

export function AdminGallery() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<MediaCategory>("gallery");
  const [imageRef, setImageRef] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !isAdmin(user)) {
      toast.error("Admin access required");
      navigate("/login", { replace: true });
      return;
    }

    setIsAuthorized(true);
    setItems(loadMediaItems());
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !category || (!imageRef && !file)) {
      toast.error("Please fill all fields and select an image");
      return;
    }

    let finalImageRef = imageRef.trim();

    // If a file is selected, upload to Cloudinary first
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
      const nextItems = addMediaItem({ title, category, imageRef: finalImageRef });
      setItems(nextItems);
      setTitle("");
      setImageRef("");
      setFile(null);
      toast.success("Image added successfully");
    } catch {
      toast.error("Failed to save gallery item");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (itemId: string) => {
    try {
      const nextItems = deleteMediaItem(itemId);
      setItems(nextItems);
      toast.success("Image deleted successfully");
    } catch {
      toast.error("Failed to delete image");
    }
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <section className="py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-card/50 border-primary/20 shadow-gold mb-10">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-primary flex items-center gap-2">
              <ImagePlus className="w-7 h-7" />
              Gallery Admin Panel
            </CardTitle>
            <p className="text-sm text-foreground/70">
              Upload by image URL. For full media management, connect your secure CMS later.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g., Annual Function 2026"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEDIA_CATEGORY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="file">Upload from device</Label>
                  <Input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setFile(event.target.files && event.target.files[0]
                        ? event.target.files[0]
                        : null)
                    }
                  />
                  <p className="text-xs text-foreground/60">
                    Image will be uploaded to Cloudinary (recommended way).
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageRef">Or paste image URL</Label>
                  <Input
                    id="imageRef"
                    value={imageRef}
                    onChange={(event) => setImageRef(event.target.value)}
                    placeholder="https://res.cloudinary.com/..."
                  />
                </div>
              </div>

              <Button type="submit" disabled={isSaving} className="w-full">
                {isSaving ? "Saving..." : "Add Image"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/20 shadow-gold">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-foreground">Current Gallery Items</CardTitle>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <p className="text-foreground/70">No gallery items yet.</p>
            ) : (
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="p-3 border border-primary/20 rounded-sm bg-background/60">
                    <div className="flex items-start gap-3">
                      <img
                        src={item.imageRef}
                        alt={item.title}
                        className="h-16 w-24 object-cover rounded-sm border border-primary/20"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-foreground/70">Category: {getCategoryLabel(item.category)}</p>
                        <p className="text-xs text-primary break-all">{item.imageRef}</p>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
