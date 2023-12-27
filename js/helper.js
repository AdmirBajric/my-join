/**
 * Retrieves a collection of DOM elements selected by their IDs for use in the application.
 * The elements include various UI components such as buttons, images, and containers.
 * @returns {HTMLElement[]} An array of selected DOM elements.
 */
const selectedIndexElements = () => {
  const body = document.querySelector("body");
  const logIn = document.querySelector("#log-in");
  const footer = document.querySelector("#footer");
  const logoBigImg = document.querySelector("#logo-big img");
  const registerContainer = document.querySelector("#register-container");
  const logInAssistanceImg = document.querySelector("#log-in-assistance-img");
  const privacyPolicyImg = document.querySelector("#privacy-policy-img");
  const forgotPasswordSectionContainer = document.querySelector(
    "#forgot-password-section-container"
  );
  const resetPasswordSectionContainer = document.querySelector(
    "#reset-password-section-container"
  );
  const loginSectionContainer = document.querySelector(
    "#login-section-container"
  );
  const logInForgotPasswordImg = document.querySelector(
    "#log-in-forgot-password-img"
  );
  const signupSectionContainer = document.querySelector(
    "#signup-section-container"
  );

  return [
    logInAssistanceImg,
    logInForgotPasswordImg,
    footer,
    logoBigImg,
    body,
    registerContainer,
    logIn,
    loginSectionContainer,
    forgotPasswordSectionContainer,
    resetPasswordSectionContainer,
    privacyPolicyImg,
    signupSectionContainer,
  ];
};

/**
 * Retrieves DOM elements related to the Forgot Password functionality.
 * @returns {HTMLElement[][]} An array containing two arrays of selected DOM elements:
 * 1. Array of back buttons.
 * 2. Array of back images.
 */
const selectedForgotPasswordElements = () => {
  const forgotPasswordBackBtn = document.querySelectorAll(".back-btn");
  const forgotPasswordBackImg = document.querySelectorAll(".back-img");

  return [forgotPasswordBackBtn, forgotPasswordBackImg];
};

/**
 * Retrieves DOM elements related to adding a task.
 * @returns {{
 *   addTaskTitleInput: HTMLElement[],
 *   textarea: HTMLElement[],
 *   dateCalendar: HTMLElement[],
 *   titleErrMsg: HTMLElement,
 *   descriptionErrMsg: HTMLElement,
 *   dateErrMsg: HTMLElement,
 *   taskAddedToBoard: HTMLElement[],
 *   assignedContactsImg: HTMLElement[],
 *   addTaskCategoryList: HTMLElement[],
 *   selectCategoryImg: HTMLElement[],
 *   addTaskAssignedContactsInfo: HTMLElement[],
 *   addTaskAssignedContactsInput: HTMLElement[],
 *   addTaskSelectedContacts: HTMLElement[],
 *   addTaskAllContacts: HTMLElement[]
 * }} An object containing various selected DOM elements.
 */
const selectedAddTaskElements = () => {
  const elements = {
    addTaskTitleInput: document.querySelectorAll(".add-task-title-input"),
    textarea: document.querySelectorAll(".add-task-textarea-description"),
    dateCalendar: document.querySelectorAll(".date-calendar"),
    titleErrMsg: document.querySelector(".add-task-title-err-msg"),
    descriptionErrMsg: document.querySelector(".add-task-description-err-msg"),
    dateErrMsg: document.querySelector(".add-task-date-err-msg"),
    taskAddedToBoard: document.querySelectorAll(".task-added-to-board"),
    assignedContactsImg: document.querySelectorAll(".assigned-contacts-img"),
    addTaskCategoryList: document.querySelectorAll(".add-task-category-list"),
    selectCategoryImg: document.querySelectorAll(".select-category-img"),
    addTaskAssignedContactsInfo: document.querySelectorAll(
      ".add-task-assigned-contacts-info"
    ),
    addTaskAssignedContactsInput: document.querySelectorAll(
      ".add-task-assigned-contacts-input"
    ),
    addTaskSelectedContacts: document.querySelectorAll(
      ".add-task-selected-contacts"
    ),
    addTaskAllContacts: document.querySelectorAll(".add-task-all-contacts"),
  };

  return elements;
};

/**
 * Retrieves DOM elements related to events in the "Add Task" functionality.
 * @returns {{
 *   addTaskSelectSubtasksBtnClear: HTMLElement[],
 *   addTaskSelectSubtasksBtnDone: HTMLElement[],
 *   addTaskSelectSubtasksImg: HTMLElement[],
 *   assignedContactsImg: HTMLElement[],
 *   addTaskSelectSubtasksInput: HTMLElement[],
 *   date: HTMLElement[],
 *   dateContainer: HTMLElement[],
 *   dateCalendar: HTMLElement[],
 *   selectCategoryImg: HTMLElement[]
 * }} An object containing various selected DOM elements.
 */
