import { TMetas } from "./MetasManager";

/**
 * Default Meta properties
 */
// prettier-ignore
export const METAS_PROPERTIES: TMetas = {
  title: [
    { selectorAttr: "property", selectorValue: "og:title", attr: "content" },
    { selectorAttr: "name", selectorValue: "twitter:title", attr: "content" }
  ],
  description: [
    { selectorAttr: "name", selectorValue: "description", attr: "content" },
    { selectorAttr: "property", selectorValue: "og:description", attr: "content" },
    { selectorAttr: "name", selectorValue: "twitter:description", attr: "content" }
  ],
  imageUrl: [
    { selectorAttr: "property", selectorValue: "og:image", attr: "content" },
    { selectorAttr: "name", selectorValue: "twitter:image", attr: "content" },
    { selectorAttr: "rel", selectorValue: "image_src", attr: "href" }
  ],
  siteName: [
    { selectorAttr: "property", selectorValue: "og:site_name", attr: "content" },
    { selectorAttr: "name", selectorValue: "twitter:site", attr: "content" }
  ],
  pageUrl: [
    { selectorAttr: "property", selectorValue: "og:url", attr: "content" },
    { selectorAttr: "name", selectorValue: "twitter:url", attr: "content" },
    { selectorAttr: "rel", selectorValue: "canonical", attr: "href" }
  ],
  author: [
    { selectorAttr: "name", selectorValue: "author", attr: "content" }
  ],
  keywords: [
    { selectorAttr: "name", selectorValue: "keywords", attr: "content" }
  ]
};
