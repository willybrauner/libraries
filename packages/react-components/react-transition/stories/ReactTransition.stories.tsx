import { ReactTransition } from "../src"
import React from "react";

const storyName = "react-transition";

export const App = () => <div>{storyName}</div>
App.storyName = "basic example";

export default {
  title: `react-components/${storyName}`,
  component: App
};
