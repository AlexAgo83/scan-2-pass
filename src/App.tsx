import { useAppRuntime } from "./hooks/useAppRuntime";
import { useContactForm } from "./hooks/useContactForm";
import { useDocumentMetadataEffects } from "./hooks/useDocumentMetadataEffects";
import "./App.css";

function App() {
  const { config, locale, copy, headerText, themeVariables } = useAppRuntime();
  const {
    formData,
    errors,
    isSubmitting,
    submitRecoveryMessage,
    onInputChange,
    onSubmit,
  } = useContactForm(copy.validation, copy.form.submitRecovery);

  useDocumentMetadataEffects(config, locale);

  return (
    <div className="app-shell" style={themeVariables}>
      <div className="ambient-shape ambient-shape--top" aria-hidden="true" />
      <div className="ambient-shape ambient-shape--bottom" aria-hidden="true" />
      <main className="landing-card">
        <header className="landing-header">
          <img
            className="brand-logo"
            src={config.brandLogoUrl}
            alt={copy.form.logoAlt}
          />
          <p className="site-name">{config.siteName}</p>
          <h1 className="header-text">{headerText}</h1>
        </header>

        <form
          className="contact-form"
          method="POST"
          action={config.formSubmitEndpoint}
          onSubmit={onSubmit}
          aria-busy={isSubmitting ? "true" : "false"}
          noValidate
        >
          <input type="hidden" name="_next" value={config.redirectUrl} />
          <input type="hidden" name="_subject" value={config.formSubmitSubject} />
          <input type="hidden" name="_captcha" value={config.formSubmitCaptcha} />
          <div className="honeypot-wrap" aria-hidden="true">
            <label htmlFor="honey-field">{copy.form.honeypotLabel}</label>
            <input id="honey-field" type="text" name="_honey" tabIndex={-1} />
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

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? copy.form.submitting : copy.form.submit}
          </button>
          {isSubmitting ? (
            <p className="submit-status" role="status" aria-live="polite">
              {copy.form.submitting}
            </p>
          ) : null}
          {submitRecoveryMessage ? (
            <p className="submit-recovery" role="alert">
              {submitRecoveryMessage}
            </p>
          ) : null}
        </form>
      </main>
    </div>
  );
}

export default App;
