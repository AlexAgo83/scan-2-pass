import { useEffect } from "react";
import type { AppConfig } from "../lib/config";
import type { SupportedLocale } from "../lib/i18n";

export function useDocumentMetadataEffects(
  config: AppConfig,
  locale: SupportedLocale,
): void {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.title = config.siteName;
  }, [config.siteName]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    let favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.setAttribute("rel", "icon");
      document.head.appendChild(favicon);
    }

    favicon.setAttribute("href", config.faviconUrl);

    const isSvg =
      config.faviconUrl.endsWith(".svg") ||
      config.faviconUrl.startsWith("data:image/svg+xml");
    if (isSvg) {
      favicon.setAttribute("type", "image/svg+xml");
    } else {
      favicon.removeAttribute("type");
    }
  }, [config.faviconUrl]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const fontUrl = config.theme.fontUrl;
    if (!fontUrl) {
      return;
    }

    const existingLink = document.querySelector<HTMLLinkElement>(
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
}
