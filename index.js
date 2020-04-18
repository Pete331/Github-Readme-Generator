const fs = require("fs");
const questionsForReadme = require("./utils/questionsForReadme.js");
const generateMarkdown = require("./utils/generateMarkdown.js");
const axios = require("axios");
const inquirer = require("inquirer");

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

    // gets the list of repo's associated with user profile and stores in an array
    const repoResponse = await axios.get(repoURL);
    const repoArray = repoResponse.data.map((repo) => repo.name);
    // console.log(repoArray);

    // run the questionsForReadme function and stores response in an answers1 variable
    const answers1 = await questionsForReadme(repoArray);
    // console.log(answers1);

    // store required responses in object
    const userInfo = {
      user: user.username,
      email: queryResponse.data.avatar_url.email,
      profilePic: queryResponse.data.avatar_url,
      answers1,
    };

    // creates directory to save README.md file in
    fs.mkdir(`./${user.username}(${answers1.repo})`, function (err) {
      if (err) {
        console.log("You have a directory with the same name already, you have just overwritten the directory");
      }
    });
    // creates README.md file
    fs.writeFile(
      `./${user.username}(${answers1.repo})/README.md`,
      generateMarkdown(userInfo),
      function (err) {
        if (err) {
          console.log("You have a filename with the same name already, you have just overwritten the README.md file")
        }
        console.log("you have saved the README.md :)");
      }
    );

    // generateMarkdown(userInfo);
  } catch (err) {
    console.log(err);
  }
}

//initial inquirer function that asks for github username
function askUser() {
  return inquirer.prompt({
    message: "Enter your GitHub username",
    name: "username",
  });
}

init();
