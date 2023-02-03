//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographerInfo(id) {

    return new Promise((resolve) => {
        let photographer = null;
        fetch('./data/photographers.json')
            .then((res) => {
                res.json()
                    .then((data) => {
                        const people = data.photographers;

                        //console.log(people);
                        for (const key in people) {

                            if(people[key].id === id){
                                photographer = people[key];
                                break;
                            }

                        }

                        resolve(photographer);
                    });
            });
    });

}

async function init(){
    let params = (new URL(document.location)).searchParams;
    let id = parseInt(params.get("id"));

    const photographer = await getPhotographerInfo(id);
    console.log(photographer);
}

init();