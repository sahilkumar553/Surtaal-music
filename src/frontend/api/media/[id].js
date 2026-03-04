import { connectDB, MediaItem } from "./_db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error("DB connection failed:", error);
    return res.status(500).json({ message: "Database connection failed" });
  }

  const { id } = req.query;

  if (req.method === "DELETE") {
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

  return res.status(405).json({ message: "Method not allowed" });
}
