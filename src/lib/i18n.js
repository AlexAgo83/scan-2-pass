export const SUPPORTED_LOCALES = {
  EN: "en",
  FR: "fr",
};

const TRANSLATIONS = {
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
      submit: "Continue",
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
      submit: "Continuer",
    },
    validation: {
      firstNameRequired: "Le prénom est requis.",
      lastNameRequired: "Le nom est requis.",
      emailRequired: "L'adresse e-mail est requise.",
      emailInvalid: "Veuillez saisir une adresse e-mail valide.",
    },
  },
};

function normalizeLocale(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().toLowerCase();
}

function isFrenchLocale(locale) {
  return locale === SUPPORTED_LOCALES.FR || locale.startsWith("fr-");
}

export function resolveLocale(navigatorLike) {
  if (!navigatorLike) {
    return SUPPORTED_LOCALES.EN;
  }

  const localeCandidates = [];
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

export function getTranslations(locale) {
  if (locale === SUPPORTED_LOCALES.FR) {
    return TRANSLATIONS.fr;
  }
  return TRANSLATIONS.en;
}

