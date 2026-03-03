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
  eventDate?: number | Timestamp;
  imageRef?: string;
  googleFormLink?: string;
  createdAt?: number | Timestamp;
};

const COLLECTION_NAME = "competitions";

function toMillis(value: unknown): number | null {
  if (typeof value === "number") return value;
  if (value instanceof Timestamp) return value.toMillis();
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
  const competitionsQuery = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(
    competitionsQuery,
    (snapshot) => {
      const items = snapshot.docs
        .map((docSnapshot, index) =>
          toCompetitionEvent(
            { id: docSnapshot.id, ...docSnapshot.data() },
            index,
          ),
        )
        .filter((item): item is CompetitionEvent => Boolean(item));

      onData(items);
    },
    (error) => {
      console.error("Failed to load competitions", error);
      onError?.(error);
    },
  );
}

export async function addCompetition(input: {
  title: string;
  description: string;
  eventDate: number;
  imageRef: string;
  googleFormLink?: string;
}): Promise<void> {
  await addDoc(collection(db, COLLECTION_NAME), {
    title: input.title.trim(),
    description: input.description.trim(),
    eventDate: input.eventDate,
    imageRef: input.imageRef.trim(),
    googleFormLink: input.googleFormLink?.trim() || null,
    createdAt: serverTimestamp(),
  });
}

export async function deleteCompetition(eventId: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, eventId));
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

export function formatEventTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
