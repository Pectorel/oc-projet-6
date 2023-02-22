window.addEventListener("load", () => {

    // Lightbox
    let $lightbox = document.querySelector("#media-lightbox");
    let $previous_btn = document.querySelector(".lightbox-media-prev");
    let $next_btn = document.querySelector(".lightbox-media-next");
    let $close_btn = document.querySelector(".close-lightbox");


    // Listbox
    let $listbox = document.querySelector("#sort-listbox");
    let $listbox_options = $listbox.children;
    console.log($listbox_options);

    
    // Keyboard Events
    document.addEventListener('keydown', (event) => {

        // Lightbox
        // We chack that the lighbox is active
        if($lightbox.style.display === "block") {

            if(event.key === "ArrowLeft") {
                $previous_btn.click();
            }
            else if(event.key === "ArrowRight") {
                $next_btn.click();
            }
            else if(event.key === "Escape") {
                $close_btn.click();
            }

        }

        // Listbox Event
        if($listbox.classList.contains("active")) {


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