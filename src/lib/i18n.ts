import type { ValidationMessages } from "./validation";

export const SUPPORTED_LOCALES = {
  EN: "en",
  FR: "fr",
} as const;

export type SupportedLocale =
  (typeof SUPPORTED_LOCALES)[keyof typeof SUPPORTED_LOCALES];

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
  submit: string;
  submitting: string;
  submitRecovery: string;
}

interface HubTranslations {
  title: string;
  subtitle: string;
}

export interface Translations {
  form: FormTranslations;
  hub: HubTranslations;
  validation: ValidationMessages;
}

const TRANSLATIONS: Record<SupportedLocale, Translations> = {
  en: {
    form: {
      logoAlt: "Site logo",
      honeypotLabel: "Do not fill this field",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      firstNameLabel: "First name",
      firstNamePlaceholder: "John",
      lastNameLabel: "Last name",
      lastNamePlaceholder: "Doe",
      phoneLabel: "Phone",
      phoneOptionalLabel: "Optional",
      phonePlaceholder: "+1 555 123 4567",
      submit: "Continue",
      submitting: "Submitting...",
      submitRecovery:
        "Submission took longer than expected. Please review your details and try again.",
    },
    hub: {
      title: "Choose your content",
      subtitle: "Select a destination to continue.",
    },
    validation: {
      firstNameRequired: "First name is required.",
      lastNameRequired: "Last name is required.",
      emailRequired: "Email is required.",
      emailInvalid: "Please enter a valid email address.",
    },
  },
  fr: {
    form: {
      logoAlt: "Logo du site",
      honeypotLabel: "Ne remplissez pas ce champ",
      emailLabel: "E-mail",
      emailPlaceholder: "vous@exemple.com",
      firstNameLabel: "Prénom",
      firstNamePlaceholder: "Jean",
      lastNameLabel: "Nom",
      lastNamePlaceholder: "Dupont",
      phoneLabel: "Téléphone",
      phoneOptionalLabel: "Optionnel",
      phonePlaceholder: "+33 6 12 34 56 78",
      submit: "Continuer",
      submitting: "Envoi en cours...",
      submitRecovery:
        "L'envoi prend plus de temps que prevu. Verifiez vos informations puis reessayez.",
    },
    hub: {
      title: "Choisissez votre contenu",
      subtitle: "Selectionnez une destination pour continuer.",
    },
    validation: {
      firstNameRequired: "Le prénom est requis.",
      lastNameRequired: "Le nom est requis.",
      emailRequired: "L'adresse e-mail est requise.",
      emailInvalid: "Veuillez saisir une adresse e-mail valide.",
    },
  },
};

function normalizeLocale(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().toLowerCase();
}

function isFrenchLocale(locale: string): boolean {
  return locale === SUPPORTED_LOCALES.FR || locale.startsWith("fr-");
}

export function resolveLocale(navigatorLike?: NavigatorLike): SupportedLocale {
  if (!navigatorLike) {
    return SUPPORTED_LOCALES.EN;
  }

  const localeCandidates: string[] = [];
  if (Array.isArray(navigatorLike.languages)) {
    localeCandidates.push(...navigatorLike.languages);
  }
  if (navigatorLike.language) {
    localeCandidates.push(navigatorLike.language);
  }

  const hasFrench = localeCandidates
    .map(normalizeLocale)
    .some((locale) => isFrenchLocale(locale));

  return hasFrench ? SUPPORTED_LOCALES.FR : SUPPORTED_LOCALES.EN;
}

export function getTranslations(locale: string): Translations {
  if (locale === SUPPORTED_LOCALES.FR) {
    return TRANSLATIONS.fr;
  }
  return TRANSLATIONS.en;
}
