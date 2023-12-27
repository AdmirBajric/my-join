/**
 * Resets the style and placeholder for subtask input elements.
 *
 * @returns {Promise<void>} A promise that resolves when the style and placeholder for subtask inputs are reset.
 */
const addSubtaskPlaceholder = async () => {
  // Resetting the style and placeholder for subtask inputs.
  const subtaskPlaceholder = document.querySelectorAll(".add-task-select-subtasks-input");
  subtaskPlaceholder.forEach((a) => {
    a.classList.remove("add-task-select-subtasks-input-error");
    a.placeholder = "Add new subtask";
  });
};

/**
 * Handles the addition of a new subtask in the add task interface.
 *
 * @param {Event} e - The event object representing the user's action.
 */
const addSubtask = async (e) => {
  // Destructuring to get relevant elements from the selectedSubTaskElements function.
  const { subtaskInputContainer, addTaskSelectSubtasksBtn, addTaskSelectSubtasksImg } = selectedSubTaskElements();

  // Extracting the input element for the new subtask.
  const inputElement = e.target.parentNode.parentNode.querySelector(".add-task-select-subtasks-input");

  await addSubtaskPlaceholder();

  // Creating a new subtask with a unique ID and a formatted value.
  [newValue, uniqueId] = createStringAndUniqueId(inputElement.value);

  await createNewSubTask(uniqueId, newValue);
  await renderSubtask(inputElement, subtaskInputContainer, addTaskSelectSubtasksBtn, addTaskSelectSubtasksImg, uniqueId, newValue);
  await addTaskSubtaskStyle(uniqueId);
  await addEventImgDeleteOnHover();
  await addEventBackgroundOnHover();
  await addEventImgPencilOnHover();
  await addEventImgDoneOnHover();
};

/**
 * Adds a new subtask to the existing task.
 *
 * @param {string} id - The unique identifier for the new subtask.
 * @param {string} newValue - The value/content of the new subtask.
 */
const createNewSubTask = async (id, newValue) => {
  // Adding a new subtask to the existing task.
  newTask = [
    {
      ...newTask[0],
      subtasks: [...newTask[0]?.subtasks, { taskId: id, task: newValue, progress: false }],
    },
  ];
};

/**
 * Creates a formatted string and a unique numeric ID based on the input element value.
 *
 * @param {string} inputElement - The value of the input element.
 * @returns {Array} - An array containing the formatted string and unique numeric ID.
 */
const createStringAndUniqueId = (inputElement) => {
  // Formatting the input value with the first letter in uppercase and the rest in lowercase.
  const newValue = `${inputElement[0].toUpperCase()}${inputElement.slice(1).toLowerCase()}`;

  // Generating a unique numeric ID with the specified length.
  const uniqueId = generateUniqueNumericId(6);

  // Returning an array containing the formatted string and unique numeric ID.
  return [newValue, uniqueId];
};

/**
 * Renders a new subtask in the interface if the input value meets the specified criteria.
 *
 * @param {HTMLInputElement} subtaskInputValue - The input element for the new subtask.
 * @param {NodeListOf<Element>} subtaskInputContainer - The container(s) for displaying subtasks.
 * @param {NodeListOf<Element>} addTaskSelectSubtasksBtn - The button(s) to add subtasks.
 * @param {NodeListOf<Element>} addTaskSelectSubtasksImg - The image(s) to select subtasks.
 * @param {string} uniqueId - The unique identifier for the new subtask.
 * @param {string} newValue - The value/content of the new subtask.
 */
const renderSubtask = async (subtaskInputValue, subtaskInputContainer, addTaskSelectSubtasksBtn, addTaskSelectSubtasksImg, uniqueId, newValue) => {
  // Checking if the input value meets the specified criteria (length greater than 3).
  if (subtaskInputValue.value.length > 3) {
    // Generating the HTML template for the new subtask.
    subtaskHTML = subtaskTemplate(uniqueId, newValue);

    // Appending the subtask HTML to the specified container(s).
    subtaskInputContainer.forEach((a) => {
      a.innerHTML += subtaskHTML;
    });

    // Clearing the input value and adjusting the display of buttons and images.
    subtaskInputValue.value = "";
    addTaskSelectSubtasksBtn.forEach((a) => {
      a.style.display = "none";
    });
    addTaskSelectSubtasksImg.forEach((a) => {
      a.style.display = "flex";
    });
  }
};

/**
 * Initiates the editing mode for a specific subtask identified by its unique ID.
 *
 * @param {string} id - The unique identifier of the subtask to be edited.
 */
