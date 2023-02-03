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



                            resolve(photographer);
                        }


                    });
            });
    });

}

async function displayData(photographer) {

    const $main = document.querySelector("#main");

    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userPageDOM = photographerModel.getUserPageDOM();
    $main.appendChild(userPageDOM);

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