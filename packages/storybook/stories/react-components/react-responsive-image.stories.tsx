import React from "react";
import "../../global-style.css";
import { storiesOf } from "@storybook/react";
import README from "@wbe/react-responsive-image/README.md";
import ResponsiveImage, { EImageType } from "@wbe/react-responsive-image/src";
import FakeDataUtils from "@wbe/fake-data-utils/src";

// set story name
const storyName = "react-responsive-image";

const thumbs = FakeDataUtils.instance.getResponsiveImageData(16 / 9);

/**
 * Demo
 */
export const ImageTag = () => {
  return (
    <div className="ImageTag">
      <h2>{"<img> tag + responsive url"}</h2>
      <ResponsiveImage
        data={thumbs}
        type={EImageType.IMAGE_TAG}
        imageStyle={{ width: "100%" }}
      />
    </div>
  );
};

export const ImageTagPlaceholder = () => {
  return (
    <div className="ImageTag">
      <h2>{"<img> tag + responsive url + placeholder"}</h2>
      <ResponsiveImage
        data={thumbs}
        type={EImageType.IMAGE_TAG}
        imageStyle={{ width: "100%" }}
        placeholder={true}
        placeholderColor={"pink"}
      />
    </div>
  );
};

export const BackgroundImage = () => {
  return (
    <div className="ImageTag">
      <h2>{"<div> background-image + responsive url"}</h2>
      <ResponsiveImage data={thumbs} type={EImageType.BACKGROUND_IMAGE} />
    </div>
  );
};

export const BackgroundImagePlaceholder = () => {
  return (
    <div className="ImageTag">
      <h2>{"<div> background-image + responsive url + placeholder"}</h2>
      <ResponsiveImage
        data={thumbs}
        type={EImageType.BACKGROUND_IMAGE}
        placeholder={true}
        placeholderColor={"pink"}
      />
    </div>
  );
};

/**
 * Config
 */
storiesOf(`react-components/${storyName}`, module)
  .addParameters({
    readme: {
      sidebar: README,
      codeTheme: "darcula"
    }
  })
  .add("<img> tag", () => <ImageTag />)
  .add("<img> tag placeholder", () => <ImageTagPlaceholder />)
  .add("<div> background-image", () => <BackgroundImage />)
  .add("<div> background-image placeholder", () => (
    <BackgroundImagePlaceholder />
  ));

// TODO add background Image test
