/**
 *
 * Set aria attributes
 *
 * @param attribute
 * @param $elem
 * @param value
 */
function aria(attribute, $elem, value) {

    if($elem !== null)
    {

        $elem.setAttribute(attribute, value);

        if(attribute.includes("hidden"))
        {
            let $header = document.querySelector(".page-header");
            let $main = document.querySelector("main");
            let val = (value === "true") ? "false" : true;
            $main.setAttribute(attribute, val);
            $header.setAttribute(attribute, val);

        }

    }

}

export {aria};