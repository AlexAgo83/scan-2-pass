import type { DestinationLinkConfig } from "./config";

export const LINKS_HUB_VIEW_PARAM = "view";
export const LINKS_HUB_VIEW_VALUE = "links";

function normalizeSearch(search: string): string {
  if (!search) {
    return "";
  }
  return search.startsWith("?") ? search : `?${search}`;
}

export function shouldRenderLinksHubView(
  search: string,
  destinationLinksCount: number,
): boolean {
  if (destinationLinksCount < 2) {
    return false;
  }
  const view = new URLSearchParams(normalizeSearch(search)).get(
    LINKS_HUB_VIEW_PARAM,
  );
  return view === LINKS_HUB_VIEW_VALUE;
}

export function buildLinksHubUrl(currentHref: string): string {
  const baseUrl = new URL(currentHref);
  const hubUrl = new URL(baseUrl.origin + baseUrl.pathname);
  hubUrl.searchParams.set(LINKS_HUB_VIEW_PARAM, LINKS_HUB_VIEW_VALUE);
  return hubUrl.toString();
}

export function resolvePostSubmitNextUrl(
  destinationLinks: DestinationLinkConfig[],
  fallbackRedirectUrl: string,
  currentHref?: string,
): string {
  if (destinationLinks.length === 1) {
    return destinationLinks[0].url;
  }

  if (destinationLinks.length >= 2 && currentHref) {
    return buildLinksHubUrl(currentHref);
  }

  return fallbackRedirectUrl;
}
