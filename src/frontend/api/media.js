import { connectDB, MediaItem, toMediaItem } from "./_db.js";

/**
 * Extract a resource ID from the request using every available source.
 * Vercel may strip the sub-path from req.url when the function file is
 * `media.js` rather than `media/[id].js`, so we check multiple places.
 */
function extractId(req, prefix) {
  // 1. Vercel dynamic-route query param (media/[id].js populates req.query.id)
  if (req.query && req.query.id) return req.query.id;

  // 2. Full URL path in req.url
  const urlPath = (req.url || "").replace(/\?.*$/, "");
  const urlMatch = urlPath.match(new RegExp(prefix + "/([a-f0-9]{24})(?:/|$)"));
  if (urlMatch) return urlMatch[1];

  // 3. Vercel sets x-now-route-matches with encoded params
  const routeMatches = req.headers?.["x-now-route-matches"];
  if (routeMatches) {
    try {
      const params = new URLSearchParams(routeMatches);
      const id = params.get("id") || params.get("1");
      if (id) return decodeURIComponent(id);
    } catch {}
  }

  // 4. x-vercel-sc-pathname / x-matched-path (internal Vercel headers)
  for (const header of ["x-matched-path", "x-vercel-sc-pathname"]) {
    const val = req.headers?.[header];
    if (val) {
      const m = val.match(new RegExp(prefix + "/([a-f0-9]{24})"));
      if (m) return m[1];
    }
  }

  return null;
}

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error("DB connection failed:", error);
    return res.status(500).json({ message: "Database connection failed", detail: error.message });
  }

  const id = extractId(req, "/api/media");

  if (req.method === "DELETE") {
    if (!id) {
      return res.status(400).json({ message: "Missing media item ID" });
    }
    try {
      const deleted = await MediaItem.findByIdAndDelete(id);
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
