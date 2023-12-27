// Example usage:
const { assignedContactsImg, addTaskCategoryList, selectCategoryImg, addTaskAssignedContactsInfo, addTaskAssignedContactsInput, addTaskSelectedContacts } = selectedAddTaskElements();
/**
 * Resets the arrow-downward icon for assigned contacts images by updating their source.
 *
 * @returns {Promise<void>} A promise that resolves when the icons are reset.
 */
const resetArrowDownwardIcon = async () => {
  // Reset the arrow-downward icon for assigned contacts images
  assignedContactsImg.forEach((b) => {
    b.src = "./assets/img/arrow-dropdown-down.svg";
  });
};

/**
 * Clears the content of category list elements, resets arrow-downward icons, and toggles a state variable.
 *
 * @returns {Promise<void>} A promise that resolves when the content is cleared, icons are reset, and state is toggled.
 */
const clearContentCategoryListElements = async () => {
  // Clear the content of category list elements and reset arrow-downward icons
  addTaskCategoryList.forEach((c) => {
    c.innerHTML = "";
  });
  selectCategoryImg.forEach((c) => {
    c.src = "./assets/img/arrow-dropdown-down.svg";
  });

  // Toggle the stateTwo variable
  stateTwo = !stateTwo;
};

/**
 * Checks if the click event occurred outside the assigned contacts area.
 *
 * @param {MouseEvent} e - The click event object.
 * @returns {boolean} Returns true if the click is outside the assigned contacts area, false otherwise.
 */
const ifOutsideFromAssigned = async (e) => {
  const t = e.target.classList.value;
  return (
    t !== "add-task-assigned" &&
    t !== "add-task-assigned-contacts-info" &&
    t !== "assigned-contacts-img" &&
    t !== "add-task-assigned-contacts" &&
    t !== "add-task-assigned-contacts-input" &&
    t !== "add-task-all-contacts" &&
    t !== "add-task-contact" &&
    t !== "add-task-contact-initials" &&
    t !== "add-task-contact-container" &&
    t !== "add-task-contacts-btn" &&
    t !== "add-task-container" &&
    t !== "add-task-full-name" &&
    t !== "add-task-img" &&
    !state
  );
};

/**
 * Checks if the click event occurred outside the category labels area.
 *
 * @param {MouseEvent} e - The click event object.
 * @returns {boolean} Returns true if the click is outside the category labels area, false otherwise.
 */
const ifOutsideFromContacts = async (e) => {
  let t = e.target.classList.value;
  return t !== "add-task-category-label" && t !== "select-category-img" && !stateTwo;
};

/**
 * Changes the display settings of assigned contacts elements.
 */
const changeDisplaySettings = async () => {
  // Set the display property of elements related to assigned contacts info to "flex"
  addTaskAssignedContactsInfo.forEach((a) => {
    a.style.display = "flex";
  });

  // Set the display property of elements related to assigned contacts input to "none" and clear the value
  addTaskAssignedContactsInput.forEach((j) => {
    j.style.display = "none";
    j.value = "";
  });
};

/**
 * Filters profiles based on the input value and returns a new array of filtered profiles.
 *
 * @param {Array<Object>} profiles - The array containing profiles to filter.
 * @returns {Array<Object>} A new array containing profiles that match the input value.
 */
const filterProfilesBasedOnInput = async (profiles) => {
  const newProfiles = profiles.filter((profile) => {
    if (profile.name.toLowerCase().includes(e.target.value)) {
      return profile;
    } else if (profile.lastName.toLowerCase().includes(e.target.value)) {
      return profile;
    }
  });
  return newProfiles;
};

/**
 * Closes the add new task modal by adjusting its style properties and hiding the overlay.
 */
const addNewTaskModalClose = async () => {
  // Select the add new task modal and set its right property to hide it
  const addNewTaskModal = document.querySelector("#add-new-task-modal");
  addNewTaskModal.style.right = "-55rem";

  // Select the overlay and hide it
  const overlay = document.querySelector("#overlay");
  overlay.style.display = "none";
};

/**
 * Opens the add new task modal by adjusting its style properties, displaying the overlay,
 * and setting a data attribute to track progress.
 *
 * @param {number} progress - The progress value to set in the data attribute.
 */
const addNewTask = async (progress) => {
  if (window.innerWidth <= 820) {
    await showAddTask();
  } else {
    // Select the add new task modal and set its right property to display it
    const addNewTaskModal = document.querySelector("#add-new-task-modal");
    addNewTaskModal.style.right = "0rem";

    // Select the overlay and display it
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "flex";

    // Select the add new task modal element and set its data attribute for progress tracking
    const addNewTaskModalEl = document.querySelector(".add-new-task-modal");
    addNewTaskModalEl.setAttribute("data-id", progress);

    // Set the scrollTop property to ensure the modal starts at the top
    addNewTaskModalEl.scrollTop = 0;

    // Execute the priorityLow function
    await priorityLow();
  }
};

