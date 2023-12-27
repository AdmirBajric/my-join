/**
 * Represents the current state of whether a click has been executed or not.
 * @type {boolean}
 */
let clickExecuted = false;
let contactMobileOpen = false;

/**
 * Adjusts the opacity and display properties of the summary container element.
 *
 * @function summaryContainerDisplay
 * @async
 * @returns {Promise<void>} A promise that resolves once the adjustments are completed.
 */
const summaryContainerDisplay = async () => {
  // Get the summary container element and adjust opacity and display properties
  const summaryContainer = document.querySelector("#summary-container");
  summaryContainer.style.opacity = "0";
  summaryContainer.style.display = "none";
};

/**
 * Adjusts the opacity and display properties of the greeting container element.
 *
 * @function greetingContainerDisplay
 * @async
 * @returns {Promise<void>} A promise that resolves once the adjustments are completed.
 */
const greetingContainerDisplay = async () => {
  // Get the greeting container element and adjust opacity and display properties
  const greetingContainer = document.querySelector("#greeting-container");
  greetingContainer.style.opacity = "1";
  greetingContainer.style.display = "flex";
};

/**
 * Handles responsive behavior on the summary page, including layout adjustments and animations.
 * Calls the summaryResponsive function on page load and window resize events.
 * @returns {void}
 */
const responsiveSummary = async () => {
  // Call the summaryResponsive function on page load
  await summaryResponsive();

  // Check if the window width is less than or equal to 820 pixels for responsive layout adjustments
  if (window.innerWidth <= 820) {
    await summaryContainerDisplay();
    await greetingContainerDisplay();
  }

  // Set a timeout for additional responsive behavior
  setTimeout(async () => {
    // Check if the window width is less than or equal to 820 pixels
    if (window.innerWidth <= 820) {
      // Call the greeting function for additional responsive behavior
      await greeting();
    }
  }, 1300);
};

/**
 * Handles the resizing of contacts container based on window width.
 *
 * @function handleContactsOnResize
 * @async
 * @returns {Promise<void>} A promise that resolves once the resizing is completed.
 */
const handleContactsOnResize = async () => {
  const contactsContainerRight = document.querySelector("#contacts-container-right");
  let computedStyle = window.getComputedStyle(contactsContainerRight);
  let displayPropertyValue = computedStyle.getPropertyValue("display");

  if (window.innerWidth >= 820 && contactMobileOpen) {
    if (displayPropertyValue === "flex") {
      await removeChild();
    }
    const containerLeft = document.querySelector("#contacts-container-left");
    const containerRight = document.querySelector("#contacts-container-right");
    containerLeft.style.display = "flex";
    containerRight.style.display = "flex";
    contactMobileOpen = false;
  } else if (window.innerWidth <= 820 && !contactMobileOpen) {
    contactsContainerRight.style.display = "none";
    contactMobileOpen = true;
  }
};

// Event listener for window resize to trigger responsive behavior
window.addEventListener("resize", async () => {
  // Call the summaryResponsive function on window resize
  await summaryResponsive();
  // Call the checkAgentState function on window resize
  await checkAgentState();
  await addEventListeners();
  await handleContactsOnResize();
});

/**
 * Moves the task from progress to the "To Do" section.
 *
 * @function moveToProgressTodo
 * @async
 * @param {HTMLElement} progressContainers - The container holding the progress tasks.
 * @returns {Promise<void>} A promise that resolves once the task is moved.
 */
const moveToProgressTodo = async (progressContainers) => {
  // Get references to each task and its corresponding container
  const boardTaskProgressTodo = document.querySelector("#board-task-progress-todo");
  const progressContainerTodo = document.querySelector("#progress-container-todo");
  progressContainers.insertBefore(boardTaskProgressTodo, progressContainerTodo);
};

/**
 * Moves the task from progress to the "In Progress" section.
 *
 * @function moveProgressInProgress
 * @async
 * @param {HTMLElement} progressContainers - The container holding the progress tasks.
 * @returns {Promise<void>} A promise that resolves once the task is moved.
 */
