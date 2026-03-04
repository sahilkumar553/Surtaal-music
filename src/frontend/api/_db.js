import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";
const DB_NAME = process.env.MONGODB_DB_NAME ?? "sur-taal";

let cached = global.__mongooseConnection;

if (!cached) {
  cached = global.__mongooseConnection = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: DB_NAME }).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/* ── Schemas ─────────────────────────────────────────── */

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

export const Competition = mongoose.models.Competition || mongoose.model("Competition", competitionSchema);
export const MediaItem = mongoose.models.MediaItem || mongoose.model("MediaItem", mediaItemSchema);
export const User = mongoose.models.User || mongoose.model("User", userSchema);

/* ── Serializers ─────────────────────────────────────── */

export function toCompetition(doc) {
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

export function toUser(doc) {
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

export function toMediaItem(doc) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    category: doc.category,
    imageRef: doc.imageRef,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.getTime() : Date.now(),
  };
}
