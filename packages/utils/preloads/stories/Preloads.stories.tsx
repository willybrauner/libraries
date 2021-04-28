import { preloadImage, preloadImages } from "../src/preloadImages";
import React, { useEffect, useRef } from "react";
import FakeDataUtils from "@wbe/fake-data-utils";

const storyName = "preloads";
const debug = require("debug")(`lib:${storyName}`);

export const App = () => {
  const imageRef = useRef(FakeDataUtils.getResponsiveImageData()[0].url);
  useEffect(() => {
    debug("imageRef.current", imageRef.current);
    preloadImage(imageRef.current).then((resolve) => {
      debug("image is loaded", resolve);
    });
  }, []);

  const imagesRef = useRef([
    FakeDataUtils.getResponsiveImageData()[0].url,
    FakeDataUtils.getResponsiveImageData()[0].url,
    FakeDataUtils.getResponsiveImageData()[0].url,
  ]);
  useEffect(() => {
    debug("imagesRef.current", imagesRef.current);
    preloadImages(imagesRef.current).then((resolve) => {
      debug("images are loaded", resolve);
    });
  }, []);

  return <div>{storyName}</div>;
};
App.storyName = "basic example";

export default {
  title: `utils/${storyName}`,
  component: App,
};
