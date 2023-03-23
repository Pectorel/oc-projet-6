// Import
import {setFocusable} from "./tabFocusHandler.js";


function init() {

    // Contact modal HTMLElements
    let $contact_modal = document.querySelector("#contact-modal");
    let $close_modal = document.querySelector(".close-modal");

    // Lightbox HTML Elements
    let $lightbox = document.querySelector("#media-lightbox");
    let $previous_btn = document.querySelector(".lightbox-media-prev");
    let $next_btn = document.querySelector(".lightbox-media-next");
    let $close_btn = document.querySelector(".close-lightbox");


    // Listbox HTML Elements
    let $listbox = document.querySelector("#sort-listbox");
    let $listbox_options = $listbox.children;

    // Keyboard Events
    document.addEventListener('keydown', (event) => {

        // Contact Modal
        if($contact_modal.style.display === "block") {

            // Close modal with Escape button
            if(event.key === "Escape") {
                $close_modal.click();
            }

        }

        // Lightbox
        // We check that the lightbox is active
        else if($lightbox.style.display === "block") {

            if(event.key === "ArrowLeft") {
                event.preventDefault();
                if($previous_btn.style.visibility !== "hidden") $previous_btn.click();
            }
            else if(event.key === "ArrowRight") {
                event.preventDefault();
                if($next_btn.style.visibility !== "hidden") $next_btn.click();
            }
            else if(event.key === "Escape") {
                event.preventDefault();
                $close_btn.click();
            }

        }
        // Listbox Event
        else if($listbox.classList.contains("active")) {


            if (event.key === "ArrowDown") {

                event.preventDefault();
                changeSelectedOption($listbox_options, "next");


            }
            else if(event.key === "ArrowUp") {
                event.preventDefault();
                changeSelectedOption($listbox_options, "prev");

            }
            else if(event.key === "Enter") {
                event.preventDefault();

                let $selected = document.querySelector("[data-listbox-option].selected");

                if($selected != null) $selected.click();

            }
        }
        // Non screen readers enter for Lightbox and like buttons
        else {

            if(event.key === "Enter")
            {
                // Lightbox
                let $lightbox_click_item = document.querySelector(".media-source-container:focus-visible");

                if($lightbox_click_item != null)
                {
                    $lightbox_click_item.click();
                }
                else
                {
                    // Like button
                    let $like_btn = document.querySelector("[data-like-add]:focus-visible");

                    if($like_btn != null)
                    {
                        $like_btn.click();
                    }
                }

            }



        }

    });



}

/**
 *
 * Change the focus on listbox
 *
 * @param $options
 * @param type
 */
function changeSelectedOption($options, type) {

    // Initiating variables
    let $selected = null;
    let i = 0;


    for(let $elem of $options) {

        // We search for the current selected option
        if($elem.classList.contains("selected")){

            // If we want the next element
            if(type === "next") {
                $selected = $options[i+1];
            }
            else {
                // Else select the previous element
                $selected = $options[i-1];
            }

            // We remove the selected class from the currently selected HTML element
            $elem.classList.remove("selected");
        }
        i++;

    }

    // If there is no element selected
    if($selected == null) {

        // If we want the next one
        if(type === "next") {
            // We select the first option
            $selected = $options[0];
        }
        else {
            // Else with select the last option
            $selected = $options[$options.length - 1];
        }

    }

    // We add the selected class to the targeted option
    $selected.classList.add("selected");

    // We focus the option for screenreaders to read the text
    $selected.focus();

}

export {init, changeSelectedOption};