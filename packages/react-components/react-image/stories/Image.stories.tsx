import { Image } from "../src";
import React from "react";

const storyName = "image";

const srcset =
  "https://picsum.photos/id/1/360/600 360w, https://picsum.photos/id/1/1024/1900 1024w";

export const App = () => <Image srcset={srcset} alt={"test"} />;
App.storyName = "basic example";

export default {
  title: `react-components/${storyName}`,
  component: App,
};
