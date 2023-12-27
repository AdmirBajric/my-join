/**
 * Handles responsive behavior on the index page, particularly for window resizing.
 * Calls the indexResponsive function on page load and window resize events.
 * @returns {void}
 */
const responsiveIndex = async () => {
  await indexResponsive();
};

// Event listener for window resize to trigger responsive behavior
window.addEventListener("resize", async () => {
  await indexResponsive();
});

/**
 * Animates login images by updating their source URLs.
 * @returns {void}
 */
const animateLoginImages = async () => {
  // Get the logo big image element and update its source URL
  const logoBigImg = document.querySelector("#logo-big-img");
  logoBigImg.src = "./assets/responsive-img/join-small-white.svg";

  // Get the small logo blue image element and update its source URL
  const smallLogoBlueImg = document.querySelector("#small-logo-blue-img");
  smallLogoBlueImg.src = "./assets/responsive-img/join-small-blue.svg";
};

/**
 * Handles responsive behavior based on the window width.
 * Calls the animateLoginImages function if the window width is less than or equal to 820 pixels.
 * @returns {void}
 */
const indexResponsive = async () => {
  // Check if the window width is less than or equal to 820 pixels
  if (window.innerWidth <= 820) {
    // Call the animateLoginImages function for responsive animation
    await animateLoginImages();
  }
};