const editSubtask = async (id) => {
  // Resetting the focus flag to false.
  inputOnFocus = false;

  // Selecting all parent <ul> elements with the specified data-id.
  const parentUl = document.querySelectorAll(`[data-id="${id}"]`);
  parentUl.forEach((a) => {
    // Accessing the list and input elements within each parent <ul>.
    let list = a.querySelector(".add-task-list");
    let input = a.querySelector(".add-task-subtask-input");

    // Modifying styles to enter edit mode.
    a.style.backgroundColor = "var(--white)";
    list.style.display = "none";
    input.style.display = "flex";
    input.focus();
    input.selectionStart = input.value.length;
    input.selectionEnd = input.value.length;
  });

  // Toggling image view and adjusting styles.
  await toggleImageView(parentUl);

  // Updating the border style for the specific <ul> element.
  const list = document.querySelector(`[data-id="${id}"]`);
  list.style.borderBottom = "0.1rem solid var(--btnHoverColor)";
};

/**
 * Toggles the display of certain image elements within a subtask based on their current state.
 *
 * @param {NodeListOf<Element>} parentUl - The parent <ul> elements containing the subtask images.
 */
const toggleImageView = async (parentUl) => {
  parentUl.forEach(async (a) => {
    await toggleClassList(a.querySelector(".add-task-subtask-img-delete-left"));
    await toggleClassList(a.querySelector(".add-task-subtask-img-pencil"));
    await toggleClassList(a.querySelector(".add-task-subtask-img-delete-right"));
    await toggleClassList(a.querySelector(".add-task-subtask-img-done"));
  });
};

/**
 * Toggles the 'display' style property of an element between 'block' and 'none'.
 *
 * @param {HTMLElement} e - The HTML element to toggle the display property for.
 */
const toggleClassList = async (e) => {
  // Getting the computed style of the element.
  const computedStyle = window.getComputedStyle(e);
  // Extracting the current display property value.
  const computedDisplay = computedStyle.getPropertyValue("display");

  // Toggling the display property based on its current state.
  if (computedDisplay === "none") {
    e.style.display = "block";
  } else {
    e.style.display = "none";
  }
};

/**
 * Updates the subtasks data with the edited content based on the provided subtask input and subtask ID.
 *
 * @param {HTMLInputElement} addTaskSubtaskInput - The input field containing the edited subtask content.
 * @param {number} id - The ID of the subtask to be updated.
 * @returns {Promise<void>} A promise that resolves when the subtasks data is updated.
 */
const updateSubtasksData = async (addTaskSubtaskInput, id) => {
  // Updating the subtasks data with the edited content.
  const newFilteredTasks = newTask[0].subtasks.filter((task) => {
    if (task.id === id) {
      task.subtask = addTaskSubtaskInput.value;
      return task;
    }
    return task;
  });

  newTask[0].subtasks = newFilteredTasks;
};

/**
 * Adjusts the display styles of the provided list and input elements.
 *
 * @param {HTMLElement} addTaskList - The element representing the task list.
 * @param {HTMLInputElement} addTaskSubtaskInput - The input field for adding subtasks.
 * @returns {Promise<void>} A promise that resolves when the display styles are adjusted.
 */
const adjustingDisplay = async (addTaskList, addTaskSubtaskInput) => {
  // Adjusting the display styles of the input and list elements.
  addTaskList.style.display = "";
  addTaskSubtaskInput.style.display = "none";
};

/**
 * Resets the border style for the specific <ul> element identified by the provided ID.
 *
 * @param {string} id - The ID used to select the specific <ul> element.
 * @returns {Promise<void>} A promise that resolves when the border style is reset.
 */
const resettingBorderStyle = async (id) => {
  // Resetting the border style for the specific <ul> element.
  const list = document.querySelector(`[data-id="${id}"]`);
  list.style.borderBottom = "unset";
};

/**
 * Saves the edited content of a subtask identified by its unique ID.
 *
 * @param {string} id - The unique identifier of the subtask to be saved.
 * @param {Event} event - The event object triggered by the save action.
 */
const saveEditedSubtask = async (id, event) => {
  // Accessing the parent element of the event target.
  const element = event.target.parentNode.parentNode;
  // Resetting the focus flag to true.
  inputOnFocus = true;
  // Selecting all parent <ul> elements with the specified data-id.
  const parentUl = document.querySelectorAll(`[data-id="${id}"]`);
  // Accessing the input and list elements within the parent element.
  const addTaskSubtaskInput = element.querySelector(".add-task-subtask-input");
  const addTaskList = element.querySelector(".add-task-list");
  // Updating the content of the list element with the edited subtask value.
  addTaskList.innerHTML = addTaskSubtaskInput.value;

  await updateSubtasksData(addTaskSubtaskInput, id);
  await adjustingDisplay(addTaskList, addTaskSubtaskInput);
  await toggleImageView(parentUl);
  await resettingBorderStyle(id);
};

/**
 * Deletes a subtask identified by its unique ID, removes corresponding elements, and updates storage.
 *
 * @param {string} id - The unique identifier of the subtask to be deleted.
 */
