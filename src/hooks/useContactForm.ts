import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { ContactFormData } from "../lib/form-types";
import {
  clearFormPrefill,
  persistFormPrefill,
  resolveInitialFormData,
} from "../lib/prefill";
import {
  hasValidationErrors,
  validateFormInput,
  type ValidationErrors,
  type ValidationMessages,
} from "../lib/validation";

const EMPTY_FORM_DATA: ContactFormData = {
  email: "",
  firstName: "",
  lastName: "",
};

const FORM_FIELD_NAMES = ["email", "firstName", "lastName"] as const;
type FormFieldName = (typeof FORM_FIELD_NAMES)[number];

function isFormFieldName(value: string): value is FormFieldName {
  return FORM_FIELD_NAMES.includes(value as FormFieldName);
}

interface UseContactFormResult {
  formData: ContactFormData;
  errors: ValidationErrors;
  isSubmitting: boolean;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function useContactForm(
  validationMessages: ValidationMessages,
): UseContactFormResult {
  const [formData, setFormData] = useState<ContactFormData>(() =>
    resolveInitialFormData(
      EMPTY_FORM_DATA,
      typeof window !== "undefined" ? window.location.search : "",
      typeof window !== "undefined" ? window.localStorage : null,
    ),
  );
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitInFlightRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    persistFormPrefill(window.localStorage, formData);
  }, [formData]);

  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (!isFormFieldName(name)) {
      return;
    }

    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) {
        return current;
      }
      const next = { ...current };
      delete next[name];
      return next;
    });
  }, []);

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      if (submitInFlightRef.current) {
        event.preventDefault();
        return;
      }

      const nextErrors = validateFormInput(formData, validationMessages);
      setErrors(nextErrors);

      if (hasValidationErrors(nextErrors)) {
        event.preventDefault();
        return;
      }

      submitInFlightRef.current = true;
      setIsSubmitting(true);
      if (typeof window !== "undefined") {
        clearFormPrefill(window.localStorage);
      }
    },
    [formData, validationMessages],
  );

  return {
    formData,
    errors,
    isSubmitting,
    onInputChange,
    onSubmit,
  };
}
