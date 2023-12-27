/**
 * Set up event listeners to change the source of images on mouseover and mouseout.
 * Uses a one-second delay with setTimeout to ensure the document is fully loaded.
 */
setTimeout(() => {
  /**
   * Array of elements with the class "help-header-img".
   * @type {NodeListOf<HTMLImageElement>}
   */
  const helpHeaderImages = document.querySelectorAll(".help-header-img");

  /**
   * Event listener to change the image source to a hover state on mouseover.
   * @param {Event} event - The mouseover event.
   */
  const handleMouseover = (event) => {
    const imageElement = event.target;
    imageElement.src = "./assets/img/arrow-left-hover.svg";
  };

  /**
   * Event listener to change the image source back to its original state on mouseout.
   * @param {Event} event - The mouseout event.
   */
  const handleMouseout = (event) => {
    const imageElement = event.target;
    imageElement.src = "./assets/img/arrow-left.svg";
  };

  // Add mouseover event listener to each helpHeaderImage
  helpHeaderImages.forEach((element) => {
    element.addEventListener("mouseover", handleMouseover);
  });

  // Add mouseout event listener to each helpHeaderImage
  helpHeaderImages.forEach((element) => {
    element.addEventListener("mouseout", handleMouseout);
  });
}, 1500);
