// Variable Declarations 
const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout")

let workoutType = null;
let shouldNavigateAway = false;


async function initExercise() {
  let workout;

  // if there is no there is no pre existing workout 
  if (location.search.split("=")[1] === undefined) {
    // workout variable will equal the async function named createWorkout located in api.js file 
    workout = await API.createWorkout()
    // console out the workout variable 
    console.log(workout)
  }
  if (workout) {
    // if there is already is a pre existing workout, search by its id
    location.search = "?id=" + workout._id;
  }

}
// calling the initExercise function 
initExercise();


// function to display the3 right form depending on what type of exercise the user chooses
function handleWorkoutTypeChange(event) {
  // workoutType variable is equal to the value of the exercise type the user chooses
  workoutType = event.target.value;

  // if user chooses cardio 
  if (workoutType === "cardio") {
    //display the cardio form
    cardioForm.classList.remove("d-none");
    // hide the resistance form 
    resistanceForm.classList.add("d-none");

    // if user chooses resistance 
  } else if (workoutType === "resistance") {
    // display the resistance form 
    resistanceForm.classList.remove("d-none");
    // hide the cardio form 
    cardioForm.classList.add("d-none");

    // if user hasn't chosen any type, keep both hiding 
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }

  // call validateInputs function 
  validateInputs();
}

// function for validation of resistance/cardio forms
function validateInputs() {
  // setting the isValid variable to true 
  let isValid = true;

  // if the user chooses resistance 
  if (workoutType === "resistance") {

    // if the name input of exercise form is left blank 
    if (nameInput.value.trim() === "") {
      // set isValid to false 
      isValid = false;
    }

    // if the weight input of exercise form is left blank 
    if (weightInput.value.trim() === "") {
       // set isValid to false 
      isValid = false;
    }

    // if the sets input of the exercise form is left blank 
    if (setsInput.value.trim() === "") {
       // set isValid to false 
      isValid = false;
    }

    // if the reps input of the exercise form is left blank 
    if (repsInput.value.trim() === "") {
       // set isValid to false 
      isValid = false;
    }

    // if the resistance input of the exercise form is left blank 
    if (resistanceDurationInput.value.trim() === "") {
       // set isValid to false 
      isValid = false;
    }

    // if the user chooses resistance 
  } else if (workoutType === "cardio") {

    // if the name input of the exercise form is left blank 
    if (cardioNameInput.value.trim() === "") {
       // set isValid to false 
      isValid = false;
    }

    // if the duration input of the exercise form is left blank 
    if (durationInput.value.trim() === "") {
       // set isValid to false 
      isValid = false;
    }

    // if the distance input of the exercise form is left blank 
    if (distanceInput.value.trim() === "") {
       // set isValid to false 
      isValid = false;
    }
  }

  // if isValid is true 
  if (isValid) {
    // enable the complete and add exercise button 
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");

    // if isValid is false 
  } else {
        // disable the complete and add exercise button 
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

// function to create a new workout based off user input 
async function handleFormSubmit(event) {
  event.preventDefault();

  // an empty object to store all values of the new workout created 
  let workoutData = {};

  // if the workoutType chosen is cardio , the following values will be stores into workoutData 
  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim()); // Number is turning the string inputted into an integer 
    workoutData.duration = Number(durationInput.value.trim());
  } 
  

  // if the workoutType chosen is resistance , the following values will be stores into workoutData 
  else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }

  // call the addExercise function with workoutData passed into the functions 
  await API.addExercise(workoutData);
  // call the clear inputs function 
  clearInputs();
  // adding a class to the variable called 'success'
  toast.classList.add("success");
}

// function to display to user that the workout was successfully got added to db
function handleToastAnimationEnd() {
  // remove any class on the toast variable 
  toast.removeAttribute("class");
  // if shouldNavigate is true , go back to home page
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

// function to clear out forms, to allow for new inputs 
function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}

// if workoutTypeSelect is true 
if (workoutTypeSelect) {
  // add an eventListener and use handleWorkoutTypeChange as a callback function
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}

// if completeButton is true 
if (completeButton) {
  // add an eventListener 
  completeButton.addEventListener("click", function (event) {
    // assign shouldNavigateAway variable to true 
    shouldNavigateAway = true;
    // call handleSubmitForm with event from eventListener passed through
    handleFormSubmit(event);
  });
}

// if addButton is true 
if (addButton) {
  // add an eventListener and run handleFormSubmit as a callback function
  addButton.addEventListener("click", handleFormSubmit);
}

// add an eventListener to toast variable and use handleToastAnimationEnd as a callback function
toast.addEventListener("animationend", handleToastAnimationEnd);


document
  .querySelectorAll("input")
  // adding an eventListener for the entire document and using validateInputs as a callback function for each value inputted by user 
  .forEach(element => element.addEventListener("input", validateInputs));
