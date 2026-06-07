export type PayloadLink = {
  label?: string | null;
  type?: "custom" | "servicePage" | "pageRef" | null;
  url?: string | null;
  servicePage?:
    | {
        slug?: string | null;
      }
    | number
    | null;
  pageRef?: "home" | "about" | "services" | "contact" | "faq" | null;
  newTab?: boolean | null;
};

export type PayloadMedia =
  | string
  | {
      url?: string | null;
      alt?: string | null;
      filename?: string | null;
      width?: number | null;
      height?: number | null;
    }
  | null
  | undefined;

type PayloadResponse<T> = T;

const fallbackServiceSlugs = [
  "engineering-solutions",
  "lifting-and-lashing-equipment",
  "manufacture-of-steel-structures",
  "marine-consultancy",
  "port-captain-service",
  "survey-services",
] as const;

function logPayloadFallback(path: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`[payload] Falling back for ${path}: ${message}`);
}

const payloadBaseUrl = (import.meta.env.PAYLOAD_URL || "").replace(/\/+$/, "");
const cache = new Map<string, Promise<unknown>>();
const shouldUsePayloadCache = !import.meta.env.DEV;

function buildUrl(path: string) {
  if (!payloadBaseUrl) {
    throw new Error("PAYLOAD_URL is missing in environment variables.");
  }

  return `${payloadBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function resolvePayloadApiUrl(path: string) {
  return buildUrl(path);
}

function normalizePayloadAssetUrl(url: string) {
  if (!url) return url;

  // Some CMS responses contain malformed absolute URLs like `http://http/api/...`
  // or `https://https/api/...`. Recover the `/api/...` path and rebuild it from PAYLOAD_URL.
  const apiPathIndex = url.search(/\/api\/.+$/i);
  if (apiPathIndex > -1) {
    const apiPath = url.slice(apiPathIndex);
    return buildUrl(apiPath);
  }

  return url;
}

async function fetchPayload<T>(path: string): Promise<PayloadResponse<T>> {
  const doFetch = async () => {
    const response = await fetch(buildUrl(path));

    if (!response.ok) {
      throw new Error(`Payload request failed for ${path}: ${response.status}`);
    }

    return response.json();
  };

  if (!shouldUsePayloadCache) {
    return doFetch();
  }

  if (!cache.has(path)) {
    cache.set(path, doFetch());
  }

  return cache.get(path) as Promise<T>;
}

export function resolvePayloadMediaUrl(media: PayloadMedia) {
  if (!media) return undefined;
  if (typeof media === "string") {
    return media.startsWith("http") ? normalizePayloadAssetUrl(media) : buildUrl(media);
  }
  if (!media.url) return undefined;
  return media.url.startsWith("http")
    ? normalizePayloadAssetUrl(media.url)
    : buildUrl(media.url);
}

export function resolvePayloadMediaAlt(media: PayloadMedia, fallback = "Image") {
  if (!media || typeof media === "string") return fallback;
  return media.alt || media.filename || fallback;
}

export function resolvePayloadOrFallbackUrl(
  media: PayloadMedia,
  fallbackUrl?: string | null,
) {
  return resolvePayloadMediaUrl(media) || fallbackUrl || undefined;
}

export function resolvePayloadOrFallbackAlt(
  media: PayloadMedia,
  fallbackAlt?: string | null,
  defaultAlt = "Image",
) {
  if (media) return resolvePayloadMediaAlt(media, fallbackAlt || defaultAlt);
  return fallbackAlt || defaultAlt;
}

export function resolvePageRefHref(
  pageRef?: PayloadLink["pageRef"],
  serviceSlug?: string | null,
) {
  if (serviceSlug) return `/services/${serviceSlug}`;

  switch (pageRef) {
    case "home":
      return "/";
    case "about":
      return "/about";
    case "services":
      return "/services";
    case "contact":
      return "/contact";
    case "faq":
      return "/faq";
    default:
      return "#";
  }
}

