const fs = require("fs");
const api = require("./utils/api.js");
const axios = require("axios");
const inquirer = require("inquirer");

const questions = [];

function writeToFile(fileName, data) {}

// the main async function that goes through the repos, and asks specific questions
async function init() {
  try {
    //storing answers from Inquirer as object variable
    const user = await askUser();

    //using Inquirer response to make queryURL
    const queryURL = `https://api.github.com/users/${user.username}`;
    const repoURL = `https://api.github.com/users/${user.username}/repos?per_page=100`;
    //using stored URL's to make API calls using Axios
    const queryResponse = await axios.get(queryURL);
    // console.log(queryResponse.data);

    // store required responses in object
    const userInfo = {
      user: user.username,
      email: queryResponse.data.avatar_url.email,
      profilePic: queryResponse.data.avatar_url,
    };
    // console.log(userInfo);

    // gets the list of repo's associated with user profile and stores in an array
    const repoResponse = await axios.get(repoURL);
    const repoArray = repoResponse.data.map((repo) => repo.name);
    // console.log(repoArray);

    // run the questions1 function and stores response in a checkbox Array for what to include in README
    const answers1 = await askQuestions1(repoArray);
    const checkboxArray = answers1["checkbox-options"];
    console.log(checkboxArray);

    // loops through the selected requirments and pushes to a toPrintArray(commented out currently) | this also ammends the answers1 array with user input for each checkbox
    // const toPrintArray = [];
    for (let i = 0; i < checkboxArray.length; i++) {
      checkboxArray[i] = await askQuestions2(checkboxArray[i]);
    //   toPrintArray.push(checkboxArray[i]);
    }
    console.log(userInfo);
    console.log(answers1);
    // console.log(toPrintArray);
  } catch (err) {
    console.log(err);
  }
}

//initial inquirer function that asks for username
function askUser() {
  return inquirer.prompt({
    message: "Enter your GitHub username",
    name: "username",
  });
}

//   next lot of questions asks what to include in readme
function askQuestions1(repoArray) {
  return inquirer.prompt([
    {
      type: "list",
      message: "Which repo would you like to create a README.md for?",
      name: "repo",
      choices: repoArray,
    },
    {
      type: "input",
      message: "What Would you like the Title to be?",
      name: "title",
    },
    {
      type: "input",
      message: "Add a decription:",
      name: "description",
    },
    {
      type: "checkbox",
      message:
        "Which of the following would you like included in your README.md file?",
      name: "checkbox-options",
      choices: [
        "Table of Contents",
        "Installation",
        "Usage",
        "License",
        "Contributing",
        "Tests",
      ],
    },
  ]);
}

// tailered lot of questions depending on what the user selected to include
function askQuestions2(checkboxArray) {
  if (checkboxArray.includes("Table of Contents")) {
    // checkboxArray.shift();
    return inquirer.prompt([
      {
        type: "input",
        message: `What would you like in your Table of Contents?`,
        name: "Table of Contents",
      },
    ]);
  }
  if (checkboxArray.includes("Installation")) {
    // checkboxArray.shift();
    return inquirer.prompt([
      {
        type: "input",
        message: `What would you like in your Installation?`,
        name: "Installation",
      },
    ]);
  }
  if (checkboxArray.includes("Usage")) {
    // checkboxArray.shift();
    return inquirer.prompt([
      {
        type: "input",
        message: `What would you like in your Usage?`,
        name: "Usage",
      },
    ]);
  }
  if (checkboxArray.includes("License")) {
    // checkboxArray.shift();
    return inquirer.prompt([
      {
        type: "input",
        message: `What would you like in your License?`,
        name: "License",
      },
    ]);
  }
  if (checkboxArray.includes("Contributing")) {
    // checkboxArray.shift();
    return inquirer.prompt([
      {
        type: "input",
        message: `What would you like in your Contributing?`,
        name: "Contributing",
      },
    ]);
  }
  if (checkboxArray.includes("Tests")) {
    // checkboxArray.shift();
    return inquirer.prompt([
      {
        type: "input",
        message: `What would you like in your Tests?`,
        name: "Tests",
      },
    ]);
  }
}

init();
