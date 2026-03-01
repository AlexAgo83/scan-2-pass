import { describe, expect, test } from "vitest";
import { getTranslations, resolveLocale, SUPPORTED_LOCALES } from "./i18n";

describe("resolveLocale", () => {
  test("defaults to english when navigator is missing", () => {
    expect(resolveLocale()).toBe(SUPPORTED_LOCALES.EN);
  });

  test("returns french when language is french", () => {
    expect(resolveLocale({ language: "fr-FR" })).toBe(SUPPORTED_LOCALES.FR);
  });

  test("returns french when one preferred language is french", () => {
    expect(resolveLocale({ languages: ["en-US", "fr-CA"] })).toBe(
      SUPPORTED_LOCALES.FR,
    );
  });

  test("returns english for non-french locale", () => {
    expect(resolveLocale({ language: "en-US" })).toBe(SUPPORTED_LOCALES.EN);
  });
});

describe("getTranslations", () => {
  test("returns english copy by default", () => {
    const copy = getTranslations("de");
    expect(copy.form.submit).toBe("Continue");
  });

  test("returns french copy for french locale", () => {
    const copy = getTranslations("fr");
    expect(copy.form.submit).toBe("Continuer");
  });
});

