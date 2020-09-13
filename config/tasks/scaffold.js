const Inquirer = require("inquirer");
const path = require("path");
const paths = require("../paths");
const config = require("../config");
const { Files } = require("@zouloux/files");
const changeCase = require("change-case");
const { QuickTemplate } = require("../helpers/helper-template");
require("colors");
const debug = require("debug")(`config:scaffold`);

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

const _askDescription = (pType = "module") => {
  return Inquirer.prompt({
    type: "input",
    message: `${pType} description?`,
    name: "moduleDescription"
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

    // Get component name
    let moduleDescription = "";
    await _askDescription().then(answer => {
      moduleDescription = answer.moduleDescription;
    });

    // component name "ComponentName" for subfolder and component
    let dashCaseModuleName = changeCase.paramCase(moduleName);
    let camelCaseModuleName = changeCase.camelCase(moduleName);
    let pascalCaseModuleName = changeCase.pascalCase(moduleName);

    // Base path of the component (no extension here)
    let modulePath = `${paths.packagesPath}/${subFolder}/${dashCaseModuleName}`;

    // Check if component already exists
    if (Files.getFiles(`${modulePath}`).files.length > 0) {
      console.log(`This module already exists. Aborting.`.red.bold);
      return;
    }

    /**
     * Create File with template
     * @param filePath
     * @param templatePath: path/to/template/
     * @param templateFileName ex: index
     * @param outputFileName ex: index
     * @param extension ex: ".ts"
     * @param replaceExpressions Expressions list to replace
     */
    const createFile = ({
      filePath = `${modulePath}/`,
      templatePath = `${paths.skeletonsPath}`,
      templateFileName = "",
      outputFileName = "",
      extension = "",
      replaceExpressions = {
        dashCaseModuleName,
        camelCaseModuleName,
        pascalCaseModuleName,
        subFolder,
        moduleDescription
      }
    }) => {
      // get new file path
      const newFilePath = `${filePath}${outputFileName}${extension}`;
      // get template path
      const templateFilePath = `${templatePath}${templateFileName}${extension}.template`;
      // log them
      debug({ newFilePath, templateFilePath });
      //create file with template
      Files.new(newFilePath).write(
        QuickTemplate(
          Files.getFiles(templateFilePath).read(),
          replaceExpressions
        )
      );
    };

    // create src/ index.ts
    createFile({
      filePath: `${modulePath}/src/`,
      templatePath: `${paths.skeletonsPath}/module/src/`,
      templateFileName: "index",
      outputFileName: "index",
      extension: ".ts"
    });

    // create src/ module.ts
    createFile({
      filePath: `${modulePath}/src/`,
      templatePath: `${paths.skeletonsPath}/module/src/`,
      templateFileName: "{module}",
      outputFileName: pascalCaseModuleName,
      extension: ".ts"
    });

    // create stories/{module}.stories.tsx file
    createFile({
      filePath: `${modulePath}/stories/`,
      templatePath: `${paths.skeletonsPath}/module/stories/`,
      templateFileName: "{module}.stories",
      outputFileName: `${pascalCaseModuleName}.stories`,
      extension: ".tsx"
    });

    // create test/{module}.test.ts file
    createFile({
      filePath: `${modulePath}/test/`,
      templatePath: `${paths.skeletonsPath}/module/test/`,
      templateFileName: "{module}.test",
      outputFileName: `${pascalCaseModuleName}.test`,
      extension: ".ts"
    });

    // ----------------------------- files

    // create gitignore
    createFile({
      templatePath: `${paths.skeletonsPath}/module/`,
      templateFileName: ".gitignore",
      outputFileName: ".gitignore"
    });
    // create npmignore
    createFile({
      templatePath: `${paths.skeletonsPath}/module/`,
      templateFileName: ".npmignore",
      outputFileName: ".npmignore"
    });
    // create package.json
    createFile({
      templatePath: `${paths.skeletonsPath}/module/`,
      templateFileName: "package",
      outputFileName: "package",
      extension: ".json"
    });
    // create readme
    createFile({
      templatePath: `${paths.skeletonsPath}/module/`,
      templateFileName: "README",
      outputFileName: "README",
      extension: ".md"
    });
    // create tsconfig
    createFile({
      templatePath: `${paths.skeletonsPath}/module/`,
      templateFileName: "tsconfig",
      outputFileName: "tsconfig",
      extension: ".json"
    });
    // create .babelrc
    createFile({
      templatePath: `${paths.skeletonsPath}/module/`,
      templateFileName: ".babelrc",
      outputFileName: ".babelrc",
      extension: ""
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
