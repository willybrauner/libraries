import React from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/react-responsive-image/README.md";
//import ResponsiveImage from "@wbe/react-responsive-image";
// TODO à remplacer avec l'import quand le module sera développé
import ResponsiveImage, {
  EImageType
  // @ts-ignore
} from "../../../react-components/react-responsive-image/src";
import "../../global-style.css";

const storyName = "react-responsive-image";

/**
 * Demo
 */

const imageData = [
  {
    width: 200,
    height: 300,
    url: "https://picsum.photos/200/300"
  },
  {
    width: 600,
    height: 800,
    url: "https://picsum.photos/600/800"
  }
];

export const App = () => {
  return (
    <div className="App">
      <ResponsiveImage data={imageData} type={EImageType.IMAGE_TAG} />
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
