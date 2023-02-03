// eslint-disable-next-line no-unused-vars
function mediaFactory(data) {


    const {id, photographerId, title, image, video, likes, date, price} = data;

    function getMediaCardDOM() {

        const $article = createElement("article", ["photograph-media"]);

        // Check video or img
        

    }

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

    return {id, photographerId, title, image, video, likes, date, price, getMediaCardDOM}
}