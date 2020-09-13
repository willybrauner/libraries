// @ts-ignore
import ResponsiveImage, { EImageType, IImage } from "../src";
import React, { CSSProperties, ReactNode } from "react";
import FakeDataUtils from "@wbe/fake-data-utils";
import "../../../../storybook/global-style.css";

const storyName = "react-responsive-image";

// get fake thumbs array
const thumbs = FakeDataUtils.getResponsiveImageData(16 / 9);

// IResponsiveImage props
interface IProps {
  classNames?: string[];
  type: EImageType;
  data: IImage[];
  alt?: string;
  children?: ReactNode;
  lazy?: boolean;
  // lazyOffset?: number;
  lazyCallBack?: () => void;
  forceImageWidth?: number;
  forceVerticalRatio?: number;
  placeholder?: boolean;
  placeholderColor?: string;
  rootStyle?: CSSProperties;
  imageStyle?: CSSProperties;
  ariaLabel?: string | null;
  role?: string;
}

export const Image = (props: IProps) => (
  <div>
    <p>
      This is a simple {`<img>`} HTML tag with responsive image data as data
      props. Resize your browser and check image url change.
    </p>
    <ResponsiveImage {...props} />
  </div>
);

export default {
  title: `react-components/${storyName}`,
  component: Image,
  args: {
    classNames: ["Image"],
    type: EImageType.TAG_IMAGE,
    data: thumbs,
    alt: "This is an image tag example",
    lazy: false,
    lazyCallBack: () => console.log("Image is loaded"),
    forceImageWidth: null,
    forceVerticalRatio: null,
    placeholder: false,
    placeholderColor: null,
    rootStyle: null,
    imageStyle: { display: "block", width: "100%" },
    ariaLabel: null,
    role: null
  }
};

export const BackgroundImage = (props: IProps) => (
  <div>
    <p>
      This is {`<div>`} with a dynamic background-image css property. Resize
      your browser and check image url change.
    </p>
    <ResponsiveImage {...props} />
  </div>
);

BackgroundImage.storyName = "background image";
BackgroundImage.args = {
  classNames: ["BackgroundImage"],
  type: EImageType.BACKGROUND_IMAGE,
  data: thumbs,
  alt: "This is a background-image example",
  lazy: false,
  lazyCallBack: () => console.log("BackgroundImage is loaded"),
  forceImageWidth: null,
  forceVerticalRatio: null,
  placeholder: false,
  placeholderColor: null,
  imageStyle: {
    width: "100%",
    height: `${400 / (16 / 9)}px`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  ariaLabel: null,
  role: null
};