const selectedAddTaskEventElements = () => {
  const elements = {
    addTaskSelectSubtasksBtnClear: document.querySelectorAll(
      ".add-task-select-subtasks-btn-clear"
    ),
    addTaskSelectSubtasksBtnDone: document.querySelectorAll(
      ".add-task-select-subtasks-btn-done"
    ),
    addTaskSelectSubtasksImg: document.querySelectorAll(
      ".add-task-select-subtasks-img"
    ),
    assignedContactsImg: document.querySelectorAll(".assigned-contacts-img"),
    addTaskSelectSubtasksInput: document.querySelectorAll(
      ".add-task-select-subtasks-input"
    ),
    date: document.querySelectorAll(".date-img"),
    dateContainer: document.querySelectorAll(".date"),
    dateCalendar: document.querySelectorAll(".date-calendar"),
    selectCategoryImg: document.querySelectorAll(".select-category-img"),
  };

  return elements;
};

/**
 * Retrieves DOM elements related to subtasks in the "Add Task" functionality.
 * @returns {{
 *   subtaskInputValue: HTMLElement[],
 *   subtaskInputContainer: HTMLElement[],
 *   addTaskSelectSubtasksImg: HTMLElement[],
 *   addTaskSelectSubtasksBtn: HTMLElement[],
 *   addTaskSelectSubtasksInput: HTMLElement[]
 * }} An object containing various selected DOM elements.
 */
const selectedSubTaskElements = () => {
  const elements = {
    subtaskInputValue: document.querySelectorAll(
      ".add-task-select-subtasks-input"
    ),
    subtaskInputContainer: document.querySelectorAll(
      ".add-task-subtasks-container"
    ),
    addTaskSelectSubtasksImg: document.querySelectorAll(
      ".add-task-select-subtasks-img"
    ),
    addTaskSelectSubtasksBtn: document.querySelectorAll(
      ".add-task-select-subtasks-btn"
    ),
    addTaskSelectSubtasksInput: document.querySelectorAll(
      ".add-task-select-subtasks-input"
    ),
  };

  return elements;
};

/**
 * Retrieves DOM elements related to task categories in the "Add Task" functionality.
 * @returns {{
 *   addTaskCategoryList: HTMLElement[],
 *   addTaskSelectCategory: HTMLElement[],
 *   selectCategoryImg: HTMLElement[]
 * }} An object containing various selected DOM elements.
 */
const selectedCategoryElements = () => {
  const elements = {
    addTaskCategoryList: document.querySelectorAll(".add-task-category-list"),
    addTaskSelectCategory: document.querySelectorAll(
      ".add-task-select-category p"
    ),
    selectCategoryImg: document.querySelectorAll(".select-category-img"),
  };

  return elements;
};

/**
 * Retrieves DOM elements related to task priority levels in the "Add Task" functionality.
 * @returns {{
 *   urgentImg: HTMLElement[],
 *   mediaImg: HTMLElement[],
 *   lowImg: HTMLElement[],
 *   priorityUrgent: HTMLElement[],
 *   priorityMedium: HTMLElement[],
 *   priorityLow: HTMLElement[]
 * }} An object containing various selected DOM elements.
 */
const selectedUrgentImgElements = () => {
  const elements = {
    urgentImg: document.querySelectorAll(".urgent-img"),
    mediaImg: document.querySelectorAll(".media-img"),
    lowImg: document.querySelectorAll(".low-img"),
    priorityUrgent: document.querySelectorAll(".priority-urgent"),
    priorityMedium: document.querySelectorAll(".priority-medium"),
    priorityLow: document.querySelectorAll(".priority-low"),
  };

  return elements;
};

/**
 * Retrieves DOM elements related to clearing the "Add Task" form.
 * @returns {{
 *   addTaskTitleInput: HTMLElement[],
 *   addTaskTextarea: HTMLElement[],
 *   dateCalendar: HTMLElement[],
 *   addTaskSelectedContacts: HTMLElement[],
 *   addTaskSelectCategory: HTMLElement[],
 *   addTaskSubtasksContainer: HTMLElement[]
 * }} An object containing various selected DOM elements.
 */
const selectedClearFormElements = () => {
  const elements = {
    addTaskTitleInput: document.querySelectorAll(".add-task-title-input"),
    addTaskTextarea: document.querySelectorAll(
      ".add-task-textarea-description"
    ),
    dateCalendar: document.querySelectorAll(".date-calendar"),
    addTaskSelectedContacts: document.querySelectorAll(
      ".add-task-selected-contacts"
    ),
    addTaskSelectCategory: document.querySelectorAll(
      ".add-task-select-category p"
    ),
    addTaskSubtasksContainer: document.querySelectorAll(
      ".add-task-subtasks-container"
    ),
  };

  return elements;
};
