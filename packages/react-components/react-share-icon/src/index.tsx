/**
 * TODO
 *  - Fixer les imports
 *  - Mettre les bonnes dépendances dans le package.json
 */

import css from "./ReactShareIcon.module.less";
import React, {useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import { merge } from "../../common/lib/helpers/classNameHelper";
import { prepare } from "../../common/helpers/prepare";

/**
 * Targeted social media.
 */
export enum ESocialMediaName {
  FACEBOOK = "facebook",
  TWITTER = "twitter"
}

/**
 * Props
 */
interface IProps {
  classNames?: string[];

  // Selected social media
  target?: ESocialMediaName;

  // Override default icon
  customIcon?: any | null;

  // Target link
  targetLink?: string;

  // Share text for Twitter
  // Facebook wants input from the user itself
  twitterShareText?: string;

  // Share pop up width
  popUpWidth?: number;

  // Share pop up height
  popUpHeight?: number;
}

/**
 * Default props
 */
ReactShareIcon.defaultProps = {
  target: ESocialMediaName.FACEBOOK,
  customIcon: null,
  targetLink: "",
  shareText: "",
  popUpWidth: null,
  popUpHeight: null
};

// prepare
const { componentName, log } = prepare("ReactShareIcon");

/**
 * @name ReactShareIcon
 */
function ReactShareIcon(props: IProps) {
  // --------------------------------------------------------------------------- DECLARATIONS

  // Component root ref
  const rootRef = useRef(null);

  // --------------------------------------------------------------------------- DECLARATIONS

  // Default SVG for Facebook Icon
  const defaultFacebookIconSVG = (
      <svg
          viewBox="0 0 155.139 155.139"
          className={merge([css.Root, props.classNames])}
          ref={rootRef}
          onClick={rootClickHandler}
      >
        <path
            d="M89.584,155.139V84.378h23.742l3.562-27.585H89.584V39.184
		c0-7.984,2.208-13.425,13.67-13.425l14.595-0.006V1.08C115.325,0.752,106.661,0,96.577,0C75.52,0,61.104,12.853,61.104,36.452
		v20.341H37.29v27.585h23.814v70.761H89.584z"
        />
      </svg>
  );

  // Default SVG for Twitter Icon
  const defaultTwitterIconSVG = (
      <svg
          viewBox="0 0 512 512"
          className={merge([css.Root, props.classNames])}
          ref={rootRef}
          onClick={rootClickHandler}
      >
        <path
            d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016
			c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992
			c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056
			c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152
			c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792
			c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44
			C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568
			C480.224,136.96,497.728,118.496,512,97.248z"
        />
      </svg>
  );

  // Social popups data
  const socialPopups = {
    facebook: {
      url: `https://www.facebook.com/sharer/sharer.php?display=popup&u=${props?.targetLink}`,
      width: props?.popUpWidth || 626,
      height: props?.popUpHeight || 436
    },
    twitter: {
      url: `https://twitter.com/intent/tweet?text=${
          props?.twitterShareText ? props?.twitterShareText : ""
      }%20${props?.targetLink}`,
      width: props?.popUpWidth || 626,
      height: props?.popUpHeight || 250
    }
  };

  // --------------------------------------------------------------------------- HANDLERS

  /**
   * Icon click handler.
   * Opens the popup.
   */
  function rootClickHandler() {
    // Set options
    const options = `toolbar=0,status=0,resizable=1,width=${
        socialPopups[props?.target].width
    },height=${socialPopups[props?.target].height}`;
    // Open popin
    window.open(socialPopups[props?.target].url, "sharer", options);
  }

  // --------------------------------------------------------------------------- PREPARE

  /**
   * If a custom icon is set, modify the initially rendered svg.
   */
  useEffect(() => {
    if(props?.customIcon) {
      // Set viewbox
      rootRef.current.setAttribute("viewBox", props?.customIcon?.props?.viewBox);
      // Set inner
      ReactDOM.render(props?.customIcon?.props?.children, rootRef.current);
    }
  }, []);

  // --------------------------------------------------------------------------- RENDER

  return props?.target === ESocialMediaName.FACEBOOK ? defaultFacebookIconSVG : defaultTwitterIconSVG;
}

export {ReactShareIcon as default};
