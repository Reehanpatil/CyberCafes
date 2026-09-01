import { useEffect } from "react";

const SITE_NAME = "CyberCafe";
const DEFAULT_DESCRIPTION =
  "Latest government job updates, admit cards, results and answer keys — plus cyber cafe services in Khanagaon.";

function setMetaTag(attr, name, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function usePageMeta(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    const fullTitle =
      title ?
        `${title} | ${SITE_NAME}`
      : `${SITE_NAME} — Govt Job Updates & Cyber Services`;
    document.title = fullTitle;

    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "website");
    setMetaTag("name", "twitter:card", "summary");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
  }, [title, description]);
}
