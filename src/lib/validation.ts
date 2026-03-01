import type { ContactFormData } from "./form-types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationMessages {
  firstNameRequired: string;
  lastNameRequired: string;
  emailRequired: string;
  emailInvalid: string;
}

export type ValidationErrors = Partial<Record<keyof ContactFormData, string>>;

export const DEFAULT_VALIDATION_MESSAGES: ValidationMessages = {
  firstNameRequired: "First name is required.",
  lastNameRequired: "Last name is required.",
  emailRequired: "Email is required.",
  emailInvalid: "Please enter a valid email address.",
};

function isBlank(value: string | undefined | null): boolean {
  return !value || !value.trim();
}

export function validateFormInput(
  formData: ContactFormData,
  messages: ValidationMessages = DEFAULT_VALIDATION_MESSAGES,
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (isBlank(formData.firstName)) {
    errors.firstName = messages.firstNameRequired;
  }

  if (isBlank(formData.lastName)) {
    errors.lastName = messages.lastNameRequired;
  }

  if (isBlank(formData.email)) {
    errors.email = messages.emailRequired;
  } else if (!EMAIL_REGEX.test(formData.email.trim())) {
    errors.email = messages.emailInvalid;
  }

  return errors;
}

export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
