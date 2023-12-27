/**
 * Array of progress stage names.
 * @type {string[]}
 */
const progressNames = ["To do", "In progress", "Await feedback", "Done"];

/** @type {Array} Array storing task information. */
let tasks = [];

/** @type {Array} Array storing information about the edited task. */
let editedTask = [];

/** @type {HTMLElement} Current dragged element. */
let currentDraggedElement;

/** @type {boolean} Flag indicating whether the mouse is pressed. */
let isMouseDown = false;

/** @type {number} Timeout ID for tracking mouse press duration. */
let timeoutId;

/** @type {number} Timestamp when the mouse click started. */
let clickStartTime;

/** @type {boolean} Flag indicating whether an element is being dragged. */
let isDragging = false;

/**
 * Initializes the board by retrieving tasks from local storage,
 * updating progress containers, setting progress cards, and
 * configuring the search board input.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const startBoard = async () => {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  const progressContainer = document.querySelectorAll(".progress-container");
  await tasksStart(progressContainer);
  await checkProgressCards(progressContainer);
  await setProgressCard();
  await setSearchBoardInput();
  await checkAgentState();
};

/**
 * Initiates the board after a delay, allowing time for the initial setup.
 * @async
 * @function
 * @returns {Promise<void>}
 */
setTimeout(async () => {
  await startBoard();
}, 2000);

/**
 * Prevents the default drop behavior to enable custom drop handling.
 * @param {Event} ev - The drop event.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const allowDrop = async (ev) => {
  ev.preventDefault();
};

/**
 * Initiates the drag operation with the specified ID.
 * @param {string} id - The ID of the dragged item.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const drag = async (id) => {
  currentDraggedId = id;
};

/**
 * Handles the drop event by updating task progress based on the target ID.
 * @param {Event} event - The drop event.
 * @param {string} id - The ID of the target element.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const drop = async (event, id) => {
  if (window.innerWidth >= 820) {
    if (event.target.classList.contains("progress-card-skeleton")) {
      tasks.forEach(async (t) => {
        if (t.id === currentDraggedId) {
          t.progress = id;
        }
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));
      await setItem("tasks", tasks);

      const progressContainer = document.querySelectorAll(".progress-container");
      await resetHTML();
      await removeSkeleton();
      await tasksStart(progressContainer);
      await checkProgressCards(progressContainer);
      await setProgressCard();
      await addEventListeners();
      await checkAgentState();
    }
  }
};

/**
 * Adds hover effects to board progress images.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const boardProgressImg = async () => {
  const img = document.querySelectorAll(".progress-img");

  img.forEach((a) => {
    a.addEventListener("mouseover", async () => {
      a.src = "./assets/img/board-plus-button-hover.svg";
    });

    a.addEventListener("mouseout", async () => {
      a.src = "./assets/img/board-plus-button.svg";
    });
  });
};

/**
 * Changes hover images for subtask checkboxes in a modal.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const changeHoverImgSubtasks = async () => {
  const modalSubTaskImg = document.querySelectorAll(".modal-subtask-img");
  modalSubTaskImg.forEach((a) => {
    a.addEventListener("mouseover", (e) => {
      if (a.src.split("img/")[1] === "checkbox-empty.svg") {
        a.src = "./assets/img/checkbox-hover.svg";
      } else {
        a.src = "./assets/img/checkbox-hover-checked.svg";
      }
    });

    a.addEventListener("mouseout", (e) => {
      if (a.src.split("img/")[1] === "checkbox-hover.svg") {
        a.src = "./assets/img/checkbox-empty.svg";
      } else if (a.src.split("img/")[1] === "checkbox-empty.svg") {
        a.src = "./assets/img/checkbox-empty.svg";
      } else {
        a.src = "./assets/img/checkbox-checked.svg";
      }
    });
  });
};

/**
 * Sets event listeners for modal delete and edit buttons with hover effects.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const setEventListeners = async () => {
  const modalDelete = document.querySelector("#modal-delete img");
  const modalEdit = document.querySelector("#modal-edit img");

  modalDelete.addEventListener("mouseover", async () => {
    modalDelete.src = "./assets/img/delete-contact-hover.svg";
  });

  modalDelete.addEventListener("mouseout", async () => {
    modalDelete.src = "./assets/img/delete-contact.svg";
  });

  modalEdit.addEventListener("mouseover", async () => {
    modalEdit.src = "./assets/img/edit-contact-hover.svg";
  });

  modalEdit.addEventListener("mouseout", async () => {
    modalEdit.src = "./assets/img/edit-contact.svg";
  });
};

/**
 * Sets event listeners for progress cards, including dragstart, dragend,
 * mousedown, mouseup, mouseleave, and board progress images.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const setProgressCard = async () => {
  const progressCard = document.querySelectorAll(".progress-card");

  progressCard.forEach(async (card) => {
    card.addEventListener("dragstart", async (e) => {
      isDragging = true;
    });

    card.addEventListener("dragend", async (e) => {
      isDragging = false;
      await removeSkeleton();
      card.style.transform = "rotate(0deg)";
    });

    await setCardMouseDown(card);
    await setCardMouseUp(card);
    await setCardMouseLeave(card);
    await boardProgressImg();
  });
};

/**
 * Sets up the search functionality for the board header.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const setSearchBoardInput = async () => {
  const boardHeadSearchInput = document.querySelector("#board-head-search-input");

  boardHeadSearchInput.addEventListener("input", async () => {
    if (boardHeadSearchInput.value.length > 0) {
      const boardHeadSearch = document.querySelector("#board-head-search");
      boardHeadSearch.style.border = "0.1rem solid var(--divider)";
      boardHeadSearchInput.placeholder = "Find task";
    }
    const txt = boardHeadSearchInput.value.toLowerCase();

    const filteredSearch = tasks.filter((a) => {
      const searchedTitle = a.title.toLowerCase();
      const searchedDesc = a.description.toLowerCase();

      if (searchedTitle.includes(txt) || searchedDesc.includes(txt)) {
        return a;
      }
    });

    const progressContainer = document.querySelectorAll(".progress-container");

    await resetHTML();
    await removeSkeleton();
    await tasksStart(progressContainer, filteredSearch);
    await checkProgressCards(progressContainer);
    await setProgressCard();
    await addEventListeners();
  });
};

/**
 * Resets the HTML by removing all progress cards.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const resetHTML = async () => {
  const progressContainer = document.querySelectorAll(".progress-card");
  progressContainer.forEach((a) => {
    a.remove();
  });
};

/**
 * Renders tasks within the specified progress container.
 * @async
 * @function
 * @param {NodeList} progressContainer - The container for progress cards.
 * @param {Array} tasks - The array of tasks to render.
 * @returns {Promise<void>}
 */
