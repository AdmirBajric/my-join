/**
 * Changes the displayed title in the modal based on the provided card data.
 *
 * @param {Array} clickedCard - An array containing the card data.
 * @returns {void}
 */
const changeTitle = async (clickedCard) => {
  const boardModalTitle = document.querySelector("#board-modal-title h2");
  boardModalTitle.textContent = clickedCard[0].title;
};

/**
 * Changes the displayed category information in the modal based on the provided card data.
 *
 * @param {Array} clickedCard - An array containing the card data.
 * @returns {void}
 */
const changeCategory = async (clickedCard) => {
  const color = await categoryColor(clickedCard[0].category);

  const modalCategory = document.querySelector("#modal-category");
  modalCategory.style.backgroundColor = color;

  const modalCategoryParagraph = document.querySelector("#modal-category p");
  modalCategoryParagraph.textContent = clickedCard[0].category;
};

/**
 * Displays the modal by adjusting its top position.
 *
 * @returns {void}
 */
const showModal = async () => {
  const boardModalCard = document.querySelector("#board-modal-card");
  boardModalCard.style.top = "50%";
  const modalClose = document.querySelector("#modal-close");
  modalClose.style.display = "flex";
};

/**
 * Sets up a mousedown event listener on the card element.
 *
 * @param {HTMLElement} card - The card element to which the event listener is attached.
 * @returns {void}
 */
const setCardMouseDown = async (card) => {
  card.addEventListener("mousedown", (event) => {
    clickStartTime = Date.now();
    timeoutId = setTimeout(async () => {
      clearTimeout(timeoutId);
      if (window.innerWidth >= 820) {
        card.style.transform = "rotate(5deg)";
        await showEmptySpaceToDrag(+card.getAttribute("data-id"));
      }
    }, 500);
  });
};

/**
 * Sets up a mouseup event listener on the card element.
 *
 * @param {HTMLElement} card - The card element to which the event listener is attached.
 * @returns {void}
 */
const setCardMouseUp = async (card) => {
  card.addEventListener("mouseup", async (e) => {
    const clickEndTime = Date.now();
    if (clickEndTime - clickStartTime < 200) {
      clearTimeout(timeoutId);
      await setCardClick(card);
      await removeSkeleton();
      card.style.transform = "rotate(0deg)";
    } else {
      clearTimeout(timeoutId);
      await removeSkeleton();
      card.style.transform = "rotate(0deg)";
    }
  });
};

/**
 * Sets up a mouseleave event listener on the card element.
 *
 * @param {HTMLElement} card - The card element to which the event listener is attached.
 * @returns {void}
 */
const setCardMouseLeave = async (card) => {
  card.addEventListener("mouseleave", async () => {
    await removeSkeleton();
    card.style.transform = "rotate(0deg)";
  });
};

/**
 * Displays an empty space to indicate a draggable area.
 *
 * @param {number} id - The unique identifier of the card.
 * @returns {void}
 */
const showEmptySpaceToDrag = async (id) => {
  const progressContainer = document.querySelectorAll(".progress-container");

  progressContainer.forEach((a) => {
    if (!a.querySelector(`[data-id="${id}"]`)) {
      const newDiv = document.createElement("div");
      newDiv.className = "progress-card-skeleton";
      a.insertAdjacentElement("beforeend", newDiv);
    }
  });
};

/**
 * Filters tasks based on the provided identifier and updates the tasks array.
 *
 * @param {number} id - The unique identifier of the task to be deleted.
 * @returns {void}
 */
const filteredTasksOnDelete = async (id) => {
  const filteredTasks = tasks.filter((t) => t.id != id);
  tasks = filteredTasks;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  await setItem("tasks", tasks);
};

/**
 * Closes the modal when a task is deleted.
 *
 * @returns {void}
 */
const closeModalOnDelete = async () => {
  const boardModalCard = document.querySelector("#board-modal-card");
  boardModalCard.style.top = "150%";
};

/**
 * Deletes a task with the given identifier, updates the tasks array, and refreshes the UI.
 *
 * @param {number} id - The unique identifier of the task to be deleted.
 * @returns {void}
 */
