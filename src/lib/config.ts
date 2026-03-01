export interface HeaderTypographyConfig {
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
}

export interface ThemeConfig {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  headingFontFamily: string;
  fontUrl: string;
}

export interface HeaderTextByLocale {
  en: string;
  fr: string;
}

export interface AppConfig {
  projectUrl: string;
  siteName: string;
  brandLogoUrl: string;
  faviconUrl: string;
  headerText: string;
  headerTextByLocale: HeaderTextByLocale;
  redirectUrl: string;
  formSubmitReceiver: string;
  formSubmitEndpoint: string;
  formSubmitSubject: string;
  formSubmitCaptcha: string;
  headerTypography: HeaderTypographyConfig;
  theme: ThemeConfig;
}

type EnvValue = string | boolean | number | null | undefined;

export type AppEnv = Record<string, EnvValue>;

const DEFAULT_RECEIVER = "a.agostini.fr@gmail.com";
const DEFAULT_PROJECT_URL = "https://github.com/AlexAgo83/scan-2-pass";

const DEFAULT_CONFIG: Omit<AppConfig, "headerTextByLocale"> & {
  headerTextEn: string;
  headerTextFr: string;
} = {
  projectUrl: DEFAULT_PROJECT_URL,
  siteName: "Scan 2 Pass",
  brandLogoUrl: "/logo-default.svg",
  faviconUrl: "/logo-default.svg",
  headerText: "Fill in your details to continue to the private destination content.",
  headerTextEn: "Fill in your details to continue to the private destination content.",
  headerTextFr: "Renseignez vos informations pour continuer vers le contenu prive.",
  redirectUrl: DEFAULT_PROJECT_URL,
  formSubmitReceiver: DEFAULT_RECEIVER,
  formSubmitEndpoint: `https://formsubmit.co/${DEFAULT_RECEIVER}`,
  formSubmitSubject: "Scan 2 Pass - New form submission",
  formSubmitCaptcha: "true",
  headerTypography: {
    fontSize: "clamp(1.35rem, 4vw, 1.8rem)",
    fontWeight: "700",
    fontStyle: "normal",
  },
  theme: {
    primaryColor: "#f97316",
    backgroundColor: "#fff8f1",
    textColor: "#1f2937",
    fontFamily:
      "'Montserrat', 'Avenir Next', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    headingFontFamily:
      "'Montserrat', 'Avenir Next', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    fontUrl:
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap",
  },
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COLOR_REGEX =
  /^(#[0-9a-fA-F]{3,8}|rgb(a)?\(\s*[\d.%\s,]+\)|hsl(a)?\(\s*[\d.%\s,]+\)|[a-zA-Z]{3,20})$/;
const FONT_FAMILY_REGEX = /^[A-Za-z0-9,\-_'"\s]+$/;
const FONT_SIZE_REGEX = /^(\d+(\.\d+)?)(px|rem|em|vw)$/;

function cleanText(value: EnvValue, fallback: string): string {
  const nextValue = typeof value === "string" ? value.trim() : "";
  return nextValue ? nextValue : fallback;
}

function cleanUrl(value: EnvValue, fallback: string): string {
  const nextValue = cleanText(value, "");
  if (!nextValue) {
    return fallback;
  }

  try {
    const parsedUrl = new URL(nextValue);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return fallback;
    }
    return parsedUrl.toString();
  } catch {
    return fallback;
  }
}

function cleanAssetUrl(value: EnvValue, fallback: string): string {
  const nextValue = cleanText(value, "");
  if (!nextValue) {
    return fallback;
  }

  if (nextValue.startsWith("/")) {
    return nextValue;
  }

  try {
    const parsedUrl = new URL(nextValue);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return fallback;
    }
    return parsedUrl.toString();
  } catch {
    return fallback;
  }
}

function cleanColor(value: EnvValue, fallback: string): string {
  const nextValue = cleanText(value, "");
  return COLOR_REGEX.test(nextValue) ? nextValue : fallback;
}

function cleanFontFamily(value: EnvValue, fallback: string): string {
  const nextValue = cleanText(value, "");
  if (!nextValue || nextValue.length > 140) {
    return fallback;
  }
  return FONT_FAMILY_REGEX.test(nextValue) ? nextValue : fallback;
}

function cleanHeaderFontSize(value: EnvValue, fallback: string): string {
  const nextValue = cleanText(value, "");
  if (!nextValue) {
    return fallback;
  }

  if (FONT_SIZE_REGEX.test(nextValue)) {
    return nextValue;
  }

  const asNumber = Number(nextValue);
  if (Number.isFinite(asNumber) && asNumber >= 20 && asNumber <= 72) {
    return `${asNumber}px`;
  }

  return fallback;
}

function cleanHeaderFontWeight(value: EnvValue, fallback: string): string {
  const nextValue = cleanText(value, "").toLowerCase();
  if (!nextValue) {
    return fallback;
  }

  if (nextValue === "normal" || nextValue === "bold") {
    return nextValue;
  }

  const parsed = Number(nextValue);
  if (Number.isFinite(parsed) && parsed >= 400 && parsed <= 900) {
    return String(parsed);
  }

  return fallback;
}

function cleanHeaderFontStyle(value: EnvValue, fallback: string): string {
  const nextValue = cleanText(value, "").toLowerCase();
  if (
    nextValue === "normal" ||
    nextValue === "italic" ||
    nextValue === "oblique"
  ) {
    return nextValue;
  }
  return fallback;
}

function cleanFontUrl(value: EnvValue): string {
  const nextValue = cleanText(value, "");
  if (!nextValue) {
    return "";
  }

  try {
    const parsedUrl = new URL(nextValue);
    if (
      parsedUrl.protocol !== "https:" ||
      parsedUrl.host !== "fonts.googleapis.com"
    ) {
      return "";
    }
    return parsedUrl.toString();
  } catch {
    return "";
  }
}

function cleanCaptcha(value: EnvValue, fallback: string): string {
  const nextValue = cleanText(value, "").toLowerCase();
  if (nextValue === "true" || nextValue === "false") {
    return nextValue;
  }
  return fallback;
}

function cleanEmail(value: EnvValue, fallback: string): string {
  const nextValue = cleanText(value, "");
  if (EMAIL_REGEX.test(nextValue)) {
    return nextValue.toLowerCase();
  }
  return fallback;
}

function cleanFormSubmitEndpoint(endpoint: EnvValue, receiver: string): string {
  const endpointValue = cleanText(endpoint, "");
  if (endpointValue) {
    try {
      const parsedUrl = new URL(endpointValue);
      if (
        parsedUrl.protocol === "https:" &&
        parsedUrl.host === "formsubmit.co"
      ) {
        return parsedUrl.toString();
      }
    } catch {
      // Ignore malformed endpoint and fallback to receiver-based value.
    }
  }

  return `https://formsubmit.co/${receiver}`;
}

export function resolveAppConfig(env: AppEnv = {}): AppConfig {
  const projectUrl = cleanUrl(env.VITE_PROJECT_URL, DEFAULT_CONFIG.projectUrl);
  const siteName = cleanText(env.VITE_SITE_NAME, DEFAULT_CONFIG.siteName);
  const brandLogoUrl = cleanText(
    env.VITE_BRAND_LOGO_URL,
    DEFAULT_CONFIG.brandLogoUrl,
  );
  const faviconUrl = cleanAssetUrl(
    env.VITE_FAVICON_URL,
    brandLogoUrl || DEFAULT_CONFIG.faviconUrl,
  );
  const headerTextFallback = cleanText(env.VITE_HEADER_TEXT, "");
  const headerTextEn = cleanText(
    env.VITE_HEADER_TEXT_EN,
    headerTextFallback || DEFAULT_CONFIG.headerTextEn,
  );
  const headerTextFr = cleanText(
    env.VITE_HEADER_TEXT_FR,
    headerTextFallback || DEFAULT_CONFIG.headerTextFr,
  );
  const redirectUrl = cleanUrl(
    env.VITE_REDIRECT_URL,
    DEFAULT_CONFIG.redirectUrl,
  );
  const formSubmitReceiver = cleanEmail(
    env.VITE_FORMSUBMIT_RECEIVER,
    DEFAULT_CONFIG.formSubmitReceiver,
  );
  const formSubmitEndpoint = cleanFormSubmitEndpoint(
    env.VITE_FORMSUBMIT_ENDPOINT,
    formSubmitReceiver,
  );
  const formSubmitSubject = cleanText(
    env.VITE_FORMSUBMIT_SUBJECT,
    DEFAULT_CONFIG.formSubmitSubject,
  );
  const formSubmitCaptcha = cleanCaptcha(
    env.VITE_FORMSUBMIT_CAPTCHA,
    DEFAULT_CONFIG.formSubmitCaptcha,
  );
  const headerTextFontSize = cleanHeaderFontSize(
    env.VITE_HEADER_TEXT_FONT_SIZE,
    DEFAULT_CONFIG.headerTypography.fontSize,
  );
  const headerTextFontWeight = cleanHeaderFontWeight(
    env.VITE_HEADER_TEXT_FONT_WEIGHT,
    DEFAULT_CONFIG.headerTypography.fontWeight,
  );
  const headerTextFontStyle = cleanHeaderFontStyle(
    env.VITE_HEADER_TEXT_FONT_STYLE,
    DEFAULT_CONFIG.headerTypography.fontStyle,
  );
  const primaryColor = cleanColor(
    env.VITE_THEME_PRIMARY_COLOR,
    DEFAULT_CONFIG.theme.primaryColor,
  );
  const backgroundColor = cleanColor(
    env.VITE_THEME_BACKGROUND_COLOR,
    DEFAULT_CONFIG.theme.backgroundColor,
  );
  const textColor = cleanColor(
    env.VITE_THEME_TEXT_COLOR,
    DEFAULT_CONFIG.theme.textColor,
  );
  const fontFamily = cleanFontFamily(
    env.VITE_THEME_FONT_FAMILY,
    DEFAULT_CONFIG.theme.fontFamily,
  );
  const headingFontFamily = cleanFontFamily(
    env.VITE_THEME_HEADING_FONT_FAMILY,
    DEFAULT_CONFIG.theme.headingFontFamily,
  );
  const fontUrl =
    cleanFontUrl(env.VITE_THEME_FONT_URL) || DEFAULT_CONFIG.theme.fontUrl;

  return {
    projectUrl,
    siteName,
    brandLogoUrl,
    faviconUrl,
    headerText: headerTextEn,
    headerTextByLocale: {
      en: headerTextEn,
      fr: headerTextFr,
    },
    redirectUrl,
    formSubmitReceiver,
    formSubmitEndpoint,
    formSubmitSubject,
    formSubmitCaptcha,
    headerTypography: {
      fontSize: headerTextFontSize,
      fontWeight: headerTextFontWeight,
      fontStyle: headerTextFontStyle,
    },
    theme: {
      primaryColor,
      backgroundColor,
      textColor,
      fontFamily,
      headingFontFamily,
      fontUrl,
    },
  };
}
