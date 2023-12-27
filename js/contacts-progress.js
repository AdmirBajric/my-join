/**
 * Toggles the visibility of the introductory text based on the provided value.
 * @async
 * @function
 * @param {boolean} value - The visibility value (true or false).
 * @returns {Promise<void>}
 */
const toggleIntroText = async (value) => {
  const introText = document.querySelector("#intro-contact-text");
  if (value) {
    introText.style.display = "flex";
  } else {
    introText.style.display = "none";
  }
};

/**
 * Displays the contact container, filters the contact based on the provided ID, and updates the UI.
 * @async
 * @function
 * @param {string} id - The ID of the contact to be displayed.
 * @returns {Promise<void>}
 */
const showContact = async (id) => {
  const listContact = document.querySelectorAll(".list-contact");

  if (window.innerWidth <= 820) {
    await showContactMobile(true);
  }

  await toggleIntroText(false);
  await showContactContainer();
  await filterContact(id);
  await removeActiveStates(listContact);
  await editContactAddEventListeners();
  await toggleBackgroundColor(id);
};

/**
 * Sets a timeout to render the contacts list after a specified delay.
 * @async
 * @function
 * @returns {Promise<void>}
 */
setTimeout(async () => {
  await renderList();
}, 2000);

/**
 * Clears input fields in the add contact modal.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const clearInputFields = async () => {
  const addMainFormFullName = document.querySelector("#add-main-form-full-name");
  const addMainFormEmail = document.querySelector("#add-main-form-email");
  const addMainFormPhone = document.querySelector("#add-main-form-phone");

  addMainFormFullName.value = "";
  addMainFormEmail.value = "";
  addMainFormPhone.value = "";
};

/**
 * Shows or hides containers based on the event source element.
 *
 * @function shoeHideContainers
 * @async
 * @param {Event} e - The event object.
 * @returns {Promise<void>} A promise that resolves once containers are shown or hidden based on the event source element.
 */
const shoeHideContainers = async (e) => {
  if (e) {
    const topParent = e.srcElement.offsetParent;
    const boardHeadContainer = topParent.querySelector("#board-modal-card-container");
    boardHeadContainer.style.display = "flex";

    const boardModalEditContainer = topParent.querySelector("#board-modal-edit-container");
    boardModalEditContainer.style.display = "none";
  }
};

/**
 * Adds a new contact, sets error messages, closes the modal, clears input fields, opens overlay, slides in the add contact modal, and adds event listeners.
 * @async
 * @function
 * @param {Event} e - The event object triggering the function.
 * @returns {Promise<void>}
 */
const addNewContact = async (e) => {
  await shoeHideContainers(e);
  await selectAndSetErrorMsg(".add-form-full-name-error", ".add-form-email-error", ".add-form-phone-error");

  await modalCloseOnClick();
  await clearInputFields();
  await openOverlay();
  await slideAddContactModal();
  await addContactAddEventListeners();

  let html = await templateAddContactModalButtons();

  const addMainButtons = document.querySelector("#add-main-buttons");
  addMainButtons.innerHTML = html;
};

/**
 * Slides in the add contact modal.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const slideAddContactModal = async () => {
  const editContactModal = document.querySelector("#add-contact-modal");
  if (window.innerWidth <= 820) {
    let windowWidth = window.innerWidth;
    let div = 47 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const sum = windowWidth - div;
    editContactModal.style.right = `${sum / 2}px`;
  } else {
    editContactModal.style.right = 0;
  }
};

/**
 * Selects error message elements in the add contact form.
 * @async
 * @function
 * @returns {Promise<HTMLDivElement[]>} An array of error message elements.
 */
const selectAddFormParagraphElements = async () => {
  const addFormFullNameError = document.querySelector(".add-form-full-name-error");
  const addFormEmailError = document.querySelector(".add-form-email-error");
  const addFormPhoneError = document.querySelector(".add-form-phone-error");

  return [addFormFullNameError, addFormEmailError, addFormPhoneError];
};

/**
 * Selects input elements in the add contact form.
 * @async
 * @function
 * @returns {Promise<HTMLInputElement[]>} An array of input elements.
 */
