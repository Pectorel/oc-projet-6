// Imports
import {aria} from "./ariaFunctions.js";
import {setFocusable} from "./tabFocusHandler.js";

/**
 * Display the contact modal
 */
function display() {

    // Getting required HTMLElement
    const $modal = document.getElementById("contact-modal");
    const $first_input = $modal.querySelector("input");

    // Displaying contact modal
	$modal.style.display = "block";

    // Changing aria attributes
    aria("aria-hidden", $modal, "false");

    // Focus first input for accessibility
    $first_input.focus();

    // We get all focusable elements
    let $focusable_elements = document.querySelectorAll("[tabindex], a, button:not(.submit-btn)");
    // We disable the focus on these elements
    setFocusable(-1, $focusable_elements);

}

/*
*
* Retrieve data from the modal form after submit
*
* */
function submit(e, $form){

    if(e) e.preventDefault();

    // Getting all form data in a FormData object
    let data = new FormData($form);

    // Foreach data in form, we console.log the key and data
    for(const pair of data.entries()) {
        console.log(`${pair[0]} : ${pair[1]}`);
    }

    // Resetting the form after submit
    $form.reset();
    // Close modal with data-close element
    document.querySelector("[data-close='#contact-modal']").click();

}

export {display, submit};