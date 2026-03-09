import { useEffect } from "react";

interface MetaTagsOptions {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  jsonLd?: object;
}

export function useMetaTags({
  title,
  description,
  ogImage,
  ogType = "website",
  canonicalUrl,
  jsonLd,
}: MetaTagsOptions) {
  useEffect(() => {
    const appName = "AI Tools Directory";
    const fullTitle = title ? `${title} | ${appName}` : appName;
    const desc =
      description ??
      "Discover the best AI tools for image generation, video creation, chatbots, and writing — all in one place.";
    const image =
      ogImage ?? `${window.location.origin}/assets/generated/og-image.jpg`;

    document.title = fullTitle;

    const setMeta = (property: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", desc);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", desc, "property");
    setMeta("og:image", image, "property");
    setMeta("og:type", ogType, "property");
    setMeta("twitter:card", ogImage ? "summary_large_image" : "summary");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", desc);

    // Canonical URL
    let canonicalEl = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonicalUrl) {
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", canonicalUrl);
    } else if (canonicalEl) {
      canonicalEl.remove();
    }

    // JSON-LD structured data
    const JSON_LD_ID = "json-ld-structured-data";
    let jsonLdEl = document.getElementById(
      JSON_LD_ID,
    ) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!jsonLdEl) {
        jsonLdEl = document.createElement("script");
        jsonLdEl.id = JSON_LD_ID;
        jsonLdEl.type = "application/ld+json";
        document.head.appendChild(jsonLdEl);
      }
      jsonLdEl.textContent = JSON.stringify(jsonLd);
    } else if (jsonLdEl) {
      jsonLdEl.remove();
    }

    return () => {
      // Cleanup canonical and JSON-LD on unmount
      document.querySelector('link[rel="canonical"]')?.remove();
      document.getElementById(JSON_LD_ID)?.remove();
    };
  }, [title, description, ogImage, ogType, canonicalUrl, jsonLd]);
}