const deleteTask = async (id) => {
  const progressContainer = document.querySelectorAll(".progress-container");

  await overlay(false);
  await filteredTasksOnDelete(id);
  await closeModalOnDelete();
  await resetHTML();
  await tasksStart(progressContainer);
  await checkProgressCards(progressContainer);
  await setProgressCard();
};

/**
 * Changes styles within the specified parent element to modify the display of components in the board modal.
 *
 * @param {HTMLElement} topParent - The parent element within which styles will be modified.
 * @returns {Promise<void>} A promise that resolves when styles are successfully modified.
 */
const changeStyles = async (topParent) => {
  const boardHeadContainer = topParent.querySelector("#board-modal-card-container");
  boardHeadContainer.style.display = "none";

  const modalClose = document.querySelector("#modal-close");
  modalClose.style.display = "none";

  const boardModalEditContainer = topParent.querySelector("#board-modal-edit-container");
  boardModalEditContainer.style.display = "flex";

  const scroll = topParent.querySelector("#board-scroll");
  scroll.scrollTop = 0;
};

/**
 * Initiates the editing process for a task with the given identifier, displaying the editing UI.
 *
 * @param {Event} event - The click event triggering the editing action.
 * @param {number} cardId - The unique identifier of the task to be edited.
 * @returns {void}
 */
const editTasks = async (event, cardId) => {
  const topParent = event.srcElement.offsetParent;

  let card = tasks.filter((t) => t.id == cardId);
  await changeStyles(topParent);
  const addTaskLeftContainer = topParent.querySelectorAll(".add-task-left-container");
  addTaskLeftContainer.forEach((t) => {
    t.classList.add("modal-edit-container");
    t.classList.remove("add-task-left-container");
  });

  await editTask(card, cardId);
};

/**
 * Inserts the specified value into the provided array of input elements.
 *
 * @param {HTMLInputElement[]} element - An array of input elements where the value will be inserted.
 * @param {string} [value=""] - The value to be inserted into the input elements. Defaults to an empty string.
 * @returns {void}
 */
const insertDataToInputs = async (element, value = "") => {
  element.forEach((a) => {
    a.value = value;
  });
};

/**
 * Sets the "data-id" attribute of the board modal edit container to the specified card ID.
 *
 * @param {string} cardId - The identifier associated with the card.
 * @returns {Promise<void>} A promise that resolves when the attribute is successfully set.
 */
const setAttributeDataId = async (cardId) => {
  const boardModalEditContainer = document.querySelector("#board-modal-edit-container");
  boardModalEditContainer.setAttribute("data-id", cardId);
};

/**
 * Changes the display and value of the hidden date input field for due date modification.
 *
 * @param {string} dueDate - The due date to set for the hidden date input.
 * @returns {Promise<void>} A promise that resolves when the hidden date input is successfully modified.
 */
const changeHiddenDateInput = async (dueDate) => {
  const dateCalendarHidden = document.querySelector(".date-calendar-hidden");
  dateCalendarHidden.style.display = "flex";
  dateCalendarHidden.value = dueDate;
  dateCalendarHidden.style.color = "black";
};

/**
 * Handles the priority by invoking the appropriate priority-related function based on the provided priority level.
 *
 * @param {string} priority - The priority level (e.g., "Urgent", "Medium", "Low").
 * @returns {Promise<void>} A promise that resolves when the corresponding priority-related function is executed.
 */
const handlePriority = async (priority) => {
  if (priority === "Urgent") {
    await priorityUrgent();
  } else if (priority === "Medium") {
    await priorityMedia();
  } else if (priority === "Low") {
    await priorityLow();
  }
};

/**
 * Handles subtasks on hover by updating input elements and rendering subtask elements with associated styles and events.
 *
 * @param {Array<Object>} subtasks - An array of subtask objects containing task information.
 * @returns {Promise<void>} A promise that resolves when subtasks are successfully handled on hover.
 */
