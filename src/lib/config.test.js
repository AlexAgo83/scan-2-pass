import { describe, expect, test } from "vitest";
import { resolveAppConfig } from "./config";

describe("resolveAppConfig", () => {
  test("keeps defaults when env is empty", () => {
    const config = resolveAppConfig({});

    expect(config.projectUrl).toBe("https://github.com/AlexAgo83/scan-2-pass");
    expect(config.siteName).toBe("Scan 2 Pass");
    expect(config.faviconUrl).toBe("/logo-default.svg");
    expect(config.headerTextByLocale).toEqual({
      en: "Fill in your details to continue to the private destination content.",
      fr: "Renseignez vos informations pour continuer vers le contenu prive.",
    });
    expect(config.formSubmitEndpoint).toBe(
      "https://formsubmit.co/a.agostini.fr@gmail.com",
    );
    expect(config.headerTypography.fontSize).toBe("clamp(1.35rem, 4vw, 1.8rem)");
    expect(config.headerTypography.fontWeight).toBe("700");
    expect(config.headerTypography.fontStyle).toBe("normal");
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

  test("accepts root-relative and absolute favicon URLs", () => {
    const relativeConfig = resolveAppConfig({
      VITE_FAVICON_URL: "/brand/favicon.png",
    });
    const absoluteConfig = resolveAppConfig({
      VITE_FAVICON_URL: "https://circle-mobility.com/logo512.png",
    });

    expect(relativeConfig.faviconUrl).toBe("/brand/favicon.png");
    expect(absoluteConfig.faviconUrl).toBe(
      "https://circle-mobility.com/logo512.png",
    );
  });

  test("falls back to brand logo when favicon is not set", () => {
    const config = resolveAppConfig({
      VITE_BRAND_LOGO_URL: "https://circle-mobility.com/logo512.png",
    });

    expect(config.faviconUrl).toBe("https://circle-mobility.com/logo512.png");
  });

  test("falls back to default favicon when value is invalid", () => {
    const config = resolveAppConfig({
      VITE_FAVICON_URL: "javascript:alert(1)",
    });

    expect(config.faviconUrl).toBe("/logo-default.svg");
  });

  test("localizes header text with dedicated EN/FR variables", () => {
    const config = resolveAppConfig({
      VITE_HEADER_TEXT_EN: "Welcome to Circle Mobility",
      VITE_HEADER_TEXT_FR: "Bienvenue chez Circle Mobility",
    });

    expect(config.headerTextByLocale).toEqual({
      en: "Welcome to Circle Mobility",
      fr: "Bienvenue chez Circle Mobility",
    });
    expect(config.headerText).toBe("Welcome to Circle Mobility");
  });

  test("uses VITE_HEADER_TEXT as fallback for EN/FR header text", () => {
    const config = resolveAppConfig({
      VITE_HEADER_TEXT: "Continue to access content",
    });

    expect(config.headerTextByLocale).toEqual({
      en: "Continue to access content",
      fr: "Continue to access content",
    });
  });

  test("applies valid header typography values from env", () => {
    const config = resolveAppConfig({
      VITE_HEADER_TEXT_FONT_SIZE: "44px",
      VITE_HEADER_TEXT_FONT_WEIGHT: "800",
      VITE_HEADER_TEXT_FONT_STYLE: "italic",
    });

    expect(config.headerTypography).toEqual({
      fontSize: "44px",
      fontWeight: "800",
      fontStyle: "italic",
    });
  });

  test("uses safe fallback for invalid header typography values", () => {
    const config = resolveAppConfig({
      VITE_HEADER_TEXT_FONT_SIZE: "5",
      VITE_HEADER_TEXT_FONT_WEIGHT: "1200",
      VITE_HEADER_TEXT_FONT_STYLE: "strange",
    });

    expect(config.headerTypography).toEqual({
      fontSize: "clamp(1.35rem, 4vw, 1.8rem)",
      fontWeight: "700",
      fontStyle: "normal",
    });
  });
});
