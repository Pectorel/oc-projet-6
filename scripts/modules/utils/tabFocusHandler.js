// Manage the focusable state of elements
function setFocusable(val, $elems)
{

    $elems.forEach(($elem) => {

        $elem.setAttribute("tabindex", val);

    });

}

export {setFocusable};

