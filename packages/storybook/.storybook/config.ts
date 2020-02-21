// @ts-ignore
import { addReadme } from "storybook-readme";
// add readme
addDecorator(addReadme);
import { addParameters, addDecorator, configure } from "@storybook/react";
import { create } from "@storybook/theming";

addParameters({
  options: {
    /**
     * Load theme
     */
    theme: create({
      base: "light",
      brandTitle: "@wbe/libraries",
      brandUrl: null,
      brandImage: null
    }),

    /**
     * Readme addon config
     */
    readme: {
      //codeTheme: 'darcula',
      codeTheme: "github"
    },

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

configure(
  // @ts-ignore
  require.context("../stories", true, /\.stories\.(tsx|jsx)?$/),
  module
);
