// Global bindings
const inputs = document.querySelectorAll('input[type="text"]');
const form = document.querySelector('.validation-form');
const monthInput = document.querySelector('input[name="MM"]');
const dayInput = document.querySelector('input[name="DD"]');
const yearInput = document.querySelector('input[name="YYYY"]');
let month, day, year;

/**
 * Prevent letters from being entered in input fields
 * @param {object} e
 */
function replaceLettersWithNumbers(e) {
  return (e.target.value = e.target.value
    .replace(/[^0-9.]/g, '')
    .replace(/(\..*)\./g, '$1'));
}

/**
 * @param {object} input
 * @param {string} color
 * @returns
 */
function changeInputBorderColor(input, color) {
  return (input.style.border = `1px solid ${color}`);
}

/**
 * Validate month, day and year as user types in fields
 */
function validateMonthInRealTime() {
  monthInput.value.length === 2 &&
  monthInput.value >= 1 &&
  monthInput.value <= 12
    ? changeInputBorderColor(monthInput, 'green')
    : changeInputBorderColor(monthInput, 'red');
}

function validateDayInRealTime() {
  dayInput.value.length === 2 && dayInput.value >= 1 && dayInput.value <= 31
    ? changeInputBorderColor(dayInput, 'green')
    : changeInputBorderColor(dayInput, 'red');
}

function validateYearInRealTime() {
  yearInput.value.length === 4 &&
  yearInput.value >= 1880 &&
  yearInput.value < new Date().getFullYear()
    ? changeInputBorderColor(yearInput, 'green')
    : changeInputBorderColor(yearInput, 'red');
}

/**
 * year, month, day
 * @param {object} dob
 * @returns user age
 */
function calculateAge(dob) {
  const difference = Date.now() - dob.getTime();
  const age = new Date(difference);

  return Math.abs(age.getUTCFullYear() - 1970);
}

/**
 * When user submits, evaluate whether or not they are able to enter site
 * If user is 21+ and there is no weird data entry, enter site
 * @returns true or false
 */
function determineAgeOnSubmit(e) {
  // users birthday data
  const monthValue = +monthInput.value;
  const dayValue = +dayInput.value;
  const yearValue = +yearInput.value;
  const userAge = calculateAge(new Date(yearValue, monthValue, dayValue));
  let userIsOver21;

  if (userEnteredBadInfo()) {
    e.preventDefault();
    userIsOver21 = false;
    displayValidationTip("Something doesn't look right...");
  } else if (userAge < 21) {
    e.preventDefault();
    userIsOver21 = false;
    displayValidationTip('Sorry, you must be at least 21 to enter 🍼');
  } else if (userAge >= 21) {
    e.preventDefault();
    userIsOver21 = true;
    enterSite();
  }

  return userIsOver21;
}

/**
 * Catches all weird data entries
 * @returns true or false
 */
function userEnteredBadInfo() {
  if (
    +monthInput.value < 1 ||
    +monthInput.value > 12 ||
    +dayInput.value < 1 ||
    +dayInput.value > 31 ||
    +yearInput.value > new Date().getFullYear() ||
    +yearInput.value < 1880
  ) {
    return true;
  }
}

/**
 * Change validation instruction if user isn't of age
 */
function displayValidationTip(tip) {
  const validationInstruction = document.querySelector(
    '.validation-form--instruction'
  );

  validationInstruction.style.color = 'red';
  validationInstruction.textContent = tip;
}

// Local storage
function rememberUserAge() {
  const checkbox = document.querySelector('input[type="checkbox"]');
  console.log(checkbox);
}

/**
 * Removes entire age gate so user can enter main site
 */
function enterSite() {
  const ageGate = document.querySelector('#age-gate');
  ageGate.style.display = 'none';
}

// Event listeners
monthInput.addEventListener('keyup', validateMonthInRealTime);
dayInput.addEventListener('keyup', validateDayInRealTime);
yearInput.addEventListener('keyup', validateYearInRealTime);
form.addEventListener('submit', determineAgeOnSubmit);
inputs.forEach((input) => {
  input.addEventListener('input', replaceLettersWithNumbers);
});
