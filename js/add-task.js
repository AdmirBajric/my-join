/**
 * Represents the current state of a specific feature (example: dropdown) - Default is true.
 * @type {boolean}
 */
let state = true;

/**
 * Represents the current state of another specific feature - Default is true.
 * @type {boolean}
 */
let stateTwo = true;

/**
 * Represents the focus state of an input - Default is true.
 * @type {boolean}
 */
let inputOnFocus = true;

/**
 * Represents the list of selected contacts.
 * @type {string[]}
 */
let selectedContacts = [];

/**
 * Represents the structure of a new task with default values.
 * @type {Object[]}
 */
let newTask = [
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

setTimeout(() => {
  /**
   * Represents a collection of selected elements in the add task section.
   *
   * @typedef {Object} SelectedAddTaskElements
   * @property {HTMLImageElement[]} assignedContactsImg - Image elements for assigned contacts.
   * @property {HTMLUListElement[]} addTaskCategoryList - Unordered list elements for categories.
   * @property {HTMLImageElement[]} selectCategoryImg - Image elements for category selection.
   * @property {HTMLDivElement[]} addTaskAssignedContactsInfo - Info div elements for assigned contacts.
   * @property {HTMLInputElement[]} addTaskAssignedContactsInput - Input elements for assigned contacts.
   * @property {HTMLDivElement[]} addTaskSelectedContacts - Selected contacts elements.
   */

  /**
   * Destructures the selected elements in the add task section.
   *
   * @returns {SelectedAddTaskElements} An object containing references to selected elements.
   */

  // Example usage:
  const { assignedContactsImg, addTaskCategoryList, selectCategoryImg, addTaskAssignedContactsInfo, addTaskAssignedContactsInput, addTaskSelectedContacts } = selectedAddTaskElements();

  /**
   * Toggles a state variable, updates the image source based on its value, and modifies HTML content accordingly.
   *
   * @param {HTMLImageElement} a - The image element to toggle and update.
   * @param {string} html - The HTML content to update in addTaskCategoryList elements.
   * @returns {Promise<void>} A promise that resolves when the state is toggled, image source is updated, and HTML content is modified.
   */
  const toggleStateUpdateImgSrc = async (a, html) => {
    // Toggle the stateTwo variable and update the image source based on its value
    if (stateTwo) {
      a.src = "./assets/img/arrow-dropdown-up.svg";
      stateTwo = !stateTwo;
      // Update the content of each addTaskCategoryList element with the generated HTML
      addTaskCategoryList.forEach((a) => {
        a.innerHTML = html;
      });
    } else {
      a.src = "./assets/img/arrow-dropdown-down.svg";
      stateTwo = !stateTwo;
      // Clear the content of each addTaskCategoryList element
      addTaskCategoryList.forEach((b) => {
        b.innerHTML = "";
      });
    }
  };

  /**
   * Adds a click event listener to each element in the selectCategoryImg collection for handling category selection.
   *
   * @param {HTMLImageElement} a - An image element for category selection.
   */
  selectCategoryImg.forEach((a) => {
    a.addEventListener("click", async () => {
      // Initialize an empty string to store category labels HTML
      let html = "";

      // Retrieve all category labels from local storage
      const allCategory = JSON.parse(localStorage.getItem("category"));

      // Generate HTML for each category label and append to the html string
      allCategory.forEach((c) => {
        html += `<div onclick="addCategory('${c}')" class="add-task-category-label">
                  <p>${c}</p>
                </div>`;
      });
      await toggleStateUpdateImgSrc(a, html);
    });
  });

  /**
   * Clears the content of each addTaskSelectedContacts element.
   *
   * @returns {Promise<void>} A promise that resolves when the content is cleared.
   */
  const clearContentOfElements = async () => {
    // Clear the content of each addTaskSelectedContacts element
    addTaskSelectedContacts.forEach((b) => {
      b.innerHTML = "";
    });
  };

  /**
   * Clears the value of each addTaskAssignedContactsInput element, toggles a state variable, and updates the image source.
   *
   * @param {HTMLImageElement} a - The image element to update.
   * @returns {Promise<void>} A promise that resolves when the value is cleared, state is toggled, and image source is updated.
   */
  const clearValueOfElements = async (a) => {
    a.src = "./assets/img/arrow-dropdown-down.svg";
    state = !state;
    // Clear the value of each addTaskAssignedContactsInput element
    addTaskAssignedContactsInput.forEach((a) => {
      a.value = "";
    });
  };

  /**
   * Adds a click event listener to each element in the assignedContactsImg collection for handling assigned contacts.
   *
   * @param {HTMLImageElement} a - An image element for assigned contacts.
   */
  assignedContactsImg.forEach((a) => {
    a.addEventListener("click", async () => {
      // Toggle the visibility of the assignedTo div
      await toggleAssignedToDiv();

      // Toggle the state variable and update the image source based on its value
      if (state) {
        a.src = "./assets/img/arrow-dropdown-up.svg";
        state = !state;
        // Render and update event listeners for adding task contacts
        await renderAddTaskContacts(true);
        await assignedContactsEventListeners();
        await clearContentOfElements();
      } else {
        await clearValueOfElements(a);
        // Render contacts and update assigned contacts if any
        await renderAddTaskContacts(false);
        if (selectedContacts.length > 0) {
          await renderAssignedContacts();
        }
      }
    });
  });

  /**
   * Adds click event listeners to elements with the "add-task-img" class for handling assigned contacts.
   */
  const assignedContactsEventListeners = async () => {
    // Select all elements with the "add-task-img" class
    const addTaskImg = document.querySelectorAll(".add-task-img");

    // Add event listeners to each element
    addTaskImg.forEach(async (task) => {
      // Click event listener to toggle the checkbox state
      task.addEventListener("click", async (e) => {
        // Extract the path from the image source URL
        const path = await extractPathFromURL(e.target.src);

        // Toggle the checkbox state based on the extracted path
        if (path == "./assets/img/checkbox-empty.svg") {
          e.target.src = "./assets/img/checkbox-checked.svg";
        } else {
          e.target.src = "./assets/img/checkbox-empty.svg";
        }
      });
    });
  };

  /**
   * Extracts the pathname from a given URL.
   *
   * @param {string} url - The URL from which to extract the pathname.
   * @returns {string} The pathname component of the URL.
   */
  const extractPathFromURL = async (url) => {
    const parsedURL = new URL(url);
    return parsedURL.pathname;
  };

  /**
   * Renders the HTML for adding task contacts based on specified criteria.
   *
   * @param {boolean} show - Determines whether to display the rendered HTML.
   */
  const renderAddTaskContacts = async (show) => {
    let html = ``;
    profiles = await sortProfiles();
    html = await filterProfiles(profiles);
    await showAddTaskFilteredContacts(html, show);
  };

  /**
   * Sorts the profiles array alphabetically based on the 'name' property.
   *
   * @returns {Object[]} The sorted profiles array.
   */
  const sortProfiles = async () => {
    profiles.sort((a, b) => a.name.localeCompare(b.name));
    return profiles;
  };

  /**
   * Filters and generates HTML for each profile based on selected contacts.
   *
   * @param {Object[]} profiles - The array of profiles to filter and generate HTML.
   * @returns {string} The HTML string representing the filtered profiles.
   */
  const filterProfiles = async (profiles) => {
    let newHtml = "";
    profiles.forEach(async (profile) => {
      let path = "";
      if (!selectedContacts.includes(profile.id)) {
        path = "./assets/img/checkbox-empty.svg";
      } else {
        path = "./assets/img/checkbox-checked.svg";
      }
      newHtml += filterProfilesTemplate(profile, path);
    });

    newHtml += assignedAddNewContactTemplate();

    return newHtml;
  };

  /**
   * Clears the content of each element with the "add-task-all-contacts" class.
   *
   * @param {NodeListOf<HTMLElement>} addTaskAllContacts - The elements with the "add-task-all-contacts" class.
   * @returns {Promise<void>} A promise that resolves when the content is cleared.
   */
  const clearContentAddTaskAllContacts = async (addTaskAllContacts) => {
    // Clear the content of each element with the "add-task-all-contacts" class
    addTaskAllContacts.forEach((d) => {
      d.innerHTML = "";
    });
  };

  /**
   * Displays or hides the filtered contacts HTML within specified elements.
   *
   * @param {string} html - The HTML string representing the filtered contacts.
   * @param {boolean} show - Determines whether to display the rendered HTML.
   */
  const showAddTaskFilteredContacts = async (html, show) => {
    // Select all elements with the "add-task-all-contacts" class
    const addTaskAllContacts = document.querySelectorAll(".add-task-all-contacts");
    await clearContentAddTaskAllContacts(addTaskAllContacts);

    // Display or hide the rendered HTML based on the 'show' parameter
    if (show) {
      addTaskAllContacts.forEach((c) => {
        c.innerHTML = html;
      });
    } else {
      addTaskAllContacts.forEach((b) => {
        b.innerHTML = "";
      });
    }
  };

  /**
   * Hides elements related to assigned contacts information by setting their display style to "none".
   *
   * @returns {Promise<void>} A promise that resolves when the elements are hidden.
   */
  const hideElementsRelatedToAssignedContacts = async () => {
    // Hide elements related to assigned contacts info
    addTaskAssignedContactsInfo.forEach((c) => {
      c.style.display = "none";
    });
  };

  /**
   * Displays elements related to assigned contacts input by setting their display style to "inherit".
   *
   * @returns {Promise<void>} A promise that resolves when the elements are displayed.
   */
  const displayElementsRelatedAssignedContacts = async () => {
    // Display elements related to assigned contacts input
    addTaskAssignedContactsInput.forEach((u) => {
      u.style.display = "inherit";
    });
  };

  /**
   * Toggles the display of elements related to assigned contacts based on the 'state' variable.
   */
  const toggleAssignedToDiv = async () => {
    // Toggle the display of elements based on the 'state' variable
    if (state) {
      await hideElementsRelatedToAssignedContacts();
      await displayElementsRelatedAssignedContacts();
    } else {
      // Display elements related to assigned contacts info
      addTaskAssignedContactsInfo.forEach((b) => {
        b.style.display = "inherit";
      });

      // Hide elements related to assigned contacts input
      addTaskAssignedContactsInput.forEach((i) => {
        i.style.display = "none";
      });
    }
  };

  /**
   * Adds a click event listener to the window to handle clicks outside specific elements.
   *
   * @param {MouseEvent} e - The click event object.
   */
  window.addEventListener("click", async (e) => {
    // Check if the click is outside the assigned contacts area
    if (await ifOutsideFromAssigned(e)) {
      // Toggle the state variable
      state = !state;
      await resetArrowDownwardIcon();

      // Change display settings, render filtered contacts, and render assigned contacts if any
      await changeDisplaySettings();
      await renderAddTaskContacts();

      if (selectedContacts.length > 0) {
        await renderAssignedContacts();
      }
    } else if (await ifOutsideFromContacts(e)) {
      await clearContentCategoryListElements();
    }
  });

  /**
   * Adds an input event listener to elements in the "addTaskAssignedContactsInput" NodeList,
   * filtering and rendering profiles based on user input.
   *
   * @param {InputEvent} e - The input event object.
   */
  addTaskAssignedContactsInput.forEach((b) => {
    b.addEventListener("input", async (e) => {
      // Sort the profiles array alphabetically based on the 'name' property
      profiles = await sortProfiles();
      // Filter profiles based on user input
      const newProfiles = await filterProfilesBasedOnInput(profiles);
      // Generate HTML for the filtered profiles and display them
      let html = await filterProfiles(newProfiles);
      await showAddTaskFilteredContacts(html, true);
      // Add event listeners to assigned contacts
      await assignedContactsEventListeners();
    });
  });

  setTimeout(() => {
    /**
     * Adds mouseover, mouseout, and click event listeners to the "addNewTaskModalImg" element,
     * changing its source on mouseover and mouseout, and triggering modal close and input fields clearing on click.
     */
    const addNewTaskModalImg = document.querySelector(".add-new-task-modal-img");

    addNewTaskModalImg.addEventListener("mouseover", async () => {
      // Change the source of the image on mouseover
      addNewTaskModalImg.src = "./assets/img/board-close.svg";
    });

    addNewTaskModalImg.addEventListener("mouseout", async () => {
      // Change the source of the image on mouseout
      addNewTaskModalImg.src = "./assets/img/board-modal-close.svg";
    });

    addNewTaskModalImg.addEventListener("click", async () => {
      // Close the modal and clear input fields on click
      await addNewTaskModalClose();
      await clearInputsFields();
    });
  }, 2000);
}, 1500);
