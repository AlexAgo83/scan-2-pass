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
  phone: "",
};

const FORM_FIELD_NAMES = ["email", "firstName", "lastName", "phone"] as const;
type FormFieldName = (typeof FORM_FIELD_NAMES)[number];
const SUBMIT_RECOVERY_TIMEOUT_MS = 12_000;

function isFormFieldName(value: string): value is FormFieldName {
  return FORM_FIELD_NAMES.includes(value as FormFieldName);
}

interface UseContactFormResult {
  formData: ContactFormData;
  errors: ValidationErrors;
  isSubmitting: boolean;
  submitRecoveryMessage: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function useContactForm(
  validationMessages: ValidationMessages,
  submitRecoveryText: string,
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
  const [submitRecoveryMessage, setSubmitRecoveryMessage] = useState("");
  const submitInFlightRef = useRef(false);
  const submitRecoveryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const clearSubmitRecoveryTimer = useCallback(() => {
    if (submitRecoveryTimerRef.current === null) {
      return;
    }
    clearTimeout(submitRecoveryTimerRef.current);
    submitRecoveryTimerRef.current = null;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    persistFormPrefill(window.localStorage, formData);
  }, [formData]);

  useEffect(() => () => {
    clearSubmitRecoveryTimer();
  }, [clearSubmitRecoveryTimer]);

  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (!isFormFieldName(name)) {
      return;
    }

    setFormData((current) => ({ ...current, [name]: value }));
    setSubmitRecoveryMessage("");
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
      setSubmitRecoveryMessage("");
      clearSubmitRecoveryTimer();
      if (typeof window !== "undefined") {
        submitRecoveryTimerRef.current = window.setTimeout(() => {
          submitRecoveryTimerRef.current = null;
          submitInFlightRef.current = false;
          setIsSubmitting(false);
          setSubmitRecoveryMessage(submitRecoveryText);
        }, SUBMIT_RECOVERY_TIMEOUT_MS);
        clearFormPrefill(window.localStorage);
      }
    },
    [clearSubmitRecoveryTimer, formData, submitRecoveryText, validationMessages],
  );

  return {
    formData,
    errors,
    isSubmitting,
    submitRecoveryMessage,
    onInputChange,
    onSubmit,
  };
}

export { SUBMIT_RECOVERY_TIMEOUT_MS };
