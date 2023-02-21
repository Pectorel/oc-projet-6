// eslint-disable-next-line no-unused-vars
function mediaFactory(data) {


    const {id, photographerId, title, image, video, likes, date, price} = data;
    let media = `./assets/images/${photographerId}/`;

    function getMediaCardDOM(order) {

        data.order = order;

        // Article container
        const $article = createElement("article", ["media"]);
        $article.setAttribute("data-lightbox-order", data.order);
        $article.setAttribute("data-media-id", data.id);

        // Div that contains the media
        const $media_source_container = createElement("div", ["media-source-container"]);

        // Check video or img
        let type = null;
        let attributes = {};
        if(image != null) {

            media+=image;
            type = "img";
            attributes = {"alt": `${title}, closeup view`};

        }
        else {

            media+=video;
            type = "video";

        }
        attributes.src = media;

        // We create the correct element (img or video) depending of the media type
        const $media = createElement(type, ["media-source"], null, attributes);

        $media_source_container.appendChild($media);

        // Media Infos
        const $media_info = createElement("div", ["media-info"]);
        const $media_info_title = createElement("p", ["media-info-title"], title);
        const $media_info_likes = createElement("p", ["media-info-likes"]);
        const $media_info_likes_span = createElement("span", ["media-info-likes-span"], likes, {"data-like-closest": ''});
        const $media_info_likes_icon = createElement("i", ["like-icon", "fa-solid", "fa-heart"], null, {"data-like-add": ''});

        $media_info_likes.appendChild($media_info_likes_span);
        $media_info_likes.appendChild($media_info_likes_icon);
        $media_info.appendChild($media_info_title);
        $media_info.appendChild($media_info_likes);

        // Article
        $article.appendChild($media_source_container);
        $article.appendChild($media_info);

        // Event Listener for the Lightbox
        $media_source_container.addEventListener("click", function (){
            // eslint-disable-next-line no-undef
            showLightbox(data);
        });

        return $article;
    }


    return {id, photographerId, title, image, video, likes, date, price, getMediaCardDOM}
}