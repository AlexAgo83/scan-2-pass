import type { AppConfig, DestinationLinkConfig } from "./lib/config";
import type { SupportedLocale, Translations } from "./lib/i18n";
import { useAppRuntime } from "./hooks/useAppRuntime";
import { useContactForm } from "./hooks/useContactForm";
import { useDocumentMetadataEffects } from "./hooks/useDocumentMetadataEffects";
import {
  resolvePostSubmitNextUrl,
  shouldRenderLinksHubView,
} from "./lib/post-submit-routing";
import "./App.css";

interface LandingHeaderProps {
  brandLogoUrl: string;
  logoAlt: string;
  siteName: string;
}

interface FormViewProps {
  copy: Translations;
  config: AppConfig;
  headerText: string;
  postSubmitNextUrl: string;
}

interface LinksHubViewProps {
  copy: Translations;
  config: AppConfig;
  locale: SupportedLocale;
}

function LandingHeader({
  brandLogoUrl,
  logoAlt,
  siteName,
}: LandingHeaderProps) {
  return (
    <header className="landing-header">
      <img className="brand-logo" src={brandLogoUrl} alt={logoAlt} />
      <p className="site-name">{siteName}</p>
    </header>
  );
}

function resolveDestinationLabel(
  destinationLink: DestinationLinkConfig,
  locale: SupportedLocale,
): string {
  if (locale === "fr") {
    return destinationLink.label.fr || destinationLink.label.en || destinationLink.url;
  }
  return destinationLink.label.en || destinationLink.label.fr || destinationLink.url;
}

function FormView({
  copy,
  config,
  headerText,
  postSubmitNextUrl,
}: FormViewProps) {
  const {
    formData,
    errors,
    isSubmitting,
    submitRecoveryMessage,
    onInputChange,
    onSubmit,
  } = useContactForm(copy.validation, copy.form.submitRecovery);

  return (
    <>
      <LandingHeader
        brandLogoUrl={config.brandLogoUrl}
        logoAlt={copy.form.logoAlt}
        siteName={config.siteName}
      />
      <h1 className="header-text">{headerText}</h1>
      <form
        className="contact-form"
        method="POST"
        action={config.formSubmitEndpoint}
        onSubmit={onSubmit}
        aria-busy={isSubmitting ? "true" : "false"}
        noValidate
      >
        <input type="hidden" name="_next" value={postSubmitNextUrl} />
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
    </>
  );
}

function LinksHubView({ copy, config, locale }: LinksHubViewProps) {
  return (
    <>
      <LandingHeader
        brandLogoUrl={config.brandLogoUrl}
        logoAlt={copy.form.logoAlt}
        siteName={config.siteName}
      />
      <section className="links-hub" aria-label={copy.hub.title}>
        <h1 className="hub-title">{copy.hub.title}</h1>
        <p className="hub-subtitle">{copy.hub.subtitle}</p>
        <nav className="hub-links" aria-label={copy.hub.title}>
          {config.destinationLinks.map((destinationLink) => (
            <a
              key={`${destinationLink.order}-${destinationLink.url}`}
              className="hub-link"
              href={destinationLink.url}
            >
              {resolveDestinationLabel(destinationLink, locale)}
            </a>
          ))}
        </nav>
      </section>
    </>
  );
}

function App() {
  const { config, locale, copy, headerText, themeVariables } = useAppRuntime();
  useDocumentMetadataEffects(config, locale);

  const currentHref = typeof window !== "undefined" ? window.location.href : undefined;
  const currentSearch = typeof window !== "undefined" ? window.location.search : "";
  const postSubmitNextUrl = resolvePostSubmitNextUrl(
    config.destinationLinks,
    config.redirectUrl,
    currentHref,
  );
  const isLinksHubView = shouldRenderLinksHubView(
    currentSearch,
    config.destinationLinks.length,
  );

  return (
    <div className="app-shell" style={themeVariables}>
      <div className="ambient-shape ambient-shape--top" aria-hidden="true" />
      <div className="ambient-shape ambient-shape--bottom" aria-hidden="true" />
      <main className="landing-card">
        {isLinksHubView ? (
          <LinksHubView copy={copy} config={config} locale={locale} />
        ) : (
          <FormView
            copy={copy}
            config={config}
            headerText={headerText}
            postSubmitNextUrl={postSubmitNextUrl}
          />
        )}
      </main>
    </div>
  );
}

export default App;
