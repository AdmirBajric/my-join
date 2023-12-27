/**
 * Generates an HTML template for displaying contact information.
 *
 * @param {Object} a - The contact object with properties like id, name, lastName, email, and color.
 * @returns {string} - The HTML template for displaying contact information.
 */
const templateShowContact = (a) => {
  /**
   * Shortened email for display if it exceeds a certain length.
   * @type {string}
   */
  let shortEmail = a.email;

  if (a.email.length > 21) {
    shortEmail = `${a.email.slice(0, 20).split("@", 1)}...`;
  }

  return `<div onclick="showContact(${a.id})" id=${a.id} class="list-contact">
      <div class="list-contact-initials" style="background-color: ${a.color}">
        <p class="nameFirstLetter">${a.name[0].toUpperCase()}</p>
        <p class="lastNameFirstLetter">${a.lastName[0].toUpperCase()}</p>
      </div>
    
      <div class="list-contact-info">
        <p>${a.name} ${a.lastName}</p>
        <p>${shortEmail}</p>
      </div>
    </div>`;
};

/**
 * Generates an HTML template for displaying contact information in a container.
 *
 * @param {Object[]} user - An array containing contact information.
 * @param {string} user[].name - The name of the contact.
 * @param {string} user[].lastName - The last name of the contact.
 * @param {string} user[].email - The email of the contact.
 * @param {string} user[].phone - The phone number of the contact.
 * @param {number} user[].id - The unique identifier of the contact.
 * @returns {string} - The HTML template for displaying contact information in a container.
 */
const templateContactContainer = async (user) => {
  return `<div id="contact-profile-initials">
    <div id="profile-initials">
      <p>${user[0].name.charAt(0)}</p>
      <p>${user[0].lastName.charAt(0)}</p>
    </div>

    <div id="profile-name-lastname">
      <div id="name-lastname">
        <p>${user[0].name} ${user[0].lastName}</p>
      </div>
      <div id="options-edit-delete">
        <div id="options-edit-container">
          <img onclick="editContactModal(${
            user[0].id
          })" id="option-edit" src="./assets/img/edit-contact.svg" alt="Edit image" />
        </div>
        <div id="options-delete-container">
          <img onclick="deleteContact(${
            user[0].id
          })" id="option-delete" src="./assets/img/delete-contact.svg" alt="Delete image" />
        </div>
      </div>
    </div>
  </div>

  <div id="contact-profile-info">
    <p>Contact Information</p>
  </div>

  <div id="contact-profile-email-phone">
    <div id="contact-profile-email">
      <p>Email</p>
      <p>${user[0].email}</p>
    </div>

    <div id="contact-profile-phone">
      <p>Phone</p>
      <p>${user[0].phone}</p>
    </div>
  </div>`;
};

/**
 * Generates an HTML template for rendering a list of contacts with initial letter dividers.
 *
 * @param {string[]} sortedFirstLetters - An array of sorted first letters of contact names.
 * @param {string} profiles - The HTML template containing the contact profiles.
 * @param {number} count - The count of the current initial letter.
 * @returns {string} - The HTML template for rendering a list of contacts.
 */
const renderContactsList = async (sortedFirstLetters, profiles, count) => {
  return `<div class="list-initials">
    <p>${sortedFirstLetters[count]}</p>
  </div>
  
  <div class="list-divider"></div>
  ${profiles}
 `;
};

/**
 * Generates an HTML template for buttons in the edit contact modal.
 *
 * @param {number} id - The unique identifier of the contact.
 * @returns {string} - The HTML template for buttons in the edit contact modal.
 */
const templateEditContactModalButtons = async (id) => {
  return `<button onclick="deleteContact(${id}, 'delete')" id="edit-main-buttons-delete">Delete</button>
  <button onclick="saveUpdatedContact(${id})" id="edit-main-buttons-save"><p>Save</p>
  <img src="./assets/img/contact-done.svg" alt="Done image" /></button>`;
};

/**
 * Generates an HTML template for buttons in the add contact modal.
 *
 * @returns {string} - The HTML template for buttons in the add contact modal.
 */
