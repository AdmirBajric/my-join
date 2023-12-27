/**
 * Collection of elements selected by their IDs for various functionalities in the login and registration process.
 * @type {Array<HTMLElement>}
 */
const [
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
] = selectedIndexElements();

/**
 * Flag indicating whether the `setLocalStorage` function has been called.
 * @type {boolean}
 */
let called = false;
let backPath = "index";

/**
 * Flag indicating whether the privacy policy is accepted.
 * @type {boolean}
 */
let privacyPolicy = false;

/**
 * Initializes the login and registration process.
 * If `setLocalStorage` has not been called, it is called.
 * Applies animations and styling to various elements.
 * @async
 * @function
 */
const init = async () => {
  if (!called) {
    await setLocalStorage();
  }

  logoBigImg.style.animation = "moveAndResizeImage 700ms ease-in-out";

  setTimeout(() => {
    body.style.backgroundColor = "var(--white)";
    registerContainer.style.display = "flex";
    logIn.style.display = "flex";
    footer.style.display = "flex";
  }, 700);
};

/**
 * Sets local storage items based on the retrieved data from the API.
 * Toggles the `called` flag.
 * @async
 * @function
 */
const setLocalStorage = async () => {
  called = !called;
  const users = await getItem("users");
  const contacts = await getItem("contacts");
  const category = await getItem("category");
  const tasks = await getItem("tasks");

  localStorage.setItem("users", users.data.value);
  localStorage.setItem("contacts", contacts.data.value);
  localStorage.setItem("category", category.data.value);
  localStorage.setItem("tasks", tasks.data.value);
};

/**
 * Handles the mouseover event for checkboxes, changing the source URL to the hover state.
 * @param {HTMLImageElement} element - The checkbox element.
 */
const onMouseOver = (element) => {
  if (element.src === "https://join.admir-bajric.de/assets/img/checkbox-empty.svg") {
    element.src = "./assets/img/checkbox-hover.svg";
  } else {
    element.src = "./assets/img/checkbox-hover-checked.svg";
  }
};

/**
 * Handles the mouseout event for checkboxes, changing the source URL to the default state.
 * @param {HTMLImageElement} element - The checkbox element.
 */
const onMouseOut = (element) => {
  if (element.src === "https://join.admir-bajric.de/assets/img/checkbox-hover.svg") {
    element.src = "./assets/img/checkbox-empty.svg";
  }
};

/**
 * Handles the click event for checkboxes, toggling between checked and unchecked states.
 * @param {HTMLImageElement} element - The checkbox element.
 */
const onClickCheckBox = (element) => {
  if (element.src === "https://join.admir-bajric.de/assets/img/checkbox-hover.svg") {
    element.src = "./assets/img/checkbox-checked.svg";
  } else {
    element.src = "./assets/img/checkbox-empty.svg";
  }
};

/**
 * Adds event listeners for mouseover, mouseout, and click events to handle checkbox interactions.
 */

// Event listeners for logInAssistanceImg
logInAssistanceImg.addEventListener("mouseover", () => onMouseOver(logInAssistanceImg));
logInAssistanceImg.addEventListener("mouseout", () => onMouseOut(logInAssistanceImg));
logInAssistanceImg.addEventListener("click", () => onClickCheckBox(logInAssistanceImg));

// Event listeners for privacyPolicyImg
privacyPolicyImg.addEventListener("mouseover", () => onMouseOver(privacyPolicyImg));
privacyPolicyImg.addEventListener("mouseout", () => onMouseOut(privacyPolicyImg));
privacyPolicyImg.addEventListener("click", () => {
  onClickCheckBox(privacyPolicyImg);
  privacyPolicy = !privacyPolicy;
});

// Event listeners for logInForgotPasswordImg
logInForgotPasswordImg.addEventListener("mouseover", () => {
  logInForgotPasswordImg.src = "./assets/img/forgot-password-hover.svg";
});

logInForgotPasswordImg.addEventListener("mouseout", () => {
  logInForgotPasswordImg.src = "./assets/img/forgot-password.svg";
});

