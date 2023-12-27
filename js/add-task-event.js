setTimeout(() => {
  /**
   * Destructures selected elements for handling events in the add task section.
   *
   * @type {Object}
   * @property {HTMLElement} addTaskSelectSubtasksBtnClear - Button to clear selected subtasks.
   * @property {HTMLElement} addTaskSelectSubtasksBtnDone - Button to mark selected subtasks as done.
   * @property {HTMLImageElement} addTaskSelectSubtasksImg - Image element for selected subtasks.
   * @property {HTMLImageElement} assignedContactsImg - Image element for assigned contacts.
   * @property {HTMLInputElement} date - Input field for the task due date.
   * @property {HTMLElement} dateContainer - Container element for the task due date.
   * @property {HTMLInputElement} dateCalendar - Calendar input for the task due date.
   * @property {HTMLImageElement} selectCategoryImg - Image element for the selected task category.
   */
  const {
    addTaskSelectSubtasksBtnClear,
    addTaskSelectSubtasksBtnDone,
    addTaskSelectSubtasksImg,
    assignedContactsImg,
    date,
    dateContainer,
    dateCalendar,
    selectCategoryImg,
  } = selectedAddTaskEventElements();

  /**
   * Adds event listeners for subtask image elements in the add task section.
   *
   * @param {HTMLImageElement[]} addTaskSelectSubtasksImg - An array of image elements representing subtasks.
   */
  addTaskSelectSubtasksImg.forEach((d) => {
    // Click event listener to show subtask buttons
    d.addEventListener("click", async (e) => {
      await showSubtaskButtons(e.target);
    });

    // Mouseover event listener to change image source on hover
    d.addEventListener("mouseover", async () => {
      d.src = "./assets/img/subtask-icon-hover.svg";
    });

    // Mouseout event listener to reset image source on mouseout
    d.addEventListener("mouseout", async () => {
      d.src = "./assets/img/subtask-icon.svg";
    });
  });

  /**
   * Adds a click event listener to each date element in the add task section.
   *
   * @param {HTMLInputElement[]} date - An array of input elements representing dates.
   */
  date.forEach((a) => {
    // Click event listener to show the date picker and adjust styles
    a.addEventListener("click", (event) => {
      // Get the parent and input elements
      const parent = event.target.parentNode;
      const el = event.target.parentNode.querySelector(".date-calendar");

      // Show the date picker
      el.showPicker();

      // Hide the hidden input calendar
      const inputCalendarHidden = document.querySelector(".date-calendar-hidden");
      inputCalendarHidden.style.display = "none";

      // Adjust styling to indicate selection
      parent.style.borderBottom = "0.1rem solid var(--btnHoverColor)";
    });
  });

  /**
   * Adds a change event listener to each date calendar input in the add task section.
   *
   * @param {HTMLInputElement[]} dateCalendar - An array of input elements representing date calendars.
   */
  dateCalendar.forEach((b) => {
    // Change event listener to update styles when the date is selected
    b.addEventListener("change", (event) => {
      // Reset border styling for all date containers
      dateContainer.forEach((a) => {
        a.style.borderBottom = "0.1rem solid var(--inputStyle)";
      });

      // Add a class to the active date input to indicate selection
      b.classList.add("date-input-active");
    });
  });

  /**
   * Adds mouseover and mouseout event listeners to each "clear subtasks" button in the add task section.
   *
   * @param {HTMLImageElement[]} addTaskSelectSubtasksBtnClear - An array of image elements representing "clear subtasks" buttons.
   */
  addTaskSelectSubtasksBtnClear.forEach((a) => {
    // Mouseover event listener to change image source on hover
    a.addEventListener("mouseover", async () => {
      a.src = "./assets/img/subtask-close-hover.svg";
    });

    // Mouseout event listener to reset image source on mouseout
    a.addEventListener("mouseout", async () => {
      a.src = "./assets/img/subtask-close.svg";
    });
  });

  /**
   * Adds mouseover and mouseout event listeners to each "mark subtasks as done" button in the add task section.
   *
   * @param {HTMLImageElement[]} addTaskSelectSubtasksBtnDone - An array of image elements representing "mark subtasks as done" buttons.
   */
  addTaskSelectSubtasksBtnDone.forEach((a) => {
    // Mouseover event listener to change image source on hover
    a.addEventListener("mouseover", async () => {
      a.src = "./assets/img/subtask-done-hover.svg";
    });

    // Mouseout event listener to reset image source on mouseout
    a.addEventListener("mouseout", async () => {
      a.src = "./assets/img/subtask-done.svg";
    });
  });

  /**
   * Adds mouseover and mouseout event listeners to each assigned contacts image in the add task section.
   *
   * @param {HTMLImageElement[]} assignedContactsImg - An array of image elements representing assigned contacts.
   * @param {boolean} state - The current state indicating whether the dropdown is open or closed.
   */
  assignedContactsImg.forEach((a) => {
    // Mouseover event listener to change image source on hover
    a.addEventListener("mouseover", () => {
      // Check the image source to determine the appropriate hover state
      if (a.src.split("/").pop() === "arrow-dropdown-down.svg" || state) {
        a.src = "./assets/img/arrow-dropdown-down-hover.svg";
      } else {
        a.src = "./assets/img/arrow-dropdown-up-hover.svg";
      }
    });

    // Mouseout event listener to reset image source on mouseout
    a.addEventListener("mouseout", () => {
      // Check the image source to determine the appropriate hover state
      if (a.src.split("/").pop() === "arrow-dropdown-down-hover.svg" || state) {
        a.src = "./assets/img/arrow-dropdown-down.svg";
      } else {
        a.src = "./assets/img/arrow-dropdown-up.svg";
      }
    });
  });

  /**
 * Hides subtask images and shows subtask buttons based on the provided elements.
 *
 * @param {Array<HTMLElement>} addTaskSelectSubtasksImg - An array of elements representing subtask images.
 * @param {Array<HTMLElement>} addTaskSelectSubtasksBtn - An array of elements representing subtask buttons.
 * @returns {Promise<void>} A promise that resolves when the display styles are adjusted.
 */
  const hideShowSubtask = async (addTaskSelectSubtasksImg, addTaskSelectSubtasksBtn) => {
    // Hide subtask images and show subtask buttons
    addTaskSelectSubtasksImg.forEach((b) => {
      b.style.display = "none";
    });
    addTaskSelectSubtasksBtn.forEach((c) => {
      c.style.display = "flex";
    });
  };

  /**
 * Displays error messages, shows subtask images, and hides subtask buttons based on the provided elements.
 *
 * @param {Array<HTMLInputElement>} addTaskSelectSubtasksInput - An array of elements representing subtask input fields.
 * @param {Array<HTMLElement>} addTaskSelectSubtasksImg - An array of elements representing subtask images.
 * @param {Array<HTMLElement>} addTaskSelectSubtasksBtn - An array of elements representing subtask buttons.
 * @returns {Promise<void>} A promise that resolves when the display styles and error messages are adjusted.
 */
  const displayErrorMessages = async (addTaskSelectSubtasksInput, addTaskSelectSubtasksImg, addTaskSelectSubtasksBtn) => {
    // Display error message, show subtask images, and hide subtask buttons
    addTaskSelectSubtasksInput.forEach((a) => {
      a.placeholder = "Please enter a subtask!";
      a.classList.add("add-task-select-subtasks-input-error");
    });
    addTaskSelectSubtasksImg.forEach((b) => {
      b.style.display = "flex";
    });
    addTaskSelectSubtasksBtn.forEach((c) => {
      c.style.display = "none";
    });
  };

  /**
   * Displays or hides subtask buttons based on the length of the provided input value.
   *
   * @param {HTMLImageElement} target - The target image element that triggered the subtask buttons display.
   */
  const showSubtaskButtons = async (target) => {
    // Destructure selected subtask elements
    const { addTaskSelectSubtasksImg, addTaskSelectSubtasksBtn, addTaskSelectSubtasksInput } = selectedSubTaskElements();

    // Get the value from the corresponding input field
    const value = target.parentElement.querySelector(".add-task-select-subtasks-input").value;

    // Check the length of the input value to determine whether to show or hide subtask buttons
    if (value.length > 3) {
      await hideShowSubtask(addTaskSelectSubtasksImg, addTaskSelectSubtasksBtn);
    } else {
      await displayErrorMessages(addTaskSelectSubtasksInput, addTaskSelectSubtasksImg, addTaskSelectSubtasksBtn);
    }
  };

  /**
   * Adds mouseover and mouseout event listeners to each category selection image in the add task section.
   *
   * @param {HTMLImageElement[]} selectCategoryImg - An array of image elements representing category selection.
   * @param {boolean} stateTwo - The current state indicating whether the dropdown is open or closed.
   */
  selectCategoryImg.forEach((a) => {
    // Mouseover event listener to change image source on hover
    a.addEventListener("mouseover", () => {
      // Check the image source to determine the appropriate hover state
      if (a.src.split("/").pop() === "arrow-dropdown-down.svg" || stateTwo) {
        a.src = "./assets/img/arrow-dropdown-down-hover.svg";
      } else {
        a.src = "./assets/img/arrow-dropdown-up-hover.svg";
      }
    });

    // Mouseout event listener to reset image source on mouseout
    a.addEventListener("mouseout", () => {
      // Check the image source to determine the appropriate hover state
      if (a.src.split("/").pop() === "arrow-dropdown-down-hover.svg" || stateTwo) {
        a.src = "./assets/img/arrow-dropdown-down.svg";
      } else {
        a.src = "./assets/img/arrow-dropdown-up.svg";
      }
    });
  });

  const boardHeadSearchImg = document.querySelector("#board-head-search-img");
  /**
   * Adds a click event listener to the board head search image for handling search input validation.
   *
   * @param {HTMLImageElement} boardHeadSearchImg - The image element for the board head search.
   */
  boardHeadSearchImg.addEventListener("click", async () => {
    // Get the search input and search container elements
    const boardHeadSearchInput = document.querySelector("#board-head-search-input");
    const boardHeadSearch = document.querySelector("#board-head-search");

    // Check if the search input is empty
    if (boardHeadSearchInput.value.length === 0) {
      // Display error styling and placeholder if the search input is empty
      boardHeadSearch.style.border = "0.1rem solid var(--error)";
      boardHeadSearchInput.placeholder = "Please search for a task!";
    } else {
      // Reset styling and placeholder if the search input is not empty
      boardHeadSearch.style.border = "0.1rem solid var(--divider)";
      boardHeadSearchInput.placeholder = "Find task";
    }
  });
}, 2000);

