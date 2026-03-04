import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT ?? process.env.API_PORT ?? 4000);
const MONGODB_URI = process.env.MONGODB_URI ?? "";
const allowedOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI. Set it in your .env file.");
  process.exit(1);
}

mongoose.set("strictQuery", true);

const competitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    eventDate: { type: Date, required: true },
    imageRef: { type: String, required: true, trim: true },
    googleFormLink: { type: String, trim: true },
  },
  { timestamps: true },
);

const mediaItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["gallery", "stage", "competition", "achievement", "certificate"],
      required: true,
      default: "gallery",
    },
    imageRef: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const Competition = mongoose.model("Competition", competitionSchema);
const MediaItem = mongoose.model("MediaItem", mediaItemSchema);
const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    course: { type: String, trim: true },
    createdAt: { type: Date, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : "*",
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));

function toCompetition(doc) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    description: doc.description,
    eventDate: doc.eventDate instanceof Date ? doc.eventDate.getTime() : Number(doc.eventDate),
    imageRef: doc.imageRef,
    googleFormLink: doc.googleFormLink || undefined,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.getTime() : Date.now(),
  };
}

function toUser(doc) {
  return {
    id: doc.firebaseUid,
    name: doc.name,
    email: doc.email,
    phone: doc.phone || undefined,
    course: doc.course || undefined,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.getTime() : Date.now(),
    isAdmin: Boolean(doc.isAdmin),
  };
}

function toMediaItem(doc) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    category: doc.category,
    imageRef: doc.imageRef,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.getTime() : Date.now(),
  };
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/users", async (req, res, next) => {
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

    res.status(200).json(toUser(doc));
  } catch (error) {
    next(error);
  }
});

app.get("/api/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await User.findOne({ firebaseUid: id });
    if (!doc) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(toUser(doc));
  } catch (error) {
    next(error);
  }
});

app.get("/api/competitions", async (_req, res, next) => {
  try {
    const items = await Competition.find().sort({ createdAt: -1 }).lean();
    res.json(items.map(toCompetition));
  } catch (error) {
    next(error);
  }
});

app.post("/api/competitions", async (req, res, next) => {
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

    res.status(201).json(toCompetition(doc));
  } catch (error) {
    next(error);
  }
});

app.delete("/api/competitions/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Competition.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Competition not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.get("/api/media", async (_req, res, next) => {
  try {
    const items = await MediaItem.find().sort({ createdAt: -1 }).lean();
    res.json(items.map(toMediaItem));
  } catch (error) {
    next(error);
  }
});

app.post("/api/media", async (req, res, next) => {
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

    res.status(201).json(toMediaItem(doc));
  } catch (error) {
    next(error);
  }
});

app.delete("/api/media/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await MediaItem.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Media item not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Unexpected server error" });
});

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: process.env.MONGODB_DB_NAME });
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

void start();