/**
 * Clears the login form inputs.
 */
const clearLogInInputs = async () => {
  const logInFormEmail = document.querySelector("#log-in-form-email");
  const logInFormPassword = document.querySelector("#log-in-form-password");
  logInFormEmail.value = "";
  logInFormPassword.value = "";
};

/**
 * Checks if a user exists based on the provided filtered user data. If the user exists, it sets the user in local storage and redirects to the summary page. Otherwise, it displays an error message, resets login inputs, switches to the sign-up screen, and focuses on the sign-up name input.
 *
 * @function IfUserExists
 * @async
 * @param {Array} filteredUser - The filtered user data based on login credentials.
 * @returns {Promise<void>} A promise that resolves once the user check and related actions are completed.
 */
const IfUserExists = async (filteredUser) => {
  if (filteredUser.length > 0) {
    localStorage.setItem("loggedInUser", JSON.stringify(filteredUser));
    window.location.replace("summary.html");
  } else {
    const logInError = document.querySelector("#log-in-error-modal");
    logInError.style.top = "calc(20% - 8.9rem)";

    setTimeout(async () => {
      logInError.style.top = "-15%";
    }, 1500);

    setTimeout(async () => {
      await clearLogInInputs();
      const signUpName = document.querySelector("#sign-up-name");
      signUpName.focus();
    }, 2000);
  }
};

/**
 * Validates user credentials and redirects to the summary page if the user is valid.
 * Displays an error message and switches to the sign-up screen if the credentials are invalid.
 */
const loginUser = async () => {
  const loginFormEmail = document.querySelector("#log-in-form-email");
  const loginFormPassword = document.querySelector("#log-in-form-password");
  const users = JSON.parse(localStorage.getItem("users"));

  const filteredUser = users.filter((user) => {
    if (user.email === loginFormEmail.value.toLowerCase() && user.password === loginFormPassword.value.toLowerCase() && user.guest != true) {
      return user;
    }
  });
  await IfUserExists(filteredUser);
};

/**
 * Logs in as a guest user and redirects to the summary page.
 */
const guestLogIn = () => {
  const guestUser = [
    {
      email: "guest@gmail.com",
      guest: true,
      id: "0",
      name: "Guest User",
      password: "123456789",
    },
  ];
  localStorage.setItem("loggedInUser", JSON.stringify(guestUser));
  window.location.replace("summary.html");
};

/**
 * Displays the forgot password screen and hides the login screen.
 */
const showForgotPasswordScreen = () => {
  loginSectionContainer.style.display = "none";
  forgotPasswordSectionContainer.style.display = "flex";
};

/**
 * Displays the sign-up screen and hides the login screen.
 */
const signUpScreen = async () => {
  await addBackButtonEventListeners();
  loginSectionContainer.style.display = "none";
  signupSectionContainer.style.display = "flex";
};

/**
 * Toggles the visibility of the login screen based on the provided expression.
 * @param {boolean} expression - If true, hides the login screen; if false, shows the login screen.
 */
const toggleLoginScreen = async (expression) => {
  const loginSectionContainer = document.querySelector("#login-section-container");
  if (expression) {
    loginSectionContainer.style.display = "none";
  } else {
    loginSectionContainer.style.display = "flex";
  }
};

/**
 * Toggles the display of the sign-up screen container based on the provided expression. If the expression is true, it hides the sign-up screen; otherwise, it displays it.
 *
 * @function toggleSignUpScreen
 * @async
 * @param {boolean} expression - The boolean expression to determine whether to show or hide the sign-up screen.
 * @returns {Promise<void>} A promise that resolves once the display toggle is completed.
 */
const toggleSignUpScreen = async (expression) => {
  const signUpSectionContainer = document.querySelector("#signup-section-container");
  if (expression) {
    signUpSectionContainer.style.display = "none";
  } else {
    signUpSectionContainer.style.display = "flex";
  }
};

/**
 * Toggles the visibility of the privacy policy screen based on the provided expression.
 * @param {boolean} expression - If true, hides the privacy policy screen; if false, shows the privacy policy screen.
 */
