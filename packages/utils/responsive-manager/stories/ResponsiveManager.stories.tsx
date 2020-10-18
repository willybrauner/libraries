import { ResponsiveManager } from "../src/ResponsiveManager";
import React from "react";

const storyName = "responsive-manager";

export const App = () => <div>{storyName}</div>;
App.storyName = "basic example";

export default {
  title: `utils/${storyName}`,
  component: App,
};
