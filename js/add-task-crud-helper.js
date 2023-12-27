/**
 * Retrieves input fields and other elements related to a new task from the given top parent element.
 *
 * @param {HTMLElement} topParent - The top parent element containing the new task elements.
 * @returns {Array} An array containing the following elements:
 */
const elementsNewTask = async (topParent) => {
  // Get input fields and other elements from the top parent
  const titleInput = topParent.querySelector(".add-task-title-input");
  const descriptionInput = topParent.querySelector(".add-task-textarea-description");
  const dateCalendar = topParent.querySelector(".date-calendar");
  const addTaskSelectedCategory = topParent.querySelector(".add-task-select-category p").textContent;
  const categoryErrMsg = topParent.querySelector(".add-task-category-err-msg");

  return [titleInput, descriptionInput, dateCalendar, addTaskSelectedCategory, categoryErrMsg];
};

/**
 * Updates the local storage with the modified tasks array.
 *
 * @param {Array} tasks - The modified tasks array to be stored in local storage.
 * @returns {Promise<void>} A promise that resolves when the local storage operation is complete.
 */
const updateLocalStorageTasks = async (tasks) => {
  // Update local storage with the modified tasks array
  localStorage.setItem("tasks", JSON.stringify(tasks));
  await setItem("tasks", tasks);
};

/**
 * Resets the `newTask` state to its initial values.
 *
 * @returns {Promise<void>} A promise that resolves when the state reset is complete.
 */
const resetNewTaskState = async () => {
  // Reset newTask to its initial state
  newTask = [
    {
      id: null,
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      img: "",
      assignedTo: [],
      category: "",
      subtasks: [],
      progress: 0,
    },
  ];
};

/**
 * Animates the task elements added to the board by adjusting their top position.
 *
 * @param {Array<HTMLElement>} taskAddedToBoard - An array of task elements added to the board.
 * @returns {Promise<void>} A promise that resolves when the animation is complete.
 */
const animateTaskAddedToBoard = async (taskAddedToBoard) => {
  // Animate the task added to the board
  taskAddedToBoard.forEach((a) => {
    a.style.top = "50%";
  });
};

/**
 * Sets a timeout to remove the task added message and perform additional actions.
 *
 * @param {Array<HTMLElement>} taskAddedToBoard - An array of task elements added to the board.
 * @returns {Promise<void>} A promise that resolves when the removal and additional actions are complete.
 */
const removeTaskAddedMessage = async (taskAddedToBoard) => {
  // Set a timeout to remove the task added message and perform other actions
  setTimeout(async () => {
    taskAddedToBoard.forEach((a) => {
      a.style.top = "105%";
    });

    // Clear input fields, reset HTML, remove skeleton, start board, and show board
    await clearInputsFields();
    await resetHTML();
    await removeSkeleton();
    await startBoard();
    await showBoard();
    await checkAgentState();
  }, 1500);
};

/**
 * Creates task details based on the provided input elements.
 *
 * @param {HTMLInputElement} titleInput - The input field containing the task title.
 * @param {HTMLTextAreaElement} descriptionInput - The textarea containing the task description.
 * @param {HTMLInputElement} dateCalendar - The input field containing the due date for the task.
 * @returns {Promise<void>} A promise that resolves when the task details are created and the new task object is updated.
 */
const createTaskDetails = async (titleInput, descriptionInput, dateCalendar) => {
  // Create task details
  let title = await createString(titleInput);
  let description = await createString(descriptionInput);
  let dueDate = dateCalendar.value;
  let id = Math.floor(Math.random() * 1000);

  // Update the new task object with the created task details
  newTask = { ...newTask[0], id: id, title, description, dueDate };
};

/**
 * Retrieves existing tasks from local storage, adds the new task, and updates local storage.
 *
 * @returns {Promise<void>} A promise that resolves when the existing tasks are retrieved, the new task is added, and local storage is updated.
 */
