window.onload=()=>{

    // Data close
    let $data_close = document.querySelectorAll("[data-close]");

    $data_close.forEach(($elem) => {

        $elem.addEventListener("click", () => {

            let target_id = $elem.getAttribute("data-close");

            let $target = document.querySelector(target_id);

            $target.style.display = "none";

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

            $btn.textContent = text;
            $btn.click();

            if($parent.hasAttribute("data-listbox-callback")) {

                let callback = $parent.getAttribute("data-listbox-callback");

                window[callback](option);

            }


        });

    });

}