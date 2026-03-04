import { connectDB, MediaItem, toMediaItem } from "./_db.js";

export default async function handler(req, res) {
  await connectDB();

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
