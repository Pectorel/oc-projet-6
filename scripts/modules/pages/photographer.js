// Imports
import {JsonFetcher} from "../utils/jsonFetcher.js";
import {photographerFactory} from "../factories/photographer.js";
import {mediaFactory} from "../factories/media.js";
import * as lightbox from "../utils/lightbox.js";
import * as keyboardHandler from "../utils/keyboardHandler.js";
import * as dataFunctions from "../utils/dataFunctions.js";
import * as contactModal from "../utils/contactForm.js";


/**
 *
 * Fetching Photographer and related Media info
 *
 * @param id
 * @returns {Promise<unknown>}
 */
async function getPhotographerInfo(id) {

    return new Promise((resolve) => {

        // Fetching json data
        let fetcher = new JsonFetcher('./data/photographers.json');

        fetcher.then((res) => {

            let data = res.object;
            let photographer = null;

            const people = data.photographers;

            // We get the corresponding photographer info with provided id
            for (const key in people) {

                // If the id from json data is the same as the one provided in the url
                if(people[key].id === id) {

                    // We get the photographer infos and break loop
                    photographer = people[key];
                    break;
                }

            }

            // We check if a photograph has been found with given id
            if(photographer !== null) {

                const media = data.media;
                const media_list = [];

                // We get all media related to the photographer
                for(const key in media) {

                    if(media[key].photographerId === id) {
                        media_list.push(media[key]);
                    }

                }

                resolve({"photographer" : photographer, "media" : media_list});
            }
            else{
                // We write a message to inform that there has been an error while fetching photographer data

            }
        });


    });

}

async function displayData(photographer) {

    // Display Photographer Info
    const $photograph_header = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer.photographer);
    const userPageDOM = photographerModel.getUserPageDOM();
    $photograph_header.appendChild(userPageDOM.header_info);
    $photograph_header.appendChild(userPageDOM.btn_container);
    $photograph_header.appendChild(userPageDOM.header_img_container);

    // Display Photographer Media
    const $media_container = document.querySelector(".media-container");
    let i = 1;
    let likes = 0;
    photographer.media.forEach((media) => {
       const mediaModel = mediaFactory(media);
       const $mediaCardDom = mediaModel.getMediaCardDOM(i);
       $media_container.appendChild($mediaCardDom);
       i++;
       likes+=media.likes;

    });

    // If only one media, we hide the lightbox arrows
    if(Object.keys(photographer.media).length <= 1)
    {
        lightbox.hideArrows();
    }

    // Display Photographer Name in contact Modal
    const $modal_title = document.querySelector(".modal-title");
    $modal_title.textContent += " " + photographer.photographer.name;

    // Display likes and Price
    const $likes_number = document.querySelector("#photographer-details-like-number");
    const $price_number = document.querySelector("#photographer-details-price-number");
    $likes_number.textContent = likes;
    $price_number.textContent = `${photographer.photographer.price}€ / jour`;

}

/*
*
* Initiate data retrieving and display
*
* */
async function init(){

    // We get the id param provided in URL
    let params = (new URL(document.location)).searchParams;
    let id = parseInt(params.get("id"));

    // Process Photographer and Media
    const photographer = await getPhotographerInfo(id);
    displayData(photographer);

}

// When all HTMLElements have been added to the DOM
init().then(() => {

    // Setting up lightbox arrows event
    lightbox.setArrowsEvents();

    // Initializing Keyboard Controls
    keyboardHandler.init();

    // Initializing data Functions
    dataFunctions.init();

    //Initializing ContactForm submit
    let $modal_form = document.querySelector("#modal-form");

    if($modal_form !== null)
    {
        $modal_form.addEventListener("submit", (event) => {
            contactModal.submit(event, $modal_form);
        });
    }

});