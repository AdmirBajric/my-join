/**
 * Calls a series of helper functions to perform various actions related to contacts.
 *
 * @function callHelperFunctions
 * @async
 * @param {Object} contact - The contact object.
 * @returns {Promise<void>} A promise that resolves once all helper functions are called.
 */
const callHelperFunctions = async (contact) => {
  await toggleIntroText(false);
  await loopAndRenderContacts();
  await renderList();
  await showContactContainer();
  await filterContact(contact.id);
  await closeAddContactContainer();
  await clearInputFields();
  await editContactAddEventListeners();
  await addContactAddEventListeners();
  await toggleBackgroundColor(contact.id);
};

/**
 * Checks input conditions to create a new contact and performs necessary actions if conditions are met.
 *
 * @function checkInputsToCreateNewContact
 * @async
 * @param {boolean} checkFullName - The result of checking the full name input.
 * @param {boolean} checkEmail - The result of checking the email input.
 * @param {boolean} checkPhone - The result of checking the phone input.
 * @param {HTMLInputElement} addMainFormFullName - The input element for the full name in the main form.
 * @param {HTMLInputElement} addMainFormEmail - The input element for the email in the main form.
 * @param {HTMLInputElement} addMainFormPhone - The input element for the phone in the main form.
 * @returns {Promise<void>} A promise that resolves once the input conditions are checked and necessary actions are performed.
 */
const checkInputsToCreateNewContact = async (checkFullName, checkEmail, checkPhone, addMainFormFullName, addMainFormEmail, addMainFormPhone) => {
  const colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "teal", "brown", "gray", "cyan", "magenta", "lime", "indigo"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  const id = await generateRandomId(10);

  if (checkFullName && checkEmail && checkPhone) {
    await closeOverlay();

    const firstName = await formatString(addMainFormFullName, 0);
    const lastName = await formatString(addMainFormFullName, 1);
    const contact = await newContact(id, firstName, lastName, addMainFormEmail, addMainFormPhone, colors[randomIndex]);

    profiles.push(contact);

    localStorage.setItem("contacts", JSON.stringify(profiles));
    await setItem("contacts", profiles);
    html = "";
    await callHelperFunctions(contact);
  }
};

/**
 * Creates a new contact, validates input fields, and updates the UI accordingly.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const createNewContact = async () => {
  const [addFormFullNameError, addFormEmailError, addFormPhoneError] = await selectAddFormParagraphElements();
  const [addMainFormFullName, addMainFormEmail, addMainFormPhone] = await selectAddFormElements();

  const checkFullName = await validateFullName(addMainFormFullName.value);
  const checkEmail = await validateEmail(addMainFormEmail.value);
  const checkPhone = await validatePhone(addMainFormPhone.value);
  await checkInputsToCreateNewContact(checkFullName, checkEmail, checkPhone, addMainFormFullName, addMainFormEmail, addMainFormPhone);
  await showErrorMsg(checkFullName, checkEmail, checkPhone, addFormFullNameError, addFormEmailError, addFormPhoneError);
};

/**
 * Opens the overlay element.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const openOverlay = async () => {
  const overlay = document.querySelector("#overlay");
  overlay.style.display = "flex";
};

/**
 * Closes the overlay element.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const closeOverlay = async () => {
  const overlay = document.querySelector("#overlay");
  overlay.style.display = "none";
};

/**
 * Closes the add contact container and the overlay.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const closeAddContactContainer = async () => {
  await closeOverlay();
  const addContactModal = document.querySelector("#add-contact-modal");
  if (window.innerWidth <= 820) {
    addContactModal.style.right = "-200%";
  } else {
    addContactModal.style.right = "-50%";
  }
};

/**
 * Selects elements for error messages in the edit contact form.
 * @async
 * @function
 * @returns {Promise<Array<HTMLElement>>} An array of error message elements.
 */
const selectEditFormParagraphElements = async () => {
  const editFormFullNameError = document.querySelector(".edit-form-full-name-error");
  const editFormEmailError = document.querySelector(".edit-form-email-error");
  const editFormPhoneError = document.querySelector(".edit-form-phone-error");

  return [editFormFullNameError, editFormEmailError, editFormPhoneError];
};

