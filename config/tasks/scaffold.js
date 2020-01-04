const Inquirer = require("inquirer");
const path = require("path");
const paths = require("../paths");
const config = require("../config");
const { Files } = require("@zouloux/files");
const changeCase = require("change-case");
const { QuickTemplate } = require("../helpers/helper-template");
// Some colors in the terminal @see : https://github.com/marak/colors.js/
require("colors");
const log = require("debug");

// ----------------------------------------------------------------------------- LOGS

/**
 * Show a success message
 * @param pMessage Message to show
 */
const showSuccess = pMessage => {
  console.log(`→ ${pMessage}\n`.cyan);
};

/**
 * Show set of instructions and examples
 * @param pInstructions instructions list
 * @param pExamples examples list, optional
 */
const showInstructions = (pInstructions, pExamples) => {
  console.log("Read carefully:".yellow.bold);

  // Show instructions
  pInstructions.map((instruction, i) => {
    console.log(`${i + 1}. ${instruction}`.yellow);
  });

  // Show examples
  pExamples &&
    pExamples.map((example, i) => {
      i === 0 && console.log("");
      console.log(`${example}`.yellow);
    });

  console.log("");
};

// ----------------------------------------------------------------------------- COMMON TASKS

/**
 * Ask for the component folder
 */
const askWhichComponentFolder = () => {
  return Inquirer.prompt({
    type: "list",
    name: "subFolder",
    message: "Which component folder?",
    choices: config.moduleFolders
  });
};

/**
 * Ask for the component name
 */
const askComponentName = () => {
  return Inquirer.prompt({
    type: "input",
    message: "module name? (classCase)",
    name: "moduleName"
  });
};

/**
 * Ask question and scaffold a component with a specific script template
 * @returns {Promise<any>}
 */
const componentScaffolder = () =>
  new Promise(async resolve => {
    // Static sub-folder for pages

    let subFolder = "";
    // Get sub-folder for components
    await askWhichComponentFolder().then(answer => {
      subFolder = answer.subFolder;
    });

    // Get component name
    let moduleName = "";
    await askComponentName().then(answer => {
      moduleName = answer.moduleName;
    });

    // component name "ComponentName" for subfolder and component
    let lowerModuleName = changeCase.paramCase(moduleName);

    // Base path of the component (no extension here)
    let componentPath = `${paths.root}/${subFolder}/${lowerModuleName}/`;

    // TODO copy folder

    // // Check if component already exists
    // if (Files.getFiles(`${componentPath}.js`).files.length > 0) {
    //   console.log(`This component already exists. Aborting.`.red.bold);
    //   return;
    // }

    console.log(componentPath);

    // Done
    showSuccess("Module created!");
    resolve();
  });

// ----------------------------------------------------------------------------- SCAFFOLDERS

const scaffolders = [
  {
    name: "Module",
    exec: () => componentScaffolder()
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
