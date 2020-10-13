const debug = require("debug")("lib:MetasManager");

type TTag = {
  selectorAttr: string;
  selectorValue: string;
  attr: string;
};

type TMetaTags<T> = {
  title?: T;
  description?: T;
  imageUrl?: T;
  siteName?: T;
  pageUrl?: T;
  author?: T;
  keywords?: T;
  viewport?: T;
  canonical?: T;
  // allow to add any others meta types
  [x: string]: T;
};

/**
 * @name MetasManager
 * @description Manage metas document head
 * In order to use this manager, title need be set in each page.
 *
 * Use manager as singleton
 * ex:
 *  MetasManager.inject({ title:"...", description:"...", ... })
 *
 */
class MetasManager {
  // attr added to auto-generated meta-tags
  private static AUTO_GENERATE_ATTR = "auto-generated";

  // prettier-ignore
  public static DEFAULT_META_TAGS: TMetaTags<TTag[]> = {
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
    ],
    viewport: [
      { selectorAttr: "name", selectorValue: "viewport", attr: "content" }
    ],
    canonical: [
      { selectorAttr: "rel", selectorValue: "canonical", attr: "href" }
    ]
  };

  /**
   * Prevent non string return
   * @param metaValue
   */
  private static checkValue(metaValue): string {
    return metaValue === undefined ||
      (typeof metaValue === "object" && metaValue !== null)
      ? ""
      : metaValue;
  }
  /**
   * Select Meta value
   */
  private static selectMetaValue(
    customMetasValue: TMetaTags<string>,
    pType: string
  ): string {
    return MetasManager.checkValue(customMetasValue?.[pType]) || "";
  }

  /**
   * Inject meta tags and meta values
   * @description Inject metas tag elements in document <head>
   * @param values: Meta values to set et tag
   * @param tags: Meta tags properties to inquire or create
   * @param autoCreateMetaTag: Auto create meta tag if it doesn't exist in <head>
   * @param autoRemoveMetaTag: Auto remove meta tag if is value is ""
   */
  public static inject({
    values = null,
    tags = MetasManager.DEFAULT_META_TAGS,
    autoCreateMetaTag = true,
    autoRemoveMetaTag = true,
  }: {
    values?: TMetaTags<string>;
    tags?: TMetaTags<TTag[]>;
    autoCreateMetaTag?: boolean;
    autoRemoveMetaTag?: boolean;
  }): void {
    // specific case: update main document title
    document.title = MetasManager.selectMetaValue(values, "title");

    // loop on metasTags keys (ex: title, description, imageUrl, siteName...)
    Object.keys(tags).forEach((metaType: string) => {
      // select meta value with preference order.
      let metaValue = MetasManager.selectMetaValue(values, metaType);

      // target properties {selector, setAttr} of this specific meta type
      const propertiesMetaType = tags[metaType];

      // for each properties of this specific meta type
      for (let property of propertiesMetaType) {
        // format selector
        const selector = `[${property.selectorAttr}="${property.selectorValue}"]`;

        // if tag element exist
        if (document.head.querySelector(selector) != null) {
          //
          if (autoRemoveMetaTag && metaValue === "") {
            debug(`el to remove`, document.head.querySelector(selector));
            document.head.querySelector(selector).remove();
          } else {
            // set meta in tag element
            document.head
              .querySelector(selector)
              .setAttribute(property.attr, metaValue);
          }
        }
        // if tag element doesn't exist and we need to create element
        else if (autoCreateMetaTag) {
          if (!metaValue) {
            debug(
              `"There is no value to set in meta attr type ${metaType}, return."`,
              metaValue
            );
            return;
          }

          debug(`Create meta tag...`);
          const newTagElement = document.createElement("meta");
          newTagElement.setAttribute(
            property.selectorAttr,
            property.selectorValue
          );

          newTagElement.setAttribute(property.attr, metaValue);
          newTagElement.setAttribute(MetasManager.AUTO_GENERATE_ATTR, "");
          const autoGeneratedMetaElement = document.head.querySelectorAll(
            `*[${MetasManager.AUTO_GENERATE_ATTR}]`
          );

          // if there is no meta auto-generated, insert after <title>
          // prettier-ignore
          if (autoGeneratedMetaElement?.length === 0) {
            debug('There is non auto-generated meta in document head, insert after title');
            const documentTitle = document.getElementsByTagName("title")[0];
            document.head.insertBefore(newTagElement, documentTitle.nextSibling)

          // if there is meta auto-generated, insert after the last one
          } else {
            debug("Get last auto-generated meta tag in document head and insert newTag after it.");
            const lastAutoGeneratedMeta = autoGeneratedMetaElement[autoGeneratedMetaElement.length - 1];
            lastAutoGeneratedMeta.parentNode.insertBefore(newTagElement, lastAutoGeneratedMeta.nextSibling);
          }
        } else {
          debug(
            `Tag element doesn't exist but, createElement is set to false, do nothing, return.`
          );
          return;
        }
      }
    });
  }
}

export { TTag, TMetaTags, MetasManager };
