/**
 * Add mouseover and mouseout event listeners to the "Back" button for the "Forgot Password" section.
 */
const addBackButtonEventListeners = async () => {
  const [forgotPasswordBackBtn, forgotPasswordBackImg] = await selectedForgotPasswordElements();

  forgotPasswordBackBtn.forEach((button) => {
    button.addEventListener("mouseover", () => {
      forgotPasswordBackImg.forEach((image) => {
        image.src = "./assets/img/arrow-left-hover.svg";
      });
    });

    button.addEventListener("mouseout", () => {
      forgotPasswordBackImg.forEach((image) => {
        image.src = "./assets/img/arrow-left.svg";
      });
    });
  });
};

/**
 * Navigate back to the login section.
 */
const backToIndex = async () => {
  const loginSectionContainer = document.querySelector("#login-section-container");
  const forgotPasswordSectionContainer = document.querySelector("#forgot-password-section-container");
  const signupSectionContainer = document.querySelector("#signup-section-container");

  loginSectionContainer.style.display = "flex";
  forgotPasswordSectionContainer.style.display = "none";
  signupSectionContainer.style.display = "none";
};

/**
 * Navigate back to the "Forgot Password" screen.
 */
const backToForgotPasswordScreen = async () => {
  const resetPasswordSectionContainer = document.querySelector("#reset-password-section-container");
  const forgotPasswordSectionContainer = document.querySelector("#forgot-password-section-container");

  resetPasswordSectionContainer.style.display = "none";
  forgotPasswordSectionContainer.style.display = "flex";
};

/**
 * Sends an email to reset the password.
 * Displays a modal and transitions to the reset password section after a delay.
 */
const sendEmailToResetPassword = async () => {
  const forgotPasswordModal = document.querySelector("#forgot-password-modal");
  forgotPasswordModal.style.top = "calc(50% - 3.7rem)";

  setTimeout(() => {
    forgotPasswordModal.style.top = "-10rem";
  }, 1500);

  setTimeout(() => {
    resetPasswordSectionContainer.style.display = "flex";
    forgotPasswordSectionContainer.style.display = "none";
  }, 2000);
};

/**
 * Compares two email addresses to check if they match.
 *
 * @function checkPasswords
 * @async
 * @param {string} resetPasswordFormEmail - The first email address.
 * @param {string} resetPasswordConfirmFormEmail - The second email address for confirmation.
 * @param {NodeListOf<Element>} resetPasswordEmailContainer - The container elements for the email input fields.
 * @returns {Promise<void>} A promise that resolves once the comparison is performed, and actions are taken accordingly.
 */
const checkPasswords = async (resetPasswordFormEmail, resetPasswordConfirmFormEmail, resetPasswordEmailContainer) => {
  if (resetPasswordFormEmail === resetPasswordConfirmFormEmail) {
    const resetYourPasswordModal = document.querySelector("#reset-your-password-modal");
    resetYourPasswordModal.style.top = "calc(50% - 3.7rem)";
    resetPasswordEmailContainer.forEach((element) => {
      element.style.borderBottom = "0.2rem solid var(--inputStyle)";
    });

    setTimeout(() => {
      resetYourPasswordModal.style.top = "-10rem";
    }, 1500);

    setTimeout(() => {
      window.location.replace("index.html");
    }, 2000);
  } else {
    resetPasswordEmailContainer.forEach((element) => {
      element.style.borderBottom = "0.2rem solid var(--error)";
    });
  }
};

/**
 * Resets the password based on user input.
 * Compares the provided email with the confirmed email and performs actions accordingly.
 */
const resetPassword = async () => {
  const resetPasswordFormEmail = document.querySelector("#reset-password-form-email").value;
  const resetPasswordConfirmFormEmail = document.querySelector("#reset-password-confirm-form-email").value;

  const resetPasswordEmailContainer = document.querySelectorAll(".reset-password-email-container");

  await checkPasswords(resetPasswordFormEmail, resetPasswordConfirmFormEmail, resetPasswordEmailContainer);
};
