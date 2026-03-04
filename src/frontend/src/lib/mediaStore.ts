import { request, subscribeWithPolling, type Unsubscribe } from "./apiClient";

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
  createdAt?: number;
};

const legacyCategoryMap: Record<string, MediaCategory> = {
  class: "gallery",
  performance: "stage",
  ceremony: "certificate",
  achievements: "achievement",
};

const COLLECTION_PATH = "/media";
const POLL_INTERVAL_MS = 30000;

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
  const fetchMedia = async (): Promise<MediaItem[]> => {
    const items = await request<StoredMediaItem[]>(COLLECTION_PATH);
    return items
      .map((item, index) => toMediaItem(item, index))
      .filter((item): item is MediaItem => Boolean(item))
      .filter((item) => !isVisaImage(item));
  };

  return subscribeWithPolling(fetchMedia, onData, onError, {
    intervalMs: POLL_INTERVAL_MS,
  });
}

export async function addMediaItem(input: {
  title: string;
  category: MediaCategory;
  imageRef: string;
}): Promise<void> {
  await request<MediaItem>(COLLECTION_PATH, {
    method: "POST",
    body: JSON.stringify({
      title: input.title.trim(),
      category: input.category,
      imageRef: input.imageRef.trim(),
    }),
  });
}

export async function deleteMediaItem(itemId: string): Promise<void> {
  await request<void>(`${COLLECTION_PATH}/${itemId}`, {
    method: "DELETE",
  });
}

export function getCategoryLabel(category: MediaCategory): string {
  const option = MEDIA_CATEGORY_OPTIONS.find((item) => item.value === category);
  return option?.label ?? "Gallery";
}
