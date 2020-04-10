function generateMarkdown(data) {
  const optionsArray = data.answers1.checkboxoptions;

  // converts optionsArray to optionsObj - array into an object to use
  let optionsObj = {};
  optionsArray.forEach((element) => {
    console.log(element);
    Object.assign(optionsObj, element);
  });

  // console.log(data);
  // console.log(optionsObj);

  // sets all the variables that will be diplayed in the markdown file
  const user = data.user;
  const repo = data.answers1.repo
  const email = data.email;
  const profilePic = data.profilePic;
  const title = data.answers1.Title;
  const description = data.answers1.Description;
  const tocHeading = checkUndefinedHeading(
    optionsObj,
    optionsObj["Table of Contents"]
  );
  const toc = checkUndefined(optionsObj["Table of Contents"]);
  const installationHeading = checkUndefinedHeading(
    optionsObj,
    optionsObj.Installation
  );
  const installation = checkUndefined(optionsObj.Installation);
  const usageHeading = checkUndefinedHeading(optionsObj, optionsObj.Usage);
  const usage = checkUndefined(optionsObj.Usage);
  const lisenceHeading = checkUndefinedHeading(optionsObj, optionsObj.License);
  const lisence = checkUndefined(optionsObj.License);
  const contributingHeading = checkUndefinedHeading(
    optionsObj,
    optionsObj.Contributing
  );
  const contributing = checkUndefined(optionsObj.Contributing);
  const testsHeading = checkUndefinedHeading(optionsObj, optionsObj.Tests);
  const tests = checkUndefined(optionsObj.Tests);
  const questionsHeading = checkUndefinedHeading(
    optionsObj,
    optionsObj.Questions
  );
  const questions = checkUndefined(optionsObj.Questions);

  return `
# ${title}  
![GitHub last commit](https://img.shields.io/github/last-commit/${user}/${repo})
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/${user}/${repo})
![GitHub repo size](https://img.shields.io/github/repo-size/${user}/${repo})
![GitHub top language](https://img.shields.io/github/languages/top/${user}/${repo})  
${description}
${tocHeading} 
${toc}
${installationHeading}
${installation}
${usageHeading}
${usage}
${lisenceHeading}
${lisence}
${contributingHeading}
${contributing}
${testsHeading}
${tests}
${questionsHeading}
${questions}
### Click on profile picture below to see ${user}'s Github profile
[![${user}'s Profile Picture](${profilePic}&s=200 "Created by ${user}")](https://github.com/${user})  
![GitHub followers](https://img.shields.io/github/followers/${user}?style=social)  
${email}
`;

  // run a function that checks if optionsObj is undefined. If not then sets the heading variable as the key
  function checkUndefinedHeading(optionsObj, value) {
    if (JSON.stringify(value) === undefined) {
      return "";
    } else {
      return (
        "## " +
        Object.keys(optionsObj)[Object.values(optionsObj).indexOf(value)]
      );
    }
  }
  // run a function that checks if value is undefined. If not then sets the variable as the value
  function checkUndefined(value) {
    if (JSON.stringify(value) === undefined) {
      return "";
    } else {
      return value;
    }
  }
}

module.exports = generateMarkdown;
