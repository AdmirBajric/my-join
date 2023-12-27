/**
 * Flag indicating whether the `setLocalStorage` function has been called.
 * @type {boolean}
 */
let called = false;

/**
 * Initializes the summary page by including HTML and rendering user information.
 */
const init = async () => {
  if (!called) {
    await setLocalStorage();
  }
  await includeHTML();
  await renderSummaryUser();
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
 * Renders a greeting message based on the current time of day.
 */
const renderGreeting = async () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();

  let timeOfDay;

  if (hours >= 6 && hours < 12) {
    timeOfDay = "Morning";
  } else if (hours >= 12 && hours < 18) {
    timeOfDay = "Evening";
  } else {
    timeOfDay = "Night";
  }

  const summaryHeaderTime = document.querySelector(".summary-header-timeOfDay");
  summaryHeaderTime.textContent = timeOfDay;
};

/**
 * Renders the full name of the logged-in user in the summary header.
 */
const renderFullName = async () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const summaryHeaderName = document.querySelector(".summary-header-name");
  summaryHeaderName.textContent = loggedInUser[0].name;
};

/**
 * Renders the number of urgent tasks in the summary header.
 */
const renderUrgentTasksNumber = async () => {
  const urgentTasksLength = [];
  const urgentTasks = JSON.parse(localStorage.getItem("tasks"));

  urgentTasks.forEach((a) => {
    if (a.priority === "Urgent") {
      urgentTasksLength.push(a);
    }
  });

  const tasksUrgent = document.querySelector(".tasks-urgent");
  tasksUrgent.textContent = urgentTasksLength.length;
};

/**
 * Converts a date string to a JavaScript Date object.
 *
 * @param {string} date - The date string in the format "YYYY-MM-DD".
 * @returns {Promise<Date>} A Promise that resolves to a JavaScript Date object representing the input date.
 */
const convertTime = async (date) => {
  const [year, month, day] = date.split("-");
  return new Date(year, month - 1, day);
};

/**
 * Formats an array of date numbers by finding the smallest date and converting it to a formatted date string.
 *
 * @param {number[]} allDates - An array of date numbers to be formatted.
 * @returns {Promise<string>} A Promise that resolves to a formatted date string in the "DD-MM-YYYY" format.
 */
const formatDates = async (allDates) => {
  let smallestNumber = Math.min(...allDates);

  let dateNow = new Date(smallestNumber);

  let day = dateNow.getDate();
  let month = dateNow.getMonth() + 1;
  let year = dateNow.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  let formattedDate = day + "-" + month + "-" + year;
  return formattedDate;
};

/**
 * Updates the display of the upcoming deadline date based on the given tasks and their associated dates.
 *
 * @param {Array} tasks - An array of tasks.
 * @param {Array} date - An array of date strings associated with the tasks.
 * @returns {Promise<void>} A Promise that resolves once the display is updated.
 */
const showHideFormatDate = async (tasks, date) => {
  const upcomingDeadlineDate = document.querySelector(".upcoming-deadline-date");

  if (tasks.length > 0) {
    const allDates = [];
    for (let index = 0; index < date.length; index++) {
      const newTime = await convertTime(date[index]);
      allDates.push(newTime.getTime());
    }

    let formattedDate = await formatDates(allDates);
    upcomingDeadlineDate.textContent = formattedDate;
  } else {
    upcomingDeadlineDate.textContent = `No tasks added`;
  }
};

/**
 * Renders the upcoming deadline date based on tasks stored in local storage.
 * Calls the showHideFormatDate function to update the display.
 *
 * @returns {Promise<void>} A Promise that resolves once the deadline date is rendered.
 */
const renderDeadline = async () => {
  const date = [];
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach((a) => {
    date.push(a.dueDate);
  });
  await showHideFormatDate(tasks, date);
};

