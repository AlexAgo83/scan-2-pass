import { describe, expect, test } from "vitest";
import { resolveAppConfig } from "./config";

describe("resolveAppConfig", () => {
  test("keeps defaults when env is empty", () => {
    const config = resolveAppConfig({});

    expect(config.projectUrl).toBe("https://github.com/AlexAgo83/scan-2-pass");
    expect(config.siteName).toBe("Scan 2 Pass");
    expect(config.formSubmitEndpoint).toBe(
      "https://formsubmit.co/a.agostini.fr@gmail.com",
    );
  });

  test("builds FormSubmit endpoint from receiver", () => {
    const config = resolveAppConfig({
      VITE_FORMSUBMIT_RECEIVER: "demo@example.com",
    });

    expect(config.formSubmitReceiver).toBe("demo@example.com");
    expect(config.formSubmitEndpoint).toBe(
      "https://formsubmit.co/demo@example.com",
    );
  });

  test("uses fallback color when env color is invalid", () => {
    const config = resolveAppConfig({
      VITE_THEME_PRIMARY_COLOR: "javascript:alert(1)",
    });

    expect(config.theme.primaryColor).toBe("#f97316");
  });
});

