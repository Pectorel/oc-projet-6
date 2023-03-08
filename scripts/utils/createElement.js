/**
 *
 * @param tag - html Tag to create
 * @param classes - Array containing all classes to add to the element
 * @param txt - String containing the text inserted into the element, can be null
 * @param attributes - object containing all attributes to add to the element, can be null
 * @returns HTMLElement - Returns the HTML element created
 */
// eslint-disable-next-line no-unused-vars
function createElement(tag, classes = null, txt = null, attributes = null) {

    const $elem = document.createElement(tag);

    if(Array.isArray(classes) && classes.length > 0) {
        classes.forEach((val) => {
            $elem.classList.add(val);
        });
    }

    if(attributes != null && Object.keys(attributes).length > 0) {

        for(let i in attributes) {
            $elem.setAttribute(i, attributes[i]);
        }
    }

    if(txt != null){
        $elem.textContent = txt;
    }

    return $elem;

}