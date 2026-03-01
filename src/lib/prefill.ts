import type { ContactFormData } from "./form-types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PREFILL_STORAGE_KEY = "scan2pass_prefill_v1";
const PREFILL_TTL_MS = 24 * 60 * 60 * 1000;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem?(key: string): void;
}

interface PersistedPrefillPayload {
  savedAt: number;
  values: ContactFormData;
}

function isPersistedPrefillPayload(
  value: unknown,
): value is PersistedPrefillPayload {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as { savedAt?: unknown; values?: unknown };
  return (
    typeof candidate.savedAt === "number" &&
    typeof candidate.values === "object" &&
    candidate.values !== null
  );
}

function normalizeName(value: unknown): string {
  const nextValue = typeof value === "string" ? value.trim() : "";
  if (!nextValue || nextValue.length > 80) {
    return "";
  }
  return nextValue;
}

function normalizeEmail(value: unknown): string {
  const nextValue = typeof value === "string" ? value.trim().toLowerCase() : "";
  return EMAIL_REGEX.test(nextValue) ? nextValue : "";
}

function normalizePrefillInput(
  input: Partial<ContactFormData> | null | undefined,
): ContactFormData {
  return {
    email: normalizeEmail(input?.email),
    firstName: normalizeName(input?.firstName),
    lastName: normalizeName(input?.lastName),
  };
}

function parseQueryPrefill(search: string): ContactFormData {
  if (!search) {
    return normalizePrefillInput(undefined);
  }
  const params = new URLSearchParams(search);
  return normalizePrefillInput({
    email: params.get("email") || params.get("mail") || "",
    firstName:
      params.get("firstName") ||
      params.get("first_name") ||
      params.get("firstname") ||
      "",
    lastName:
      params.get("lastName") ||
      params.get("last_name") ||
      params.get("lastname") ||
      "",
  });
}

function removePersistedPrefill(storage: StorageLike): void {
  if (typeof storage.removeItem === "function") {
    storage.removeItem(PREFILL_STORAGE_KEY);
    return;
  }
  storage.setItem(PREFILL_STORAGE_KEY, "");
}

function parseStoragePrefill(storage: StorageLike | null): ContactFormData {
  if (!storage) {
    return normalizePrefillInput(undefined);
  }
  try {
    const raw = storage.getItem(PREFILL_STORAGE_KEY);
    if (!raw) {
      return normalizePrefillInput(undefined);
    }
    const parsed = JSON.parse(raw) as unknown;
    if (isPersistedPrefillPayload(parsed)) {
      if (Date.now() - parsed.savedAt > PREFILL_TTL_MS) {
        removePersistedPrefill(storage);
        return normalizePrefillInput(undefined);
      }
      return normalizePrefillInput(parsed.values as Partial<ContactFormData>);
    }
    return normalizePrefillInput(parsed as Partial<ContactFormData>);
  } catch {
    removePersistedPrefill(storage);
    return normalizePrefillInput(undefined);
  }
}

function pickFirstNonEmpty(...values: Array<string | undefined>): string {
  for (const value of values) {
    if (value) {
      return value;
    }
  }
  return "";
}

function mergePrefill(
  queryPrefill: ContactFormData,
  storagePrefill: ContactFormData,
  baseData: ContactFormData,
): ContactFormData {
  return {
    email: pickFirstNonEmpty(
      queryPrefill.email,
      storagePrefill.email,
      baseData.email,
    ),
    firstName: pickFirstNonEmpty(
      queryPrefill.firstName,
      storagePrefill.firstName,
      baseData.firstName,
    ),
    lastName: pickFirstNonEmpty(
      queryPrefill.lastName,
      storagePrefill.lastName,
      baseData.lastName,
    ),
  };
}

export function resolveInitialFormData(
  baseData: ContactFormData,
  search: string,
  storage: StorageLike | null,
): ContactFormData {
  const sanitizedBase = normalizePrefillInput(baseData);
  const queryPrefill = parseQueryPrefill(search);
  const storagePrefill = parseStoragePrefill(storage);

  // Priority: explicit query params, then stored recent values, then base defaults.
  return mergePrefill(queryPrefill, storagePrefill, sanitizedBase);
}

export function persistFormPrefill(
  storage: StorageLike | null,
  formData: ContactFormData,
): void {
  if (!storage) {
    return;
  }
  try {
    const payload: PersistedPrefillPayload = {
      savedAt: Date.now(),
      values: normalizePrefillInput(formData),
    };
    storage.setItem(PREFILL_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage failures (private mode or quota issues).
  }
}

export function clearFormPrefill(storage: StorageLike | null): void {
  if (!storage) {
    return;
  }
  try {
    removePersistedPrefill(storage);
  } catch {
    // Ignore storage failures (private mode or quota issues).
  }
}

export { PREFILL_STORAGE_KEY, PREFILL_TTL_MS };