const templateAddContactModalButtons = async () => {
  return `<button onclick="closeAddContactContainer()" id="add-main-buttons-delete">
    <p>Cancel</p>
    <img src="./assets/img/cancel-close.svg" alt="Cancel close image" />
  </button>
  <button onclick="createNewContact()" id="add-main-buttons-save">
    <p>Create contact</p>
    <img src="./assets/img/contact-done.svg" alt="Done image" />
  </button>`;
};

/**
 * Generates an HTML template for displaying filtered profiles in the add task interface.
 *
 * @param {Object} p - The profile object with properties like id, name, lastName, color.
 * @param {string} s - The source URL for the checkbox image.
 * @returns {string} - The HTML template for displaying filtered profiles.
 */
const filterProfilesTemplate = (p, s) => {
  return `<div class="add-task-contact">
  <div class="add-task-contact-container">
    <div style="background-color: ${p.color}" class="add-task-contact-initials">
      <p class="initials-first-name">${p.name[0].toUpperCase()}</p>
      <p class="initials-last-name">${p.lastName[0].toUpperCase()}</p>
    </div>
    <h3 class="add-task-full-name">${p.name} ${p.lastName}</h3>
  </div>
  <img
  onclick="selectedContact(${p.id})"
    class="add-task-img"
    src="${s}"
    alt="Checkbox checked image"
  />
</div>`;
};

/**
 * Generates an HTML template for the "Add new contact" button in the add task interface.
 *
 * @returns {string} - The HTML template for the "Add new contact" button.
 */
const assignedAddNewContactTemplate = () => {
  return `<div onclick="showContacts(); addNewContact(event)" class="add-task-contacts-btn">
  <p class="add-task-contacts-add-new">Add new contact</p>
  <img class="add-task-contacts-img" src="./assets/img/person_add.svg" alt="Person add image" />
</div>`;
};

/**
 * Generates an HTML template for a subtask in the add task interface.
 *
 * @param {string} uniqueId - The unique identifier for the subtask.
 * @param {string} newValue - The value of the subtask.
 * @returns {string} - The HTML template for a subtask.
 */
const subtaskTemplate = (uniqueId, newValue) => {
  return `<ul data-id="${uniqueId}" class="add-task-unordered-list">
  <li class="add-task-list">${newValue}</li>
    <input class="add-task-subtask-input" type="text" value="${newValue}" />
  <div class="add-task-subtask">
    <img onclick="deleteSubtask(${uniqueId})" class="add-task-subtask-img-delete-left hover" src="./assets/img/subtask-delete.svg" alt="Delete image" />
    <img onclick="editSubtask(${uniqueId})" class="add-task-subtask-img-pencil hover" src="./assets/img/subtask-pencil.svg" alt="Pencil image" />
    <div class="subtask-divider"></div>
    <img onclick="deleteSubtask(${uniqueId})" class="add-task-subtask-img-delete-right hover" src="./assets/img/subtask-delete.svg" alt="Delete image" />
    <img onclick="saveEditedSubtask(${uniqueId}, event)" class="add-task-subtask-img-done hover" src="./assets/img/subtask-done.svg" alt="Done image" />
  </div>
</ul>`;
};

/**
 * Generates an HTML template for a selected contact in the add task interface.
 *
 * @param {Object[]} selectedContact - An array containing the selected contact information.
 * @param {string} selectedContact[].color - The color of the selected contact.
 * @param {string} selectedContact[].name - The name of the selected contact.
 * @param {string} selectedContact[].lastName - The last name of the selected contact.
 * @param {string} selectedContact[].id - The unique identifier of the selected contact.
 * @returns {string} - The HTML template for a selected contact.
 */
const selectedContactsTemplate = (selectedContact) => {
  return `<div data-id="${selectedContact[0].id}" style="background-color: ${
    selectedContact[0].color
  }" class="selected-contact">
  <p class="selected-contact-first-letter-name">${selectedContact[0].name[0].toUpperCase()}</p>
  <p class="selected-contact-first-letter-last-name">${selectedContact[0].lastName[0].toUpperCase()}</p>
</div>`;
};

