import { describe, expect, test } from "vitest";
import {
  buildLinksHubUrl,
  resolvePostSubmitNextUrl,
  shouldRenderLinksHubView,
} from "./post-submit-routing";
import type { DestinationLinkConfig } from "./config";

const LINKS_FIXTURE: DestinationLinkConfig[] = [
  {
    label: { en: "Watch", fr: "Voir" },
    url: "https://example.com/watch",
    order: 1,
    enabled: true,
  },
  {
    label: { en: "Guide", fr: "Guide" },
    url: "https://example.com/guide",
    order: 2,
    enabled: true,
  },
];

describe("post submit routing", () => {
  test("renders links hub only when view=links and at least two links exist", () => {
    expect(shouldRenderLinksHubView("?view=links", 2)).toBe(true);
    expect(shouldRenderLinksHubView("?view=links", 1)).toBe(false);
    expect(shouldRenderLinksHubView("", 2)).toBe(false);
    expect(shouldRenderLinksHubView("?view=unknown", 2)).toBe(false);
  });

  test("builds links hub url from current location and strips unrelated params", () => {
    expect(
      buildLinksHubUrl("https://scan-2-pass.onrender.com/path?a=1#section"),
    ).toBe("https://scan-2-pass.onrender.com/path?view=links");
  });

  test("routes directly when exactly one link is enabled", () => {
    const nextUrl = resolvePostSubmitNextUrl(
      [LINKS_FIXTURE[0]],
      "https://fallback.example.com",
      "https://scan-2-pass.onrender.com/",
    );

    expect(nextUrl).toBe("https://example.com/watch");
  });

  test("routes to links hub when two or more links are enabled", () => {
    const nextUrl = resolvePostSubmitNextUrl(
      LINKS_FIXTURE,
      "https://fallback.example.com",
      "https://scan-2-pass.onrender.com/?email=x",
    );

    expect(nextUrl).toBe("https://scan-2-pass.onrender.com/?view=links");
  });

  test("falls back to safe redirect with zero links", () => {
    const nextUrl = resolvePostSubmitNextUrl(
      [],
      "https://fallback.example.com",
      "https://scan-2-pass.onrender.com/",
    );

    expect(nextUrl).toBe("https://fallback.example.com");
  });

  test("falls back to safe redirect if current location is unavailable", () => {
    const nextUrl = resolvePostSubmitNextUrl(
      LINKS_FIXTURE,
      "https://fallback.example.com",
    );

    expect(nextUrl).toBe("https://fallback.example.com");
  });
});
