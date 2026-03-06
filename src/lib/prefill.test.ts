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
        phone: "+1 555 000 1111",
      }),
    );

    const initial = resolveInitialFormData(
      {
        email: "base@example.com",
        firstName: "BaseFirst",
        lastName: "BaseLast",
        phone: "",
      },
      "?email=query@example.com&firstName=QueryFirst",
      storage,
    );

    expect(initial.email).toBe("query@example.com");
    expect(initial.firstName).toBe("QueryFirst");
    expect(initial.lastName).toBe("StorageLast");
    expect(initial.phone).toBe("+1 555 000 1111");
  });

  test("keeps documented precedence with non-empty competing sources", () => {
    const storage = makeStorage(
      JSON.stringify({
        email: "storage@example.com",
        firstName: "StorageFirst",
        lastName: "StorageLast",
        phone: "+1 111 111 1111",
      }),
    );

    const initial = resolveInitialFormData(
      {
        email: "base@example.com",
        firstName: "BaseFirst",
        lastName: "BaseLast",
        phone: "+1 222 222 2222",
      },
      "?email=query@example.com&lastName=QueryLast",
      storage,
    );

    expect(initial).toEqual({
      email: "query@example.com",
      firstName: "StorageFirst",
      lastName: "QueryLast",
      phone: "+1 111 111 1111",
    });
  });

  test("ignores invalid prefill values", () => {
    const storage = makeStorage(
      JSON.stringify({
        email: "bad-email",
        firstName: "",
        lastName: "Ok",
        phone: "  ",
      }),
    );

    const initial = resolveInitialFormData(
      { email: "", firstName: "", lastName: "", phone: "" },
      "?email=invalid&firstName=&lastName=Doe",
      storage,
    );

    expect(initial.email).toBe("");
    expect(initial.firstName).toBe("");
    expect(initial.lastName).toBe("Doe");
    expect(initial.phone).toBe("");
  });

  test("reads phone from query aliases", () => {
    const initial = resolveInitialFormData(
      { email: "", firstName: "", lastName: "", phone: "" },
      "?email=query@example.com&telephone=%2B33%206%2012%2034%2056%2078",
      null,
    );

    expect(initial).toEqual({
      email: "query@example.com",
      firstName: "",
      lastName: "",
      phone: "+33 6 12 34 56 78",
    });
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
          phone: "+1 333 333 3333",
        },
      }),
    );

    const initial = resolveInitialFormData(
      { email: "", firstName: "", lastName: "", phone: "" },
      "",
      storage,
    );

    expect(initial).toEqual({ email: "", firstName: "", lastName: "", phone: "" });
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
            phone: "+1 333 333 3333",
          },
        }),
      setItem: vi.fn(),
      removeItem,
    };

    resolveInitialFormData(
      { email: "", firstName: "", lastName: "", phone: "" },
      "",
      storage,
    );

    expect(removeItem).toHaveBeenCalledWith(PREFILL_STORAGE_KEY);
    nowSpy.mockRestore();
  });

  test("clears persisted prefill data", () => {
    const storage = makeStorage();
    persistFormPrefill(storage, {
      email: "a@example.com",
      firstName: "A",
      lastName: "B",
      phone: "+1 555 444 3333",
    });

    clearFormPrefill(storage);
    const initial = resolveInitialFormData(
      { email: "", firstName: "", lastName: "", phone: "" },
      "",
      storage,
    );

    expect(initial).toEqual({ email: "", firstName: "", lastName: "", phone: "" });
  });
});
