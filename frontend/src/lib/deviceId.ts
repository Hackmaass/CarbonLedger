// Anonymous device identity: a random id stored in localStorage. This lets us
// persist a user's history in Firestore without any login or personal data.

const STORAGE_KEY = "carbon_device_id";

function generateId(): string {
  // Prefer the platform CSPRNG; fall back to a standard UUIDv4 generator if absent.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Return the persistent anonymous device id, creating one if needed. */
export function getDeviceId(): string {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const id = generateId();
    localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    // localStorage unavailable (e.g. privacy mode) — use an ephemeral id.
    return generateId();
  }
}
