module.exports = ({ config }) => {
  /**
   * Typescript
   */

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [["react-app", { flow: false, typescript: true }]]
    }
  });
  config.resolve.extensions.push(".ts", ".tsx");

  /**
   * Sources
   */
  config.module.rules.push({
    test: /\.stories\.(tsx|jsx)?$/,
    loaders: [require.resolve("@storybook/source-loader")],
    enforce: "pre"
  });

  return config;
};
