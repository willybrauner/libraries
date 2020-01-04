module.exports = ({ config }) => {
  /**
   * Resolve extensions
   */
  config.resolve.extensions.push(".js", ".jsx", ".ts", ".tsx");

  /**
   * Typescript
   */
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    use: [
      {
        loader: require.resolve("awesome-typescript-loader")
      },
      {
        loader: require.resolve("react-docgen-typescript-loader")
      }
    ]
  });

  /**
   * Sources
   */
  config.module.rules.push({
    test: /\.stories\.(jsx|js)?$/,
    loaders: [require.resolve("@storybook/source-loader")],
    enforce: "pre"
  });

  return config;
};
