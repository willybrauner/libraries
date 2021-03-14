module.exports = {
  stories: ["../../packages/**/**/stories/*.stories.tsx"],

  presets: ["@storybook/preset-create-react-app"],

  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
      },
    },
    {
      name: "@storybook/addon-storysource",
      options: {
        test: /\.stories\.(tsx|jsx)?$/,
      },
    },
  ],

  typescript: {
    check: false,
    checkOptions: {
      isolatedModules: false,
    },
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};
