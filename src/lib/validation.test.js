import { describe, expect, test } from "vitest";
import { hasValidationErrors, validateFormInput } from "./validation";

describe("validateFormInput", () => {
  test("returns errors when required fields are missing", () => {
    const errors = validateFormInput({
      email: "",
      firstName: "",
      lastName: "",
    });

    expect(errors.email).toBeDefined();
    expect(errors.firstName).toBeDefined();
    expect(errors.lastName).toBeDefined();
    expect(hasValidationErrors(errors)).toBe(true);
  });

  test("returns email error when format is invalid", () => {
    const errors = validateFormInput({
      email: "not-an-email",
      firstName: "Alex",
      lastName: "Agostini",
    });

    expect(errors.email).toBe("Please enter a valid email address.");
  });

  test("supports localized messages", () => {
    const errors = validateFormInput(
      {
        email: "",
        firstName: "",
        lastName: "",
      },
      {
        firstNameRequired: "Le prénom est requis.",
        lastNameRequired: "Le nom est requis.",
        emailRequired: "L'adresse e-mail est requise.",
        emailInvalid: "Veuillez saisir une adresse e-mail valide.",
      },
    );

    expect(errors.firstName).toBe("Le prénom est requis.");
    expect(errors.lastName).toBe("Le nom est requis.");
    expect(errors.email).toBe("L'adresse e-mail est requise.");
  });

  test("returns no error for valid payload", () => {
    const errors = validateFormInput({
      email: "a.agostini.fr@gmail.com",
      firstName: "Alex",
      lastName: "Agostini",
    });

    expect(errors).toEqual({});
    expect(hasValidationErrors(errors)).toBe(false);
  });
});
