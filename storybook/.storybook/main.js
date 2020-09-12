module.exports = {
  stories: ["../stories/**/*.stories.tsx"],

  presets: ["@storybook/preset-create-react-app"],

  addons: [
    // {
    //   name: "storybook-readme"
    // },
    {
      name: "@storybook/addon-essentials",
      options: {
        background: true
      }
    },
    {
      name: "@storybook/addon-storysource",
      options: {
        test: /\.stories\.(tsx|jsx)?$/
        // loaderOptions: {
        //   prettierConfig: { printWidth: 80, singleQuote: false }
        // }
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
