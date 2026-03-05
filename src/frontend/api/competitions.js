import { connectDB, Competition, toCompetition } from "./_db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error("DB connection failed:", error);
    return res.status(500).json({ message: "Database connection failed", detail: error.message });
  }

  // Handle DELETE /api/competitions/:id — Vercel may route here instead of competitions/[id].js
  const urlSegments = req.url.replace(/\?.*$/, "").split("/").filter(Boolean);
  const idFromPath = urlSegments.length >= 3 ? urlSegments[urlSegments.length - 1] : null;

  if (req.method === "DELETE" && idFromPath) {
    try {
      const deleted = await Competition.findByIdAndDelete(idFromPath);
      if (!deleted) {
        return res.status(404).json({ message: "Competition not found" });
      }
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unexpected server error" });
    }
  }

  if (req.method === "GET") {
    try {
      const items = await Competition.find().sort({ createdAt: -1 }).lean();
      return res.json(items.map(toCompetition));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unexpected server error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, description, eventDate, imageRef, googleFormLink } = req.body ?? {};
      const trimmedTitle = typeof title === "string" ? title.trim() : "";
      const trimmedDescription = typeof description === "string" ? description.trim() : "";
      const trimmedImageRef = typeof imageRef === "string" ? imageRef.trim() : "";
      const trimmedFormLink =
        typeof googleFormLink === "string" && googleFormLink.trim() ? googleFormLink.trim() : undefined;
      const eventDateMs = typeof eventDate === "number" ? eventDate : Number(eventDate);

      if (!trimmedTitle || !trimmedDescription || !trimmedImageRef || !Number.isFinite(eventDateMs)) {
        return res.status(400).json({ message: "Invalid competition payload" });
      }

      const doc = await Competition.create({
        title: trimmedTitle,
        description: trimmedDescription,
        eventDate: new Date(eventDateMs),
        imageRef: trimmedImageRef,
        googleFormLink: trimmedFormLink,
      });

      return res.status(201).json(toCompetition(doc));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unexpected server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
