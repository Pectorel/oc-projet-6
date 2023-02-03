async function getPhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage
  // du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  return new Promise((resolve) => {
    const photographers = [];
    fetch('./data/photographers.json')
      .then((res) => {
        res.json()
          .then((data) => {
              const people = data.photographers;
            for (const key in people) {
                // eslint-disable-next-line no-prototype-builtins
              if (people.hasOwnProperty(key)) {
                const photographer = people[key];
                photographers.push(photographer);
              }
            }

            resolve(photographers);
          });
      });
  });
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  //console.log(photographers);

  photographers.forEach((photographer) => {
      // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
