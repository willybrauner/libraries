module.exports = {
  stories: ["../stories/**/*.stories.tsx"],

  presets: ["@storybook/preset-create-react-app"],

  addons: [
    // waiting update to storybook v6.0
    // https://github.com/tuchk4/storybook-readme/issues/240
    // "storybook-readme",
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false
      }
    },
    {
      name: "@storybook/addon-storysource",
      options: {
        test: /\.stories\.(tsx|jsx)?$/
      }
    }
  ],

  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  }
};
