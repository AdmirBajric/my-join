/**
 * Filters and extracts subtasks information from the provided parent element based on the current task.
 *
 * @function filterSubtasks
 * @async
 * @param {Array<Object>} currentTask - The array containing the details of the current task.
 * @param {HTMLElement} topParent - The parent element containing elements with the "add-task-unordered-list" class.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of filtered subtasks.
 */
const filterSubtasks = async (currentTask, topParent) => {
  const addTaskSubtasksContainer = topParent.querySelectorAll(".add-task-unordered-list");
  let subtasks = [];
  addTaskSubtasksContainer.forEach((a, index) => {
    let newProgress;

    if (currentTask[0].subtasks[index]?.progress) {
      newProgress = currentTask[0].subtasks[index].progress;
    } else {
      newProgress = false;
    }

    subtasks.push({
      taskId: a.getAttribute("data-id"),
      task: a.querySelector(".add-task-list").textContent,
      progress: newProgress,
    });
  });
  return subtasks;
};

/**
 * Sets the properties of the current task based on the provided input values.
 *
 * @function setCurrentTask
 * @async
 * @param {Array<Object>} currentTask - The array containing the details of the current task.
 * @param {string} titleInput - The value of the title input for the task.
 * @param {string} descriptionInput - The value of the description input for the task.
 * @param {string} inputValue - The value of the input (due date) for the task.
 * @param {string} priority - The priority level of the task.
 * @param {Array<Object>} filteredResult - An array of selected contacts for the task.
 * @param {string} addTaskSelectedCategory - The selected category for the task.
 * @param {Array<Object>} subtasks - An array of subtasks for the task.
 * @returns {Promise<Object>} A promise that resolves with the updated current task object.
 */
const setCurrentTask = async (currentTask, titleInput, descriptionInput, inputValue, priority, filteredResult, addTaskSelectedCategory, subtasks) => {
  currentTask[0].title = titleInput;
  currentTask[0].description = descriptionInput;
  currentTask[0].dueDate = inputValue;
  currentTask[0].priority = priority;
  currentTask[0].img = `${priority}.svg`;
  currentTask[0].assignedTo = filteredResult;
  currentTask[0].category = addTaskSelectedCategory;
  currentTask[0].subtasks = subtasks;

  return currentTask[0];
};

/**
 * Filters tasks based on the provided current task and updates the tasks array.
 *
 * @function filterTasks
 * @async
 * @param {Array<Object>} currentTask - The array containing the details of the current task.
 * @returns {Promise<Array<Object>>} A promise that resolves with the updated tasks array.
 */
const filterTasks = async (currentTask) => {
  tasks.filter((a) => {
    if (a.id === currentTask[0].id) {
      return currentTask[0];
    }
    return a;
  });
  return tasks;
};

/**
 * Sets the local storage and asynchronous storage with the provided tasks array in edit mode.
 *
 * @function setLocalStorageEditMode
 * @async
 * @param {Array<Object>} tasks - The array containing the details of tasks.
 * @returns {Promise<void>} A promise that resolves once the local and asynchronous storage are updated.
 */
const setLocalStorageEditMode = async (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  await setItem("tasks", tasks);
};

/**
 * Changes the display styles on the board modal to switch between card view and edit mode view.
 *
 * @function changeDisplayStylesOnBoard
 * @async
 * @param {HTMLElement} topParent - The parent element containing the board modal components.
 * @returns {Promise<void>} A promise that resolves once the display styles are updated.
 */
const changeDisplayStylesOnBoard = async (topParent) => {
  const boardHeadContainer = topParent.querySelector("#board-modal-card-container");
  boardHeadContainer.style.display = "flex";

  const boardModalEditContainer = topParent.querySelector("#board-modal-edit-container");
  boardModalEditContainer.style.display = "none";
};

/**
 * Sets the default state for the board by clearing input fields, resetting HTML, removing the skeleton,
 * starting the board, closing the modal on click, hiding the overlay, adding event listeners, and checking the agent state.
 *
 * @function setDefaultBoard
 * @async
 * @returns {Promise<void>} A promise that resolves once the default board state is set.
 */
const setDefaultBoard = async () => {
  await clearInputsFields();
  await resetHTML();
  await removeSkeleton();
  await startBoard();
  await modalCloseOnClick();
  await overlay(false);
  await addEventListeners();
  await checkAgentState();
};

/**
 * Saves the edited task details and updates the task in the data storage.
 *
 * @param {Event} event - The event object triggered by the save action.
 * @returns {Promise<void>} A Promise that resolves once the task is saved and the UI is updated.
 */
const saveEditedTask = async (event) => {
  const topParent = event.srcElement.offsetParent;
  const id = topParent.querySelector("#board-modal-edit-container").getAttribute("data-id");
  const currentTask = tasks.filter((a) => a.id == +id);
  const [titleInput, descriptionInput, dateInput, dateCalendarHidden] = await inputValues(topParent);
  let inputValue = await changeDateInput(dateInput, dateCalendarHidden);
  let priority = await setPriorityDiv(topParent);
  const filteredResult = await setTasksSelectedContacts(topParent);
  const addTaskSelectedCategory = topParent.querySelector(".add-task-select-category p").textContent;
  let subtasks = await filterSubtasks(currentTask, topParent);
  currentTask[0] = await setCurrentTask(currentTask, titleInput, descriptionInput, inputValue, priority, filteredResult, addTaskSelectedCategory, subtasks);
  tasks = await filterTasks(currentTask);
  await setLocalStorageEditMode(tasks);
  await changeDisplayStylesOnBoard(topParent);
  await setDefaultBoard();
};