/**
 * Selects relevant input fields from the given top parent element.
 *
 * @param {HTMLElement} topParent - The top parent element containing relevant input fields.
 * @returns {Array<HTMLInputElement|HTMLTextAreaElement>} An array containing the following relevant input fields:
 *   - titleInput {HTMLInputElement} - The input field for the task title.
 *   - descriptionInput {HTMLTextAreaElement} - The textarea for the task description.
 *   - dateInput {HTMLInputElement} - The input field for the task date.
 */
const selectRelevantInputFields = async (topParent) => {
  // Select relevant input fields
  const titleInput = topParent.querySelector(".add-task-title-input");
  const descriptionInput = topParent.querySelector(".add-task-textarea-description");
  const dateInput = topParent.querySelector(".date-calendar");

  return [titleInput, descriptionInput, dateInput];
};

/**
 * Sets the priority for a new task based on the priority div elements within the given top parent element.
 *
 * @param {HTMLElement} topParent - The top parent element containing priority div elements.
 * @returns {Promise<string>} A promise that resolves with the priority value for the new task.
 */
const setAddTaskPriority = async (topParent) => {
  let priority = "Low";
  const priorityDiv = topParent.querySelectorAll(".priority div");
  priorityDiv.forEach((a) => {
    if (a.classList.value.startsWith("priority")) {
      let value = a.classList.value.split("priority-")[1];
      value = `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`;
      priority = value;
    }
  });
  return priority;
};

/**
 * Retrieves selected contacts based on the provided top parent element.
 *
 * @param {HTMLElement} topParent - The top parent element containing selected contact elements.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array containing the selected contact profiles.
 */
const getSelectedContacts = async (topParent) => {
  const filteredResult = [];
  const addTaskSelectedContacts = topParent.querySelectorAll(".selected-contact");
  addTaskSelectedContacts.forEach((a) => {
    profiles.forEach((b) => {
      if (a.getAttribute("data-id") == b.id) {
        filteredResult.push(b);
      }
    });
  });
  return filteredResult;
};

/**
 * Retrieves subtasks from the subtask container within the provided top parent element.
 *
 * @param {HTMLElement} topParent - The top parent element containing the subtask container.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array containing subtask details:
 *   - taskId {string} - The ID of the task associated with the subtask.
 *   - task {string} - The content of the subtask.
 *   - progress {boolean} - The progress status of the subtask (default: false).
 */
const getSubtasksFromSubtaskContainer = async (topParent) => {
  let subtasks = [];
  const addTaskSubtasksContainer = topParent.querySelectorAll(".add-task-unordered-list");
  addTaskSubtasksContainer.forEach((a) => {
    subtasks.push({
      taskId: a.getAttribute("data-id"),
      task: a.querySelector(".add-task-list").textContent,
      progress: false,
    });
  });
  return subtasks;
};

/**
 * Selects error message elements related to task input fields from the provided top parent element.
 *
 * @param {HTMLElement} topParent - The top parent element containing error message elements.
 * @returns {Promise<Array<HTMLElement>>} A promise that resolves with an array containing the following error message elements:
 */
const selectErrorMessageElements = async (topParent) => {
  const titleErrMsg = topParent.querySelector(".add-task-title-err-msg");
  const descriptionErrMsg = topParent.querySelector(".add-task-description-err-msg");
  const dateErrMsg = topParent.querySelector(".add-task-date-err-msg");
  const categoryErrMsg = topParent.querySelector(".add-task-category-err-msg");

  return [titleErrMsg, descriptionErrMsg, dateErrMsg, categoryErrMsg];
};

/**
 * Creates a new task object based on the provided input values and updates the tasks array.
 *
 * @param {HTMLInputElement} titleInput - The input field for the task title.
 * @param {HTMLTextAreaElement} descriptionInput - The textarea for the task description.
 * @param {HTMLInputElement} dateInput - The input field for the task due date.
 * @param {string} addTaskSelectedCategory - The selected category for the task.
 * @param {HTMLElement} categoryErrMsg - The element displaying an error message for the task category.
 * @param {Array<Object>} tasks - The array containing existing tasks.
 * @param {string} priority - The priority level of the task.
 * @param {Array<Object>} filteredResult - The array containing selected contact profiles.
 * @param {Array<Object>} subtasks - The array containing subtask details.
 * @param {boolean} progress - The progress status of the task.
 * @returns {Promise<void>} A promise that resolves when the new task object is created and added to the tasks array.
 */
const createNewTaskObject = async (titleInput, descriptionInput, dateInput, addTaskSelectedCategory, categoryErrMsg, tasks, priority, filteredResult, subtasks, progress) => {
  // Create a new task object
  const newTask = {
    id: tasks.length,
    title: titleInput.value,
    description: descriptionInput.value,
    dueDate: dateInput.value,
    priority: priority,
    img: `${priority.toLowerCase()}.svg`,
    assignedTo: filteredResult,
    category: addTaskSelectedCategory,
    subtasks: subtasks,
    progress: +progress,
  };

  // Add the new task to the tasks array
  tasks.push(newTask);
};

