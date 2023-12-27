/**
 * Shows the summary section.
 */
const showSummary = async () => {
  await clearActiveState();
  await changeActiveState("summary");
  await renderSummaryUser();
  await modalCloseOnClick();
  await setActiveState("#side-bar-menu-summary");
  await backToSummary("summary-container");
  await renderSummaryUser();
};

/**
 * Shows the add task section.
 */
const showAddTask = async () => {
  const addTaskContainer = document.querySelector("#add-task-container");
  await clearActiveState();
  await changeActiveState("add-task");
  await modalCloseOnClick();
  await clearInputsFields();
  await setActiveState("#side-bar-menu-addtasks");
  await closeAllContainersScreens();
  await showScreen(addTaskContainer);
  await priorityLow();
};

/**
 * Shows the board section.
 */
const showBoard = async () => {
  const boardContainer = document.querySelector("#board-container");
  await checkAgentState();
  await addEventListeners();
  await addProgressMobile();
  await clearInputsFields();
  await clearActiveState();
  await changeActiveState("board");
  await setActiveState("#side-bar-menu-board");
  await closeAllContainersScreens();
  await showScreen(boardContainer);
};

/**
 * Shows the contacts section.
 */
const showContacts = async () => {
  const contactsContainer = document.querySelector("#contacts-container");
  await clearActiveState();
  await changeActiveState("contacts");
  await modalCloseOnClick();
  await setActiveState("#side-bar-menu-contacts");
  await closeAllContainersScreens();
  await showScreen(contactsContainer);
};

/**
 * Shows the privacy policy section.
 */
const showPrivacyPolicy = async () => {
  const privacyPolicyContainer = document.querySelector("#privacy-policy-container");
  const sideBarFooterPrivacyPolicy = document.querySelector("#side-bar-footer-privacy-policy");

  await clearActiveState();
  await closeAllContainersScreens();
  await closeSideBarMenu();
  await showScreen(privacyPolicyContainer);
  await addBackground(sideBarFooterPrivacyPolicy);
};

/**
 * Shows the legal notice section.
 */
const showLegalNotice = async () => {
  const legalNoticeContainer = document.querySelector("#legal-notice-container");
  const sideBarFooterLegalNotice = document.querySelector("#side-bar-footer-legal-notice");

  await clearActiveState();
  await closeAllContainersScreens();
  await closeSideBarMenu();
  await showScreen(legalNoticeContainer);
  await addBackground(sideBarFooterLegalNotice);
};

/**
 * Adds a background class to the specified element.
 * @param {HTMLElement} element - The HTML element to which the background class will be added.
 */
const addBackground = async (element) => {
  element.classList.add("side-bar-footer-background");
};

/**
 * Clears the active state for all side bar menu items.
 */
const clearActiveState = async () => {
  const sideBarMenuSummary = document.querySelector("#side-bar-menu-summary");
  const sideBarMenuAddTasks = document.querySelector("#side-bar-menu-addtasks");
  const sideBarMenuBoard = document.querySelector("#side-bar-menu-board");
  const sideBarMenuContacts = document.querySelector("#side-bar-menu-contacts");
  const sideBarFooterPrivacyPolicy = document.querySelector("#side-bar-footer-privacy-policy");
  const sideBarFooterLegalNotice = document.querySelector("#side-bar-footer-legal-notice");
  await clearActiveStateElement(sideBarMenuSummary, "./assets/img/menu-summary.svg");
  await clearActiveStateElement(sideBarMenuAddTasks, "./assets/img/menu-task.svg");
  await clearActiveStateElement(sideBarMenuBoard, "./assets/img/menu-board.svg");
  await clearActiveStateElement(sideBarMenuContacts, "./assets/img/menu-contacts.svg");
  sideBarFooterPrivacyPolicy.classList.remove("side-bar-footer-background");
  sideBarFooterLegalNotice.classList.remove("side-bar-footer-background");
};

