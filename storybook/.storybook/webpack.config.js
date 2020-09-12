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
   * Markdown
   */
  config.module.rules.push({
    test: /\.md$/,
    use: [
      {
        loader: "markdown-loader"
      }
    ]
  });

  return config;
};
