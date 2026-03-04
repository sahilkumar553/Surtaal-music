import { connectDB, Competition } from "./_db.js";

export default async function handler(req, res) {
  await connectDB();

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

  return res.status(405).json({ message: "Method not allowed" });
}