/**
 * Adds mouseover and mouseout event listeners to elements with the "hover" class to change image source on hover.
 */
const addEventImgDeleteOnHover = async () => {
  // Select all elements with the "hover" class
  const addTaskSubtaskImgDelete = document.querySelectorAll(".hover");

  // Add event listeners to each element
  addTaskSubtaskImgDelete.forEach((u) => {
    // Mouseover event listener to change image source on hover
    u.addEventListener("mouseover", async () => {
      u.src = "./assets/img/subtask-delete-hover.svg";
    });

    // Mouseout event listener to reset image source on mouseout
    u.addEventListener("mouseout", async () => {
      u.src = "./assets/img/subtask-delete.svg";
    });
  });
};

/**
 * Adds mouseover and mouseout event listeners to elements with the "add-task-unordered-list" class
 * to change background color and adjust opacity on hover when an input is in focus.
 */
const addEventBackgroundOnHover = async () => {
  // Select all elements with the "add-task-unordered-list" class
  const addTaskUnorderedList = document.querySelectorAll(".add-task-unordered-list");

  // Add event listeners to each element
  addTaskUnorderedList.forEach((b) => {
    // Mouseover event listener to change background color and adjust opacity on hover
    b.addEventListener("mouseover", (e) => {
      if (inputOnFocus) {
        b.style.backgroundColor = "var(--menuBackGround)";
        b.querySelector(".add-task-subtask").style.opacity = 1;
      }
    });

    // Mouseout event listener to reset background color and opacity on mouseout
    b.addEventListener("mouseout", async (e) => {
      if (inputOnFocus) {
        b.style.backgroundColor = "var(--white)";
        b.querySelector(".add-task-subtask").style.opacity = 0;
      }
    });
  });
};

/**
 * Adds mouseover and mouseout event listeners to elements with the "add-task-subtask-img-pencil" class
 * to change image source on hover.
 */
const addEventImgPencilOnHover = async () => {
  // Select all elements with the "add-task-subtask-img-pencil" class
  const addTaskSubtaskImgPencil = document.querySelectorAll(".add-task-subtask-img-pencil");

  // Add event listeners to each element
  addTaskSubtaskImgPencil.forEach((b) => {
    // Mouseover event listener to change image source on hover
    b.addEventListener("mouseover", async () => {
      b.src = "./assets/img/subtask-pencil-hover.svg";
    });

    // Mouseout event listener to reset image source on mouseout
    b.addEventListener("mouseout", async () => {
      b.src = "./assets/img/subtask-pencil.svg";
    });
  });
};