/**
 * Updates the text content of various DOM elements based on the lengths of task arrays.
 *
 * @param {Array} toDo - An array of "To Do" tasks.
 * @param {number} allTasks - The total number of tasks.
 * @param {Array} inProgress - An array of tasks in progress.
 * @param {Array} awaitingFeedback - An array of tasks awaiting feedback.
 * @param {Array} tasksDone - An array of completed tasks.
 * @returns {Promise<void>} A Promise that resolves once the text content is updated.
 */
const updateTextContent = async (toDo, allTasks, inProgress, awaitingFeedback, tasksDone) => {
  /**
   * Updates the text content of a DOM element with the length of the "To Do" tasks.
   * @param {string} selector - The CSS selector for the target DOM element.
   * @param {number} length - The length of the "To Do" tasks.
   */
  const updateElementTextContent = (selector, length) => {
    const element = document.querySelector(selector);
    element.textContent = length;
  };

  updateElementTextContent(".todo-length", toDo.length);
  updateElementTextContent(".tasks-board-length", allTasks);
  updateElementTextContent(".in-progress-length", inProgress.length);
  updateElementTextContent(".feedback-length", awaitingFeedback.length);
  updateElementTextContent(".tasks-done-length", tasksDone.length);
};

/**
 * Renders and updates the progress information for different task categories.
 * Calls the updateTextContent function to update the display.
 *
 * @returns {Promise<void>} A Promise that resolves once the task progress is rendered.
 */
const renderTasksProgress = async () => {
  let allTasks = 0;
  const toDo = [];
  const inProgress = [];
  const awaitingFeedback = [];
  const tasksDone = [];

  const tasks = JSON.parse(localStorage.getItem("tasks"));
  allTasks = tasks.length;

  tasks.forEach((a) => {
    if (a.progress === 0) {
      toDo.push(a);
    } else if (a.progress === 1) {
      inProgress.push(a);
    } else if (a.progress === 2) {
      awaitingFeedback.push(a);
    } else if (a.progress === 3) {
      tasksDone.push(a);
    }
  });
  await updateTextContent(toDo, allTasks, inProgress, awaitingFeedback, tasksDone);
};

/**
 * Renders the summary information for the user by calling various rendering functions.
 *
 * @returns {Promise<void>} A Promise that resolves once the user summary is rendered.
 */
const renderSummaryUser = async () => {
  await renderGreeting();
  await renderFullName();
  await renderUrgentTasksNumber();
  await renderDeadline();
  await renderTasksProgress();
};

/**
 * Navigates back to the summary section.
 * @param {string} el - The ID of the container element to navigate back to.
 */
const backToSummary = async (el) => {
  if (window.location.search.slice(1) === "privacypolicy=true" || window.location.search.slice(1) === "legalnotice=true") {
    window.location.replace("index.html");
  } else {
    const container = document.querySelector(`#${el}`);

    const sideBarMenu = document.querySelector("#side-bar-menu");
    sideBarMenu.style.opacity = 1;
    sideBarMenu.style.zIndex = 0;

    await clearActiveState();
    await setActiveState("#side-bar-menu-summary");
    await closeAllContainersScreens();
    await showScreen(container);
  }
};

/**
 * Adds click event listeners to elements with the class "redirect" to redirect to the board.
 * @returns {void}
 */
const redirectToBoard = async () => {
  // Get all elements with the class "redirect" and add click event listeners to redirect to the board
  const redirectToBoard = document.querySelectorAll(".redirect");
  redirectToBoard.forEach((a) => {
    a.addEventListener("click", async () => {
      await showBoard();
    });
  });
};

/**
 * Retrieves container elements and other relevant elements in the summary section.
 * @returns {Array} An array containing the summary section elements in the following order:
 */
