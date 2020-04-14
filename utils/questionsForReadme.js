const inquirer = require("inquirer");

//   next lot of questions asks what to include in readme
function questionsForReadme(repoArray) {
  return inquirer.prompt([
    {
      type: "list",
      message: "Which repo would you like to create a README.md for?",
      name: "repo",
      choices: repoArray,
    },
    {
      type: "input",
      message:
        "What Would you like the Title to be? (leave blank to use repo name)",
      name: "Title",
      default: function (answers) {
        return answers.repo;
      },
    },
    {
      type: "input",
      message: "Add a decription:",
      name: "Description",
    },
    {
      type: "checkbox",
      message:
        "Which of the following would you like included in your README.md file?",
      name: "checkboxoptions",
      choices: [
        "Table of Contents",
        "Installation",
        "Usage",
        "License",
        "Contributing",
        "Tests",
        "Questions",
      ],
    },
    {
      type: "input",
      message: `What would you like in your Installation?`,
      name: "Installation",
      when: function (answers) {
        return answers.checkboxoptions.includes("Installation");
      },
    },
    {
      type: "input",
      message: `What would you like in your Usage?`,
      name: "Usage",
      when: function (answers) {
        return answers.checkboxoptions.includes("Usage");
      },
    },
    {
      type: "input",
      message: `What would you like in your License?`,
      name: "License",
      when: function (answers) {
        return answers.checkboxoptions.includes("License");
      },
    },
    {
      type: "input",
      message: `What would you like in your Contributing?`,
      name: "Contributing",
      when: function (answers) {
        return answers.checkboxoptions.includes("Contributing");
      },
    },
    {
      type: "input",
      message: `What would you like in your Tests?`,
      name: "Tests",
      when: function (answers) {
        return answers.checkboxoptions.includes("Tests");
      },
    },
    {
      type: "input",
      message: `What would you like in your Questions?`,
      name: "Questions",
      when: function (answers) {
        return answers.checkboxoptions.includes("Questions");
      },
    },
  ]);
}

module.exports = questionsForReadme;
