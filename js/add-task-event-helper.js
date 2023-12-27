/**
 * Adds mouseover and mouseout event listeners to elements with the "add-task-subtask-img-done" class
 * to change image source on hover.
 */
const addEventImgDoneOnHover = async () => {
  // Select all elements with the "add-task-subtask-img-done" class
  const addTaskSubtaskImgDone = document.querySelectorAll(".add-task-subtask-img-done");

  // Add event listeners to each element
  addTaskSubtaskImgDone.forEach((c) => {
    // Mouseover event listener to change image source on hover
    c.addEventListener("mouseover", async () => {
      c.src = "./assets/img/subtask-done-hover.svg";
    });

    // Mouseout event listener to reset image source on mouseout
    c.addEventListener("mouseout", async () => {
      c.src = "./assets/img/subtask-done.svg";
    });
  });
};

/**
 * Adjusts the style of subtask elements with the specified unique identifier.
 *
 * @param {string} uniqueId - The unique identifier associated with the subtask elements.
 */
const addTaskSubtaskStyle = async (uniqueId) => {
  // Select all elements with the specified unique identifier
  const parentUl = document.querySelectorAll(`[data-id="${uniqueId}"]`);

  // Adjust the style of each element
  parentUl.forEach((a) => {
    a.querySelector(".add-task-subtask-img-delete-left").style.display = "none";
    a.querySelector(".add-task-subtask-img-done").style.display = "none";
  });
};

/**
 * Clears the input values of subtask elements and updates the display of subtask buttons.
 */
const clearInputField = async () => {
  // Select all elements with the "add-task-select-subtasks-input" class
  const subtaskInputValue = document.querySelectorAll(".add-task-select-subtasks-input");

  // Clear the value of each input element
  subtaskInputValue.forEach((a) => {
    a.value = "";
  });

  // Update the display of subtask buttons based on the cleared input values
  await showSubtaskButtons(subtaskInputValue);
};

/**
 * Adds a category to the new task and updates the display of category elements.
 *
 * @param {string} selectedLabel - The label of the selected category.
 */
const addCategory = async (selectedLabel) => {
  // Update the category of the new task
  newTask = [{ ...newTask[0], category: selectedLabel }];

  // Destructure selected category elements
  const { addTaskCategoryList, addTaskSelectCategory, selectCategoryImg } = selectedCategoryElements();

  // Clear the content of category list elements
  addTaskCategoryList.forEach((d) => {
    d.innerHTML = "";
  });

  // Reset the image source of category selection images
  selectCategoryImg.forEach((b) => {
    b.src = "./assets/img/arrow-dropdown-down.svg";
  });

  // Update the text content of category selection elements
  addTaskSelectCategory.forEach((a) => {
    a.textContent = selectedLabel;
  });
};

/**
 * Renders the HTML for assigned contacts and updates the display of selected contacts elements.
 */
const renderAssignedContacts = async () => {
  // Select all elements with the "add-task-selected-contacts" class
  const addTaskSelectedContacts = document.querySelectorAll(".add-task-selected-contacts");

  // Initialize an empty string to store the assigned contacts HTML
  let assignedHTML = "";

  // Generate HTML for each selected contact and append to the assignedHTML string
  selectedContacts.forEach((contact) => {
    const selectedContact = profiles.filter((a) => a.id === contact);
    assignedHTML += selectedContactsTemplate(selectedContact);
  });

  // Update the content of each element with the assigned contacts HTML
  addTaskSelectedContacts?.forEach((a) => {
    a.innerHTML = assignedHTML;
  });
};

/**
 * Updates the list of selected contacts based on the provided contact ID.
 *
 * @param {string} id - The ID of the contact to be selected or deselected.
 */
const selectedContact = async (id) => {
  // Check if the contact ID is already in the list of selected contacts
  const ifExist = selectedContacts.some((a) => a === id);

  // Retrieve all contacts from local storage
  const allContacts = JSON.parse(localStorage.getItem("contacts"));

  // Filter the contact with the provided ID from all contacts
  const assignedContact = allContacts.filter((a) => a.id === id);

  // Update the list of selected contacts based on whether the contact is already selected
  if (!ifExist) {
    // Add the contact ID to the list of selected contacts
    selectedContacts.push(id);
    // Update the assignedTo property in the new task with the assigned contact
    newTask[0].assignedTo = [...newTask[0].assignedTo, assignedContact[0]];
  } else {
    // Remove the contact ID from the list of selected contacts
    const filteredContacts = selectedContacts.filter((a) => a !== id);
    selectedContacts = filteredContacts;
  }
};

/**
 * Resets the list of selected contacts, clearing all stored contact IDs.
 */
const resetSelectedContacts = async () => {
  // Clear the list of selected contacts
  selectedContacts = [];
};
