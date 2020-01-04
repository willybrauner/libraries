const Inquirer = require("inquirer");
const path = require("path");
const paths = require("../paths");
const config = require("../config");
const { Files } = require("@zouloux/files");
const changeCase = require("change-case");
const { QuickTemplate } = require("../helpers/helper-template");
// Some colors in the terminal @see : https://github.com/marak/colors.js/
require("colors");
const log = require("debug")(
  `${require("../../package.json").name}:config:scaffold`
);

// ----------------------------------------------------------------------------- LOGS

/**
 * Show a success message
 * @param pMessage Message to show
 */
const showSuccess = pMessage => {
  console.log(`→ ${pMessage}\n`.cyan);
};

// ----------------------------------------------------------------------------- COMMON TASKS

/**
 * Ask for the module folder
 */
const _askFolder = (pFolder = config.moduleFolders) => {
  return Inquirer.prompt({
    type: "list",
    name: "subFolder",
    message: "Which folder?",
    choices: pFolder
  });
};

/**
 * Ask for the name
 */
const _askName = (pType = "module") => {
  return Inquirer.prompt({
    type: "input",
    message: `${pType} name?`,
    name: "moduleName"
  });
};

/**
 * Ask question and scaffold a component with a specific script template
 * @returns {Promise<any>}
 */
const moduleScaffolder = () =>
  new Promise(async resolve => {
    // Static sub-folder for pages

    let subFolder = "";
    // Get sub-folder for components
    await _askFolder().then(answer => {
      subFolder = answer.subFolder;
    });

    // Get component name
    let moduleName = "";
    await _askName().then(answer => {
      moduleName = answer.moduleName;
    });

    // component name "ComponentName" for subfolder and component
    let dashCaseModuleName = changeCase.paramCase(moduleName);
    let camelCaseModuleName = changeCase.camelCase(moduleName);

    // Base path of the component (no extension here)
    let modulePath = `${paths.root}/${subFolder}/${dashCaseModuleName}`;

    // Check if component already exists
    if (Files.getFiles(`${modulePath}`).files.length > 0) {
      console.log(`This module already exists. Aborting.`.red.bold);
      return;
    }

    /**
     * Create File with template
     * @param filePath
     * @param templatePath: path/to/template/
     * @param fileName ex: index
     * @param extension ex: ".ts"
     * @param replaceExpressions Expressions list to replace
     */
    const createFile = ({
      filePath = `${modulePath}/`,
      templatePath = `${paths.skeletonsPath}`,
      fileName = "",
      extension = "",
      replaceExpressions = {
        dashCaseModuleName,
        camelCaseModuleName
      }
    }) => {
      // get new file path
      const newFilePath = `${filePath}${fileName}${extension}`;
      // get template path
      const templateFilePath = `${templatePath}${fileName}${extension}.template`;
      // log them
      log({ newFilePath, templateFilePath });
      // create file with template
      Files.new(newFilePath).write(
        QuickTemplate(
          Files.getFiles(templateFilePath).read(),
          replaceExpressions
        )
      );
    };

    // create index
    createFile({
      filePath: `${modulePath}/src/`,
      templatePath: `${paths.skeletonsPath}/module/src/`,
      fileName: "index",
      extension: subFolder.includes("react") ? ".tsx" : ".ts"
    });
    // create gitignore
    createFile({
      templatePath: `${paths.skeletonsPath}/module/`,
      fileName: ".gitignore"
    });
    // create npmignore
    createFile({
      templatePath: `${paths.skeletonsPath}/module/`,
      fileName: ".npmignore"
    });
    // create package.json
    createFile({
      templatePath: `${paths.skeletonsPath}/module/`,
      fileName: "package",
      extension: ".json"
    });
    // create readme
    createFile({
      templatePath: `${paths.skeletonsPath}/module/`,
      fileName: "README",
      extension: ".md"
    });
    // create tsconfig
    createFile({
      templatePath: `${paths.skeletonsPath}/module/`,
      fileName: "tsconfig",
      extension: ".json"
    });

    // Done
    showSuccess("Module created!");
    resolve();
  });

// ----------------------------------------------------------------------------- SCAFFOLDERS

const scaffolders = [
  {
    name: "Module",
    exec: () => moduleScaffolder()
  }
];

// ----------------------------------------------------------------------------- PUBLIC API
const scaffold = () =>
  new Promise(resolve => {
    // Get scaffolder to present listing to user
    let scaffolderTypes = scaffolders.map(scaffolder => scaffolder.name);

    // List available scaffolders to user
    Inquirer.prompt({
      type: "list",
      name: "type",
      message: "What kind of module to create?",
      choices: scaffolderTypes,
      pageSize: 20
    }).then(answer => {
      // Get scaffolder index
      const scaffolderIndex = scaffolderTypes.indexOf(answer.type);

      // Start this scaffolder
      scaffolders[scaffolderIndex].exec();
    });
  });

module.exports = scaffold();
