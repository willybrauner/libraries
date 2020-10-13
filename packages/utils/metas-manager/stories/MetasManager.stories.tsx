import React, { useEffect, useState } from "react";
import { MetasManager, TMetaTags, TTag } from "../src/MetasManager";
const htmlElementStringify = require("html-element-stringify");

const storyName = "metas-manager";
const debug = require("debug")(`lib:${storyName}`);

export const App = (props: TMetaTags<string> & { robots: string }) => {
  useEffect(() => {
    const robots = [
      { selectorAttr: "name", selectorValue: "robots", attr: "content" },
    ] as TTag[];

    MetasManager.inject({
      values: {
        // default meta tags
        title: props.title,
        description: props.description,
        imageUrl: props.imageUrl,
        siteName: props.siteName,
        pageUrl: props.pageUrl,
        author: props.author,
        keywords: props.keywords,
        // other custom meta, need to prepare new meta in meta struct
        robots: props.robots,
      },
      tags: {
        ...MetasManager.DEFAULT_META_TAGS,
        robots,
      },
    });
  }, [props]);

  const [documentHead, setDocumentHead] = useState<string>(null);

  // need to remove tags but keeping each of them
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
    setDocumentHead(print);
  }, [props]);

  return <pre>{documentHead}</pre>;
};
App.storyName = "basic example";

export default {
  title: `utils/${storyName}`,
  component: App,
  args: {
    title: "Hello title",
    description: "Hello description",
    robots: "index,follow",
  } as TMetaTags<string>,
};
