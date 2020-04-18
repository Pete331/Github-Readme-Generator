function generateMarkdown(data) {
  // console.log(data);

  // sets all the variables that will be displayed in the markdown file
  const user = data.user;
  const repo = data.answers1.repo;
  const email = checkEmail(data.email);
  const profilePic = data.profilePic;
  // stores a boolean variable - if table of contents is selected or not
  const tocInclude = data.answers1.checkboxoptions.includes(
    "Table of Contents"
  );

  const title = data.answers1.Title;
  const description = data.answers1.Description;
  const installationHeading = checkUndefinedHeading(
    data.answers1,
    data.answers1.Installation
  );
  const installation = checkUndefined(data.answers1.Installation);
  const usageHeading = checkUndefinedHeading(
    data.answers1,
    data.answers1.Usage
  );
  const usage = checkUndefined(data.answers1.Usage);
  const lisenceHeading = checkUndefinedHeading(
    data.answers1,
    data.answers1.License
  );
  const lisence = checkUndefined(data.answers1.License);
  const contributingHeading = checkUndefinedHeading(
    data.answers1,
    data.answers1.Contributing
  );
  const contributing = checkUndefined(data.answers1.Contributing);
  const testsHeading = checkUndefinedHeading(
    data.answers1,
    data.answers1.Tests
  );
  const tests = checkUndefined(data.answers1.Tests);
  const questionsHeading = checkUndefinedHeading(
    data.answers1,
    data.answers1.Questions
  );
  const questions = checkUndefined(data.answers1.Questions);
  const tocHeading = tocCheck(tocInclude);

  return `
# ${title}
${description}  
![GitHub last commit](https://img.shields.io/github/last-commit/${user}/${repo})
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/${user}/${repo})
![GitHub repo size](https://img.shields.io/github/repo-size/${user}/${repo})
![GitHub top language](https://img.shields.io/github/languages/top/${user}/${repo})  
## ${tocHeading}
${toc}
## ${installationHeading.substring(2)}
${installation}
## ${usageHeading.substring(2)}
${usage}
## ${lisenceHeading.substring(2)}
${lisence}
## ${contributingHeading.substring(2)}
${contributing}
## ${testsHeading.substring(2)}
${tests}
## ${questionsHeading.substring(2)}
${questions}
### Click on profile picture below to see ${user}'s Github profile
[![${user}'s Profile Picture](${profilePic}&s=200 "Created by ${user}")](https://github.com/${user})  
![GitHub followers](https://img.shields.io/github/followers/${user}?style=social)  
${email}
`;

  // run a function that checks if key is undefined. If not then sets the heading variable as the key
  // a bullet is added to the heading so that the contents page is formatted correctly - the first 2 characters are removed from the headings above so they don't have the bullets
  function checkUndefinedHeading(key, value) {
    if (JSON.stringify(value) === undefined) {
      return "";
    } else {
      return "- " + Object.keys(key)[Object.values(key).indexOf(value)];
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

  // checks if table of contents was selected or not and returns string for heading if so and also creates table of contents variable if required
  function tocCheck(value) {
    toc = "";
    if (value) {
      toc = `${installationHeading}
${usageHeading}
${lisenceHeading}
${contributingHeading}
${testsHeading}
${questionsHeading}`;
      return "Table of Contents";
    } else {
      return "";
    }
  }
  // checks to see if email is returned from Github and if null shows nothing rather than null
  function checkEmail(email) {
    if (email === "null");
    return "";
  }
}

module.exports = generateMarkdown;
