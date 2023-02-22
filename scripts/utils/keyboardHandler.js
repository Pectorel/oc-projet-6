window.addEventListener("load", () => {

    // Lightbox
    let $lightbox = document.querySelector("#media-lightbox");
    let $previous_btn = document.querySelector(".lightbox-media-prev");
    let $next_btn = document.querySelector(".lightbox-media-next");
    let $close_btn = document.querySelector(".close-lightbox");


    // Listbox




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

    });

    // Listbox Event


});