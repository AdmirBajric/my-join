/**
 * Sets up click event handling for a given task card.
 * @async
 * @function
 * @param {HTMLElement} card - The task card element to attach the click event to.
 * @returns {Promise<void>}
 */
const setCardClick = async (card) => {
  const cardClick = async (e) => {
    if (e.target.tagName !== "IMG" && e.target.getAttribute("src") !== "../assets/img/arrow-dropdown-down.svg") {
      if (!isDragging) {
        const clickedCard = await filteredTasks(card);
        await overlay(true);
        await showModal();
        await changeCategory(clickedCard);
        await changeTitle(clickedCard);
        await changeDescription(clickedCard);
        await changeDate(clickedCard);
        await changeInfoParagraph(clickedCard);
        await changeInfoImage(clickedCard);
        await changeAssignedTo(clickedCard);
        await changeSubtask(clickedCard);
        await insertElementDelete(clickedCard);
        await insertElementEdit(clickedCard);
        await hoverCloseImage();
        await closeModal();
        await closeEditModal();
        await hoverEditCloseImage();
        await setEventListeners();
        await changeHoverImgSubtasks();
        await addEventBackgroundOnHover();
        await addEventImgDeleteOnHover();
        await addEventImgPencilOnHover();
        await addEventImgDoneOnHover();
        card.removeEventListener("click", cardClick);
      }
    }
  };
  card.addEventListener("click", cardClick);
};

/**
 * Controls the visibility of the overlay element.
 * @async
 * @function
 * @param {boolean} isShowing - Indicates whether the overlay should be shown (default is false).
 * @returns {Promise<void>}
 */
const overlay = async (isShowing = false) => {
  const overlay = document.querySelector("#overlay");
  isShowing ? (overlay.style.display = "flex") : (overlay.style.display = "none");
};

/**
 * Inserts an edit element into the board modal for a given task card.
 * @async
 * @function
 * @param {Array} card - The array representing the task card.
 * @returns {Promise<void>}
 */
const insertElementEdit = async (card) => {
  const html = `<div onclick="editTasks(event, ${card[0].id})" id="modal-edit">
    <img src="./assets/img/edit-contact.svg" alt="" />
  </div>`;

  if (document.querySelector("#modal-edit")) {
    const el = document.querySelector("#modal-edit");
    el.remove();
  }
  const modalEdit = document.querySelector("#board-modal-delete-edit");
  modalEdit.insertAdjacentHTML("beforeend", html);
};

/**
 * Inserts a delete element into the board modal for a given task card.
 * @async
 * @function
 * @param {Array} card - The array representing the task card.
 * @returns {Promise<void>}
 */
const insertElementDelete = async (card) => {
  const html = `<div onclick="deleteTask(${card[0].id})" id="modal-delete">
    <img src="./assets/img/delete-contact.svg" alt="" />
  </div>`;

  if (document.querySelector("#modal-delete")) {
    const el = document.querySelector("#modal-delete");
    el.remove();
  }
  const modalDelete = document.querySelector("#board-modal-delete-edit");
  modalDelete.insertAdjacentHTML("afterbegin", html);
};

/**
 * Clears the content of selected contacts and subtask input containers, and resets date values and subtask placeholders.
 *
 * @param {NodeListOf<HTMLElement>} addTaskSelectedContacts - Elements representing selected contacts.
 * @param {NodeListOf<HTMLElement>} subtaskInputContainer - Elements representing subtask input containers.
 * @returns {Promise<void>} A promise that resolves when the content is cleared, date values are reset, and subtask placeholders are updated.
 */
const clearContactsSubtaskDate = async (addTaskSelectedContacts, subtaskInputContainer) => {
  addTaskSelectedContacts.forEach((a) => {
    a.innerHTML = "";
  });
  subtaskInputContainer.forEach((b) => {
    b.innerHTML = "";
  });

  const date = document.querySelectorAll(".date-calendar");
  date.forEach((a) => {
    a.value = "";
  });
  const subtaskPlaceholder = document.querySelectorAll(".add-task-select-subtasks-input");
  subtaskPlaceholder.forEach((a) => {
    a.classList.remove("add-task-select-subtasks-input-error");
    a.placeholder = "Add new subtask";
  });
};

