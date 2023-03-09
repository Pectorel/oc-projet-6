// Imports
import {createElement} from "../utils/createElement.js";
import * as lightbox from "../utils/lightbox.js";

function mediaFactory(data) {


    const {id, photographerId, title, image, video, likes, date, price} = data;
    let media = `./assets/images/${photographerId}/thumbnails/`;

    function getMediaCardDOM(order) {

        data.order = order;

        // Article container
        const $article = createElement("article", ["media"], null, {"data-lightbox-order": data.order, "data-media-id": data.id});

        // Div that contains the media
        const $media_source_container = createElement("div", ["media-source-container"], null, {"tabindex": 0, "aria-labelledby": "media-source"});

        // Check if the media is a video or an image
        let type;
        let attributes = {};
        if(image != null) {

            media+=image;
            type = "img";
            attributes = {"id": "media-source","alt": `${title}, closeup view`};

        }
        else {

            media+=video;
            type = "video";
            attributes = {"id": "media-source", "aria-label": `${title}, closeup view`}

        }
        attributes.src = media;

        // We create the correct element (img or video) depending of the media type
        const $media = createElement(type, ["media-source"], null, attributes);
        $media_source_container.appendChild($media);

        // Media Infos
        const $media_info = createElement("div", ["media-info"]);
        const $media_info_title = createElement("p", ["media-info-title"], title, {"tabindex": 0});
        const $media_info_likes = createElement("p", ["media-info-likes"]);
        const $media_info_likes_span = createElement("span", ["media-info-likes-span"], likes, {"data-like-closest": '', "tabindex": 0});
        const $media_info_likes_icon = createElement("i", ["like-icon", "fa-solid", "fa-heart"], null, {"data-like-add": '', "aria-label": "Like button", "tabindex": 0});

        $media_info_likes.appendChild($media_info_likes_span);
        $media_info_likes.appendChild($media_info_likes_icon);
        $media_info.appendChild($media_info_title);
        $media_info.appendChild($media_info_likes);

        // Article
        $article.appendChild($media_source_container);
        $article.appendChild($media_info);

        // Event Listener for the Lightbox
        $media_source_container.addEventListener("click", function (){
            lightbox.display(data);
        });

        return $article;
    }

    return {id, photographerId, title, image, video, likes, date, price, getMediaCardDOM}
}

export {mediaFactory};