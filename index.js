const fs = require("fs");
const api = require("./utils/api.js");
const axios = require("axios");
const inquirer = require("inquirer");

//inquirer function
function askUser() {
  return inquirer.prompt({
    message: "Enter your GitHub username",
    name: "username",
  });
}

const questions = [];

function writeToFile(fileName, data) {}

async function init() {
  try {
    //storing answers from Inquirer as object variable
    const user = await askUser();

    //using Inquirer response to make queryURL
    const queryURL = `https://api.github.com/users/${user.username}`;

    //using stored QueryURLs to make API calls using Axios
    const response = await axios.get(queryURL);

    console.log(response.data);

    // store required responses in object
    const userInfo = {
      user: user.username,
      email: response.data.avatar_url.email,
      profilePic: response.data.avatar_url,
    };
    console.log(userInfo);

    // run the questions function ----- can run another await like (var something = await askQuestions();)
    askQuestions(userInfo);
  } catch (err) {
    console.log(err);
  }
}

function askQuestions(userInfo){
    console.log(userInfo);
}

init();