/**
 * Clears input fields and resets various elements in the add task form.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const clearInputsFields = async () => {
  const addTaskLeftContainer = document.querySelector(".add-task-left-container");
  addTaskLeftContainer.scrollTop = 0;
  selectedContacts = [];
  const { addTaskTitleInput, textarea, addTaskSelectedContacts } = selectedAddTaskElements();
  const { addTaskSelectCategory } = selectedCategoryElements();
  const { subtaskInputContainer } = selectedSubTaskElements();
  await insertDataToInputs(addTaskTitleInput, "");
  await insertDataToInputs(textarea, "");
  addTaskSelectCategory.forEach((a) => {
    a.textContent = "Select task category";
  });
  await removeClasses();
  await clearContactsSubtaskDate(addTaskSelectedContacts, subtaskInputContainer);
};

/**
 * Closes the edit modal and resets its state.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const closeEditModal = async () => {
  const modalCloseImg = document.querySelector(".board-modal-edit-img");
  modalCloseImg.addEventListener("click", async () => {
    await overlay(false);
    const boardModalCard = document.querySelector("#board-modal-card");
    boardModalCard.style.top = "150%";

    setTimeout(async () => {
      const boardHeadContainer = document.querySelector("#board-modal-card-container");
      boardHeadContainer.style.display = "flex";

      const boardModalEditContainer = document.querySelector("#board-modal-edit-container");
      boardModalEditContainer.style.display = "none";
      await clearInputsFields();
    }, 1000);
  });
};

/**
 * Closes the main modal and resets its state.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const closeModal = async () => {
  const modalCloseImg = document.querySelector(".modal-close-img");
  modalCloseImg.addEventListener("click", async () => {
    await overlay(false);
    await modalCloseOnClick();
  });
};

/**
 * Closes the main modal and resets its state on click.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const modalCloseOnClick = async () => {
  const boardModalCard = document.querySelector("#board-modal-card");
  boardModalCard.style.top = "150%";
  await clearInputsFields();
};

/**
 * Adds hover effects to the edit modal close image.
 * @async
 * @function
 * @returns {Promise<void>}
 */
const hoverEditCloseImage = async () => {
  const modalCloseImg = document.querySelector(".board-modal-edit-img");
  modalCloseImg.addEventListener("mouseover", async () => {
    modalCloseImg.src = "./assets/img/board-close.svg";
  });
  modalCloseImg.addEventListener("mouseout", async () => {
    modalCloseImg.src = "./assets/img/board-modal-close.svg";
  });
};

/**
 * Adds hover effect to the close image of a modal.
 * Changes the image source on mouseover and reverts it on mouseout.
 */
const hoverCloseImage = async () => {
  const modalCloseImg = document.querySelector(".modal-close-img");

  /**
   * Handles the mouseover event to change the image source.
   */
  modalCloseImg.addEventListener("mouseover", async () => {
    modalCloseImg.src = "./assets/img/board-close.svg";
  });

  /**
   * Handles the mouseout event to revert the image source.
   */
  modalCloseImg.addEventListener("mouseout", async () => {
    modalCloseImg.src = "./assets/img/board-modal-close.svg";
  });
};

/**
 * Filters tasks based on the given card's data ID.
 *
 * @param {HTMLElement} card - The card element containing the data ID attribute.
 * @returns {Array} An array of tasks matching the specified data ID.
 */
const filteredTasks = async (card) => {
  return tasks.filter((t) => t.id == card.getAttribute("data-id"));
};

/**
 * Changes the image source to a checked checkbox hover state and toggles the progress status of a subtask.
 *
 * @param {Event} event - The event object representing the checked checkbox hover event.
 * @param {string} taskId - The identifier of the task associated with the subtask.
 * @param {string} subTaskId - The identifier of the subtask to update.
 * @returns {Promise<void>} A promise that resolves when the image source is changed, and the progress status is toggled.
 */
const changeImgCheckBoxHoverChecked = async (event, taskId, subTaskId) => {
  event.target.src = "./assets/img/checkbox-hover-checked.svg";
  tasks.forEach((a) => {
    if (a.id === +taskId) {
      a.subtasks.forEach((a) => {
        if (+a.taskId === +subTaskId) {
          a.progress = !a.progress;
        }
      });
    }
  });
};

/**
 * Changes the image source to a checkbox hover state and toggles the progress status of a subtask.
 *
 * @param {Event} event - The event object representing the checkbox hover event.
 * @param {string} taskId - The identifier of the task associated with the subtask.
 * @param {string} subTaskId - The identifier of the subtask to update.
 * @returns {Promise<void>} A promise that resolves when the image source is changed, and the progress status is toggled.
 */
const changeImgCheckBoxHover = async (event, taskId, subTaskId) => {
  event.target.src = "./assets/img/checkbox-hover.svg";
  tasks.forEach((a) => {
    if (a.id === +taskId) {
      a.subtasks.forEach((a) => {
        if (+a.taskId === +subTaskId) {
          a.progress = !a.progress;
        }
      });
    }
  });
};

/**
 * Hides or displays the card head images based on the window width.
 * @returns {void}
 */