/**
 * Selects elements for input fields in the edit contact form.
 * @async
 * @function
 * @returns {Promise<Array<HTMLElement>>} An array of input field elements.
 */
const selectEditFormElements = async () => {
  const fullName = document.querySelector("#edit-main-form-full-name");
  const email = document.querySelector("#edit-main-form-email");
  const phone = document.querySelector("#edit-main-form-phone");

  return [fullName, email, phone];
};

/**
 * Updates contact information in the profiles array.
 * @async
 * @function
 * @param {string} id - The ID of the contact to be updated.
 * @param {string} email - The updated email.
 * @param {string} phone - The updated phone number.
 * @param {Array} profiles - The array of contact profiles.
 * @param {string} firstName - The updated first name.
 * @param {string} lastName - The updated last name.
 * @returns {Promise<Array>} The updated array of contact profiles.
 */
const updatedContacts = async (id, email, phone, profiles, firstName, lastName) => {
  profiles.filter((contact) => {
    if (contact.id === id) {
      contact.name = firstName;
      contact.lastName = lastName;
      contact.email = email;
      contact.phone = phone;
      return contact;
    }
    return contact;
  });

  return profiles;
};

/**
 * Closes the edit contact container.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const closeEditContactContainer = async () => {
  const editContactModal = document.querySelector("#edit-contact-modal");
  if (window.innerWidth <= 820) {
    editContactModal.style.left = "-200%";
  } else {
    editContactModal.style.left = "-50%";
  }
};

/**
 * Toggles the background color and styling for the active contact in the list.
 * @async
 * @function
 * @param {string} id - The ID of the contact to be highlighted.
 * @returns {Promise<void>}
 */
const toggleBackgroundColor = async (id) => {
  const listContact = document.querySelectorAll(".list-contact");

  listContact.forEach((b) => {
    if (+b.id === +id) {
      b.classList.add("list-contact-active");
      let p = b.querySelectorAll(".list-contact-info p");
      p.forEach((c) => {
        c.classList.add("list-contact-info-initials");
      });
    }
  });
};

/**
 * Calls a series of helper functions to update the UI after modifying a contact.
 *
 * @function helperFunctionsForUpdate
 * @async
 * @param {string} id - The ID of the updated contact.
 * @returns {Promise<void>} A promise that resolves once all helper functions for update are called.
 */
const helperFunctionsForUpdate = async (id) => {
  await loopAndRenderContacts();
  await renderList();
  await showContactContainer();
  await filterContact(id);
  await closeEditContactContainer();
  await toggleBackgroundColor(id);
  await editContactAddEventListeners();
};

/**
 * Checks input conditions for updating a contact and performs necessary actions if conditions are met.
 *
 * @function checkInputsForUpdate
 * @async
 * @param {string} id - The ID of the contact being updated.
 * @param {boolean} checkFullName - The result of checking the full name input.
 * @param {boolean} checkEmail - The result of checking the email input.
 * @param {boolean} checkPhone - The result of checking the phone input.
 * @param {HTMLInputElement} email - The input element for the email in the main form.
 * @param {HTMLInputElement} phone - The input element for the phone in the main form.
 * @param {HTMLInputElement} fullName - The input element for the full name in the main form.
 * @returns {Promise<void>} A promise that resolves once the input conditions for update are checked and necessary actions are performed.
 */
const checkInputsForUpdate = async (id, checkFullName, checkEmail, checkPhone, email, phone, fullName) => {
  if (checkFullName && checkEmail && checkPhone) {
    await closeOverlay();

    const firstName = await formatString(fullName, 0);
    const lastName = await formatString(fullName, 1);

    const filteredContacts = await updatedContacts(id, email.value, phone.value, profiles, firstName, lastName);

    profiles = filteredContacts;
    localStorage.setItem("contacts", JSON.stringify(profiles));
    await setItem("contacts", profiles);
    html = "";
    await helperFunctionsForUpdate(id);
  }
};

