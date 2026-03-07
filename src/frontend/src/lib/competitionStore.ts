import { request, subscribeWithPolling, type Unsubscribe } from "./apiClient";

export type CompetitionEvent = {
  id: string;
  title: string;
  description: string;
  eventDate: number;
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
  createdAt?: number;
};

const COLLECTION_PATH = "/competitions";
const POLL_INTERVAL_MS = 30000;

function toMillis(value: unknown): number | null {
  if (typeof value === "number") return value;
  return null;
}

function toCompetitionEvent(
  item: StoredCompetitionEvent,
  index: number,
): CompetitionEvent | null {
  const title = (item.title ?? "").trim();
  const description = (item.description ?? "").trim();
  const imageRef = (item.imageRef ?? "").trim();
  const eventDate = toMillis(item.eventDate);
  const googleFormLink = (item.googleFormLink ?? "").trim() || undefined;

  if (!title || !description || !imageRef || !eventDate) {
    return null;
  }

  const id = item.id?.trim() || `competition-${title}-${eventDate}-${index}`;
  const createdAt = toMillis(item.createdAt) ?? Date.now();

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

export function subscribeToCompetitions(
  onData: (events: CompetitionEvent[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  const fetchCompetitions = async (): Promise<CompetitionEvent[]> => {
    const items = await request<StoredCompetitionEvent[]>(COLLECTION_PATH);
    return items
      .map((item, index) => toCompetitionEvent(item, index))
      .filter((item): item is CompetitionEvent => Boolean(item));
  };

  return subscribeWithPolling(fetchCompetitions, onData, onError, {
    intervalMs: POLL_INTERVAL_MS,
  });
}

export async function addCompetition(input: {
  title: string;
  description: string;
  eventDate: number;
  imageRef: string;
  googleFormLink?: string;
}): Promise<void> {
  await request<CompetitionEvent>(COLLECTION_PATH, {
    method: "POST",
    body: JSON.stringify({
      title: input.title.trim(),
      description: input.description.trim(),
      eventDate: input.eventDate,
      imageRef: input.imageRef.trim(),
      googleFormLink: input.googleFormLink?.trim(),
    }),
  });
}

export async function deleteCompetition(eventId: string): Promise<void> {
  await request<void>(`${COLLECTION_PATH}/${eventId}`, {
    method: "DELETE",
  });
}

export async function updateCompetition(
  eventId: string,
  input: { description: string },
): Promise<void> {
  await request<CompetitionEvent>(`${COLLECTION_PATH}/${eventId}`, {
    method: "PUT",
    body: JSON.stringify({ description: input.description.trim() }),
  });
}

export function splitCompetitions(events: CompetitionEvent[]): {
  upcoming: CompetitionEvent[];
  previous: CompetitionEvent[];
} {
  const now = Date.now();
  const upcoming = events
    .filter((event) => event.eventDate > now)
    .sort((a, b) => a.eventDate - b.eventDate);
  const previous = events
    .filter((event) => event.eventDate <= now)
    .sort((a, b) => b.eventDate - a.eventDate);

  return { upcoming, previous };
}

export function formatEventDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
