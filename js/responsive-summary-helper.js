/**
 * Updates the appearance of a menu item based on its active state.
 *
 * @function handleChangeActiveState
 * @async
 * @param {string} active - The active menu item.
 * @param {HTMLImageElement} img - The image element representing the menu item.
 * @param {HTMLParagraphElement} paragraph - The paragraph element representing the menu item.
 * @returns {Promise<void>} A promise that resolves once the appearance is updated.
 */
const handleChangeActiveState = async (active, path, img, paragraph) => {
  // Update appearance based on the active menu item
  switch (active) {
    case "summary":
      img.src = "./assets/img/menu-summary-mobile.svg";
      paragraph.style.color = "var(--mainColor)";
      break;
    case "board":
      img.src = "./assets/img/menu-board-mobile.svg";
      paragraph.style.color = "var(--mainColor)";
      break;
    case "add-task":
      img.src = "./assets/img/menu-task-mobile.svg";
      paragraph.style.color = "var(--mainColor)";
      break;
    case "contacts":
      img.src = "./assets/img/menu-contacts-mobile.svg";
      paragraph.style.color = "var(--mainColor)";
      break;
  }
};

/**
 * Resets the appearance for the "Summary" menu item.
 *
 * @function resetAppearanceSummary
 * @async
 * @param {string} active - The active menu item.
 * @param {HTMLImageElement} summaryImg - The image element representing the "Summary" menu item.
 * @param {HTMLParagraphElement} summaryParagraph - The paragraph element representing the "Summary" menu item.
 * @returns {Promise<void>} A promise that resolves once the appearance is reset.
 */
const resetAppearanceSummary = async (active, img, summaryImg, summaryParagraph) => {
  // Reset appearance for the "Summary" menu item
  summaryImg.src = img;
  summaryParagraph.style.color = "var(--footerLinks)";
  if (window.innerWidth <= 820) {
    await handleChangeActiveState(active, img, summaryImg, summaryParagraph);
  }
};

/**
 * Resets the appearance for the "Board" menu item.
 *
 * @function resetAppearanceBoard
 * @async
 * @param {string} active - The active menu item.
 * @param {HTMLImageElement} boardImg - The image element representing the "Board" menu item.
 * @param {HTMLParagraphElement} boardParagraph - The paragraph element representing the "Board" menu item.
 * @returns {Promise<void>} A promise that resolves once the appearance is reset.
 */
const resetAppearanceBoard = async (active, img, boardImg, boardParagraph) => {
  // Reset appearance for the "Board" menu item
  boardImg.src = img;
  boardParagraph.style.color = "var(--footerLinks)";
  if (window.innerWidth <= 820) {
    await handleChangeActiveState(active, img, boardImg, boardParagraph);
  }
};

/**
 * Resets the appearance for the "Add Task" menu item.
 *
 * @function resetAppearanceAddTask
 * @async
 * @param {string} active - The active menu item.
 * @param {HTMLImageElement} addTaskImg - The image element representing the "Add Task" menu item.
 * @param {HTMLParagraphElement} addTaskParagraph - The paragraph element representing the "Add Task" menu item.
 * @returns {Promise<void>} A promise that resolves once the appearance is reset.
 */
const resetAppearanceAddTask = async (active, img, addTaskImg, addTaskParagraph) => {
  // Reset appearance for the "Add Task" menu item
  addTaskImg.src = img;
  addTaskParagraph.style.color = "var(--footerLinks)";
  if (window.innerWidth <= 820) {
    await handleChangeActiveState(active, img, addTaskImg, addTaskParagraph);
  }
};

/**
 * Resets the appearance for the "Contacts" menu item.
 *
 * @function resetAppearanceContacts
 * @async
 * @param {string} active - The active menu item.
 * @param {HTMLImageElement} contactsImg - The image element representing the "Contacts" menu item.
 * @param {HTMLParagraphElement} contactsParagraph - The paragraph element representing the "Contacts" menu item.
 * @returns {Promise<void>} A promise that resolves once the appearance is reset.
 */