const getContainerElements = async () => {
  // Get container elements and other relevant elements in the summary section
  const summaryMainLeftContainer = document.querySelector("#summary-main-left-container");
  const summaryMainRightContainer = document.querySelector("#summary-main-right-container");
  const tasksTodoDescription = document.querySelector("#tasks-todo-description p");
  const tasksTodoTopcontainer = document.querySelector("#tasks-todo-topcontainer img");
  const tasks = document.querySelectorAll(".tasks");
  const taskImages = document.querySelectorAll(".task-img");
  const tasksDivider = document.querySelector("#tasks-divider");
  const tasksTopContainerImg = document.querySelector("#tasks-top-container img");

  return [summaryMainLeftContainer, summaryMainRightContainer, tasksTodoDescription, tasksTodoTopcontainer, tasks, taskImages, tasksDivider, tasksTopContainerImg];
};

/**
 * Adds event listeners to the left container in the summary section to handle style changes.
 * @param {HTMLElement} summaryMainLeftContainer - The left container element in the summary section.
 * @param {HTMLElement} tasksDivider - The tasks divider element in the summary section.
 * @param {HTMLElement} tasksTopContainerImg - The top container image element in the tasks section.
 * @returns {void}
 */
const leftContainerListeners = async (summaryMainLeftContainer, tasksDivider, tasksTopContainerImg) => {
  // Add mouseover event listener to change styles when hovering over the left container
  summaryMainLeftContainer.addEventListener("mouseover", () => {
    tasksDivider.style.backgroundColor = "var(--mainColor)";
    summaryMainLeftContainer.style.padding = "1.5rem 2rem";
    tasksTopContainerImg.style.backgroundColor = "var(--mainColor)";
  });

  // Add mouseout event listener to revert styles when no longer hovering over the left container
  summaryMainLeftContainer.addEventListener("mouseout", () => {
    tasksDivider.style.backgroundColor = "var(--white)";
    if (window.innerWidth >= 820) {
      summaryMainLeftContainer.style.padding = "2.8rem 4.8rem";
    }
  });

  // Add mousedown event listener to change styles when the left container is clicked
  summaryMainLeftContainer.addEventListener("mousedown", () => {
    tasksDivider.style.backgroundColor = "var(--white)";
    if (window.innerWidth >= 820) {
      summaryMainLeftContainer.style.padding = "2.8rem 4.8rem";
    }
  });

  // Add mouseup event listener to change styles when the left container is released after clicking
  summaryMainLeftContainer.addEventListener("mouseup", () => {
    tasksDivider.style.backgroundColor = "var(--mainColor)";
    if (window.innerWidth >= 820) {
      summaryMainLeftContainer.style.padding = "2.8rem 4.8rem";
    }
  });
};

const rightContainerListeners = async (summaryMainRightContainer, tasksTodoDescription, tasksTodoTopcontainer) => {
  // Add mousedown and mouseup event listeners to change styles in the right container
  summaryMainRightContainer.addEventListener("mousedown", () => {
    tasksTodoDescription.style.color = "var(--white)";
    tasksTodoTopcontainer.style.border = "0.3rem solid var(--white)";
    tasksTodoTopcontainer.style.borderRadius = "50%";
  });

  summaryMainRightContainer.addEventListener("mouseup", () => {
    tasksTodoDescription.style.color = "var(--mainColor)";
    tasksTodoTopcontainer.style.border = "unset";
  });
};

/**
 * Sets up event listeners and styles for the summary section.
 * @returns {void}
 */
setTimeout(async () => {
  await redirectToBoard();
  const [summaryMainLeftContainer, summaryMainRightContainer, tasksTodoDescription, tasksTodoTopcontainer, tasks, taskImages, tasksDivider, tasksTopContainerImg] = await getContainerElements();

  await leftContainerListeners(summaryMainLeftContainer, tasksDivider, tasksTopContainerImg);
  await rightContainerListeners(summaryMainRightContainer, tasksTodoDescription, tasksTodoTopcontainer);

  // Add mouseover event listeners to change styles when hovering over tasks
  tasks.forEach((a) => {
    a.addEventListener("mouseover", () => {
      taskImages.forEach((a) => {
        a.style.border = "0.3rem solid var(--white)";
        a.style.borderRadius = "50%";
      });
    });
  });
}, 1700);
