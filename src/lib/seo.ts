export type SeoPageKey =
  | "home"
  | "about"
  | "services"
  | "service"
  | "contact"
  | "faq";

export type SeoMetaInput = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  canonicalUrl?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  faviconSvg?: string;
  faviconIco?: string;
  appleTouchIcon?: string;
};

type ResolvedSeoMeta = {
  title: string;
  description: string;
  canonicalUrl?: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  faviconSvg: string;
  faviconIco: string;
  appleTouchIcon: string;
  siteName: string;
  themeColor: string;
  locale: string;
  twitterCard: "summary" | "summary_large_image";
};

export const seoSiteSettings = {
  siteName: "Octopus Group",
  defaultTitle: "Octopus Group",
  titleTemplate: "%s | Octopus Group",
  defaultDescription:
    "Octopus Group delivers engineering solutions, marine consultancy, survey services, Port Captain support, lifting and lashing equipment, and steel structure manufacturing.",
  siteUrl: "https://example.com",
  defaultRobots: "index,follow",
  themeColor: "#00293A",
  locale: "en_US",
  faviconSvg: "/favicon.svg",
  faviconIco: "/favicon.ico",
  appleTouchIcon: "/favicon.svg",
  defaultOgImage: "",
} as const;

export const seoPages: Record<SeoPageKey, SeoMetaInput> = {
  home: {
    title: "One Entry Point for Marine and Engineering Services",
    description:
      "Octopus Group connects engineering, consultancy, survey, Port Captain support, and cargo equipment supply through a single coordination hub.",
    canonicalPath: "/",
  },
  about: {
    title: "About Octopus Group",
    description:
      "Learn how Octopus Group brings marine operations, engineering, and cargo expertise together through one accountable entry point.",
    canonicalPath: "/about",
  },
  services: {
    title: "Services",
    description:
      "Explore Octopus Group services: engineering solutions, marine consultancy, survey, Port Captain support, lifting and lashing equipment, and manufacturing.",
    canonicalPath: "/services",
  },
  service: {
    title: "Service Detail",
    description:
      "See how Octopus Group structures delivery, support, equipment supply, manufacturing, and marine coordination through one integrated workflow.",
    canonicalPath: "/service",
  },
  contact: {
    title: "Contact",
    description:
      "Get in touch with Octopus Group for engineering, marine consultancy, survey support, lifting and lashing equipment, or Port Captain services.",
    canonicalPath: "/contact",
  },
  faq: {
    title: "FAQ",
    description:
      "Find answers to common questions about Octopus Group services, project workflows, coordination, and support capabilities.",
    canonicalPath: "/faq",
  },
};

export function resolveSeoMeta(
  pageKey?: SeoPageKey,
  overrides: SeoMetaInput = {},
  pathname = "/",
  siteSettingsOverrides: Partial<typeof seoSiteSettings> = {},
): ResolvedSeoMeta {
  const siteSettings = { ...seoSiteSettings, ...siteSettingsOverrides };
  const pageMeta = pageKey ? seoPages[pageKey] : {};
  const meta = { ...pageMeta, ...overrides };
  const titleSource = meta.title || siteSettings.defaultTitle;
  const title =
    titleSource === siteSettings.defaultTitle
      ? siteSettings.defaultTitle
      : siteSettings.titleTemplate.replace("%s", titleSource);
  const description = meta.description || siteSettings.defaultDescription;
  const canonicalPath = meta.canonicalUrl || meta.canonicalPath || pathname;
  const canonicalUrl = siteSettings.siteUrl
    ? new URL(canonicalPath, siteSettings.siteUrl).toString()
    : undefined;
  const ogImage = meta.ogImage || siteSettings.defaultOgImage || undefined;

  return {
    title,
    description,
    canonicalUrl,
    robots: meta.robots || siteSettings.defaultRobots,
    ogTitle: meta.ogTitle || title,
    ogDescription: meta.ogDescription || description,
    ogImage,
    faviconSvg: meta.faviconSvg || siteSettings.faviconSvg,
    faviconIco: meta.faviconIco || siteSettings.faviconIco,
    appleTouchIcon: meta.appleTouchIcon || siteSettings.appleTouchIcon,
    siteName: siteSettings.siteName,
    themeColor: siteSettings.themeColor,
    locale: siteSettings.locale,
    twitterCard: ogImage ? "summary_large_image" : "summary",
  };
}
