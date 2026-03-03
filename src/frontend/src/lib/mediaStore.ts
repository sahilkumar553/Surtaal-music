import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";

export const MEDIA_CATEGORY_OPTIONS = [
  { value: "gallery", label: "Gallery" },
  { value: "stage", label: "Stage Performances" },
  { value: "competition", label: "Competitions" },
  { value: "achievement", label: "Achievements" },
  { value: "certificate", label: "Certificates" },
] as const;

export type MediaCategory = (typeof MEDIA_CATEGORY_OPTIONS)[number]["value"];

export type MediaItem = {
  id: string;
  title: string;
  category: MediaCategory;
  imageRef: string;
  createdAt: number;
};

type StoredMediaItem = Partial<MediaItem> & {
  title?: string;
  category?: string;
  imageRef?: string;
  createdAt?: number | Timestamp;
};

const legacyCategoryMap: Record<string, MediaCategory> = {
  class: "gallery",
  performance: "stage",
  ceremony: "certificate",
  achievements: "achievement",
};

const COLLECTION_NAME = "mediaItems";

function normalizeCategory(category: string | undefined): MediaCategory {
  if (!category) return "gallery";
  if (category in legacyCategoryMap) {
    return legacyCategoryMap[category];
  }

  const allowed = MEDIA_CATEGORY_OPTIONS.map((option) => option.value);
  return allowed.includes(category as MediaCategory)
    ? (category as MediaCategory)
    : "gallery";
}

function isVisaImage(item: StoredMediaItem): boolean {
  const text = `${item.title ?? ""} ${item.imageRef ?? ""}`.toLowerCase();
  return text.includes("visa");
}

function toMillis(value: unknown): number | null {
  if (typeof value === "number") return value;
  if (value instanceof Timestamp) return value.toMillis();
  return null;
}

function toMediaItem(item: StoredMediaItem, index: number): MediaItem | null {
  const title = (item.title ?? "").trim();
  const imageRef = (item.imageRef ?? "").trim();

  if (!title || !imageRef) {
    return null;
  }

  const category = normalizeCategory(item.category);
  const id = item.id?.trim() || `${category}-${title}-${imageRef}-${index}`;
  const createdAt = toMillis(item.createdAt) ?? Date.now();

  return {
    id,
    title,
    category,
    imageRef,
    createdAt,
  };
}

export function subscribeToMediaItems(
  onData: (items: MediaItem[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  const mediaQuery = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));

  return onSnapshot(
    mediaQuery,
    (snapshot) => {
      const items = snapshot.docs
        .map((docSnapshot, index) =>
          toMediaItem({ id: docSnapshot.id, ...docSnapshot.data() }, index),
        )
        .filter((item): item is MediaItem => Boolean(item))
        .filter((item) => !isVisaImage(item));

      onData(items);
    },
    (error) => {
      console.error("Failed to load media items", error);
      onError?.(error);
    },
  );
}

export async function addMediaItem(input: {
  title: string;
  category: MediaCategory;
  imageRef: string;
}): Promise<void> {
  await addDoc(collection(db, COLLECTION_NAME), {
    title: input.title.trim(),
    category: input.category,
    imageRef: input.imageRef.trim(),
    createdAt: serverTimestamp(),
  });
}

export async function deleteMediaItem(itemId: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, itemId));
}

export function getCategoryLabel(category: MediaCategory): string {
  const option = MEDIA_CATEGORY_OPTIONS.find((item) => item.value === category);
  return option?.label ?? "Gallery";
}
