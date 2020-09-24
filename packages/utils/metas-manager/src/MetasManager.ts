const debug = require("debug")("lib:MetasManager");

/**
 * IMetas properties type
 */
type TMetaProperty = {
  selectorAttr: string;
  selectorValue: string;
  attr: string;
};

/**
 * IMetas interface
 */
type TMetas = {
  title?: string | TMetaProperty[];
  description?: string | TMetaProperty[];
  imageUrl?: string | TMetaProperty[];
  siteName?: string | TMetaProperty[];
  pageUrl?: string | TMetaProperty[];
  author?: string | TMetaProperty[];
  keywords?: string | TMetaProperty[];
};

/**
 * Default Meta properties
 */
// prettier-ignore
const METAS_PROPERTIES: TMetas = {
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

/**
 * MetasManager
 *
 * @description Manage metas document head
 * Default should be define on app initialisation via defaultMetas seter:
 *  MetasManager.defaultMetas = { }
 *
 * Each view should set custom meta value:
 *  MetasManager.inject({ title:"...", ... })
 *
 * In order to use this manager, DOM meta tags need be set in each HTML page:
 *  <title></title>
 *  <meta name="description" content="">
 *  <meta name="author" content="">
 * ...
 *
 */
class MetasManager {
  // --------------------------------------------------------------------------- SINGLETON

  // protected static _instance:MetasManager;
  // public static get instance():MetasManager {
  //   if (MetasManager._instance == null) {
  //     MetasManager._instance = new MetasManager();
  //   }
  //   return MetasManager._instance;
  // }

  // --------------------------------------------------------------------------- LOCAL

  /**
   * Default meta properties object
   */
  private readonly _metaProperties: TMetas;

  /**
   * Start constructor
   * @param pMetaProperties
   */
  constructor(pMetaProperties: TMetas = METAS_PROPERTIES) {
    // Set metas properties
    this._metaProperties = pMetaProperties;
    debug("pMetaProperties", pMetaProperties);
  }

  // --------------------------------------------------------------------------- PRIVATE

  /**
   * Cleans a string by remplacing the " with the '
   * @param source The original string
   * @return cleanedString The cleaned string
   * @private
   */
  private cleanMetaString(source: string) {
    return source.replace(/"/g, "'");
  }

  /**
   * Format Meta string
   * @param pMetaValue
   * @param pType
   * @private
   */
  private formatMeta(pMetaValue: string, pType: string): string {
    return this.cleanMetaString(pMetaValue);
  }

  /**
   * _selectMetaValue
   *
   * Meta priority order:
   * - custom meta
   * - empty string
   *
   * @param pCustomMetas
   * @param pType
   * @private
   */
  private static selectMetaValue(pCustomMetas: TMetas, pType: string): string {
    return pCustomMetas?.[pType] ? pCustomMetas[pType] : "";
  }

  // --------------------------------------------------------------------------- PULBIC API

  /**
   * @name inject
   * @description Inject metas in document <head>
   *
   * @param customMetas
   * @param properties
   * @param createElement
   */
  public inject(
    customMetas: TMetas = null,
    properties: TMetas = this._metaProperties,
    createElement = true
  ): void {
    // specific case: update main document title
    const selectDocumentTitle = MetasManager.selectMetaValue(
      customMetas,
      "title"
    );

    // TODO - create title dom element if does't exist because we need it to insertMetas
    // set in DOM
    document.title = this.cleanMetaString(selectDocumentTitle);

    // loop on pMetas (ex: title, description, imageURL, siteName...)
    Object.keys(properties).forEach((metaType: string) => {
      // select meta value with preference order.
      let metaValue = MetasManager.selectMetaValue(customMetas, metaType);
      if (!this.formatMeta(metaValue, metaType)) {
        debug("There is no value to set in meta attr, return.");
        return;
      }

      // target properties {selector, setAttr} of this specific meta type
      const propertiesMetaType: TMetaProperty[] = properties[metaType];

      // for each properties of this specific meta type
      for (let property of propertiesMetaType) {
        // format selector
        const selector = `[${property.selectorAttr}="${property.selectorValue}"]`;

        // if tag element exist
        if (document.head.querySelector(selector) != null) {
          // set meta in tag element
          document.head
            .querySelector(selector)
            .setAttribute(property.attr, this.formatMeta(metaValue, metaType));
        }
        // if tag element doesn"t exist
        else {
          debug(`Meta tag element doesn't exist, create it.`);
          const newTagElement = document.createElement("meta");
          newTagElement.setAttribute(
            property.selectorAttr,
            property.selectorValue
          );
          newTagElement.setAttribute(
            property.attr,
            this.formatMeta(metaValue, metaType)
          );

          const autoGeneratedAttr = "auto-generated";
          newTagElement.setAttribute(autoGeneratedAttr, "");
          // prettier-ignore
          const autoGeneratedMetaElement = document.head.querySelectorAll(`[${autoGeneratedAttr}]`);

          // if there is no meta auto-generated, insert after <title>
          // prettier-ignore
          if (autoGeneratedMetaElement.length === 0) {
            debug('There is non auto-generated meta in document head, insert after title');
            const documentTitle = document.getElementsByTagName("title")[0];
            document.head.insertBefore(newTagElement, documentTitle.nextSibling)
            
          // if there is meta auto-generated, insert after the last one 
          } else {
            debug("Get last auto-generated meta tag in document head and insert newTag after it.");
            const lastAutoGeneratedMeta = autoGeneratedMetaElement[autoGeneratedMetaElement.length - 1];
            lastAutoGeneratedMeta.parentNode.insertBefore(newTagElement, lastAutoGeneratedMeta.nextSibling);
          }
        }
      }
    });
  }
}

// export with new instance
export { MetasManager, TMetaProperty, TMetas };
