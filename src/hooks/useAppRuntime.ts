import { useMemo, type CSSProperties } from "react";
import { resolveAppConfig, type AppConfig } from "../lib/config";
import {
  getTranslations,
  resolveLocale,
  type SupportedLocale,
  type Translations,
} from "../lib/i18n";

interface AppRuntime {
  config: AppConfig;
  locale: SupportedLocale;
  copy: Translations;
  headerText: string;
  themeVariables: CSSProperties;
}

export function useAppRuntime(): AppRuntime {
  const config = useMemo(() => resolveAppConfig(import.meta.env), []);
  const locale = useMemo(
    () =>
      resolveLocale(
        typeof window !== "undefined" ? window.navigator : undefined,
      ),
    [],
  );
  const copy = useMemo(() => getTranslations(locale), [locale]);
  const headerText = useMemo(() => {
    if (locale === "fr") {
      return config.headerTextByLocale.fr || config.headerText;
    }
    return config.headerTextByLocale.en || config.headerText;
  }, [config.headerText, config.headerTextByLocale, locale]);

  const themeVariables = useMemo(
    () =>
      ({
        "--theme-primary": config.theme.primaryColor,
        "--theme-background": config.theme.backgroundColor,
        "--theme-text": config.theme.textColor,
        "--theme-font": config.theme.fontFamily,
        "--theme-heading-font": config.theme.headingFontFamily,
        "--header-text-font-size": config.headerTypography.fontSize,
        "--header-text-font-weight": config.headerTypography.fontWeight,
        "--header-text-font-style": config.headerTypography.fontStyle,
      }) as CSSProperties,
    [config],
  );

  return {
    config,
    locale,
    copy,
    headerText,
    themeVariables,
  };
}