/**
 * Clears the background color of the active state for a specific element.
 * @param {HTMLElement} element - The HTML element to clear the active state background.
 */
const clearActiveStateElement = async (element, img) => {
  element.style.backgroundColor = "var(--white)";
  element.querySelector("p").style.color = "var(--footerLinks)";
  element.querySelector("img").src = img;
};

/**
 * Sets the active state for a specific element by changing its background color and border radius.
 * @param {string} element - The CSS selector for the HTML element to set as active.
 */
const setActiveState = async (element) => {
  const domElement = document.querySelector(element);
  domElement.style.backgroundColor = "var(--menuBackGround)";
  domElement.style.borderRadius = "0.8rem";
  domElement.querySelector("p").style.color = "var(--mainColor)";
};

/**
 * Closes the summary container by setting its display style to "none".
 * @returns {void}
 */
const closeSummaryContainer = async () => {
  const summaryContainer = document.querySelector("#summary-container");
  summaryContainer.style.display = "none";
};

/**
 * Closes the summary container by setting its display style to "none".
 * @returns {void}
 */
const closeHelpContainer = async () => {
  const helpContainer = document.querySelector("#help-container");
  helpContainer.style.display = "none";
};

/**
 * Closes the summary container by setting its display style to "none".
 * @returns {void}
 */
const closePrivacyPolicyContainer = async () => {
  const privacyPolicyContainer = document.querySelector("#privacy-policy-container");
  privacyPolicyContainer.style.display = "none";
};

/**
 * Closes the summary container by setting its display style to "none".
 * @returns {void}
 */
const closeLegalNoticeContainer = async () => {
  const legalNoticeContainer = document.querySelector("#legal-notice-container");
  legalNoticeContainer.style.display = "none";
};

/**
 * Closes the summary container by setting its display style to "none".
 * @returns {void}
 */
const closeContactsContainer = async () => {
  const contactsContainer = document.querySelector("#contacts-container");
  contactsContainer.style.display = "none";
};

/**
 * Closes the summary container by setting its display style to "none".
 * @returns {void}
 */
const closeAddTaskContainer = async () => {
  const addTaskContainer = document.querySelector("#add-task-container");
  addTaskContainer.style.display = "none";
};

/**
 * Closes the summary container by setting its display style to "none".
 * @returns {void}
 */
const closeBoardContainer = async () => {
  const boardContainer = document.querySelector("#board-container");
  boardContainer.style.display = "none";
};

/**
 * Closes all containers/screens by setting their display property to "none".
 */
const closeAllContainersScreens = async () => {
  await closeSummaryContainer();
  await closeHelpContainer();
  await closePrivacyPolicyContainer();
  await closeLegalNoticeContainer();
  await closeContactsContainer();
  await closeAddTaskContainer();
  await closeBoardContainer();
};

/**
 * Shows the specified screen/container by setting its display property to "flex" if it's a summary, contacts, or add task container, or "block" otherwise.
 * @param {HTMLElement} element - The element to be displayed.
 */
const showScreen = async (element) => {
  if (element.id === "summary-container" || element.id === "contacts-container" || element.id === "add-task-container") {
    element.style.display = "flex";
  } else {
    element.style.display = "block";
  }
};

/**
 * Closes the side bar menu by setting its opacity to 0 and zIndex to -9999.
 */
const closeSideBarMenu = async () => {
  const sideBarMenu = document.querySelector("#side-bar-menu");
  sideBarMenu.style.opacity = 0;
  sideBarMenu.style.zIndex = -9999;
};

/**
 * Set a delayed timeout to change the background color of the summary sidebar menu.
 * @returns {void}
 */
setTimeout(() => {
  const sideBarMenuSummary = document.querySelector("#side-bar-menu-summary");
  sideBarMenuSummary.style.backgroundColor = "var(--menuBackGround)";
}, 1500);
