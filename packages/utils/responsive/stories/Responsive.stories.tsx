import { Responsive } from "../src/Responsive";
import React, { useEffect } from "react";
import breakpoints from "./breakpoints.json";
const storyName = "responsive";
const debug = require("debug")(`lib:${storyName}`);

export const App = () => {
  debug("breakpoints", breakpoints);

  useEffect(() => {
    const handler = () => {
      const isMinWidthTablet = Responsive.isMinWidth(breakpoints.tablet);
      debug("isMinWidthTablet ?", isMinWidthTablet, breakpoints.tablet);
    };
    window.addEventListener("resize", handler);
    return window.removeEventListener("resize", handler);
  });

  return <div>{storyName}</div>;
};
App.storyName = "basic example";

export default {
  title: `utils/${storyName}`,
  component: App,
};
