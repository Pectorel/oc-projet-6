//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographerInfo(id) {

    return new Promise((resolve) => {

        // eslint-disable-next-line no-undef
        let fetcher = new JsonFetcher('./data/photographers.json');
        fetcher.then((res) => {

            let data = res.object;
            let photographer = null;

            const people = data.photographers;

            // We get the corresponding photographer info with provided id
            for (const key in people) {

                if(people[key].id === id) {
                    photographer = people[key];
                    break;
                }

            }

            if(photographer !== null) {

                const media = data.media;
                const media_list = [];

                for(const key in media) {


                    if(media[key].photographerId === id) {

                        media_list.push(media[key]);

                    }

                }

                //console.log(media_list);
                resolve({"photographer" : photographer, "media" : media_list});
            }
        });


    });

}

async function displayData(photographer) {

    // Display Photographer Info
    const $photograph_header = document.querySelector(".photograph-header");
    // eslint-disable-next-line no-undef
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
        // eslint-disable-next-line no-undef
       const mediaModel = mediaFactory(media);
       const $mediaCardDom = mediaModel.getMediaCardDOM(i);
       $media_container.appendChild($mediaCardDom);
       i++;
       likes+=media.likes;

    });

    // Display Photographer Name in Modal
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

init().then(() => {

    // Lightbox next and previous buttons click event
    let $lightbox_prev = document.querySelectorAll("[data-lightbox-prev]");
    let $lightbox_next = document.querySelectorAll("[data-lightbox-next]");

    $lightbox_prev.forEach(($elem) => {
        $elem.addEventListener("click", function (){
            switchLightboxMedia(this);
        });
    });

    $lightbox_next.forEach(($elem) => {
        $elem.addEventListener("click", function (){
            switchLightboxMedia(this);
        });
    });

});


/*
*
* Retrieve data from the modal form after submit
*
* */
// eslint-disable-next-line no-unused-vars
function onFormSubmit(e, $form){


    if(e) e.preventDefault();

    let data = new FormData($form);

    for(const pair of data.entries()) {

        console.log(`${pair[0]} : ${pair[1]}`);

    }

    $form.reset();
    // eslint-disable-next-line no-undef
    closeModal();


}


/*
*
* Show Lightbox and insert data corresponding to the clicked media
*
* */
// eslint-disable-next-line no-unused-vars
function showLightbox(media){

    //console.log(media);

    let $lightbox = document.querySelector("#media-lightbox");
    let $lightbox_media = document.querySelector(".lightbox-media");

    $lightbox_media.innerHTML = "";

    const path = `./assets/images/${media.photographerId}/`;
    let $media;

    // Media
    if(media.image != null){

        // eslint-disable-next-line no-undef
        $media = createElement("img", ["lightbox-media-img"], null, {"src": path + media.image, "alt": media.title});

    }
    else{
        // eslint-disable-next-line no-undef
        $media = createElement("video", ["lightbox-media-vid"], null, {"src": path + media.video, "controls" : null});
    }

    // Title
    // eslint-disable-next-line no-undef
    const $title = createElement("p", ["lightbox-media-title"], media.title);

    // Append
    $lightbox_media.appendChild($media);
    $lightbox_media.appendChild($title);

    // We set Lightbox current media order
    let order = document.querySelector(`[data-media-id="${media.id}"]`).getAttribute("data-lightbox-order");
    $lightbox.setAttribute("data-lightbox-current", order);

    $lightbox.style.display = "block";

}

/*
*
* Change the media in the lightbox (next & prev)
*
*   $elem Object "Html Element that is clicked (prev or next)"
*
* */
function switchLightboxMedia($elem) {

    let $lightbox = $elem.closest("[data-lightbox-current]");

    let current = parseInt($lightbox.getAttribute("data-lightbox-current"));

    let $target;

    let type = $elem.hasAttribute("data-lightbox-prev") ? "prev" : "next";


    // Previous
    if(type === "prev") {

        // If already at first element, we go to last element
        if(current === 1) {

            // We get the highest order number
            document.querySelectorAll("[data-lightbox-order]").forEach(($elem) => {

                let order = parseInt($elem.getAttribute("data-lightbox-order"));

                if (current < order) current = order;

            });
            $target = document.querySelector(`[data-lightbox-order="${current}"]`);

        }
        // Else we substract 1 to the current order to get previous media
        else {
            current-=1;
            $target = document.querySelector(`[data-lightbox-order="${current}"]`);
        }

    }
    // Next
    else {

        // We get next order
        current+=1;
        $target = document.querySelector(`[data-lightbox-order="${current}"]`);

        // If last media in lightbox, then we go back to first media
        if($target === null) {
            $target = document.querySelector(`[data-lightbox-order="1"]`);
        }


    }

    // We simulate a click on the targeted media
    if($target !== null) {
        $target.querySelector(".media-source-container").click();
    }


}

/*
*
* Sort Media List when an option is choosed from the listbox
*
* */
// eslint-disable-next-line no-unused-vars
async function sortMedia(option) {


    let $media = document.querySelectorAll("[data-media-id]");

    // eslint-disable-next-line no-undef
    const fetcher = await new JsonFetcher("./data/photographers.json");

    let media = fetcher.object.media;
    //console.log(media);
    let media_ids = [];

    $media.forEach(($elem) => {
        media_ids.push(parseInt($elem.getAttribute("data-media-id")));
    });

    let media_data = [];
    media.forEach((media) => {
        if (media_ids.includes(media.id)) media_data.push(media);
    });

    media_data.sort((a, b) => {

        if(option === "date") {

            let date_a = new Date(a.date);
            let date_b = new Date(b.date);

            return date_b - date_a;

        }
        else if(option === "title"){

            return a.title.localeCompare(b.title);

        }

        return b[option] - a[option];
    });


    let i = 0;

    media_data.forEach((media) => {

        let $media = document.querySelector(`[data-media-id="${media.id}"]`);
        $media.style.order = i.toString();
        let order_lightbox = i+1;
        $media.setAttribute("data-lightbox-order", order_lightbox.toString());
        i++;

    });

}