/**
 * Array containing contact profiles retrieved from local storage.
 * @type {Array}
 */
let profiles = JSON.parse(localStorage.getItem("contacts"));

/**
 * Counter variable.
 * @type {number}
 */
let count = 0;

/**
 * HTML string used for rendering contact profiles.
 * @type {string}
 */
let html = "";

/**
 * Display flag.
 * @type {boolean}
 */
let display = true;

/**
 * Groups contact profiles alphabetically by the first letter of their names.
 * @function
 * @param {Array} profiles - The array of contact profiles.
 * @returns {Object} An object with contact profiles grouped alphabetically.
 */
const groupProfilesAlphabetically = (profiles) => {
  const groupedProfiles = {};

  profiles.forEach((profile) => {
    const firstLetter = profile.name.charAt(0).toUpperCase();

    if (!groupedProfiles[firstLetter]) {
      groupedProfiles[firstLetter] = [];
    }

    groupedProfiles[firstLetter].push(profile);
  });

  return groupedProfiles;
};

/**
 * Groups contact profiles and returns an HTML string for rendering.
 * @async
 * @function
 * @param {Array} profilesInGroup - The array of contact profiles to be grouped.
 * @returns {Promise<string>} HTML string representing the grouped contact profiles.
 */
const groupProfiles = async (profilesInGroup) => {
  let groupProfiles = "";

  profilesInGroup.forEach((a) => {
    groupProfiles += templateShowContact(a);
  });

  return groupProfiles;
};

/**
 * Retrieves contact profiles from local storage, groups them alphabetically, and renders the contacts list.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const loopAndRenderContacts = async () => {
  const profiles = JSON.parse(localStorage.getItem("contacts"));
  count = 0;
  const groupedProfiles = groupProfilesAlphabetically(profiles);

  const sortedFirstLetters = Object.keys(groupedProfiles).sort();

  for (const letter of sortedFirstLetters) {
    const profilesInGroup = groupedProfiles[letter];
    let newProfiles = await groupProfiles(profilesInGroup);

    html += await renderContactsList(sortedFirstLetters, newProfiles, count);

    count++;
  }
};

/**
 * Removes the active states from a list of contact elements.
 * @async
 * @function
 * @param {NodeList} listContact - The NodeList containing contact elements.
 * @returns {Promise<void>}
 */
const removeActiveStates = async (listContact) => {
  listContact.forEach((c) => {
    c.classList.remove("list-contact-active");
    let p = c.querySelectorAll(".list-contact-info p");
    p.forEach((v) => {
      v.classList.remove("list-contact-info-initials");
    });
  });
};

/**
 * Filters a contact based on the provided ID and displays the contact's information.
 * @async
 * @function
 * @param {string} id - The ID of the contact to be filtered and displayed.
 * @returns {Promise<void>}
 */
const filterContact = async (id) => {
  const user = profiles.filter((a) => {
    if (a.id === id) {
      return a;
    }
  });

  await showContactHTML(user);
};

// Invoke the loopAndRenderContacts function
loopAndRenderContacts();

/**
 * Displays the contact information in the HTML container.
 * @async
 * @function
 * @param {Array} user - The array containing the contact information.
 * @returns {Promise<void>}
 */
const showContactHTML = async (user) => {
  let html = await templateContactContainer(user);

  const contactProfile = document.querySelector("#contact-profile");

  contactProfile.innerHTML = html;

  const profileInitials = document.querySelector("#profile-initials");
  profileInitials.style.backgroundColor = user[0].color;
};

/**
 * Adds event listeners to the edit modal close button for mouseover, mouseout, and click actions.
 *
 * @function editModalClose
 * @async
 * @param {User} user - The user object.
 * @returns {Promise<void>} A promise that resolves once event listeners are added to the edit modal close button.
 */
const editModalClose = async (user) => {
  const editModalClose = document.querySelector("#edit-modal-close");

  editModalClose.addEventListener("mouseover", () => {
    editModalClose.src = "./assets/img/board-close.svg";
  });

  editModalClose.addEventListener("mouseout", () => {
    editModalClose.src = "./assets/img/contact-close.svg";
  });

  editModalClose.addEventListener("click", async () => {
    const editContactModal = document.querySelector("#edit-contact-modal");
    editContactModal.style.left = "-200%";
    const optionsEditDelete = document.querySelector("#options-edit-delete");
    optionsEditDelete.style.right = "-40rem";
    await closeOverlay();
  });
};

/**
 * Adds event listeners to the edit option for mouseover and mouseout actions.
 *
 * @function optionEditListeners
 * @async
 * @returns {Promise<void>} A promise that resolves once event listeners are added to the edit option.
 */
const optionEditListeners = async () => {
  const optionEdit = document.querySelector("#option-edit");
  optionEdit.addEventListener("mouseover", () => {
    optionEdit.src = "./assets/img/edit-contact-hover.svg";
  });

  optionEdit.addEventListener("mouseout", () => {
    optionEdit.src = "./assets/img/edit-contact.svg";
  });
};

/**
 * Adds event listeners to the delete option for mouseover and mouseout actions.
 *
 * @function optionDeleteListeners
 * @async
 * @returns {Promise<void>} A promise that resolves once event listeners are added to the delete option.
 */
