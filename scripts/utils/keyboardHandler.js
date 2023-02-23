window.addEventListener("load", () => {

    // Contact modal
    let $contact_modal = document.querySelector("#contact-modal");
    let $close_modal = document.querySelector(".close-modal");

    // Lightbox
    let $lightbox = document.querySelector("#media-lightbox");
    let $previous_btn = document.querySelector(".lightbox-media-prev");
    let $next_btn = document.querySelector(".lightbox-media-next");
    let $close_btn = document.querySelector(".close-lightbox");


    // Listbox
    let $listbox = document.querySelector("#sort-listbox");
    let $listbox_options = $listbox.children;

    // Keyboard Events
    document.addEventListener('keydown', (event) => {

        // Contact Modal
        if($contact_modal.style.display === "block") {

            if(event.key === "Escape") {
                $close_modal.click();
            }

        }
        // Lightbox
        // We chack that the lighbox is active
        else if($lightbox.style.display === "block") {

            if(event.key === "ArrowLeft") {
                event.preventDefault();
                $previous_btn.click();
            }
            else if(event.key === "ArrowRight") {
                event.preventDefault();
                $next_btn.click();
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
    });

});


function changeSelectedOption($options, type) {

    let $selected = null;
    let i = 0;

    for(let $elem of $options) {

        if($elem.classList.contains("selected")){
            if(type === "next") {
                $selected = $options[i+1];
            }
            else {
                $selected = $options[i-1];
            }

            $elem.classList.remove("selected");
        }
        i++;

    }

    if($selected == null) {

        if(type === "next") {
            $selected = $options[0];
        }
        else {
            $selected = $options[$options.length - 1];
        }

    }

    $selected.classList.add("selected");
    $selected.focus();

}