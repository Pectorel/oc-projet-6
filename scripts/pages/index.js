    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        return new Promise((resolve) => {

            let photographers = [];
            fetch("./data/photographers.json")
                .then(function (res){
                        res.json()
                            .then(function (data){

                                let people = data.photographers;
                                for(let key in people) {

                                    if(people.hasOwnProperty(key)){

                                        let photographer = people[key];
                                        photographers.push(photographer);

                                    }

                                }

                                resolve(photographers);

                            });
                    }
                );
        });

    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        console.log(photographers);

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
