import { connectDB, User, toUser } from "./_db.js";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const doc = await User.findOne({ firebaseUid: id });
      if (!doc) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(toUser(doc));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unexpected server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