/**
 * Updates local storage with the provided tasks array.
 *
 * @param {Array<Object>} tasks - The array containing tasks to be stored in local storage.
 * @returns {Promise<void>} A promise that resolves when local storage is updated with the tasks array.
 */
const updateLocalStorageTasksArray = async (tasks) => {
  // Update local storage with the updated tasks array
  localStorage.setItem("tasks", JSON.stringify(tasks));
  await setItem("tasks", tasks);
};

/**
 * Animates the task-added-to-board elements and performs post-addition actions.
 *
 * @param {Array<HTMLElement>} taskAddedToBoard - An array of elements representing tasks added to the board.
 * @returns {Promise<void>} A promise that resolves when the animation is applied to the task-added-to-board elements.
 */
const animateTaskAddedToBoardElements = async (taskAddedToBoard) => {
  // Animate the task-added-to-board elements and perform post-addition actions
  taskAddedToBoard.forEach((a) => {
    a.style.top = "50%";
  });
};

/**
 * Checks if input validation conditions are met, creates a new task object, and updates the tasks array and local storage.
 *
 * @param {HTMLInputElement} titleInput - The input field for the task title.
 * @param {HTMLTextAreaElement} descriptionInput - The textarea for the task description.
 * @param {HTMLInputElement} dateInput - The input field for the task due date.
 * @param {string} addTaskSelectedCategory - The selected category for the task.
 * @param {HTMLElement} categoryErrMsg - The element displaying an error message for the task category.
 * @param {Array<Object>} tasks - The array containing existing tasks.
 * @param {string} priority - The priority level of the task.
 * @param {Array<Object>} filteredResult - The array containing selected contact profiles.
 * @param {Array<Object>} subtasks - The array containing subtask details.
 * @param {boolean} progress - The progress status of the task.
 * @returns {Promise<void>} A promise that resolves when the new task is added and the board is updated.
 */
const checkIfInputValidationConditionsAreMet = async (titleInput, descriptionInput, dateInput, addTaskSelectedCategory, categoryErrMsg, tasks, priority, filteredResult, subtasks, progress) => {
  // Check if input validation conditions are met
  if ((await checkCreateInputs(titleInput, descriptionInput, dateInput)) && addTaskSelectedCategory != "Select task category") {
    categoryErrMsg.style.opacity = 0;

    await createNewTaskObject(titleInput, descriptionInput, dateInput, addTaskSelectedCategory, categoryErrMsg, tasks, priority, filteredResult, subtasks, progress);

    await updateLocalStorageTasksArray(tasks);
    const taskAddedToBoard = document.querySelectorAll(".task-added-to-board");
    await animateTaskAddedToBoardElements(taskAddedToBoard);

    setTimeout(async () => {
      taskAddedToBoard.forEach((a) => {
        a.style.top = "105%";
      });

      // Close the add new task modal, clear input fields, reset HTML, remove skeleton,
      // and start/reload the board
      await addNewTaskModalClose();
      await clearInputsFields();
      await resetHTML();
      await removeSkeleton();
      await startBoard();
      await checkAgentState();
    }, 1500);
  } else {
    // Display category error message if validation conditions are not met
    categoryErrMsg.style.opacity = 1;
  }
};

/**
 * Handles the process of adding a new task based on user input.
 *
 * @param {Event} event - The event object triggered by the user action.
 */
const addTask = async (event) => {
  const topParent = event.target.parentNode.parentNode;
  const progress = topParent.getAttribute("data-id");
  const [titleInput, descriptionInput, dateInput] = await selectRelevantInputFields(topParent);
  let priority = await setAddTaskPriority(topParent);
  const filteredResult = await getSelectedContacts(topParent);
  const addTaskSelectedCategory = topParent.querySelector(".add-task-select-category p").textContent;
  let subtasks = await getSubtasksFromSubtaskContainer(topParent);
  const [titleErrMsg, descriptionErrMsg, dateErrMsg, categoryErrMsg] = await selectErrorMessageElements(topParent);
  await checkIfInputValidationConditionsAreMet(titleInput, descriptionInput, dateInput, addTaskSelectedCategory, categoryErrMsg, tasks, priority, filteredResult, subtasks, progress);

  // Set opacity styles for title, description, and date input fields
  await setStyleOpacity(titleInput, titleErrMsg);
  await setStyleOpacity(descriptionInput, descriptionErrMsg);
  await setStyleOpacity(dateInput, dateErrMsg);
};

/**
 * Generates a unique numeric ID of the specified length.
 *
 * @param {number} length - The length of the unique ID to generate.
 * @returns {number} A unique numeric ID.
 */
const generateUniqueNumericId = (length) => {
  let uniqueId = "";
  for (let i = 0; i < length; i++) {
    uniqueId += Math.floor(Math.random() * 10);
  }
  return parseInt(uniqueId, 10);
};
