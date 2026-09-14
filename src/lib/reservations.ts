const storageKey = 'tasteflow.reservations';

function readReservationIds(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const storedIds = window.localStorage.getItem(storageKey);
    return storedIds ? (JSON.parse(storedIds) as string[]) : [];
  } catch {
    return [];
  }
}

export function hasReservation(eventId: string): boolean {
  return readReservationIds().includes(eventId);
}

export function toggleReservation(eventId: string): boolean {
  const reservationIds = readReservationIds();
  const nextReservationIds = reservationIds.includes(eventId)
    ? reservationIds.filter((savedEventId) => savedEventId !== eventId)
    : [...reservationIds, eventId];

  window.localStorage.setItem(storageKey, JSON.stringify(nextReservationIds));
  return nextReservationIds.includes(eventId);
}