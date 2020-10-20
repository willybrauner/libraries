import { Preloads } from "../src/preloadImages";
import React from "react";

const storyName = "preloads";

export const App = () => <div>{storyName}</div>;
App.storyName = "basic example";

export default {
  title: `utils/${storyName}`,
  component: App,
};