const renderTasks = async (progressContainer, tasks) => {
  let unit = 0;
  let count = 1;
  tasks.forEach(async (task) => {
    let assignedHTML = "";

    task.assignedTo.forEach(async (c) => {
      assignedHTML += progressCardInitials(unit, c);

      if (task.assignedTo.length > count) {
        unit += 2.5;
        count += 1;
      } else {
        unit = 0;
        count = 1;
      }
    });

    await renderProgressContainer(progressContainer, task, assignedHTML);
  });
};

/**
 * Initiates the rendering of tasks within the specified progress container.
 * @async
 * @function
 * @param {NodeList} progressContainer - The container for progress cards.
 * @param {Array} task - The array of tasks to render (defaults to global tasks).
 * @returns {Promise<void>}
 */
const tasksStart = async (progressContainer, task = tasks) => {
  if (task.length > 0) {
    renderTasks(progressContainer, task);
  }
};

/**
 * Returns a color based on the specified category.
 * @async
 * @function
 * @param {string} category - The category for which to determine the color.
 * @returns {Promise<string>} The color corresponding to the category.
 */
const categoryColor = async (category) => {
  let c;
  switch (category) {
    case "Development":
      c = "var(--boardCards)";
      break;
    case "Design":
      c = "var(--btnHoverColor)";
      break;
    case "Sales":
      c = "var(--priority-low)";
      break;
    case "Backoffice":
      c = "var(--priority-medium)";
      break;
    case "Media":
      c = "var(--menuInitials)";
      break;
    case "Marketing":
      c = "var(--scrollThumb)";
      break;
  }
  return c;
};

/**
 * Renders the progress container with the specified task details.
 * @async
 * @function
 * @param {NodeList} progressContainer - The container for progress cards.
 * @param {Object} task - The task to render.
 * @param {string} assignedHTML - The HTML content for assigned initials.
 * @returns {Promise<void>}
 */
const renderProgressContainer = async (progressContainer, task, assignedHTML) => {
  const categoryToRender = await categoryColor(task.category);
  const subTasksDoneLength = task.subtasks.filter((a) => a.progress);
  const sum = task.subtasks.length / subTasksDoneLength.length;
  const percentDone = 100 / sum;
  progressContainer[task.progress].innerHTML += progressCard(task, percentDone, assignedHTML, subTasksDoneLength.length, categoryToRender);
};

/**
 * Checks progress containers and adjusts display properties based on the presence of tasks.
 * @async
 * @function
 * @param {NodeList} progressContainer - The containers for progress cards.
 * @returns {Promise<void>}
 */
const checkProgressCards = async (progressContainer) => {
  progressContainer.forEach((p) => {
    if (p.querySelector(".progress-card") != null) {
      p.querySelector(".progress-card").style.display = "flex";
      p.querySelector(".no-tasks").style.display = "none";
    } else {
      p.querySelector(".no-tasks").style.display = "flex";
    }
  });
};

/**
 * Removes skeleton elements from the DOM.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const removeSkeleton = async () => {
  const skeleton = document.querySelectorAll(".progress-card-skeleton");
  skeleton.forEach((t) => t.remove());
};
