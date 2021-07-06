const { defaults } = require("jest-config");
module.exports = {
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    "js,",
    "jsx",
    "ts",
    "tsx",
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "packages"],
  testEnvironment: "jsdom",
  coverageProvider: "babel",
};
