export const ADMIN_GALLERY_STORAGE_KEY = "surtaal-admin-gallery-items";

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
};

const legacyCategoryMap: Record<string, MediaCategory> = {
  class: "gallery",
  performance: "stage",
  ceremony: "certificate",
  achievements: "achievement",
};

function normalizeCategory(category: string | undefined): MediaCategory {
  if (!category) return "gallery";
  if (category in legacyCategoryMap) {
    return legacyCategoryMap[category];
  }

  const allowed = MEDIA_CATEGORY_OPTIONS.map((option) => option.value);
  return allowed.includes(category as MediaCategory) ? (category as MediaCategory) : "gallery";
}

function isVisaImage(item: StoredMediaItem): boolean {
  const text = `${item.title ?? ""} ${item.imageRef ?? ""}`.toLowerCase();
  return text.includes("visa");
}

function toMediaItem(item: StoredMediaItem, index: number): MediaItem | null {
  const title = (item.title ?? "").trim();
  const imageRef = (item.imageRef ?? "").trim();

  if (!title || !imageRef) {
    return null;
  }

  const category = normalizeCategory(item.category);
  const id = item.id?.trim() || `${category}-${title}-${imageRef}-${index}`;
  const createdAt = typeof item.createdAt === "number" ? item.createdAt : Date.now();

  return {
    id,
    title,
    category,
    imageRef,
    createdAt,
  };
}

function saveMediaItems(items: MediaItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_GALLERY_STORAGE_KEY, JSON.stringify(items));
}

export function loadMediaItems(): MediaItem[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(ADMIN_GALLERY_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as StoredMediaItem[];
    const cleaned = parsed
      .filter((item) => !isVisaImage(item))
      .map((item, index) => toMediaItem(item, index))
      .filter((item): item is MediaItem => Boolean(item));

    saveMediaItems(cleaned);
    return cleaned;
  } catch {
    return [];
  }
}

export function addMediaItem(input: {
  title: string;
  category: MediaCategory;
  imageRef: string;
}): MediaItem[] {
  const nextItem: MediaItem = {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    title: input.title.trim(),
    category: input.category,
    imageRef: input.imageRef.trim(),
    createdAt: Date.now(),
  };

  const items = [nextItem, ...loadMediaItems()];
  saveMediaItems(items);
  return items;
}

export function deleteMediaItem(itemId: string): MediaItem[] {
  const items = loadMediaItems().filter((item) => item.id !== itemId);
  saveMediaItems(items);
  return items;
}

export function getCategoryLabel(category: MediaCategory): string {
  const option = MEDIA_CATEGORY_OPTIONS.find((item) => item.value === category);
  return option?.label ?? "Gallery";
}
