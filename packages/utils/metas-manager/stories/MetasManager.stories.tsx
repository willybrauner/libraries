import MetasManager from "../src";
import React, { useEffect, useState } from "react";
import { TMetas } from "../src/MetasManager";
const htmlElementStringify = require("html-element-stringify");

const storyName = "metas-manager";
const debug = require("debug")(`lib:${storyName}`);

export const App = (props: TMetas) => {
  useEffect(() => {
    MetasManager.inject({
      title: props.title,
      description: props.description,
    });
  }, [props]);

  const [documentHead, setDocumentHead] = useState<string>(null);

  const removeChildren = (pElementsToRemove): void => {
    for (let i = pElementsToRemove.length - 1; i >= 0; i--) {
      let item = pElementsToRemove[i];
      item.parentNode.removeChild(item);
    }
  };

  const keepingTags = (
    head = document.head,
    keepingList = ["title", "meta"]
  ): HTMLElement[] => {
    let final = [];
    keepingList.forEach((el) => {
      final = [
        ...Array.from(final),
        ...Array.from(head.getElementsByTagName(el) || []),
      ];
    });
    return final;
  };

  const printHtml = (els: HTMLElement[]): string => {
    return els.map((el: HTMLElement) => htmlElementStringify(el)).join("\n");
  };

  useEffect(() => {
    const keep = keepingTags();
    const print = printHtml(keep);
    debug("print", print);
    setDocumentHead(print);
  }, [props]);

  return <pre>{documentHead}</pre>;
};
App.storyName = "basic example";

export default {
  title: `utils/${storyName}`,
  component: App,
  args: {
    title: "Mega title",
    description: "Super description",
  } as TMetas,
};
