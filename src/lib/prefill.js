const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PREFILL_STORAGE_KEY = "scan2pass_prefill_v1";

function normalizeName(value) {
  const nextValue = typeof value === "string" ? value.trim() : "";
  if (!nextValue || nextValue.length > 80) {
    return "";
  }
  return nextValue;
}

function normalizeEmail(value) {
  const nextValue = typeof value === "string" ? value.trim().toLowerCase() : "";
  return EMAIL_REGEX.test(nextValue) ? nextValue : "";
}

function normalizePrefillInput(input) {
  return {
    email: normalizeEmail(input?.email),
    firstName: normalizeName(input?.firstName),
    lastName: normalizeName(input?.lastName),
  };
}

function parseQueryPrefill(search) {
  if (!search) {
    return {};
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

function parseStoragePrefill(storage) {
  if (!storage) {
    return {};
  }
  try {
    const raw = storage.getItem(PREFILL_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    return normalizePrefillInput(JSON.parse(raw));
  } catch {
    return {};
  }
}

function mergePrefill(baseData, ...sources) {
  return sources.reduce(
    (accumulator, source) => ({
      email: accumulator.email || source.email || "",
      firstName: accumulator.firstName || source.firstName || "",
      lastName: accumulator.lastName || source.lastName || "",
    }),
    { ...baseData },
  );
}

export function resolveInitialFormData(baseData, search, storage) {
  const sanitizedBase = normalizePrefillInput(baseData);
  const queryPrefill = parseQueryPrefill(search);
  const storagePrefill = parseStoragePrefill(storage);

  // Priority: explicit query params, then stored recent values, then base defaults.
  return mergePrefill(sanitizedBase, queryPrefill, storagePrefill);
}

export function persistFormPrefill(storage, formData) {
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

