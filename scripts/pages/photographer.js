//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographerInfo(id) {

    return new Promise((resolve) => {
        let photographer = null;
        fetch('./data/photographers.json')
            .then((res) => {
                res.json()
                    .then((data) => {

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




                            console.log(media_list);
                            resolve({"photographer" : photographer, "media" : media_list});
                        }


                    });
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
    photographer.media.forEach((media) => {
        // eslint-disable-next-line no-undef
       const mediaModel = mediaFactory(media);
       const mediaCardDom = mediaModel.getMediaCardDOM();
        $media_container.appendChild(mediaCardDom);


    });



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

    // Process Photographer
    const photographer = await getPhotographerInfo(id);
    displayData(photographer);

    // Process Photographer Media

}

init();