const moveProgressInProgress = async (progressContainers) => {
  const boardTaskProgressInProgress = document.querySelector("#board-task-progress-in-progress");
  const progressContainerInProgress = document.querySelector("#progress-container-in-progress");
  progressContainers.insertBefore(boardTaskProgressInProgress, progressContainerInProgress);
};

/**
 * Moves the task from progress to the "Awaiting Feedback" section.
 *
 * @function progressAwaitFeedback
 * @async
 * @param {HTMLElement} progressContainers - The container holding the progress tasks.
 * @returns {Promise<void>} A promise that resolves once the task is moved.
 */
const progressAwaitFeedback = async (progressContainers) => {
  const boardTaskProgressAwaitFeedback = document.querySelector("#board-task-progress-await-feedback");
  const progressContainerAwaitFeedback = document.querySelector("#progress-container-await-feedback");
  progressContainers.insertBefore(boardTaskProgressAwaitFeedback, progressContainerAwaitFeedback);
};

/**
 * Moves the task from progress to the "Done" section.
 *
 * @function progressDone
 * @async
 * @param {HTMLElement} progressContainers - The container holding the progress tasks.
 * @returns {Promise<void>} A promise that resolves once the task is moved.
 */
const progressDone = async (progressContainers) => {
  const boardTaskProgressDone = document.querySelector("#board-task-progress-done");
  const progressContainerDone = document.querySelector("#progress-container-done");
  progressContainers.insertBefore(boardTaskProgressDone, progressContainerDone);
};

/**
 * Rearranges progress board tasks for a mobile-responsive layout.
 * Moves each task to its corresponding container within the progress board.
 * This function is designed for use when the window width is less than or equal to 820 pixels.
 * @returns {void}
 */
const addProgressMobile = async () => {
  // Check if the window width is less than or equal to 820 pixels
  if (window.innerWidth <= 820) {
    // Get the container holding the progress board tasks
    const progressContainers = document.querySelector("#progress-containers");

    await moveToProgressTodo(progressContainers);
    await moveProgressInProgress(progressContainers);
    await progressAwaitFeedback(progressContainers);
    await progressDone(progressContainers);
  }
};

/**
 * Closes the progress card modal on the progress board.
 * Stops the event propagation and hides the modal's header.
 * @param {Event} event - The event triggering the function.
 * @returns {void}
 */
const closeCardProgressModal = async (event) => {
  // Stop the event propagation to prevent unintended side effects
  event.stopPropagation();

  // Get the parent element of the clicked element
  const parent = event.srcElement.offsetParent.parentNode;

  // Get the progress card modal's header element
  const progressCardHeadModal = parent.querySelector(".progress-card-head-modal");

  // Hide the modal's header
  progressCardHeadModal.style.display = "none";
};

/**
 * Updates the tasks in the specified category and refreshes the HTML content of the progress board.
 *
 * @function updateMoveToCategory
 * @async
 * @param {Array} newTasks - The updated tasks to be stored.
 * @returns {Promise<void>} A promise that resolves once the tasks are updated and the board is refreshed.
 */
const updateMoveToCategory = async (newTasks) => {
  // Update the tasks in local storage
  localStorage.setItem("tasks", JSON.stringify(newTasks));
  await setItem("tasks", newTasks);

  // Refresh the HTML content of the progress board
  await resetHTML();
  await removeSkeleton();
  await startBoard();
  await addEventListeners();
};

/**
 * Moves a task to a different progress category on the progress board.
 * Updates the task's progress status in local storage and triggers a board refresh.
 * Stops the event propagation to prevent unintended side effects.
 * @param {Event} event - The event triggering the function.
 * @param {number} id - The target progress category ID.
 * @param {number} cardId - The ID of the task (card) to be moved.
 * @returns {void}
 */
const moveToCategory = async (event, id, cardId) => {
  // Stop the event propagation to prevent unintended side effects
  event.stopPropagation();

  // Retrieve all tasks from local storage
  const allTasks = JSON.parse(localStorage.getItem("tasks"));

  // Map through tasks to update the progress status of the target task
  const newTasks = allTasks.map((a) => {
    if (a.id === cardId) {
      a.progress = id;
      return a;
    } else {
      return a;
    }
  });
  await updateMoveToCategory(newTasks);
};