const deleteSubtask = async (id) => {
  // Resetting the focus flag to true.
  inputOnFocus = true;

  // Selecting all elements with the specified data-id.
  const elementToDelete = document.querySelectorAll(`[data-id="${id}"]`);
  // Removing each element with the specified data-id.
  elementToDelete.forEach((a) => {
    a.remove();
  });
  // Extracting the content of the list element for each deleted subtask.
  const liElement = [];

  elementToDelete.forEach((b) => {
    liElement.push(b.querySelector(".add-task-list").textContent);
  });

  // Filtering out the deleted subtask from the tasks data.
  tasks.forEach((a) => {
    a.subtasks = a.subtasks.filter((b) => b.taskId !== id);
  });
  // Updating the local storage with the modified tasks data.
  localStorage.setItem("tasks", JSON.stringify(tasks));
  await setItem("tasks", tasks);
};

/**
 * Sets the priority to 'Urgent' and updates corresponding UI elements.
 *
 * @async
 */
const priorityUrgent = async () => {
  // Remove existing priority classes and update UI for 'Urgent'.
  await removeClasses();
  await setPriority("Urgent", "urgent-img", "priority-urgent", "urgent.svg", "prio-alta-white.svg");
};

/**
 * Sets the priority to 'Medium' and updates corresponding UI elements.
 *
 * @async
 */
const priorityMedia = async () => {
  // Remove existing priority classes and update UI for 'Medium'.
  await removeClasses();
  await setPriority("Medium", "media-img", "priority-medium", "medium.svg", "prio-media-white.svg");
};

/**
 * Sets the priority to 'Low' and updates corresponding UI elements.
 *
 * @async
 */
const priorityLow = async () => {
  // Remove existing priority classes and update UI for 'Low'.
  await removeClasses();
  await setPriority("Low", "low-img", "priority-low", "low.svg", "prio-baja-white.svg");
};

const updatePriorityArray = async (priorityName) => {
  // Update the priority and image in the newTask array.
  newTask = [
    {
      ...newTask[0],
      priority: priorityName,
      img: `${priorityName.toLowerCase()}.svg`,
    },
  ];
};

/**
 * Sets the priority of the task and updates corresponding UI elements.
 *
 * @param {string} priorityName - The name of the priority (e.g., 'Urgent', 'Medium', 'Low').
 * @param {string} img - The class name of the priority image elements.
 * @param {string} priorityElement - The ID of the priority element.
 * @param {string} firstImg - The filename of the first image to display.
 * @param {string} secondImg - The filename of the second image to display.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const setPriority = async (priorityName, img, priorityElement, firstImg, secondImg) => {
  await updatePriorityArray(priorityName);
  // Remove existing priority classes.
  await removeClasses();

  // Select image elements and priority elements.
  const imgEl = document.querySelectorAll(`.${img}`);
  const prio = document.querySelectorAll(`#${priorityElement}`);

  // Check if the priority element has the specified class.
  if (
    prio.forEach((a) => {
      a.classList.contains(`${priorityElement}`);
    })
  ) {
    // If the class is present, set the image source to the first image and remove the class.
    imgEl.forEach((b) => {
      b.src = `./assets/img/${firstImg}`;
    });
    prio.forEach((c) => {
      c.classList.remove(`${priorityElement}`);
    });
  } else {
    // If the class is not present, set the image source to the second image and add the class.
    imgEl.forEach((d) => {
      d.src = `./assets/img/${secondImg}`;
    });
    prio.forEach((f) => {
      f.classList.add(`${priorityElement}`);
    });
  }
};

/**
 * Removes priority-related classes and resets the images to their default state.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const removeClasses = async () => {
  const { urgentImg, mediaImg, lowImg, priorityUrgent, priorityMedium, priorityLow } = selectedUrgentImgElements();

  // Reset urgent, medium, and low images to their default state.
  urgentImg.forEach((a) => {
    a.src = "./assets/img/urgent.svg";
  });
  mediaImg.forEach((b) => {
    b.src = "./assets/img/medium.svg";
  });
  lowImg.forEach((g) => {
    g.src = "./assets/img/low.svg";
  });

  // Remove priority-related classes from elements.
  priorityUrgent.forEach((p) => {
    p?.classList.remove("priority-urgent");
  });
  priorityMedium.forEach((b) => {
    b?.classList.remove("priority-medium");
  });
  priorityLow.forEach((o) => {
    o?.classList.remove("priority-low");
  });
};

/**
 * Creates a string by capitalizing the first letter and converting the rest to lowercase.
 *
 * @param {HTMLInputElement} el - The HTML input element from which to create the string.
 * @returns {Promise<string>} - A promise that resolves to the created string.
 */
const createString = async (el) => {
  return `${el.value[0].toUpperCase()}${el.value.slice(1).toLowerCase()}`;
};
