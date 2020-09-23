import MetasManager from "../src";
import React, { useEffect, useState } from "react";
import { TMetas } from "../src/MetasManager";

const storyName = "metas-manager";
const debug = require("debug")(`lib:${storyName}`);

export const App = (props: TMetas) => {
  useEffect(() => {
    MetasManager.inject({
      title: props.title,
      description: props.description,
    });
  }, [props]);

  const [documentHead, setDocumentHead] = useState(null);

  useEffect(() => {
    setDocumentHead(document.head);
    // TODO remove style and script attr
  }, [props]);

  return <pre>{documentHead?.innerHTML}</pre>;
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