export function resolveLinkHref(link?: PayloadLink | null) {
  if (!link) return "#";
  if (link.type === "custom" && link.url) return link.url;
  if (
    link.type === "servicePage" &&
    link.servicePage &&
    typeof link.servicePage !== "number"
  ) {
    return resolvePageRefHref(undefined, link.servicePage.slug);
  }
  return resolvePageRefHref(link.pageRef);
}

export function toPlainText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function extractLexicalText(value: unknown): string {
  if (!value || typeof value !== "object") return "";

  const root = (value as { root?: { children?: unknown[] } }).root;
  if (!root?.children || !Array.isArray(root.children)) return "";

  const readNode = (node: unknown): string => {
    if (!node || typeof node !== "object") return "";

    const current = node as {
      text?: unknown;
      children?: unknown[];
      type?: unknown;
    };

    const ownText = typeof current.text === "string" ? current.text : "";
    const childText = Array.isArray(current.children)
      ? current.children.map(readNode).filter(Boolean).join("")
      : "";

    const combined = `${ownText}${childText}`;

    if (
      combined &&
      (current.type === "paragraph" ||
        current.type === "heading" ||
        current.type === "quote")
    ) {
      return `${combined}\n`;
    }

    return combined;
  };

  return root.children.map(readNode).join("").replace(/\n{3,}/g, "\n\n").trim();
}

export async function getSiteSettings() {
  try {
    return await fetchPayload<any>("/api/globals/siteSettings");
  } catch (error) {
    logPayloadFallback("/api/globals/siteSettings", error);
    return null;
  }
}

export async function getHeaderData() {
  try {
    return await fetchPayload<any>("/api/globals/header");
  } catch (error) {
    logPayloadFallback("/api/globals/header", error);
    return null;
  }
}

export async function getFooterData() {
  try {
    return await fetchPayload<any>("/api/globals/footer");
  } catch (error) {
    logPayloadFallback("/api/globals/footer", error);
    return null;
  }
}

export async function getHomePage() {
  try {
    return await fetchPayload<any>("/api/globals/homePage");
  } catch (error) {
    logPayloadFallback("/api/globals/homePage", error);
    return null;
  }
}

export async function getAboutPage() {
  try {
    return await fetchPayload<any>("/api/globals/aboutPage");
  } catch (error) {
    logPayloadFallback("/api/globals/aboutPage", error);
    return null;
  }
}

export async function getServicesPage() {
  try {
    return await fetchPayload<any>("/api/globals/servicesPage");
  } catch (error) {
    logPayloadFallback("/api/globals/servicesPage", error);
    return null;
  }
}

export async function getContactPage() {
  try {
    return await fetchPayload<any>("/api/globals/contactPage");
  } catch (error) {
    logPayloadFallback("/api/globals/contactPage", error);
    return null;
  }
}

export async function getFaqPage() {
  try {
    return await fetchPayload<any>("/api/globals/faqPage");
  } catch (error) {
    logPayloadFallback("/api/globals/faqPage", error);
    return null;
  }
}

export async function getServicePages() {
  try {
    return await fetchPayload<any>("/api/servicePages?limit=100&depth=2&sort=sortOrder");
  } catch (error) {
    logPayloadFallback("/api/servicePages?limit=100&depth=2&sort=sortOrder", error);
    return {
      docs: fallbackServiceSlugs.map((slug, index) => ({
        id: index + 1,
        slug,
        title: slug,
      })),
    };
  }
}

export async function getServicePageBySlug(slug: string) {
  const path = `/api/servicePages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2`;

  try {
    const response = await fetchPayload<any>(path);
    return response.docs?.[0] ?? null;
  } catch (error) {
    logPayloadFallback(path, error);
    return {
      slug,
      title: slug,
      blocks: [],
      seo: null,
    };
  }
}
