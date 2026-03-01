const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const DEFAULT_VALIDATION_MESSAGES = {
  firstNameRequired: "First name is required.",
  lastNameRequired: "Last name is required.",
  emailRequired: "Email is required.",
  emailInvalid: "Please enter a valid email address.",
};

function isBlank(value) {
  return !value || !value.trim();
}

export function validateFormInput(
  formData,
  messages = DEFAULT_VALIDATION_MESSAGES,
) {
  const errors = {};

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

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0;
}