const optionDeleteListeners = async () => {
  const optionDelete = document.querySelector("#option-delete");
  optionDelete.addEventListener("mouseover", () => {
    optionDelete.src = "./assets/img/delete-contact-hover.svg";
  });

  optionDelete.addEventListener("mouseout", () => {
    optionDelete.src = "./assets/img/delete-contact.svg";
  });
};

/**
 * Adds event listeners for the edit contact options, close button, and delete option.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const editContactAddEventListeners = async () => {
  await optionEditListeners();
  await optionDeleteListeners();
  await editModalClose();
};

/**
 * Adds event listeners for the close button in the add contact modal.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const addContactAddEventListeners = async () => {
  const addModalClose = document.querySelector("#add-modal-close");

  addModalClose.addEventListener("mouseover", () => {
    addModalClose.src = "./assets/img/board-close.svg";
  });

  addModalClose.addEventListener("mouseout", () => {
    addModalClose.src = "./assets/img/contact-close.svg";
  });

  addModalClose.addEventListener("click", async () => {
    const addContactModal = document.querySelector("#add-contact-modal");
    if (window.innerWidth <= 820) {
      addContactModal.style.right = "-200%";
    } else {
      addContactModal.style.right = "-50%";
    }
    await closeOverlay();
  });
};

/**
 * Animates and displays the contact container.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const showContactContainer = async () => {
  const contactProfile = document.querySelector("#contact-profile");

  contactProfile.style.left = "100%";
  contactProfile.classList.remove("contact-profile-animation");

  setTimeout(() => {
    contactProfile.classList.add("contact-profile-animation");
    contactProfile.style.left = "4rem";
  }, 400);
};

/**
 * Selects and sets the opacity of error messages for full name, email, and phone.
 * @async
 * @function
 * @param {string} name - The selector for the full name error message.
 * @param {string} email - The selector for the email error message.
 * @param {string} phone - The selector for the phone error message.
 * @returns {Promise<void>}
 */
const selectAndSetErrorMsg = async (name, email, phone) => {
  const fullNameError = document.querySelector(name);
  const emailError = document.querySelector(email);
  const phoneError = document.querySelector(phone);

  fullNameError.style.opacity = 0;
  emailError.style.opacity = 0;
  phoneError.style.opacity = 0;
};

/**
 * Displays the edit contact modal, sets error messages, opens overlay, injects buttons, and fills the modal with contact information.
 * @async
 * @function
 * @param {string} id - The ID of the contact to be edited.
 * @returns {Promise<void>}
 */
const editContactModal = async (id) => {
  await selectAndSetErrorMsg(".edit-form-full-name-error", ".edit-form-email-error", ".edit-form-phone-error");

  await openOverlay();
  await injectButtons(id);
  await slideContactModal();

  const contact = profiles.filter((a) => {
    if (a.id === id) {
      return a;
    }
  });

  await fillEditModalInitials(contact);
  await fillEditModalForm(contact);
};

/**
 * Animates the slide-in of the edit contact modal.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const slideContactModal = async () => {
  const editContactModal = document.querySelector("#edit-contact-modal");
  if (window.innerWidth <= 820) {
    let windowWidth = window.innerWidth;
    let div = 47 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const sum = windowWidth - div;
    editContactModal.style.left = `${sum / 2}px`;
  } else {
    editContactModal.style.left = 0;
  }
};

/**
 * Injects buttons into the edit contact modal.
 * @async
 * @function
 * @param {string} id - The ID of the contact.
 * @returns {Promise<void>}
 */
const injectButtons = async (id) => {
  const buttons = await templateEditContactModalButtons(id);

  const btnContainer = document.querySelector("#edit-main-buttons");
  btnContainer.innerHTML = buttons;
};

/**
 * Fills the edit contact modal form with the provided contact information.
 * @async
 * @function
 * @param {Object[]} contact - The contact information to be filled in the form.
 * @returns {Promise<void>}
 */
const fillEditModalForm = async (contact) => {
  const editMainFormFullName = document.querySelector("#edit-main-form-full-name");
  editMainFormFullName.value = `${contact[0].name} ${contact[0].lastName}`;
  editMainFormFullName.focus();

  const editMainFormEmail = document.querySelector("#edit-main-form-email");
  editMainFormEmail.value = contact[0].email;

  const editMainFormPhone = document.querySelector("#edit-main-form-phone");
  editMainFormPhone.value = contact[0].phone;
};

/**
 * Fills the edit contact modal initials with the provided contact information.
 * @async
 * @function
 * @param {Object[]} contact - The contact information to be filled in the initials.
 * @returns {Promise<void>}
 */
const fillEditModalInitials = async (contact) => {
  const editMainInitials = document.querySelector("#edit-main-initials");
  editMainInitials.style.backgroundColor = contact[0].color;

  const editMainInitialsName = document.querySelector("#edit-main-initials-name");
  editMainInitialsName.textContent = contact[0].name.charAt(0);

  const editMainInitialsLastName = document.querySelector("#edit-main-initials-lastname");
  editMainInitialsLastName.textContent = contact[0].lastName.charAt(0);
};
