/**
 * Extracts user input values from the sign-up form.
 *
 * @function extractInputValues
 * @async
 * @returns {Promise<Array>} A promise that resolves with an array containing user input values.
 */
const extractInputValues = async () => {
  // Extract user input values
  const signUpNameLastName = document.querySelector("#sign-up-name").value.split(" ");
  const signUpEmail = document.querySelector("#sign-up-email").value;
  const signUpPassword = document.querySelector("#sign-up-password").value;
  const signUpConfirmPassword = document.querySelector("#sign-up-confirm-password").value;

  return [signUpNameLastName, signUpEmail, signUpPassword, signUpConfirmPassword];
};

/**
 * Constructs a full name from an array containing the first and last names.
 *
 * @function constructFullName
 * @async
 * @param {Array} signUpNameLastName - An array containing the first and last names.
 * @returns {Promise<string>} A promise that resolves with the constructed full name.
 */
const constructFullName = async (signUpNameLastName) => {
  return `${signUpNameLastName[0][0].toUpperCase()}${signUpNameLastName[0].slice(1).toLowerCase()} ${signUpNameLastName[1][0].toUpperCase()}${signUpNameLastName[1].slice(1).toLowerCase()}`;
};

/**
 * Clears the border style of specific containers in the sign-up form.
 *
 * @function clearContainerBorderStyle
 * @async
 * @returns {Promise<void>} A promise that resolves once the container border styles are cleared.
 */
const clearContainerBorderStyle = async () => {
  const signUpContainer = document.querySelectorAll(".sign-up-container");
  signUpContainer[2].style.borderBottom = "0.2rem solid var(--inputStyle)";
  signUpContainer[3].style.borderBottom = "0.2rem solid var(--inputStyle)";
};

/**
 * Creates a new user object with the provided information.
 *
 * @function createNewUser
 * @async
 * @param {Array} newUsers - An array of existing users.
 * @param {string} fullName - The full name of the new user.
 * @param {string} signUpEmail - The email of the new user.
 * @param {string} signUpPassword - The password of the new user.
 * @returns {Promise<Object>} A promise that resolves with the newly created user object.
 */
const createNewUser = async (newUsers, fullName, signUpEmail, signUpPassword) => {
  let newUser;
  // Create a new user object
  newUser = {
    id: newUsers.length,
    name: fullName,
    email: signUpEmail.toLowerCase(),
    password: signUpPassword,
  };
  return newUser;
};

/**
 * Sets the user data in local storage and backend.
 *
 * @function setLocalStorageAndBackend
 * @async
 * @param {Array} newUsers - An array of users to be stored.
 * @returns {Promise<void>} A promise that resolves once the data is set in local storage and backend.
 */
const setLocalStorageAndBackend = async (newUsers) => {
  localStorage.setItem("users", JSON.stringify(newUsers));
  await setItem("users", newUsers);
};

/**
 * Changes the style of the sign-up modal and privacy policy elements.
 *
 * @function changeStyleAndModal
 * @async
 * @returns {Promise<void>} A promise that resolves once the styles are changed.
 */
const changeStyleAndModal = async () => {
  // Get the sign-up modal and privacy policy elements
  const signUpModal = document.querySelector("#sign-up-modal");
  signUpModal.style.top = "calc(50% - 3.7rem)";
  const privacyPolicy = document.querySelector(".privacy-policy");
  privacyPolicy.style.display = "none";
};

/**
 * Hides the sign-up modal after a delay.
 *
 * @function hideSignUpModalAfterDelay
 * @async
 * @returns {Promise<void>} A promise that resolves once the modal is hidden.
 */
const hideSignUpModalAfterDelay = async () => {
  const signUpModal = document.querySelector("#sign-up-modal");

  // Set a timeout to hide the sign-up modal after a delay
  setTimeout(() => {
    signUpModal.style.top = "-10rem";
  }, 1500);
};

/**
 * Redirects to the index page after a delay.
 *
 * @function redirectToIndex
 * @async
 * @returns {Promise<void>} A promise that resolves once the redirection is complete.
 */
const redirectToIndex = async () => {
  // Set a timeout to redirect to the index page after a delay
  setTimeout(() => {
    window.location.replace("index.html");
  }, 2000);
};

/**
 * Sets an error border style for the password input containers.
 *
 * @function setErrorBorderPasswords
 * @async
 * @returns {Promise<void>} A promise that resolves once the error borders are set.
 */
const setErrorBorderPasswords = async () => {
  const signUpContainer = document.querySelectorAll(".sign-up-container");
  signUpContainer[2].style.borderBottom = "0.2rem solid var(--error)";
  signUpContainer[3].style.borderBottom = "0.2rem solid var(--error)";
};

/**
 * Displays the privacy policy element as an error message.
 *
 * @function showPrivacyPolicyError
 * @async
 * @returns {Promise<void>} A promise that resolves once the privacy policy error is displayed.
 */
const showPrivacyPolicyError = async () => {
  // If privacy policy is not accepted, display the privacy policy
  const privacyPolicy = document.querySelector(".privacy-policy");
  privacyPolicy.style.display = "flex";
};

/**
 * Checks passwords on sign-up, creates a new user, and performs related actions.
 *
 * @function checkPasswordsOnSignUp
 * @async
 * @returns {Promise<void>} A promise that resolves once the password check and related actions are completed.
 */
const checkPasswordsOnSignUp = async () => {
  const [signUpNameLastName, signUpEmail, signUpPassword, signUpConfirmPassword] = await extractInputValues();
  const fullName = await constructFullName(signUpNameLastName);
  const users = await getItem("users");
  const newUsers = JSON.parse(users.data.value);
  let newUser;
  if (signUpPassword === signUpConfirmPassword) {
    await clearContainerBorderStyle();
    newUser = await createNewUser(newUsers, fullName, signUpEmail, signUpPassword);
    newUsers.push(newUser);
    await setLocalStorageAndBackend(newUsers);
    await changeStyleAndModal();
    await hideSignUpModalAfterDelay();
    await redirectToIndex();
  } else {
    await setErrorBorderPasswords();
  }
};

/**
 * Handles the sign-up process by extracting user input, validating, and updating the user data.
 * Displays a modal with the sign-up success message and redirects to the index page after a delay.
 * @returns {Promise<void>}
 */
const signUp = async () => {
  // Check if the privacyPolicy variable is defined
  if (privacyPolicy) {
    await checkPasswordsOnSignUp();
  } else {
    await showPrivacyPolicyError();
  }
};
