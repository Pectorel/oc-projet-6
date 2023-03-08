async function getPhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage
  // du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  return new Promise((resolve) => {
      // eslint-disable-next-line no-undef
      let fetcher = new JsonFetcher("./data/photographers.json");
      fetcher.then((res) => {

          let data = res.object;

          const photographers = [];

          const people = data.photographers;
          for (const key in people) {
              const photographer = people[key];
              photographers.push(photographer);
          }

          resolve(photographers);

      });
  });
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

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

// Once all data has been inserted
init().then(function (){


    let $links = document.querySelectorAll("[data-link-id]");

    // we set all links click event to redirect to corresponding photographer
    $links.forEach(($link) => {

        $link.addEventListener("click", function (){

            window.location = "/oc-projet-6/photographer.html?id=" + this.getAttribute("data-link-id");

        });

    });

});