/**
 * Generates HTML content for the progress card modal based on the current task's progress status.
 * Allows users to move a task to a different progress category.
 * @param {Object} dataset - The dataset object containing information about the task.
 * @returns {string} - The generated HTML content.
 */
const modalHTML = async (dataset) => {
  let html = ``;

  // Array representing all progress categories
  const allCategory = ["To do", "In Progress", "Await Feedback", "Done"];

  // Iterate through each progress category to generate HTML links
  allCategory.forEach((a, index) => {
    // Skip the current progress category to avoid duplication
    if (index === +dataset.progress) {
      return;
    } else {
      // Generate a link for moving the task to the current progress category
      html += `<p onclick="moveToCategory(event, ${index}, ${dataset.id})">${a}</p>`;
    }
  });

  return html;
};

/**
 * Fills the progress card modal with HTML content, allowing users to move the task to a different progress category.
 * @param {Event} e - The event triggering the function.
 * @param {HTMLElement} parent - The parent element where the progress modal container is located.
 * @param {Object} dataset - The dataset object containing information about the task.
 * @returns {void}
 */
const fillModal = async (e, parent, dataset) => {
  // Generate HTML content for the progress card modal
  const html = await modalHTML(dataset);

  // Get the progress modal container element
  const progressModalContainer = parent.querySelector(".progress-modal-container");

  // Fill the progress modal container with header and HTML content
  progressModalContainer.innerHTML = `<h4>Move to:</h4>`;
  progressModalContainer.innerHTML += html;
};

/**
 * Adds event listeners to progress card head images, allowing users to open the progress card modal.
 * @returns {void}
 */
const addEventListeners = async () => {
  // Get all progress card head images
  const progressCardHeadImg = document.querySelectorAll(".progress-card-head-img");

  // Iterate through each progress card head image to add event listeners
  progressCardHeadImg.forEach((a) => {
    a.addEventListener("click", async (e) => {
      // Stop the event propagation to prevent unintended side effects
      e.stopPropagation();

      // Get the parent element of the clicked element
      const parent = e.srcElement.offsetParent.parentNode.parentNode;

      // Get the dataset information from the clicked image
      const dataset = e.target.dataset;

      // Get the progress card modal's header element
      const progressCardHeadModal = parent.querySelector(".progress-card-head-modal");

      // Display the progress card modal
      progressCardHeadModal.style.display = "flex";

      // Fill the progress card modal with HTML content
      await fillModal(e, parent, dataset);
    });
  });
};

/**
 * Checks the window width and updates the display of progress card head images accordingly.
 *
 * @function checkAndUpdateProgressCardHeadImg
 * @async
 * @returns {Promise<void>} A promise that resolves once the progress card head images are updated.
 */
const checkAndUpdateProgressCardHeadImg = async () => {
  const progressCardHeadImg = document.querySelectorAll(".progress-card-head-img");

  // Check if the window width is greater than or equal to 820 pixels
  if (window.innerWidth >= 820) {
    // Hide progress card head images
    progressCardHeadImg.forEach((a) => {
      a.style.display = "none";
    });
  } else {
    // Display progress card head images
    progressCardHeadImg.forEach((a) => {
      a.style.display = "flex";
    });
  }
};

/**
 * Checks the agent state (user agent and window width) and adjusts the display of progress card head images and scrollbars.
 * @returns {void}
 */
const checkAgentState = async () => {
  // Get all progress card head images and progress containers
  const container = document.querySelectorAll(".progress-container");
  await checkAndUpdateProgressCardHeadImg();

  // Check if the user agent includes "Windows"
  if (navigator.userAgent.includes("Windows")) {
    // Remove the "hide-scrollbar" class from progress containers
    container.forEach((a) => {
      a.classList.remove("hide-scrollbar");
    });
  } else {
    // Add the "hide-scrollbar" class to progress containers
    container.forEach((a) => {
      a.classList.add("hide-scrollbar");
    });
  }
};
