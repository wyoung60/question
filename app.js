const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeID = 1;
let employeeArray = [];
// let employeeInfo = {};

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const managerQuestions = [
  { message: "What is the manager's name? ", name: "name" },
  { message: "What is the manager's email address? ", name: "email" },
  { message: "What is the manager's office number? ", name: "officeNumber" },
  {
    type: "list",
    message: "Select the appropriate role of the new employee: ",
    name: "role",
    choices: ["Engineer", "Intern", "No more employees to add."],
  },
];

const engineerQuestions = [
  { message: "What is the engineer's name? ", name: "name" },
  { message: "What is the engineer's email address? ", name: "email" },
  { message: "What is the engineer's github username? ", name: "github" },
  {
    type: "list",
    message: "Select the appropriate role of the new employee: ",
    name: "role",
    choices: ["Engineer", "Intern", "No more employees to add."],
  },
];

const internQuestions = [
  { message: "What is the intern's name? ", name: "name" },
  { message: "What is the intern's email address? ", name: "email" },
  { message: "What school does the intern attend? ", name: "school" },
  {
    type: "list",
    message: "Select the appropriate role of the new employee: ",
    name: "role",
    choices: ["Engineer", "Intern", "No more employees to add."],
  },
];

function managerInquire() {
  inquirer.prompt(managerQuestions).then((response) => {
    //I'm tring to create a new object that I can modify without changing the response object
    var employeeInfo = response;
    //Console log before changes
    console.log(response);
    employeeInfo.id = employeeID;
    employeeInfo.role = "Manager";
    //Console log after two changes above.  I thought it should only change my employeeInfo object but for some reason it is also changing my response object.
    //Does it have something to do with being in a promise?
    //I've put a screenshot of the terminal in the images folder.
    console.log(response);
    storeEmployees(employeeInfo);
    switch (response.role) {
      case "Engineer":
        engineerInquire();
        break;
      case "Intern":
        internInquire();
        break;
      default:
        return;
    }
  });
}

function storeEmployees(employee) {
  employeeArray.push(employee);
  employeeID++;
}

function engineerInquire() {
  inquirer.prompt(engineerQuestions).then((response) => {
    employeeInfo = {};
    employeeInfo = response;
    employeeInfo.id = employeeID;
    employeeInfo.role = "Engineer";
    storeEmployees(employeeInfo);
  });
}

managerInquire();

function internInquire() {
  inquirer.prompt(internQuestions).then((response) => {
    employeeInfo = {};
    employeeInfo = response;
    employeeInfo.id = employeeID;
    employeeInfo.role = "Intern";
    storeEmployees(employeeInfo);
  });
}
