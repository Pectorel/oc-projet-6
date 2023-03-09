// Imports
import {createElement} from "./createElement.js";
import {aria} from "./ariaFunctions.js";

/**
 *
 * Show Lightbox and insert data corresponding to the clicked media
 *
 * @param media
 */
function display(media) {

    // Getting required HTMLElements
    let $lightbox = document.querySelector("#media-lightbox");
    let $lightbox_media = document.querySelector(".lightbox-media");

    // We Empty the media container from the lightbox
    $lightbox_media.innerHTML = "";

    // We create the root path of the media
    const path = `./assets/images/${media.photographerId}/`;
    let $media = null;

    // We check if the media is an img or a video
    if(media.image != null){
        $media = createElement("img", ["lightbox-media-img"], null, {"src": path + media.image, "alt": media.title, "tabindex": 0});
    }
    else{
        $media = createElement("video", ["lightbox-media-vid"], null, {"src": path + media.video, "controls" : null, "aria-label": media.title + " video", "tabindex": 0});
    }

    // Media Title
    const $title = createElement("p", ["lightbox-media-title"], media.title);

    // We append the media and the media title to the media_container HTMLElement
    $lightbox_media.appendChild($media);
    $lightbox_media.appendChild($title);

    // We set Lightbox current media order for next and previous buttons
    let order = document.querySelector(`[data-media-id="${media.id}"]`).getAttribute("data-lightbox-order");
    $lightbox.setAttribute("data-lightbox-current", order);

    // We display the Lightbox
    $lightbox.style.display = "block";

    // Setting aria attributes
    aria("aria-hidden", $lightbox, "false");

    // We set focus on media for screenreaders to read the image alt
    $media.focus();

    // Fix for a Firefox Flexbox bug that made flex-item not resizing correctly with image or video when no defined width is provided for the media
    if(navigator.userAgent.indexOf("Firefox") !== -1)
    {
        let interval = setInterval(() => {

            // We get the media calculated width
            let width = $media.offsetWidth;

            if(width > 0)
            {
                // We set the media width for the flex-item to get the correct size
                $media.style.width = width + "px";
                clearInterval(interval);
            }

        }, 200);
    }

}

/**
 *
 * Change the media in the lightbox (next & previous btn behavior)
 *
 * @param $elem
 */
function switchMedia($elem) {

    let $lightbox = $elem.closest("[data-lightbox-current]");

    let current = parseInt($lightbox.getAttribute("data-lightbox-current"));

    let $target;

    let type = $elem.hasAttribute("data-lightbox-prev") ? "prev" : "next";


    // Previous
    if(type === "prev") {

        // If already at first element, we go to last element
        if(current === 1) {

            // We get the highest order number
            document.querySelectorAll("[data-lightbox-order]").forEach(($elem) => {

                let order = parseInt($elem.getAttribute("data-lightbox-order"));

                if (current < order) current = order;

            });
            $target = document.querySelector(`[data-lightbox-order="${current}"]`);

        }
        // Else we substract 1 to the current order to get previous media
        else {
            current-=1;
            $target = document.querySelector(`[data-lightbox-order="${current}"]`);
        }

    }
    // Next
    else {

        // We get next order
        current+=1;
        $target = document.querySelector(`[data-lightbox-order="${current}"]`);

        // If last media in lightbox, then we go back to first media
        if($target === null) {
            $target = document.querySelector(`[data-lightbox-order="1"]`);
        }


    }

    // We simulate a click on the targeted media to call the ShowLightbox function with the selected media
    if($target !== null) {
        $target.querySelector(".media-source-container").click();
    }


}

function setArrowsEvents() {

    // We get all lightbox next and previous buttons HTMLElements
    let $lightbox_arrows = document.querySelectorAll("[data-lightbox-prev], [data-lightbox-next]");

    // We set a click event on arrows
    $lightbox_arrows.forEach(($elem) => {
        $elem.addEventListener("click", function (){
            // Call the switchmedia function to change the lightbox media currently shown
            switchMedia(this);
        });
    });

}

/**
 * Hides lightbox arrows
 */
function hideArrows() {

    let $arrows_prev = document.querySelectorAll("[data-lightbox-prev]");
    let $arrows_next = document.querySelectorAll("[data-lightbox-next]");

    $arrows_next.forEach(($elem) => {

        $elem.style.visibility = "hidden";
        $elem.setAttribute("aria-hidden", "true");

    });

    $arrows_prev.forEach(($elem) => {

        $elem.style.visibility = "hidden";
        $elem.setAttribute("aria-hidden", "true");

    });

}

export {display, switchMedia, setArrowsEvents, hideArrows};