"use strict";
let boxstudent = document.querySelector("#box-student");
const template = document.querySelector("#studentTemplate").content;
const urlJson = "https://petlatkea.dk/2019/hogwarts/students.json";

const Poudlard_Student = {
  // properties
  firstName: "-studentFirstName-",
  middleName: "-Unknown-",
  lastName: "-studentLastName-",
  image: "-studentImage-",
  house: "-studentHouse-",
  studentNombre: "-nb-"
};

let newSorcerer = {
  fullName: "Brice Eddy Junior Modeste",
  house: "Gryffindor",
  image: "none",
  middleName: "Eddy Junior",
  firstName: "Brice",
  lastName: "Modeste",
  bloodStatus: "Muggle"
};

let arrayOfStudents = [];
let sortArray = [];
let families = [];
let expelledStudent = [];

let Countstudent = 0;
let expCount = 0;

let allFilter = document.querySelector("#filter_button_all");
let slytherinFilter = document.querySelector("#filter_button_Slytherin");
let gryffindorFilter = document.querySelector("#filter_button_Gryffondor");
let hufflepuffFilter = document.querySelector("#filter_button_Hufflepuff");
let ravenclawFilter = document.querySelector("#filter_button_Ravenclaw");
let sortByFirstNameSlt = document.querySelector("#sort_button_first");
let sortByLastNameSlt = document.querySelector("#sort_button_last");
let Countall = document.querySelector("button#filter_button_all span");
let CountslytherinBtn = document.querySelector(
  "button#filter_button_Slytherin span"
);
let CountgryffindorBtn = document.querySelector(
  "button#filter_button_Gryffondor span"
);
let CounthufflepuffBtn = document.querySelector(
  "button#filter_button_Hufflepuff  span"
);
let CountravenclawBtn = document.querySelector(
  "button#filter_button_Ravenclaw span"
);
let expStudentCounter = document.querySelector("#expelled span");
let inquisitorialCounter = document.querySelector("#inquisitorial span");

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  fetch("https://petlatkea.dk/2019/hogwarts/students.json")
    .then(res => res.json()) // Get the response as a JSON format
    .then(getJSON); // Call the next function
  pushMyself();
  getJsonBlood();
}

function getJSON(studentList) {
  console.log("getJson");

  // splitting
  studentList.forEach(showSingleStudent => {
    let newStudent = Object.create(Poudlard_Student);
    let fullName = showSingleStudent.fullname.split(" ");
    if (fullName[2]) {
      newStudent.firstName = fullName[0];
      newStudent.middleName = fullName[1];
      newStudent.lastName = fullName[2];
    } else {
      newStudent.firstName = fullName[0];
      newStudent.lastName = fullName[1];
    }
    newStudent.house = showSingleStudent.house;
    newStudent.studentNombre = Countstudent++;
    arrayOfStudents.push(newStudent);
    //img seemes to be load on the console
    newStudent.image =
      "images/" +
      newStudent.lastName.toLowerCase() +
      "_" +
      newStudent.firstName.substring(0, 1).toLowerCase() +
      ".png";
    newStudent.bloodStatus = "blood";
  });

  displayStud(arrayOfStudents);
}

// Umbridge to get families blood
function getJsonBlood() {
  fetch("https://petlatkea.dk/2019/hogwarts/families.json")
    .then(res => res.json())
    .then(AddBlood);
}
// attribute the blood not perfect need to fix it if time
function AddBlood(data) {
  data.half.forEach(LastName => {
    const obj = arrayOfStudents.find(elem => elem.lastName === LastName);

    if (obj) {
      obj.bloodStatus = "Half";
    }
  });
  data.pure.forEach(LastName => {
    const obj = arrayOfStudents.find(elem => elem.lastName === LastName);

    if (obj) {
      obj.bloodStatus = "Pure";
    }
  });

  arrayOfStudents.forEach(obj => {
    if (!obj.bloodStatus) {
      obj.bloodStatus = "Muggle";
    }
  });
}

function displayStud(arraystud) {
  boxstudent.innerHTML = "";
  arraystud.forEach(create => {
    // Declare the variable for the copy
    const copy = template.cloneNode(true);
    console.log(create);
    //The cloneNode creates a copy of the node, and returns the clone. The cloneNode() method clones all attributes and their values.
    copy.querySelector("#data-firstName").textContent = create.firstName;

    copy.querySelector("#data-lastName").textContent = create.lastName;
    copy.querySelector("#data-house").textContent = create.house;
    copy.querySelector("#showblood").textContent = create.bloodStatus;

    let hogData = copy.querySelector("#design-data");

    hogData.dataset.studentnb = create.studentNombre;
    let expBtn = copy.querySelector("#delete-button");
    expBtn.dataset.expelnb = create.studentNombre;
    expBtn.addEventListener("click", function() {
      for (let i = arrayOfStudents.length - 1; i >= 0; --i) {
        if (arrayOfStudents[i].studentNombre == create.studentNombre) {
          arrayOfStudents.splice(i, 1);

          expelledStudent.push(create);
          Countstudent--;
          expStudentCounter.textContent = expelledStudent.length;

          CountslytherinBtn.textContent = filterHouse("Slytherin").length;
          CountgryffindorBtn.textContent = filterHouse("Gryffindor").length;
          CounthufflepuffBtn.textContent = filterHouse("Hufflepuff").length;
          CountravenclawBtn.textContent = filterHouse("Ravenclaw").length;
          Countall.textContent = arrayOfStudents.length;
          console.log(arraystud);
        }
      }
      for (let i = arraystud.length - 1; i >= 0; --i) {
        if (arraystud[i].studentNombre == create.studentNombre) {
          arraystud.splice(i, 1);
          console.log(arraystud);
        }
      }
      hogData.style.display = "none";
    });

    boxstudent.appendChild(copy);
    sortArray = arraystud;
  });
}

function pushMyself() {
  arrayOfStudents.push(newSorcerer);
}

// filtering   fixed the select to display !!! IT's WORkiiiiiiiiiiign Alleeeeluiaaa
function filterHouse(House) {
  let houseFiltered = [];

  houseFiltered = arrayOfStudents.filter(flr => flr.house === House);

  return houseFiltered;
}

function loadFilter() {
  allFilter.addEventListener("click", displayAll);
  slytherinFilter.addEventListener("click", filterSlytherin);
  gryffindorFilter.addEventListener("click", filterGryffindor);
  hufflepuffFilter.addEventListener("click", filterHufflepuff);
  ravenclawFilter.addEventListener("click", filterRavenclaw);
}

function displayAll() {
  displayStud(arrayOfStudents);
}

function filterSlytherin() {
  displayStud(filterHouse("Slytherin"));
}
function filterGryffindor() {
  displayStud(filterHouse("Gryffindor"));
}
function filterHufflepuff() {
  displayStud(filterHouse("Hufflepuff"));
}
function filterRavenclaw() {
  displayStud(filterHouse("Ravenclaw"));
}

// TIME to try the sorting ...

// first name sorting
function sortByFirstName() {
  sortArray.sort(byFirstName);
  function byFirstName(a, b) {
    if (a.firstName < b.firstName) {
      return -1;
    } else if (a.firstName > b.firstName) {
      return 1;
    } else {
      return 0;
    }
  }

  displayStud(sortArray);
}

function loadSort() {
  sortByFirstNameSlt.addEventListener("click", sortByFirstName);
  sortByLastNameSlt.addEventListener("click", sortByLastName);
}

// Last name sorting
function sortByLastName() {
  sortArray.sort(byLastName);
  function byLastName(a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  }
  displayStud(sortArray);
}

loadSort();
loadFilter();
