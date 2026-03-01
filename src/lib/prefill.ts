import type { ContactFormData } from "./form-types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PREFILL_STORAGE_KEY = "scan2pass_prefill_v1";

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
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

function parseStoragePrefill(storage: StorageLike | null): ContactFormData {
  if (!storage) {
    return normalizePrefillInput(undefined);
  }
  try {
    const raw = storage.getItem(PREFILL_STORAGE_KEY);
    if (!raw) {
      return normalizePrefillInput(undefined);
    }
    return normalizePrefillInput(JSON.parse(raw) as Partial<ContactFormData>);
  } catch {
    return normalizePrefillInput(undefined);
  }
}

function mergePrefill(
  baseData: ContactFormData,
  ...sources: Array<Partial<ContactFormData>>
): ContactFormData {
  return sources.reduce<ContactFormData>(
    (accumulator, source) => ({
      email: accumulator.email || source.email || "",
      firstName: accumulator.firstName || source.firstName || "",
      lastName: accumulator.lastName || source.lastName || "",
    }),
    { ...baseData },
  );
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
  return mergePrefill(sanitizedBase, queryPrefill, storagePrefill);
}

export function persistFormPrefill(
  storage: StorageLike | null,
  formData: ContactFormData,
): void {
  if (!storage) {
    return;
  }
  try {
    const normalized = normalizePrefillInput(formData);
    storage.setItem(PREFILL_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // Ignore storage failures (private mode or quota issues).
  }
}

export { PREFILL_STORAGE_KEY };