const togglePrivacyPolicyScreen = async (expression) => {
  const privacyPolicyIndexContainer = document.querySelectorAll("#privacy-policy-index-container");

  const privacyPolicyIndexSideBarFooter = document.querySelectorAll("#privacy-policy-side-bar-footer");
  privacyPolicyIndexSideBarFooter.forEach((a) => {
    a.classList.toggle("active-state");
  });

  if (expression) {
    privacyPolicyIndexContainer.forEach((a) => {
      a.style.display = "none";
    });
  } else {
    privacyPolicyIndexContainer.forEach((b) => {
      b.style.display = "flex";
    });
  }
};

/**
 * Toggles the visibility of the legal notice screen based on the provided expression.
 * @param {boolean} expression - If true, hides the legal notice screen; if false, shows the legal notice screen.
 */
const toggleLegalNoticeScreen = async (expression) => {
  const legalNoticeIndexContainer = document.querySelectorAll("#legal-notice-index-container");

  const legalNoticeIndexSideBarFooter = document.querySelectorAll("#legal-notice-side-bar-footer");
  legalNoticeIndexSideBarFooter.forEach((a) => {
    a.classList.toggle("active-state");
  });

  if (expression) {
    legalNoticeIndexContainer.forEach((a) => {
      a.style.display = "none";
    });
  } else {
    legalNoticeIndexContainer.forEach((b) => {
      b.style.display = "flex";
    });
  }
};

/**
 * Changes the source of the provided image element to the hover version on mouseover and back on mouseout.
 * @param {HTMLImageElement} imageElement - The image element to apply the hover effect.
 */
const applyHoverEffect = async (imageElement) => {
  imageElement.addEventListener("mouseover", async () => {
    imageElement.src = "./assets/img/arrow-left-hover.svg";
  });

  imageElement.addEventListener("mouseout", async () => {
    imageElement.src = "./assets/img/arrow-left.svg";
  });
};

/**
 * Applies the hover effect to all images with the class "index-help-header-img".
 */
const privacyPolicyOnHoverImg = async () => {
  const indexHelpHeaderImg = document.querySelectorAll(".index-help-header-img");

  indexHelpHeaderImg.forEach((a) => {
    applyHoverEffect(a);
  });
};

/**
 * Toggles the login screen, applies hover effect to specific images, and shows the privacy policy screen.
 */
const privacyPolicyIndex = async (path) => {
  backPath = path;
  if (window.innerWidth <= 820) {
    const privacyPolicyIndexSideBar = document.querySelector("#privacy-policy-index-side-bar");
    privacyPolicyIndexSideBar.style.display = "none";
  }
  if (path === "index") {
    await toggleLoginScreen(true);
  } else {
    await toggleSignUpScreen(true);
  }
  await privacyPolicyOnHoverImg();
  await togglePrivacyPolicyScreen(false);
};

/**
 * Toggles the login screen, applies hover effect to specific images, and shows the legal notice screen.
 */
const legalNoticeIndex = async (path) => {
  backPath = path;
  if (window.innerWidth <= 820) {
    const legalNoticeIndexSideBar = document.querySelector("#legal-notice-index-side-bar");
    legalNoticeIndexSideBar.style.display = "none";
  }
  if (path === "index") {
    await toggleLoginScreen(true);
  } else {
    await toggleSignUpScreen(true);
  }
  await privacyPolicyOnHoverImg();
  await toggleLegalNoticeScreen(false);
};

/**
 * Toggles the login screen and either shows the legal notice or privacy policy screen based on the provided path.
 * @param {string} path - The path to determine whether to show the legal notice or privacy policy screen.
 */
const goToIndex = async (path) => {
  if (backPath === "index") {
    await toggleLoginScreen(false);
  } else {
    await toggleSignUpScreen(false);
  }

  if (path === "legal-notice") {
    await toggleLegalNoticeScreen(true);
  } else {
    await togglePrivacyPolicyScreen(true);
  }
};