const hideOrDisplayCardHeadImg = async () => {
  if (window.innerWidth >= 820) {
    setTimeout(() => {
      const progressCardHeadImg = document.querySelectorAll(".progress-card-head-img");
      progressCardHeadImg.forEach((a) => {
        a.style.display = "none";
      });
    }, 10);
  }
};

/**
 * Updates the progress status of a subtask based on the user interaction.
 *
 * @param {Event} event - The event triggered by the user interaction.
 * @returns {Promise<void>} A promise that resolves after updating and storing the task data.
 */
const updateSubtasks = async (event) => {
  const taskId = event.target.getAttribute("data-taskId");
  const subTaskId = event.target.getAttribute("data-subTaskId");

  if (event.target.src.split("img/")[1] === "checkbox-hover.svg") {
    await changeImgCheckBoxHoverChecked(event, taskId, subTaskId);
  } else if (event.target.src.split("img/")[1] === "checkbox-hover-checked.svg") {
    await changeImgCheckBoxHover(event, taskId, subTaskId);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  await setItem("tasks", tasks);

  const progressContainer = document.querySelectorAll(".progress-container");
  await hideOrDisplayCardHeadImg();
  await resetHTML();
  await removeSkeleton();
  await tasksStart(progressContainer);
  await checkProgressCards(progressContainer);
  await setProgressCard();
};

/**
 * Changes the display of subtasks in the modal based on the provided card data.
 *
 * @param {Array} clickedCard - An array containing the card data with subtasks to be displayed.
 * @returns {void}
 */
const changeSubtask = async (clickedCard) => {
  subtasksHtml = "";
  const imgSrc = ["checkbox-checked.svg", "checkbox-empty.svg"];

  clickedCard[0].subtasks.forEach((a, index) => {
    let count;
    if (a.progress) {
      count = 0;
    } else {
      count = 1;
    }
    subtasksHtml += `<div><img onclick="updateSubtasks(event)" data-taskId="${clickedCard[0].id}" data-subtaskId="${a.taskId}" class="modal-subtask-img" src="./assets/img/${imgSrc[count]}" alt="" /><p>${a.task}</p></div>`;
  });
  const modalSubtask = document.querySelector("#modal-subtask");
  modalSubtask.innerHTML = "";
  if (subtasksHtml.length > 0) {
    modalSubtask.innerHTML += subtasksHtml;
  } else {
    modalSubtask.innerHTML += `<p class="no-subtasks-added">No subtasks added</p>`;
  }
};

/**
 * Changes the display of assigned contacts in the modal based on the provided card data.
 *
 * @param {Array} clickedCard - An array containing the card data with assigned contacts.
 * @returns {void}
 */
const changeAssignedTo = async (clickedCard) => {
  assignedHtml = `<p class="assigned-to"><strong>Assigned:</strong></p>`;
  if (clickedCard[0].assignedTo.length > 0) {
    clickedCard[0].assignedTo.forEach((a) => {
      assignedHtml += assignedTo(a);
    });
  } else {
    assignedHtml += `<p class="no-contacts-added">No contacts added</p>`;
  }
  const boardModalAssignedTo = document.querySelector("#board-modal-assigned-to");
  boardModalAssignedTo.innerHTML = "";
  boardModalAssignedTo.innerHTML += assignedHtml;
};

/**
 * Changes the displayed priority image in the modal based on the provided card data.
 *
 * @param {Array} clickedCard - An array containing the card data.
 * @returns {void}
 */
const changeInfoImage = async (clickedCard) => {
  const boardModalPriorityInfoImg = document.querySelector("#board-modal-priority-info img");
  boardModalPriorityInfoImg.src = `./assets/img/${clickedCard[0].img.toLowerCase()}`;
};

/**
 * Changes the displayed priority paragraph in the modal based on the provided card data.
 *
 * @param {Array} clickedCard - An array containing the card data.
 * @returns {void}
 */
const changeInfoParagraph = async (clickedCard) => {
  const boardModalPriorityInfoParagraph = document.querySelector("#board-modal-priority-info p");
  boardModalPriorityInfoParagraph.textContent = clickedCard[0].priority;
};

/**
 * Changes the displayed due date in the modal based on the provided card data.
 *
 * @param {Array} clickedCard - An array containing the card data.
 * @returns {void}
 */
const changeDate = async (clickedCard) => {
  const boardModalDate = document.querySelector("#board-modal-date p");
  boardModalDate.textContent = clickedCard[0].dueDate;
};

/**
 * Changes the displayed description in the modal based on the provided card data.
 *
 * @param {Array} clickedCard - An array containing the card data.
 * @returns {void}
 */
const changeDescription = async (clickedCard) => {
  const boardModalDescription = document.querySelector("#board-modal-description p");
  boardModalDescription.textContent = clickedCard[0].description;
};
