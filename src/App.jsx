import { useEffect, useMemo, useState } from "react";
import { resolveAppConfig } from "./lib/config";
import { getTranslations, resolveLocale } from "./lib/i18n";
import { persistFormPrefill, resolveInitialFormData } from "./lib/prefill";
import { hasValidationErrors, validateFormInput } from "./lib/validation";
import "./App.css";

function App() {
  const config = useMemo(() => resolveAppConfig(import.meta.env), []);
  const locale = useMemo(
    () =>
      resolveLocale(typeof window !== "undefined" ? window.navigator : undefined),
    [],
  );
  const copy = useMemo(() => getTranslations(locale), [locale]);
  const [formData, setFormData] = useState(() =>
    resolveInitialFormData(
      { email: "", firstName: "", lastName: "" },
      typeof window !== "undefined" ? window.location.search : "",
      typeof window !== "undefined" ? window.localStorage : null,
    ),
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = config.siteName;
  }, [config.siteName]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  useEffect(() => {
    const fontUrl = config.theme.fontUrl;
    if (!fontUrl) {
      return;
    }

    const existingLink = document.querySelector(
      `link[data-dynamic-font="${fontUrl}"]`,
    );
    if (existingLink) {
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = fontUrl;
    link.dataset.dynamicFont = fontUrl;
    document.head.appendChild(link);

    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [config.theme.fontUrl]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    persistFormPrefill(window.localStorage, formData);
  }, [formData]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) {
        return current;
      }
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const onSubmit = (event) => {
    const nextErrors = validateFormInput(formData, copy.validation);
    setErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) {
      event.preventDefault();
    }
  };

  const themeVariables = {
    "--theme-primary": config.theme.primaryColor,
    "--theme-background": config.theme.backgroundColor,
    "--theme-text": config.theme.textColor,
    "--theme-font": config.theme.fontFamily,
    "--theme-heading-font": config.theme.headingFontFamily,
    "--header-text-font-size": config.headerTypography.fontSize,
    "--header-text-font-weight": config.headerTypography.fontWeight,
    "--header-text-font-style": config.headerTypography.fontStyle,
  };

  return (
    <div className="app-shell" style={themeVariables}>
      <div className="ambient-shape ambient-shape--top" aria-hidden="true" />
      <div className="ambient-shape ambient-shape--bottom" aria-hidden="true" />
      <main className="landing-card">
        <header className="landing-header">
          <img className="brand-logo" src={config.brandLogoUrl} alt={copy.form.logoAlt} />
          <p className="site-name">{config.siteName}</p>
          <h1 className="header-text">{config.headerText}</h1>
        </header>

        <form
          className="contact-form"
          method="POST"
          action={config.formSubmitEndpoint}
          onSubmit={onSubmit}
          noValidate
        >
          <input type="hidden" name="_next" value={config.redirectUrl} />
          <input type="hidden" name="_subject" value={config.formSubmitSubject} />
          <input type="hidden" name="_captcha" value={config.formSubmitCaptcha} />
          <div className="honeypot-wrap" aria-hidden="true">
            <label htmlFor="honey-field">{copy.form.honeypotLabel}</label>
            <input id="honey-field" type="text" name="_honey" tabIndex="-1" />
          </div>

          <label htmlFor="email">{copy.form.emailLabel}</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={copy.form.emailPlaceholder}
            value={formData.email}
            onChange={onInputChange}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {errors.email ? (
            <p id="email-error" className="field-error" role="alert">
              {errors.email}
            </p>
          ) : null}

          <label htmlFor="firstName">{copy.form.firstNameLabel}</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder={copy.form.firstNamePlaceholder}
            value={formData.firstName}
            onChange={onInputChange}
            aria-invalid={errors.firstName ? "true" : "false"}
            aria-describedby={errors.firstName ? "firstname-error" : undefined}
            required
          />
          {errors.firstName ? (
            <p id="firstname-error" className="field-error" role="alert">
              {errors.firstName}
            </p>
          ) : null}

          <label htmlFor="lastName">{copy.form.lastNameLabel}</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder={copy.form.lastNamePlaceholder}
            value={formData.lastName}
            onChange={onInputChange}
            aria-invalid={errors.lastName ? "true" : "false"}
            aria-describedby={errors.lastName ? "lastname-error" : undefined}
            required
          />
          {errors.lastName ? (
            <p id="lastname-error" className="field-error" role="alert">
              {errors.lastName}
            </p>
          ) : null}

          <button type="submit">{copy.form.submit}</button>
        </form>

      </main>
    </div>
  );
}

export default App;
