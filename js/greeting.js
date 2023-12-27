/**
 * Determines the time of day based on the current hour.
 *
 * @function setTimeOfDay
 * @async
 * @returns {Promise<string>} A promise that resolves with the time of day (Morning, Afternoon, or Night).
 */
const setTimeOfDay = async () => {
  // Get the current time
  const currentTime = new Date();
  const hours = currentTime.getHours();
  let timeOfDay;
  // Determine the time of day based on the current hour
  if (hours >= 6 && hours < 12) {
    timeOfDay = "Morning";
  } else if (hours >= 12 && hours < 18) {
    timeOfDay = "Afternoon";
  } else {
    timeOfDay = "Night";
  }
  return timeOfDay;
};

/**
 * Displays a greeting for the guest or logged-in user based on the time of day.
 *
 * @function markupGuestUserGreetings
 * @async
 * @param {string} timeOfDay - The time of day (Morning, Afternoon, or Night).
 * @returns {Promise<void>} A promise that resolves once the greeting is displayed.
 */
const markupGuestUserGreetings = async (timeOfDay) => {
  // Retrieve the logged-in user from local storage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Get the HTML element for displaying the greeting text
  const greetingTxt = document.querySelector("#greeting-txt");
  // HTML markup for guest and user greetings
  const guest = `<h2 id="greeting-guest">Good ${timeOfDay}</h2>`;
  const user = `<h2 id="greeting-user">Good ${timeOfDay}, <br/> <span>${loggedInUser[0].name}</span></h2>`;

  // Display the appropriate greeting based on user login status
  if (+loggedInUser[0].id === 0) {
    greetingTxt.innerHTML = guest;
  } else {
    greetingTxt.innerHTML = user;
  }
};

/**
 * Handles the transition between greeting and summary sections, adjusting opacity for a fade-in and fade-out effect.
 *
 * @function handleDisplaysView
 * @async
 * @returns {Promise<void>} A promise that resolves once the transition is complete.
 */
const handleDisplaysView = async () => {
  // Set a timeout to transition between greeting and summary sections
  setTimeout(() => {
    // Hide the summary header
    const summaryHeader = document.querySelector("#summary-header");
    summaryHeader.style.display = "none";

    // Adjust opacity for a fade-in effect on the summary container
    const summaryContainer = document.querySelector("#summary-container");
    summaryContainer.style.opacity = "1";

    // Adjust opacity for a fade-out effect on the greeting container
    const greetingContainer = document.querySelector("#greeting-container");
    greetingContainer.style.opacity = "0";

    // Set another timeout to switch between summary and greeting sections
    setTimeout(() => {
      // Display the summary container and hide the greeting container
      summaryContainer.style.display = "flex";
      greetingContainer.style.display = "none";
    }, 600);
  }, 1000);
};

/**
 * Displays a personalized greeting based on the time of day and user login status.
 * @param {string} message - The message to be displayed.
 * @returns {void}
 */
const startGreeting = async (message) => {
  let timeOfDay = await setTimeOfDay();
  await markupGuestUserGreetings(timeOfDay);
  await handleDisplaysView();
};
