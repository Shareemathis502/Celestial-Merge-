export interface JournalEntry {
  id: string;
  timestamp: number;
  dateStr: string;
  zodiacSign: string;
  horoscope: string;
  note: string;
  moonPhase: string;
}

const STORAGE_KEY = 'celestial_journal_entries';

export function getJournalEntries(): JournalEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to parse journal entries", e);
    return [];
  }
}

export function saveJournalEntry(entry: Omit<JournalEntry, 'id' | 'timestamp'>): JournalEntry {
  const entries = getJournalEntries();
  const newEntry: JournalEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  entries.unshift(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return newEntry;
}

export function deleteJournalEntry(id: string): void {
  const entries = getJournalEntries();
  const newEntries = entries.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
}
