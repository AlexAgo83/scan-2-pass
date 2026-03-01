import { describe, expect, test, vi } from "vitest";
import type { StorageLike } from "./prefill";
import {
  PREFILL_STORAGE_KEY,
  PREFILL_TTL_MS,
  clearFormPrefill,
  persistFormPrefill,
  resolveInitialFormData,
} from "./prefill";

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
    removeItem: (key) => {
      map.delete(key);
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
        email: "base@example.com",
        firstName: "BaseFirst",
        lastName: "BaseLast",
      },
      "?email=query@example.com&firstName=QueryFirst",
      storage,
    );

    expect(initial.email).toBe("query@example.com");
    expect(initial.firstName).toBe("QueryFirst");
    expect(initial.lastName).toBe("StorageLast");
  });

  test("keeps documented precedence with non-empty competing sources", () => {
    const storage = makeStorage(
      JSON.stringify({
        email: "storage@example.com",
        firstName: "StorageFirst",
        lastName: "StorageLast",
      }),
    );

    const initial = resolveInitialFormData(
      {
        email: "base@example.com",
        firstName: "BaseFirst",
        lastName: "BaseLast",
      },
      "?email=query@example.com&lastName=QueryLast",
      storage,
    );

    expect(initial).toEqual({
      email: "query@example.com",
      firstName: "StorageFirst",
      lastName: "QueryLast",
    });
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

  test("ignores expired storage prefill values", () => {
    const nowSpy = vi.spyOn(Date, "now").mockReturnValue(2_000_000);
    const storage = makeStorage(
      JSON.stringify({
        savedAt: 2_000_000 - PREFILL_TTL_MS - 1,
        values: {
          email: "old@example.com",
          firstName: "Old",
          lastName: "Data",
        },
      }),
    );

    const initial = resolveInitialFormData(
      { email: "", firstName: "", lastName: "" },
      "",
      storage,
    );

    expect(initial).toEqual({ email: "", firstName: "", lastName: "" });
    nowSpy.mockRestore();
  });

  test("purges expired storage payload when detected", () => {
    const nowSpy = vi.spyOn(Date, "now").mockReturnValue(2_000_000);
    const removeItem = vi.fn();
    const storage: StorageLike = {
      getItem: () =>
        JSON.stringify({
          savedAt: 2_000_000 - PREFILL_TTL_MS - 1,
          values: {
            email: "old@example.com",
            firstName: "Old",
            lastName: "Data",
          },
        }),
      setItem: vi.fn(),
      removeItem,
    };

    resolveInitialFormData({ email: "", firstName: "", lastName: "" }, "", storage);

    expect(removeItem).toHaveBeenCalledWith(PREFILL_STORAGE_KEY);
    nowSpy.mockRestore();
  });

  test("clears persisted prefill data", () => {
    const storage = makeStorage();
    persistFormPrefill(storage, {
      email: "a@example.com",
      firstName: "A",
      lastName: "B",
    });

    clearFormPrefill(storage);
    const initial = resolveInitialFormData(
      { email: "", firstName: "", lastName: "" },
      "",
      storage,
    );

    expect(initial).toEqual({ email: "", firstName: "", lastName: "" });
  });
});
