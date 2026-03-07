import { connectDB, Competition, toCompetition } from "./_db.js";

function extractId(req, prefix) {
  if (req.query && req.query.id) return req.query.id;

  const urlPath = (req.url || "").replace(/\?.*$/, "");
  const urlMatch = urlPath.match(new RegExp(prefix + "/([a-f0-9]{24})(?:/|$)"));
  if (urlMatch) return urlMatch[1];

  const routeMatches = req.headers?.["x-now-route-matches"];
  if (routeMatches) {
    try {
      const params = new URLSearchParams(routeMatches);
      const id = params.get("id") || params.get("1");
      if (id) return decodeURIComponent(id);
    } catch {}
  }

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

  const id = extractId(req, "/api/competitions");

  if (req.method === "DELETE") {
    if (!id) {
      return res.status(400).json({ message: "Missing competition ID" });
    }
    try {
      const deleted = await Competition.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Competition not found" });
      }
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unexpected server error" });
    }
  }

  if (req.method === "PUT") {
    if (!id) {
      return res.status(400).json({ message: "Missing competition ID" });
    }
    try {
      const { description } = req.body ?? {};
      const update = {};
      if (typeof description === "string" && description.trim()) {
        update.description = description.trim();
      }
      if (Object.keys(update).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" });
      }
      const updated = await Competition.findByIdAndUpdate(id, update, { new: true });
      if (!updated) {
        return res.status(404).json({ message: "Competition not found" });
      }
      return res.status(200).json(toCompetition(updated));
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
