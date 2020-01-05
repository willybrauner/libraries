import { addParameters, addDecorator, configure } from "@storybook/react";
import theme from "./theme";
// @ts-ignore
import { addReadme } from "storybook-readme";

addDecorator(addReadme);

addParameters({
  options: {
    /**
     * Load theme
     */
    theme,

    /**
     * show story component as full screen
     * @type {Boolean}
     */
    isFullScreen: false,
    /**
     * display panel that shows a list of stories
     * @type {Boolean}
     */
    showNav: true,
    /**
     * display panel that shows addon configurations
     * @type {Boolean}
     */
    showPanel: true,
    /**
     * where to show the addon panel
     * @type {('bottom'|'right')}
     */
    panelPosition: "right",
    /**
     * sorts stories
     * @type {Boolean}
     */
    sortStoriesByKind: false,
    /**
     * sidebar tree animations
     * @type {Boolean}
     */
    sidebarAnimations: true,
    /**
     * enable/disable shortcuts
     * @type {Boolean}
     */
    enableShortcuts: true,
    /**
     * show/hide tool bar
     * @type {Boolean}
     */
    isToolshown: true
  }
});

// @ts-ignore
configure(
  require.context("../stories", true, /\.stories\.(tsx|jsx)?$/),
  module
);