const retrieveExistingTasks = async () => {
  // Retrieve existing tasks from local storage
  const allTasks = await getItem("tasks");
  const tasks = JSON.parse(allTasks.data.value);

  // Add the new task to the tasks array
  tasks.push(newTask);

  await updateLocalStorageTasks(tasks);
};

/**
 * Sets opacity style for input fields based on validation results and corresponding error messages.
 *
 * @param {HTMLInputElement} titleInput - The input field for the task title.
 * @param {HTMLElement} titleErrMsg - The element displaying an error message for the task title.
 * @param {HTMLTextAreaElement} descriptionInput - The textarea for the task description.
 * @param {HTMLElement} descriptionErrMsg - The element displaying an error message for the task description.
 * @param {HTMLInputElement} dateCalendar - The input field for the task due date.
 * @param {HTMLElement} dateErrMsg - The element displaying an error message for the task due date.
 * @returns {Promise<void>} A promise that resolves when the opacity styles are set for all input fields.
 */
const setOpacityInputFields = async (titleInput, titleErrMsg, descriptionInput, descriptionErrMsg, dateCalendar, dateErrMsg) => {
  // Set opacity style for input fields based on validation result
  await setStyleOpacity(titleInput, titleErrMsg);
  await setStyleOpacity(descriptionInput, descriptionErrMsg);
  await setStyleOpacity(dateCalendar, dateErrMsg);
};

/**
 * Creates a new task with user-provided information and adds it to the task list.
 * @returns {Promise<void>} A promise that resolves when the task is created and added.
 */
const createNewTask = async () => {
  // Get the top parent element for the task creation section
  const topParent = document.querySelector(".add-task-left-container");
  const { titleErrMsg, descriptionErrMsg, dateErrMsg, taskAddedToBoard } = selectedAddTaskElements();
  const [titleInput, descriptionInput, dateCalendar, addTaskSelectedCategory, categoryErrMsg] = await elementsNewTask(topParent);

  // Validate inputs and selected category
  if ((await checkCreateInputs(titleInput, descriptionInput, dateCalendar)) && addTaskSelectedCategory != "Select task category") {
    // Clear category error message
    categoryErrMsg.style.opacity = 0;

    await createTaskDetails(titleInput, descriptionInput, dateCalendar);
    await retrieveExistingTasks();
    await resetNewTaskState();
    await animateTaskAddedToBoard(taskAddedToBoard);
    await removeTaskAddedMessage(taskAddedToBoard);
  } else {
    // Display category error message if validation fails
    categoryErrMsg.style.opacity = 1;
  }
  await setOpacityInputFields(titleInput, titleErrMsg, descriptionInput, descriptionErrMsg, dateCalendar, dateErrMsg);
};

/**
 * Checks if the provided input fields have valid values for creating a new task.
 *
 * @param {HTMLInputElement} titleInput - The input field for the task title.
 * @param {HTMLTextAreaElement} descriptionInput - The input field for the task description.
 * @param {HTMLInputElement} dateCalendar - The input field for the task due date.
 * @returns {Promise<boolean>} A promise that resolves to true if all inputs are valid, false otherwise.
 */
const checkCreateInputs = async (titleInput, descriptionInput, dateCalendar) => {
  // Check if title, description, and due date are not empty
  return titleInput.value.length > 0 && descriptionInput.value.length > 0 && dateCalendar.value.length > 0;
};

/**
 * Sets the opacity style of an error message based on the length of the provided input's value.
 *
 * @param {HTMLInputElement | HTMLTextAreaElement} input - The input field to check for its value length.
 * @param {HTMLElement} errMsg - The error message element whose opacity will be adjusted.
 * @returns {Promise<void>} A promise that resolves after setting the opacity style.
 */
const setStyleOpacity = async (input, errMsg) => {
  // Check if the input value is empty and adjust the opacity of the error message accordingly
  if (input.value.length < 1) {
    errMsg.style.opacity = 1;
  } else {
    errMsg.style.opacity = 0;
  }
};