const resetAppearanceContacts = async (active, img, contactsImg, contactsParagraph) => {
  // Reset appearance for the "Contacts" menu item
  contactsImg.src = img;
  contactsParagraph.style.color = "var(--footerLinks)";
  if (window.innerWidth <= 820) {
    await handleChangeActiveState(active, img, contactsImg, contactsParagraph);
  }
};

/**
 * Changes the active state in the sidebar menu, updating the visual appearance of menu items.
 * @param {string} active - The identifier of the active menu item ("summary", "board", "add-task", or "contacts").
 * @returns {void}
 */
const changeActiveState = async (active) => {
  switch (active) {
    case "summary":
      // Get elements for the "Summary" menu item
      const sideBarMenuSummaryImg = document.querySelector("#side-bar-menu-summary img");
      const sideBarMenuSummaryParagraph = document.querySelector("#side-bar-menu-summary p");
      await resetAppearanceSummary("summary", "./assets/img/menu-summary.svg", sideBarMenuSummaryImg, sideBarMenuSummaryParagraph);
      break;
    case "board":
      // Get elements for the "Board" menu item
      const sideBarMenuBoardImg = document.querySelector("#side-bar-menu-board img");
      const sideBarMenuBoardParagraph = document.querySelector("#side-bar-menu-board p");
      await resetAppearanceBoard("board", "./assets/img/menu-board.svg", sideBarMenuBoardImg, sideBarMenuBoardParagraph);
      break;
    case "add-task":
      // Get elements for the "Add Task" menu item
      const sideBarMenuAddTaskImg = document.querySelector("#side-bar-menu-addtasks img");
      const sideBarMenuAddTaskParagraph = document.querySelector("#side-bar-menu-addtasks p");
      await resetAppearanceAddTask("add-task", "./assets/img/menu-task.svg", sideBarMenuAddTaskImg, sideBarMenuAddTaskParagraph);
      break;
    case "contacts":
      // Get elements for the "Contacts" menu item
      const sideBarMenuContactsImg = document.querySelector("#side-bar-menu-contacts img");
      const sideBarMenuContactsParagraph = document.querySelector("#side-bar-menu-contacts p");
      await resetAppearanceContacts("contacts", "./assets/img/menu-contacts.svg", sideBarMenuContactsImg, sideBarMenuContactsParagraph);
      break;
  }
};

/**
 * Invokes the startGreeting function to display a personalized greeting.
 * @returns {void}
 */
const greeting = async () => {
  await startGreeting();
};

/**
 * Handles responsiveness for the summary page, specifically updating the active state for mobile view.
 * @returns {void}
 */
const summaryResponsive = async () => {
  // Set a timeout to check the window width and update active state for mobile view
  setTimeout(async () => {
    if (window.innerWidth <= 820) {
      await changeActiveState("summary");
    }
  }, 1400);
};

/**
 * Removes the child elements related to contact options and closes the contact information modal.
 *
 * @function removeChild
 * @async
 * @param {boolean} [clickedOnImg] - A flag indicating whether the removal was triggered by clicking on an image.
 * @returns {Promise<void>} A promise that resolves once the child elements are removed.
 */
const removeChild = async (clickedOnImg) => {
  if (contactMobileOpen) {
    const containerRight = document.querySelector("#contacts-container-right");
    const optionsEditDelete = document.querySelector("#options-edit-delete");
    const mainDiv = document.querySelector("#options-edit-delete-modal");
    const closeDiv = document.querySelector("#close-contact-info");

    containerRight?.removeChild(optionsEditDelete);
    containerRight?.removeChild(closeDiv);
    containerRight?.removeChild(mainDiv);

    if (clickedOnImg) {
      const containerLeft = document.querySelector("#contacts-container-left");
      const containerRight = document.querySelector("#contacts-container-right");
      containerLeft.style.display = "flex";
      containerRight.style.display = "none";
    }
  }
};

/**
 * Hides the left container and displays the right container.
 *
 * @function hideLeftDisplayRight
 * @async
 * @param {HTMLElement} containerLeft - The left container element.
 * @param {HTMLElement} containerRight - The right container element.
 * @returns {Promise<void>} A promise that resolves once the containers are updated.
 */
