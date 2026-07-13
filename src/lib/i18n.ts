import en from "../i18n/en.json";
import fr from "../i18n/fr.json";
import type { ValidationMessages } from "./validation";

export const SUPPORTED_LOCALES = { EN: "en", FR: "fr" } as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[keyof typeof SUPPORTED_LOCALES];

interface NavigatorLike {
  language?: string;
  languages?: readonly string[];
}

interface FormTranslations {
  logoAlt: string;
  honeypotLabel: string;
  emailLabel: string;
  emailPlaceholder: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  lastNameLabel: string;
  lastNamePlaceholder: string;
  phoneLabel: string;
  phoneOptionalLabel: string;
  phonePlaceholder: string;
  activitySectorLabel: string;
  activitySectorOptionalLabel: string;
  activitySectorPlaceholder: string;
  activitySectorOptions: Array<{ value: string; label: string }>;
  submit: string;
  submitting: string;
  submitRecovery: string;
}

export interface Translations {
  form: FormTranslations;
  hub: { title: string; subtitle: string };
  validation: ValidationMessages;
}

type Catalog = Omit<Translations, "form"> & {
  form: Omit<FormTranslations, "activitySectorOptions"> & {
    activitySectorOptions: Record<string, string>;
  };
};

const CATALOGS: Record<SupportedLocale, Catalog> = { en, fr };

function normalizeLocale(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function resolveLocale(navigatorLike?: NavigatorLike): SupportedLocale {
  if (!navigatorLike) return SUPPORTED_LOCALES.EN;
  const candidates = [...(navigatorLike.languages ?? []), ...(navigatorLike.language ? [navigatorLike.language] : [])];
  return candidates.map(normalizeLocale).some((locale) => locale === "fr" || locale.startsWith("fr-"))
    ? SUPPORTED_LOCALES.FR
    : SUPPORTED_LOCALES.EN;
}

export function getTranslations(locale: string): Translations {
  const catalog = CATALOGS[locale === SUPPORTED_LOCALES.FR ? SUPPORTED_LOCALES.FR : SUPPORTED_LOCALES.EN];
  return {
    ...catalog,
    form: {
      ...catalog.form,
      activitySectorOptions: Object.entries(catalog.form.activitySectorOptions).map(([value, label]) => ({ value, label })),
    },
  };
}