const handleSubtasksOnHover = async (subtasks) => {
  const { subtaskInputContainer, addTaskSelectSubtasksBtn, addTaskSelectSubtasksImg } = selectedSubTaskElements();

  const inputElement = document.querySelectorAll(".add-task-select-subtasks-input");

  subtasks.forEach(async (a) => {
    inputElement[1].value = a.task;
    await renderSubtask(inputElement[1], subtaskInputContainer, addTaskSelectSubtasksBtn, addTaskSelectSubtasksImg, a.taskId, a.task);
    await addTaskSubtaskStyle(a.taskId);
    await addEventImgDeleteOnHover();
    await addEventBackgroundOnHover();
    await addEventImgPencilOnHover();
    await addEventImgDoneOnHover();
  });
};

/**
 * Populates the task editing modal with the details of the selected task.
 *
 * @param {Object[]} card - An array containing the details of the selected task.
 * @param {number} cardId - The unique identifier of the selected task.
 * @returns {Promise<void>} A Promise that resolves once the editing modal is populated.
 */
const editTask = async (card, cardId) => {
  await clearInputsFields();
  const { title, assignedTo, category, description, dueDate, priority, subtasks } = card[0];

  await setAttributeDataId(cardId);

  const { addTaskSelectCategory } = selectedCategoryElements();
  const { addTaskTitleInput, textarea } = selectedAddTaskElements();

  await insertDataToInputs(addTaskTitleInput, title);
  await insertDataToInputs(textarea, description);
  await changeHiddenDateInput(dueDate);
  await handlePriority(priority);

  assignedTo.forEach((a) => {
    selectedContacts.push(a.id);
  });

  await renderAssignedContacts();

  addTaskSelectCategory.forEach((b) => {
    b.textContent = category;
  });
  await handleSubtasksOnHover(subtasks);
};

/**
 * Retrieves input values from specific elements within the provided parent element.
 *
 * @param {HTMLElement} topParent - The parent element containing input elements.
 * @returns {Promise<Array<string>>} A promise that resolves with an array of input values [titleInput, descriptionInput, dateInput, dateCalendarHidden].
 */
const inputValues = async (topParent) => {
  const titleInput = topParent.querySelector(".add-task-title-input").value;
  const descriptionInput = topParent.querySelector(".add-task-textarea-description").value;

  const dateInput = topParent.querySelector(".date-calendar").value;
  const dateCalendarHidden = document.querySelector(".date-calendar-hidden").value;

  return [titleInput, descriptionInput, dateInput, dateCalendarHidden];
};

/**
 * Changes the date input based on provided values, prioritizing dateInput over dateCalendarHidden if available.
 *
 * @function changeDateInput
 * @async
 * @param {string} dateInput - The value of the visible date input.
 * @param {string} dateCalendarHidden - The value of the hidden date input.
 * @returns {Promise<string>} A promise that resolves with the selected date value.
 */
const changeDateInput = async (dateInput, dateCalendarHidden) => {
  let inputValue;
  if (dateInput.length > 0) {
    inputValue = dateInput;
  } else {
    inputValue = dateCalendarHidden;
  }

  return inputValue;
};

/**
 * Sets the priority based on the selected div within the provided parent element.
 *
 * @function setPriorityDiv
 * @async
 * @param {HTMLElement} topParent - The parent element containing the priority div elements.
 * @returns {Promise<string>} A promise that resolves with the selected priority value.
 */
const setPriorityDiv = async (topParent) => {
  const priorityDiv = topParent.querySelectorAll(".priority div");
  let priority;
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
 * Sets the selected contacts based on the elements with the "selected-contact" class within the provided parent element.
 *
 * @function setTasksSelectedContacts
 * @async
 * @param {HTMLElement} topParent - The parent element containing elements with the "selected-contact" class.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of selected contacts.
 */
const setTasksSelectedContacts = async (topParent) => {
  const addTaskSelectedContacts = topParent.querySelectorAll(".selected-contact");
  const filteredResult = [];
  addTaskSelectedContacts.forEach((a) => {
    profiles.forEach((b) => {
      if (a.getAttribute("data-id") == b.id) {
        filteredResult.push(b);
      }
    });
  });
  return filteredResult;
};
