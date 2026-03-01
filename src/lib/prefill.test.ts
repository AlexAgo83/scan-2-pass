import { describe, expect, test } from "vitest";
import type { StorageLike } from "./prefill";
import { PREFILL_STORAGE_KEY, resolveInitialFormData } from "./prefill";

function makeStorage(initialValue: string | null = null): StorageLike {
  const map = new Map<string, string>();
  if (initialValue !== null) {
    map.set(PREFILL_STORAGE_KEY, initialValue);
  }
  return {
    getItem: (key) => map.get(key) || null,
    setItem: (key, value) => {
      map.set(key, value);
    },
  };
}

describe("resolveInitialFormData", () => {
  test("uses query params first, then storage, then base defaults", () => {
    const storage = makeStorage(
      JSON.stringify({
        email: "storage@example.com",
        firstName: "StorageFirst",
        lastName: "StorageLast",
      }),
    );

    const initial = resolveInitialFormData(
      {
        email: "",
        firstName: "",
        lastName: "",
      },
      "?email=query@example.com&firstName=QueryFirst",
      storage,
    );

    expect(initial.email).toBe("query@example.com");
    expect(initial.firstName).toBe("QueryFirst");
    expect(initial.lastName).toBe("StorageLast");
  });

  test("ignores invalid prefill values", () => {
    const storage = makeStorage(
      JSON.stringify({
        email: "bad-email",
        firstName: "",
        lastName: "Ok",
      }),
    );

    const initial = resolveInitialFormData(
      { email: "", firstName: "", lastName: "" },
      "?email=invalid&firstName=&lastName=Doe",
      storage,
    );

    expect(initial.email).toBe("");
    expect(initial.firstName).toBe("");
    expect(initial.lastName).toBe("Doe");
  });
});