/**
 * Retrieves error message elements related to task input fields.
 *
 * @returns {Promise<Array<HTMLElement>>} A promise that resolves with an array containing the following error message elements:
 *   - titleErrMsg {HTMLElement} - The element displaying an error message for the task title.
 *   - descriptionErrMsg {HTMLElement} - The element displaying an error message for the task description.
 *   - dateErrMsg {HTMLElement} - The element displaying an error message for the task due date.
 */
const errorMessageElements = async () => {
  // Get error message elements
  const titleErrMsg = document.querySelector(".add-task-title-err-msg");
  const descriptionErrMsg = document.querySelector(".add-task-description-err-msg");
  const dateErrMsg = document.querySelector(".add-task-date-err-msg");

  return [titleErrMsg, descriptionErrMsg, dateErrMsg];
};

/**
 * Resets the opacity of error message elements related to task input fields.
 *
 * @returns {Promise<void>} A promise that resolves when the opacity of error messages is reset.
 */
const resetOpacityErrorMessages = async () => {
  const [titleErrMsg, descriptionErrMsg, dateErrMsg] = await errorMessageElements();

  // Reset opacity of error messages
  titleErrMsg.style.opacity = 0;
  descriptionErrMsg.style.opacity = 0;
  dateErrMsg.style.opacity = 0;
};

/**
 * Clears the content of subtasks container and selected contacts elements.
 *
 * @param {Array<HTMLElement>} addTaskSubtasksContainer - An array of elements representing the subtasks container.
 * @param {Array<HTMLElement>} addTaskSelectedContacts - An array of elements representing the selected contacts container.
 * @returns {Promise<void>} A promise that resolves when the subtasks container and selected contacts are cleared.
 */
const clearSubtaskContainer = async (addTaskSubtasksContainer, addTaskSelectedContacts) => {
  // Clear subtasks container and selected contacts
  addTaskSubtasksContainer.forEach((a) => {
    a.innerHTML = "";
  });
  addTaskSelectedContacts.forEach((a) => {
    a.innerHTML = "";
  });
};

/**
 * Resets the text content of category select elements to the default value.
 *
 * @param {Array<HTMLElement>} addTaskSelectCategory - An array of elements representing the category select.
 * @returns {Promise<void>} A promise that resolves when the category select text content is reset.
 */
const resetCategoryText = async (addTaskSelectCategory) => {
  // Reset category select text content to default
  addTaskSelectCategory.forEach((b) => {
    b.textContent = "Select task category";
  });
};

/**
 * Clears the input values for title, description, and date elements.
 *
 * @param {Array<HTMLInputElement>} addTaskTitleInput - An array of elements representing the title input.
 * @param {Array<HTMLTextAreaElement>} addTaskTextarea - An array of elements representing the description textarea.
 * @param {Array<HTMLInputElement>} dateCalendar - An array of elements representing the date input.
 * @returns {Promise<void>} A promise that resolves when the input values are cleared.
 */
const clearInputValues = async (addTaskTitleInput, addTaskTextarea, dateCalendar) => {
  // Clear input values for title, description, and date
  addTaskTitleInput.forEach((a) => {
    a.value = "";
  });
  addTaskTextarea.forEach((r) => {
    r.value = "";
  });
  dateCalendar.forEach((a) => {
    a.value = "";
  });
};

/**
 * Clears the input fields and resets the state of elements in the task creation form.
 *
 * @returns {Promise<void>} A promise that resolves after clearing the form.
 */
const clearForm = async () => {
  // Destructure selected elements for clearing the form
  const { addTaskTitleInput, addTaskTextarea, dateCalendar, addTaskSelectedContacts, addTaskSelectCategory, addTaskSubtasksContainer } = selectedClearFormElements();

  await resetOpacityErrorMessages();
  await clearSubtaskContainer(addTaskSubtasksContainer, addTaskSelectedContacts);
  await resetCategoryText(addTaskSelectCategory);
  await clearInputValues(addTaskTitleInput, addTaskTextarea, dateCalendar);
  // Reset the selected contacts array and remove additional classes
  selectedContacts = [];
  await removeClasses();
};
