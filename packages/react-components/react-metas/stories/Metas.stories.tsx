import { Metas, TMetasProps } from "../src/Metas";
import React, { useEffect, useState } from "react";
const htmlElementStringify = require("html-element-stringify");

const storyName = "react-metas";

export const App = (props: TMetasProps) => {
  const [documentHead, setDocumentHead] = useState<string>(null);

  // need to remove tags but keeping part of them
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

  return (
    <div>
      <Metas values={props.values} />
      <pre>{documentHead}</pre>
    </div>
  );
};

App.storyName = "basic example";

export default {
  title: `react-components/${storyName}`,
  component: App,
  args: {
    values: {
      title: "Hello title",
    },
  } as TMetasProps,
};
