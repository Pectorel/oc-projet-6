// eslint-disable-next-line no-unused-vars
function mediaFactory(data) {


    const {id, photographerId, title, image, video, likes, date, price} = data;
    let media = `./assets/images/${photographerId}/`;

    function getMediaCardDOM() {

        const $article = createElement("article", ["media"]);
        const $media_source_container = createElement("div", ["media-source-container"]);

        // Check video or img
        let type = null;
        let attributes = {};
        if(image != null) {

            media+=image;
            type = "img";
            attributes = {"alt": title};

        }
        else {

            media+=video;
            type = "video";

        }
        attributes.src = media;

        const $media = createElement(type, ["media-source"], null, attributes);

        $media_source_container.appendChild($media);

        // Media Infos
        const $media_info = createElement("div", ["media-info"]);
        const $media_info_title = createElement("p", ["media-info-title"], title);
        const $media_info_likes = createElement("p", ["media-info-likes"], likes);

        $media_info.appendChild($media_info_title);
        $media_info.appendChild($media_info_likes);

        // Article
        $article.appendChild($media_source_container);
        $article.appendChild($media_info);

        return $article;
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