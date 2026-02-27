export const ADMIN_COMPETITIONS_STORAGE_KEY = "surtaal-admin-competitions";

export type CompetitionEvent = {
  id: string;
  title: string;
  description: string;
  eventDate: number; // timestamp
  imageRef: string;
  googleFormLink?: string;
  createdAt: number;
};

type StoredCompetitionEvent = Partial<CompetitionEvent> & {
  title?: string;
  description?: string;
  eventDate?: number;
  imageRef?: string;
  googleFormLink?: string;
};

function toCompetitionEvent(
  item: StoredCompetitionEvent,
  index: number,
): CompetitionEvent | null {
  const title = (item.title ?? "").trim();
  const description = (item.description ?? "").trim();
  const imageRef = (item.imageRef ?? "").trim();
  const eventDate = item.eventDate;
  const googleFormLink = (item.googleFormLink ?? "").trim() || undefined;

  if (!title || !description || !imageRef || !eventDate) {
    return null;
  }

  const id =
    item.id?.trim() ||
    `competition-${title}-${eventDate}-${index}`;
  const createdAt =
    typeof item.createdAt === "number" ? item.createdAt : Date.now();

  return {
    id,
    title,
    description,
    eventDate,
    imageRef,
    googleFormLink,
    createdAt,
  };
}

function saveCompetitions(items: CompetitionEvent[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    ADMIN_COMPETITIONS_STORAGE_KEY,
    JSON.stringify(items),
  );
}

export function loadCompetitions(): CompetitionEvent[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(ADMIN_COMPETITIONS_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as StoredCompetitionEvent[];
    const cleaned = parsed
      .map((item, index) => toCompetitionEvent(item, index))
      .filter((item): item is CompetitionEvent => Boolean(item));

    saveCompetitions(cleaned);
    return cleaned;
  } catch {
    return [];
  }
}

export function addCompetition(input: {
  title: string;
  description: string;
  eventDate: number;
  imageRef: string;
  googleFormLink?: string;
}): CompetitionEvent[] {
  const nextItem: CompetitionEvent = {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    title: input.title.trim(),
    description: input.description.trim(),
    eventDate: input.eventDate,
    imageRef: input.imageRef.trim(),
    googleFormLink: input.googleFormLink?.trim() || undefined,
    createdAt: Date.now(),
  };

  const items = [nextItem, ...loadCompetitions()];
  saveCompetitions(items);
  return items;
}

export function deleteCompetition(eventId: string): CompetitionEvent[] {
  const items = loadCompetitions().filter((item) => item.id !== eventId);
  saveCompetitions(items);
  return items;
}

export function getUpcomingCompetitions(): CompetitionEvent[] {
  const now = Date.now();
  return loadCompetitions()
    .filter((event) => event.eventDate > now)
    .sort((a, b) => a.eventDate - b.eventDate);
}

export function getPreviousCompetitions(): CompetitionEvent[] {
  const now = Date.now();
  return loadCompetitions()
    .filter((event) => event.eventDate <= now)
    .sort((a, b) => b.eventDate - a.eventDate);
}

export function formatEventDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatEventTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