/**
 * Generates an HTML template for displaying initials in a progress card assigned contact.
 *
 * @param {number} unit - The left position value in rem units for the initials container.
 * @param {Object} c - The contact object with properties like name, lastName, and color.
 * @param {string} c.name - The name of the contact.
 * @param {string} c.lastName - The last name of the contact.
 * @param {string} c.color - The color of the contact.
 * @returns {string} - The HTML template for displaying initials in a progress card assigned contact.
 */
const progressCardInitials = (unit, c) => {
  return `<div style="left: ${unit}rem; background-color: ${c.color}" class="progress-card-assigned-contact">
  <p class="progress-card-assigned-contact-first-letter">${c.name[0]}</p>
  <p class="progress-card-assigned-contact-second-letter">${c.lastName[0]}</p>
</div>`;
};

/**
 * Generates an HTML template for a progress card displaying task information.
 *
 * @param {Object} task - The task object with properties like id, title, description, category, subtasks, img.
 * @param {number} percentDone - The percentage of task completion.
 * @param {string} assignedHTML - The HTML template for assigned contacts.
 * @param {number} subTasksDoneLength - The number of completed subtasks.
 * @param {string} categoryToRender - The background color for the category.
 * @returns {string} - The HTML template for a progress card.
 */
const progressCard = (
  task,
  percentDone,
  assignedHTML,
  subTasksDoneLength,
  categoryToRender
) => {
  let html = "";

  if (task.subtasks.length > 0) {
    html = `<div class="progress-percent-container"><div style="width: ${percentDone}%" class="progress-percent-status"></div></div><p class="progress-percent-status-info"><span>${subTasksDoneLength}/${task.subtasks.length}</span> Subtasks</p>`;
  }
  return `
  <div data-id="${task.id}" draggable="true" ondragstart="drag(${
    task.id
  })" class="progress-card">
      <div id="progress-card-container">
      <div class="progress-card-head">
        <div style="background: ${categoryToRender}" class="progress-card-category">
         <p>${task.category}</p>
        </div> 
        <img class="progress-card-head-img" data-id="${
          task.id
        }" data-progress="${
    task.progress
  }" src="./assets/img/arrow-dropdown-down.svg" />
      
      </div> 

      <div class="progress-card-title-description-container">
          <div class="progress-card-title">
              <p>${task.title[0].toUpperCase()}${task.title
    .slice(1)
    .toLowerCase()}</p>
          </div>

          <div class="progress-card-description">
              <p>${task.description[0].toUpperCase()}${task.description
    .slice(1)
    .toLowerCase()}</p>
          </div>
      </div>

      <div class="progress-card-subtasks-status">
        ${html}
      </div>

      <div class="progress-assigned-contacts">
          <div class="progress-card-assigned-contacts">${assignedHTML}</div>
          <img src="./assets/img/${task.img.toLowerCase()}" alt="Progress image" />
      </div>
      </div>

      <div class="progress-card-head-modal">
        <img onclick="closeCardProgressModal(event)" src="./assets/img/cancel-close.svg" />
        <div class="progress-modal-container"></div>
      </div>
  </div>`;
};

/**
 * Generates an HTML template for displaying assigned information in a modal.
 *
 * @param {Object} a - The assigned object with properties like name, lastName, color.
 * @param {string} a.name - The name of the assigned person.
 * @param {string} a.lastName - The last name of the assigned person.
 * @param {string} a.color - The color associated with the assigned person.
 * @returns {string} - The HTML template for displaying assigned information in a modal.
 */
const assignedTo = (a) => {
  return `<div class="modal-assigned-to">
  <div style="background-color: ${a.color}" class="modal-assigned-to-initials">
    <p>${a.name[0]}${a.name[0].slice(1).toLowerCase()}</p>
    <p>${a.lastName[0]}${a.lastName[0].slice(1).toLowerCase()}</p>
  </div>

  <div class="modal-assigned-full-name">
    <p>${a.name} ${a.lastName}</p>
  </div>
</div>`;
};
