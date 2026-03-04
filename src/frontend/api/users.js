import { connectDB, User, toUser } from "./_db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error("DB connection failed:", error);
    return res.status(500).json({ message: "Database connection failed", detail: error.message });
  }

  if (req.method === "POST") {
    try {
      const { id, name, email, phone, course, createdAt, isAdmin } = req.body ?? {};
      const firebaseUid = typeof id === "string" ? id.trim() : "";
      const safeName = typeof name === "string" ? name.trim() : "";
      const safeEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
      const safePhone = typeof phone === "string" && phone.trim() ? phone.trim() : undefined;
      const safeCourse = typeof course === "string" && course.trim() ? course.trim() : undefined;
      const createdAtMs = typeof createdAt === "number" ? createdAt : Date.now();

      if (!firebaseUid || !safeName || !safeEmail) {
        return res.status(400).json({ message: "Invalid user payload" });
      }

      const doc = await User.findOneAndUpdate(
        { firebaseUid },
        {
          firebaseUid,
          name: safeName,
          email: safeEmail,
          phone: safePhone,
          course: safeCourse,
          createdAt: new Date(createdAtMs),
          isAdmin: Boolean(isAdmin),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );

      return res.status(200).json(toUser(doc));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unexpected server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