const selectAddFormElements = async () => {
  const addMainFormFullName = document.querySelector("#add-main-form-full-name");
  const addMainFormEmail = document.querySelector("#add-main-form-email");
  const addMainFormPhone = document.querySelector("#add-main-form-phone");

  return [addMainFormFullName, addMainFormEmail, addMainFormPhone];
};

/**
 * Validates a full name format.
 * @async
 * @function
 * @param {string} fullName - The full name to validate.
 * @returns {Promise<boolean>} - Indicates whether the full name is in the correct format.
 */
const validateFullName = async (fullName) => {
  return v8n()
    .pattern(/^[A-Za-z]+\s[A-Za-z]+$/)
    .test(fullName);
};

/**
 * Validates an email address format.
 * @async
 * @function
 * @param {string} email - The email address to validate.
 * @returns {Promise<boolean>} - Indicates whether the email address is in the correct format.
 */
const validateEmail = async (email) => {
  return v8n()
    .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    .test(email);
};

/**
 * Validates a phone number format.
 * @async
 * @function
 * @param {string} phone - The phone number to validate.
 * @returns {Promise<boolean>} - Indicates whether the phone number is in the correct format.
 */
const validatePhone = async (phone) => {
  return v8n()
    .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .test(phone);
};

/**
 * Formats a string by capitalizing the first letter and converting the rest to lowercase.
 * @async
 * @function
 * @param {HTMLInputElement} el - The input element containing the string to format.
 * @param {number} num - The index of the word in the string to format.
 * @returns {Promise<string>} - The formatted string.
 */
const formatString = async (el, num) => {
  return `${el.value.split(" ")[num][0].toUpperCase()}${el.value.split(" ")[num].slice(1).toLowerCase()}`;
};

/**
 * Creates a new contact object.
 * @async
 * @function
 * @param {string} id - The ID of the contact.
 * @param {string} firstName - The first name of the contact.
 * @param {string} lastName - The last name of the contact.
 * @param {HTMLInputElement} addMainFormEmail - The input element containing the email address.
 * @param {HTMLInputElement} addMainFormPhone - The input element containing the phone number.
 * @param {string} color - The color associated with the contact.
 * @returns {Promise<Object>} - The new contact object.
 */
const newContact = async (id, firstName, lastName, addMainFormEmail, addMainFormPhone, color) => {
  return {
    id: +id,
    color: color,
    name: firstName,
    lastName: lastName,
    email: addMainFormEmail.value,
    phone: addMainFormPhone.value,
  };
};

/**
 * Shows error messages for the given validation checks.
 * @async
 * @function
 * @param {boolean} checkFullName - The result of the full name validation.
 * @param {boolean} checkEmail - The result of the email validation.
 * @param {boolean} checkPhone - The result of the phone number validation.
 * @param {HTMLDivElement} addFormFullNameError - The element for displaying the full name error message.
 * @param {HTMLDivElement} addFormEmailError - The element for displaying the email error message.
 * @param {HTMLDivElement} addFormPhoneError - The element for displaying the phone number error message.
 */
const showErrorMsg = async (checkFullName, checkEmail, checkPhone, addFormFullNameError, addFormEmailError, addFormPhoneError) => {
  if (!checkFullName) {
    addFormFullNameError.style.opacity = 1;
  } else {
    addFormFullNameError.style.opacity = 0;
  }

  if (!checkEmail) {
    addFormEmailError.style.opacity = 1;
  } else {
    addFormEmailError.style.opacity = 0;
  }

  if (!checkPhone) {
    addFormPhoneError.style.opacity = 1;
  } else {
    addFormPhoneError.style.opacity = 0;
  }
};

/**
 * Generates a random ID of the specified length.
 * @async
 * @function
 * @param {number} length - The length of the random ID.
 * @returns {Promise<string>} - The generated random ID.
 */
const generateRandomId = async (length) => {
  let id = "";
  for (let i = 0; i < length; i++) {
    id += Math.floor(Math.random() * 10); // Random digit from 0 to 9
  }
  return id;
};