/**
 * Saves the updated contact information and updates the UI accordingly.
 * @async
 * @function
 * @param {string} id - The ID of the contact to be updated.
 * @returns {Promise<void>}
 */
const saveUpdatedContact = async (id) => {
  const [editFormFullNameError, editFormEmailError, editFormPhoneError] = await selectEditFormParagraphElements();

  const [fullName, email, phone] = await selectEditFormElements();

  const checkFullName = await validateFullName(fullName.value);
  const checkEmail = await validateEmail(email.value);
  const checkPhone = await validatePhone(phone.value);
  await checkInputsForUpdate(id, checkFullName, checkEmail, checkPhone, email, phone, fullName);
  await showErrorMsg(checkFullName, checkEmail, checkPhone, editFormFullNameError, editFormEmailError, editFormPhoneError);
};

/**
 * Slides the contact container off the screen, used for delete action.
 * @async
 * @function
 * @param {string} txt - The type of action to perform (e.g., "delete").
 * @returns {Promise<void>}
 */
const slideContainer = async (txt) => {
  if (txt === "delete") {
    const editContactModal = document.querySelector("#edit-contact-modal");
    editContactModal.style.left = "-50%";
    await closeOverlay();
  }
};

/**
 * Renders the contact profile container.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const renderContact = async () => {
  const contactProfile = document.querySelector("#contact-profile");
  contactProfile.innerHTML = "";
};

/**
 * Deletes the contact mobile view elements and adjusts container styles based on the window width.
 *
 * @function deleteContactMobile
 * @async
 * @returns {Promise<void>} A promise that resolves once the mobile view elements are deleted and container styles are adjusted.
 */
const deleteContactMobile = async () => {
  if (window.innerWidth <= 820) {
    const elementToShow = document.querySelector("#options-edit-delete");
    elementToShow.style.right = "-40rem";
    const containerLeft = document.querySelector("#contacts-container-left");
    const containerRight = document.querySelector("#contacts-container-right");
    containerLeft.style.display = "flex";
    containerRight.style.display = "none";

    const optionsEditDelete = document.querySelector("#options-edit-delete");

    const closeDiv = document.querySelector("#close-contact-info");

    const mainDiv = document.querySelector("#options-edit-delete-modal");

    containerRight.removeChild(optionsEditDelete);
    containerRight.removeChild(closeDiv);
    containerRight.removeChild(mainDiv);
  }
};

/**
 * Deletes a contact from storage based on its ID.
 *
 * @function setOnDeleteStorage
 * @async
 * @param {string} id - The ID of the contact to be deleted.
 * @returns {Promise<void>} A promise that resolves once the contact is deleted from storage.
 */
const setOnDeleteStorage = async (id) => {
  const contact = profiles.filter((a) => {
    if (a.id !== id) {
      return a;
    }
  });

  profiles = contact;
  localStorage.setItem("contacts", JSON.stringify(profiles));
  await setItem("contacts", profiles);
};

/**
 * Deletes a contact based on the provided ID and updates the UI accordingly.
 * @async
 * @function
 * @param {string} id - The ID of the contact to be deleted.
 * @param {string} txt - The type of action to perform (e.g., "delete").
 * @returns {Promise<void>}
 */
const deleteContact = async (id, txt) => {
  await deleteContactMobile();
  await slideContainer(txt);

  count = 0;
  html = "";
  await renderList();
  await renderContact();
  await setOnDeleteStorage(id);
  await loopAndRenderContacts();
  await renderList();
  await toggleIntroText(true);
};

/**
 * Renders the contacts list based on the current state of the profiles array.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const renderList = async () => {
  const introExist = document.querySelector("#intro-exist");
  const introNotExist = document.querySelector("#intro-not-exist");

  if (profiles.length > 0) {
    introExist.style.display = "flex";
    introNotExist.style.display = "none";
  } else {
    introNotExist.style.display = "flex";
    introExist.style.display = "none";
  }

  const contactsList = document.querySelector("#contacts-list");
  contactsList.innerHTML = html;
};
