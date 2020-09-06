const { defaults } = require("jest-config");
module.exports = {
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    "js,",
    "jsx",
    "ts",
    "tsx"
  ],
  moduleDirectories: ["node_modules", "packages"]
};