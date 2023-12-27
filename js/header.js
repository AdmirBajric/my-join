/**
 * Opens the help screen by manipulating the visibility of the help container.
 * Clears active states, closes all other containers/screens, and shows the help screen.
 * @returns {Promise<void>} A promise that resolves when the help screen is opened.
 */
const openHelp = async () => {
  /**
   * The DOM element representing the help container.
   * @type {HTMLElement}
   */
  const helpContainer = document.querySelector("#help-container");

  await clearActiveState();
  await closeAllContainersScreens();
  await showScreen(helpContainer);
};

/**
 * Toggles the visibility of the header menu.
 * If the menu is currently displayed, it hides it; otherwise, it displays it.
 */
const openMenu = () => {
  /**
   * The DOM element representing the header menu.
   * @type {HTMLElement}
   */
  const headerMenu = document.querySelector("#header-menu");

  if (getComputedStyle(headerMenu).display === "flex") {
    headerMenu.style.display = "none";
  } else {
    headerMenu.style.display = "flex";
  }

  if (window.innerWidth <= 820) {
    const headerMenuLinksHelp = document.querySelector("#header-menu-links-help");
    headerMenuLinksHelp.style.display = "flex";
  }
};

/**
 * Logs the user out by removing the logged-in user from local storage and redirecting to the index page.
 */
const logOut = () => {
  localStorage.removeItem("loggedInUser");
  window.location.replace("index.html");
};

/**
 * Event listener for click events on the document.
 * Closes the header menu if it is open and the click is outside the user profile container.
 * @param {MouseEvent} event - The click event.
 */
document.addEventListener("click", (event) => {
  /**
   * The DOM element representing the header menu.
   * @type {HTMLElement}
   */
  const headerMenu = document.querySelector("#header-menu");

  if (getComputedStyle(headerMenu).display === "flex") {
    /**
     * The DOM element representing the user profile container within the header.
     * @type {HTMLElement}
     */
    const userProfileContainer = document.querySelector("#header-user-profile-container");

    // Check if the click is outside the user profile container
    if (!userProfileContainer.contains(event.target)) {
      openMenu();
    }
  }
});

/**
 * Sets initials for the logged-in user after a specified timeout, based on the first and second letters of the user's first and last names.
 *
 * @function setInitialsForLoggedInUser
 * @async
 * @returns {Promise<void>} A promise that resolves once the initials are set.
 */
setTimeout(() => {
  const firstLetterInitial = document.querySelector("#users-initial-first-letter");
  const secondLetterInitial = document.querySelector("#users-initial-second-letter");

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const userName = user[0].name.split(" ");

  firstLetterInitial.textContent = userName[0][0];
  secondLetterInitial.textContent = userName[1][0];
}, 1500);
