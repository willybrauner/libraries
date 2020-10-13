import MetasManager, { TMetaTags, TTag } from "../src";

describe("MetasManager", () => {
  it("should be defined", () => {
    expect(MetasManager).toBeDefined();
  });

  it("should inject metas values in head", () => {
    MetasManager.inject({ values: { title: "Hello MetasManager" } });
    expect(document.title).toBe("Hello MetasManager");

    MetasManager.inject({ values: { title: "A second time, ok." } });
    expect(document.title).toBe("A second time, ok.");

    MetasManager.inject({
      values: { description: "New description" },
    });
    expect(document.title).toBe("");
    expect(
      document.head.querySelector("[name=description]").getAttribute("content")
    ).toBe("New description");
  });

  it("should works with custom metas tags", () => {
    // create new meta tags properties
    const newMetaTagsProperties: TMetaTags<TTag[]> = {
      title: [{ selectorAttr: "title", selectorValue: "bar", attr: "content" }],
      description: [
        { selectorAttr: "description", selectorValue: "foo", attr: "content" },
      ],
    };

    MetasManager.inject({
      values: {
        title: "hello title",
        description: "hello description",
      },
      tags: {
        ...MetasManager.DEFAULT_META_TAGS,
        ...newMetaTagsProperties,
      },
    });

    const createdTitleTag = document.head.querySelector("[title=bar]");
    expect(createdTitleTag).toBeDefined();
    expect(createdTitleTag.getAttribute("content")).toBe("hello title");

    const createdDescriptionTag = document.head.querySelector(
      "[description=foo]"
    );
    expect(createdDescriptionTag).toBeDefined();
    expect(createdDescriptionTag.getAttribute("content")).toBe(
      "hello description"
    );
  });

  describe("auto add/remove or keep meta tags", () => {
    it("should remove auto-generated meta tags if is value is empty", () => {
      MetasManager.inject({
        values: { description: "hello description" },
        autoCreateMetaTag: true,
        autoRemoveMetaTag: true,
      });

      let createdDescriptionTag = document.head.querySelector(
        "[property='og:description']"
      );
      expect(createdDescriptionTag).toBeDefined();
      expect(createdDescriptionTag.getAttribute("content")).toBe(
        "hello description"
      );

      MetasManager.inject({ values: { description: "" } });
      createdDescriptionTag = document.head.querySelector(
        "[property='og:description']"
      );
      expect(createdDescriptionTag).toBeNull();
    });

    it("should keep auto-generated meta tags if is value is empty", () => {
      MetasManager.inject({
        values: { description: "hello description" },
        autoCreateMetaTag: true,
        autoRemoveMetaTag: false,
      });

      let createdDescriptionTag = document.head.querySelector(
        "[property='og:description']"
      );
      expect(createdDescriptionTag).toBeDefined();
      expect(createdDescriptionTag.getAttribute("content")).toBe(
        "hello description"
      );

      MetasManager.inject({
        values: { description: "" },
      });
      createdDescriptionTag = document.head.querySelector(
        "[property='og:description']"
      );

      expect(createdDescriptionTag).toBeDefined();
    });
  });
});
