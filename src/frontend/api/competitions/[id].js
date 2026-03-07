import { connectDB, Competition } from "../_db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error("DB connection failed:", error);
    return res.status(500).json({ message: "Database connection failed", detail: error.message });
  }

  const { id } = req.query;

  if (req.method === "DELETE") {
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
    try {
      const updated = await Competition.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ message: "Competition not found" });
      }
      return res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unexpected server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
