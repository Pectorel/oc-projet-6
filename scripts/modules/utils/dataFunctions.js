// Imports
import {JsonFetcher} from "./jsonFetcher.js";
import {aria} from "./ariaFunctions.js";

/**
 *
 * Initiate data attributes functions
 *
 */
function init() {

    // Data close
    let $data_close = document.querySelectorAll("[data-close]");

    $data_close.forEach(($elem) => {

        $elem.addEventListener("click", () => {

            // We get the targeted HTMLElement
            let target_id = $elem.getAttribute("data-close");
            let $target = document.querySelector(target_id);

            // We hide the targeted HTMLElement
            $target.style.display = "none";

            // We set the aria attributes
            aria("aria-hidden", $target, "true");

        });

    });

    // Data listbox
    let $data_listbox = document.querySelectorAll("[data-listbox-target]");

    $data_listbox.forEach(($elem) => {

        $elem.addEventListener("click", () => {

            let target_id = $elem.getAttribute("data-listbox-target");

            let $target = document.querySelector(target_id);

            // We add active classes to lisbox and btn
            $target.classList.toggle("active");
            $elem.classList.toggle("active");

            if($elem.classList.contains("active")) {

                aria("aria-expanded", $elem, "true");

            }
            else {
                aria("aria-expanded", $elem, "false");
            }

        });

    });

    let $data_listbox_options = document.querySelectorAll("[data-listbox-option]");

    $data_listbox_options.forEach(($elem) => {

        $elem.addEventListener("click", () => {

            // We get all data from the selected listbox option
            let option = $elem.getAttribute("data-listbox-option");
            let text = $elem.textContent;

            // We replace the button text content with the selected option text content
            let $parent = $elem.closest("[data-listbox]");
            let $btn = document.querySelector(`[data-listbox-target="#${$parent.getAttribute("id")}"]`);

            aria("aria-selected", $parent, text);
            $btn.textContent = text;
            $btn.click();

            // Callback function
            sortMedia(option);

        });

    });

    // Data Likes
    let $data_likes = document.querySelectorAll("[data-like-add]");

    $data_likes.forEach(($elem) => {

        $elem.addEventListener("click", () => {

            // We check if element has already been clicked
            if(!$elem.classList.contains("clicked")) {

                let $target = $elem.parentElement.querySelector("[data-like-closest]");

                if($target != null){

                    // We add Like to the like next to the image
                    addLike($target);

                    // We add a class to indicate that the like button has been clicked
                    $elem.classList.add("clicked");
                    aria("aria-disabled", $elem, "true");

                    // We get all global like counters on the page
                    let $global_targets = document.querySelectorAll("[data-like-change]");

                    // We add a like to each of them
                    $global_targets.forEach(($elem) => {

                        addLike($elem);

                    });

                }

            }

        });

    });

}

/**
 *
 * Add one like to given HTMLElement
 *
 * @param $target - HTMLElement containing the like number
 */
function addLike($target) {

    let num = parseInt($target.textContent);
    num+=1;
    num = num.toString();
    $target.textContent = num;

}

/**
 *
 * Sort Media List when an option is choosed from the listbox
 *
 * @param option - String containing the selecting sort option
 * @returns {Promise<void>}
 */
// eslint-disable-next-line no-unused-vars
async function sortMedia(option) {

    // We get all media on the page
    let $media = document.querySelectorAll("[data-media-id]");

    // eslint-disable-next-line no-undef
    const fetcher = await new JsonFetcher("./data/photographers.json");

    // We get all media from json
    let media = fetcher.object.media;
    let media_ids = [];

    $media.forEach(($elem) => {
        media_ids.push(parseInt($elem.getAttribute("data-media-id")));
    });

    //If the media id on json is also a media on the page
    let media_data = [];
    media.forEach((media) => {
        // We add it to the media array with all its json data
        if (media_ids.includes(media.id)) media_data.push(media);
    });

    // We sort depending on the option
    media_data.sort((a, b) => {

        if (option === "date") {

            let date_a = new Date(a.date);
            let date_b = new Date(b.date);

            // We sort from most recent to most late media
            return date_b - date_a;

        } else if (option === "title") {

            // Sort with alphabetical order Asc
            return a.title.localeCompare(b.title);

        }

        // Sort with numbers of like from higher to lower
        return b[option] - a[option];
    });


    let i = 0;

    media_data.forEach((media) => {

        // We change the grid order to match the sort
        let $media = document.querySelector(`[data-media-id="${media.id}"]`);
        $media.style.order = i.toString();

        // We change the lightbox order to make the lightbox next and previous button match the media gallery order
        let order_lightbox = i + 1;
        $media.setAttribute("data-lightbox-order", order_lightbox.toString());
        i++;

    });

}

export {init, addLike};