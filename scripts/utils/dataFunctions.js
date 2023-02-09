window.onload=()=>{

    let $data_close = document.querySelectorAll("[data-close]");

    $data_close.forEach(($elem) => {

        $elem.addEventListener("click", function (){

            let target_id = this.getAttribute("data-close");

            let $target = document.querySelector(target_id);

            $target.style.display = "none";

        });

    });


}