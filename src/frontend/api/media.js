import { connectDB, MediaItem, toMediaItem } from "./_db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error("DB connection failed:", error);
    return res.status(500).json({ message: "Database connection failed", detail: error.message });
  }

  // Handle DELETE /api/media/:id — Vercel may route here instead of media/[id].js
  const urlSegments = req.url.replace(/\?.*$/, "").split("/").filter(Boolean);
  // e.g. /api/media/abc123 → ["api", "media", "abc123"]
  const idFromPath = urlSegments.length >= 3 ? urlSegments[urlSegments.length - 1] : null;

  if (req.method === "DELETE" && idFromPath) {
    try {
      const deleted = await MediaItem.findByIdAndDelete(idFromPath);
      if (!deleted) {
        return res.status(404).json({ message: "Media item not found" });
      }
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unexpected server error" });
    }
  }

  if (req.method === "GET") {
    try {
      const items = await MediaItem.find().sort({ createdAt: -1 }).lean();
      return res.json(items.map(toMediaItem));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unexpected server error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, category, imageRef } = req.body ?? {};
      const trimmedTitle = typeof title === "string" ? title.trim() : "";
      const trimmedImageRef = typeof imageRef === "string" ? imageRef.trim() : "";
      const normalizedCategory = typeof category === "string" && category.trim() ? category.trim() : "gallery";

      if (!trimmedTitle || !trimmedImageRef) {
        return res.status(400).json({ message: "Invalid media payload" });
      }

      const doc = await MediaItem.create({
        title: trimmedTitle,
        category: normalizedCategory,
        imageRef: trimmedImageRef,
      });

      return res.status(201).json(toMediaItem(doc));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unexpected server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
