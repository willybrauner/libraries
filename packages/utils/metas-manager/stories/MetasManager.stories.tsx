import { MetasManager } from "../src/MetasManager";
import React from "react";

const storyName = "metas-manager";

export const App = () => <div>{storyName}</div>;
App.storyName = "basic example";

export default {
  title: `utils/${storyName}`,
  component: App,
};
