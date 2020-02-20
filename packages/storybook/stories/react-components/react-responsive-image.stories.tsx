import React, { useState } from "react";
import "../../global-style.css";
import { storiesOf } from "@storybook/react";
import README from "@wbe/react-responsive-image/README.md";
import ResponsiveImage, {
  EImageType,
  useResponsiveImageData
} from "@wbe/react-responsive-image/src";
import FakeDataUtils from "@wbe/fake-data-utils/src";
import useWindowSize from "@wbe/use-window-size/src";

// set story name
const storyName = "react-responsive-image";

// get fake thumbs array
const thumbs = FakeDataUtils.instance.getResponsiveImageData(16 / 9);

/**
 * Demo
 */
export const ImageTag = () => {
  return (
    <div>
      <section>
        <h2>img</h2>
        <p>
          This is a simple {`<img>`} HTML tag with responsive image data as data
          props. Resize your browser and check image url change.
        </p>
        <ResponsiveImage
          data={thumbs}
          type={EImageType.IMAGE_TAG}
          imageStyle={{ width: "100%" }}
        />
      </section>
    </div>
  );
};

export const ImageTagPlaceholder = () => {
  // define image opacity
  const [imageOpacity, setImageOpacity] = useState(1);

  return (
    <div>
      <section>
        <h2>img - placeholder</h2>
        <p>
          This image as got the same properties than the previous one, except it
          takes a placeholder. Placeholder ratio size is calc via image
          dimensions and allow to define an image wrapper who take image
          dimension behind the image.
        </p>
        <p>
          WARNING: <code>objectFit: cover</code> is used to get the same effect
          than
          <code>background-size:cover</code>. check
          https://caniuse.com/#search=object-fit
        </p>
        <button
          onClick={() => {
            if (imageOpacity === 0) setImageOpacity(1);
            if (imageOpacity === 1) setImageOpacity(0);
          }}
        >
          <h2>toggle image opacity to show placeholder</h2>
        </button>
        <ResponsiveImage
          data={thumbs}
          type={EImageType.IMAGE_TAG}
          placeholder={true}
          placeholderColor={"pink"}
          rootStyle={{ marginTop: "1rem" }}
          imageStyle={{
            display: "block",
            width: "100%",
            opacity: imageOpacity,
            transition: "opacity 300ms ease-out"
          }}
        />
      </section>
    </div>
  );
};

export const ImageTagLazy = () => {
  return (
    <div>
      <h2>img - lazyload</h2>
      <p>
        Set props "lazy" to "true" if you want to lazyload the image. In browser
        network dev tab, check images loading when you scroll the page.
      </p>
      <p>
        Change "lazyOffset" value if you want images load at X px to window top
        or bottom{" "}
      </p>
      {new Array(50).fill(null).map((el, i) => {
        // get thumbs per iteration
        const thumbs = FakeDataUtils.instance.getResponsiveImageData(16 / 9);
        return (
          <ResponsiveImage
            key={i}
            data={thumbs}
            type={EImageType.IMAGE_TAG}
            lazy={true}
            placeholder={true}
            placeholderColor={"pink"}
            rootStyle={{ marginTop: "1rem" }}
          />
        );
      })}
    </div>
  );
};

export const ImageTagForceWidth = () => {
  return (
    <div>
      <h2>img - force by width</h2>
      <p>
        Force to display the image whose size is closest to the value provided
        in px.
      </p>
      <ResponsiveImage
        data={thumbs}
        type={EImageType.IMAGE_TAG}
        forceImageWidth={800}
        imageStyle={{ width: "100%" }}
      />
    </div>
  );
};

export const BackgroundImage = () => {
  return (
    <div>
      <section>
        <h2>{"background-image"}</h2>
        <p>
          This is {`<div>`} with a dynamic backgroud-image. On this example, div
          height is fixed to 400px, and the image is backgroundSize cover.
        </p>
        <ResponsiveImage
          data={thumbs}
          type={EImageType.BACKGROUND_IMAGE}
          imageStyle={{
            height: "400px",
            backgroundSize: "cover",
            backgroundRepeat: "none"
          }}
        />
      </section>
    </div>
  );
};

export const BackgroundImagePlaceholder = () => {
  // define image opacity
  const [imageOpacity, setImageOpacity] = useState(1);
  return (
    <div>
      <section>
        <h2>{"background-image - placeholder"}</h2>
        <p>
          This background-image as got the same properties than the previous
          one, except it takes a placeholder. Placeholder ratio size is calc via
          image dimensions and allow to define an image wrapper who take image
          dimension behind the image.
        </p>
        <button
          onClick={() => {
            if (imageOpacity === 0) setImageOpacity(1);
            if (imageOpacity === 1) setImageOpacity(0);
          }}
        >
          <h2>toggle image opacity to show placeholder</h2>
        </button>
        <ResponsiveImage
          data={thumbs}
          type={EImageType.BACKGROUND_IMAGE}
          placeholder={true}
          placeholderColor={"pink"}
          rootStyle={{ marginTop: "1rem" }}
          imageStyle={{
            display: "block",
            width: "100%",
            opacity: imageOpacity,
            transition: "opacity 300ms ease-out"
          }}
        />
      </section>
    </div>
  );
};

export const ResponsiveImageData = () => {
  // get current width
  const { width } = useWindowSize();
  // get selected responsive image data object
  const selectedResponsiveImageData = useResponsiveImageData(thumbs, width);

  return (
    <div>
      <h2>useResponsiveImageData</h2>
      <pre>{JSON.stringify(selectedResponsiveImageData, null, 2)}</pre>

      <p>
        Internal hook <em>useResponsiveImageData</em> return image data depend
        to dynamic or static width value. In this example, width value depend of
        current window width, so, you can observe image data object changing if
        you resize your browser.
      </p>
    </div>
  );
};

/**
 * Config
 */
storiesOf(`react-components/${storyName}`, module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("img", () => <ImageTag />)
  .add("img - placeholder", () => <ImageTagPlaceholder />)
  .add("img - lazy", () => <ImageTagLazy />)
  .add("img - force image width", () => <ImageTagForceWidth />)
  .add("background-image", () => <BackgroundImage />)
  .add("background-image - placeholder", () => <BackgroundImagePlaceholder />)
  .add("use-responsive-image-data", () => <ResponsiveImageData />);

// TODO add background Image test
