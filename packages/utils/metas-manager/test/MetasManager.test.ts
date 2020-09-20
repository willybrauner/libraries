import MetasManager from "../src";

describe("MetasManager", () => {
  it("should be defined", () => {
    expect(MetasManager).toBeDefined();
  });

  beforeEach(() => {});

  it("should set default metas as reference", () => {});

  // injecter des metas, verifier qu'ils sont bien setés dans le head
  it("should inject metas values in head", () => {
    console.log("document.title", document.title);

    MetasManager.inject({ title: "Hello MetasManager" });

    console.log("document.title", document.title);
    expect(document.title).toBe("Hello MetasManager");
  });
});