const hideLeftDisplayRight = async (containerLeft, containerRight) => {
  // Hide the left container and display the right container
  containerLeft.style.display = "none";
  containerRight.style.display = "flex";
};

/**
 * Cuts and moves the options (edit and delete) element to the right container.
 *
 * @function cutAndMoveElement
 * @async
 * @param {HTMLElement} containerRight - The right container element.
 * @returns {Promise<void>} A promise that resolves once the element is cut and moved.
 */
const cutAndMoveElement = async (containerRight) => {
  // Cut and move the options (edit and delete) element
  const elementToCut = document.querySelector("#profile-name-lastname #options-edit-delete");

  elementToCut.parentNode.removeChild(elementToCut);
  containerRight.appendChild(elementToCut);
};

/**
 * Creates and appends a modal trigger element for options (edit and delete) to the specified container.
 *
 * @function createAppendElement
 * @async
 * @param {HTMLElement} containerRight - The container element to which the modal trigger element will be appended.
 * @returns {Promise<void>} A promise that resolves once the element is created and appended.
 */
const createAppendElement = async (containerRight) => {
  // Create and append a modal trigger element for options (edit and delete)
  const mainDiv = document.createElement("div");
  mainDiv.id = "options-edit-delete-modal";

  const imgElement = document.createElement("img");
  imgElement.src = "./assets/img/dots-menu.svg";
  imgElement.alt = "Image Dots Modal";

  mainDiv.appendChild(imgElement);
  containerRight.appendChild(mainDiv);

  // Set a click event for the modal trigger to show the options (edit and delete)
  mainDiv.onclick = async () => {
    const elementToShow = document.querySelector("#options-edit-delete");
    elementToShow.style.right = "3rem";
  };
};

/**
 * Creates and appends a close button for the contact information to the specified container.
 *
 * @function createAppendCloseButton
 * @async
 * @param {HTMLElement} containerRight - The container element to which the close button will be appended.
 * @returns {Promise<void>} A promise that resolves once the close button is created and appended.
 */
const createAppendCloseButton = async (containerRight) => {
  // Create and append a close button for the contact information
  const closeDiv = document.createElement("div");
  closeDiv.id = "close-contact-info";

  const img = document.createElement("img");
  img.src = "./assets/img/arrow-left.svg";
  img.alt = "Image arrow left";

  closeDiv.appendChild(img);
  containerRight.appendChild(closeDiv);

  // Set a click event for the close button to revert to the original layout
  closeDiv.onclick = async () => await removeChild(true);
};

/**
 * Adds hover effects to the close button for contact information.
 *
 * @function addHoverEffectsToCloseButton
 * @async
 * @returns {Promise<void>} A promise that resolves once the hover effects are added.
 */

const addHoverEffectsToCloseButton = async () => {
  // Add hover effects to the close button
  const imgClose = document.querySelector("#close-contact-info img");
  imgClose.addEventListener("mouseover", async () => {
    imgClose.src = "./assets/img/arrow-left-hover.svg";
  });

  imgClose.addEventListener("mouseout", async () => {
    imgClose.src = "./assets/img/arrow-left.svg";
  });
};

/**
 * Displays contact information in a mobile-responsive manner.
 * Moves and rearranges elements to fit the mobile layout.
 * @returns {void}
 */
const showContactMobile = async () => {
  contactMobileOpen = true;
  // Get container elements
  const containerLeft = document.querySelector("#contacts-container-left");
  const containerRight = document.querySelector("#contacts-container-right");
  // Check if the window width is less than or equal to 820 pixels
  if (window.innerWidth <= 820) {
    await hideLeftDisplayRight(containerLeft, containerRight);

    // Set a timeout to rearrange and display contact information
    setTimeout(async () => {
      await cutAndMoveElement(containerRight);
      await createAppendElement(containerRight);
      await createAppendCloseButton(containerRight);
      await addHoverEffectsToCloseButton();
    }, 300);
  }
};
