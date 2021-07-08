import "./index.css";
import { lazyBackgroundImage } from "../src";

const buildSrcset = (id: number = 1, ratio = 4 / 3) =>
  [
    `https://picsum.photos/id/${id + 1}/360/${Math.round(360 * ratio)} 360w`,
    `https://picsum.photos/id/${id + 1}/1024/${Math.round(1024 * ratio)} 1024w`,
    `https://picsum.photos/id/${id + 1}/1440/${Math.round(1440 * ratio)} 1440w`,
  ].join(", ");

/**
 *  specific div
 */
const singleBackgroundImage = lazyBackgroundImage({
  $element: document.getElementById("single"),
  srcset: buildSrcset(),
});
singleBackgroundImage.start();

/**
 * All div element with data-background-srcset attr
 */
const backgroundImageWithAttr = lazyBackgroundImage();
backgroundImageWithAttr.start();
