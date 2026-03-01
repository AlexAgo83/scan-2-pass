const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isBlank(value) {
  return !value || !value.trim();
}

export function validateFormInput(formData) {
  const errors = {};

  if (isBlank(formData.firstName)) {
    errors.firstName = "First name is required.";
  }

  if (isBlank(formData.lastName)) {
    errors.lastName = "Last name is required.";
  }

  if (isBlank(formData.email)) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0;
}

