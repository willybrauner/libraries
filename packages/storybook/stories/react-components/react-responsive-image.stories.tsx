import React from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/react-responsive-image/README.md";
import ResponsiveImage, { EImageType } from "@wbe/react-responsive-image/src";
import "../../global-style.css";

// set story name
const storyName = "react-responsive-image";

/**
 * Demo
 */

const imageData = [
  {
    width: 200,
    height: 150,
    url: "https://picsum.photos/200/150"
  },
  {
    width: 400,
    height: 600,
    url: "https://picsum.photos/400/600"
  },
  {
    width: 600,
    height: 400,
    url: "https://picsum.photos/600/400"
  },
  {
    width: 800,
    height: 600,
    url: "https://picsum.photos/800/600"
  },
  {
    width: 1000,
    height: 800,
    url: "https://picsum.photos/1000/800"
  },
  {
    width: 1400,
    height: 1200,
    url: "https://picsum.photos/1400/1200"
  }
];

export const App = () => {
  return (
    <div className="App">
      <ResponsiveImage
        classNames={[`App_responsiveImage`]}
        data={imageData}
        type={EImageType.IMAGE_TAG}
        imageStyle={{ width: "50%" }}
        placeholder={true}
        forceVerticalRatio={50}
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
  .add("basic example", () => <App />);
