// Imports
import {JsonFetcher} from "../utils/jsonFetcher.js";
import {photographerFactory} from "../factories/photographer.js";

/**
 *
 * Getting all photographers info in data/photographer.json
 *
 * @returns {Promise<unknown>}
 */
async function getPhotographers() {

    return new Promise((resolve) => {

        // Fetching data from json file
        let fetcher = new JsonFetcher("./data/photographers.json");

        fetcher.then((res) => {

            // Getting the fetch result
            let data = res.object;

            // Getting photographers array from data
            const photographers = data.photographers;

            resolve(photographers);

        });

    });
}

/**
 *
 * Display HTMLElements created in photographerFactory on index.html page
 *
 * @param photographers
 */
function displayData(photographers) {

    // Getting the photographers blocks container
    const photographersSection = document.querySelector('.photographer_section');

    // For each photographers in photographer array
    photographers.forEach((photographer) => {

        // We initalize a new Factory with photographer infos
        const photographerModel = photographerFactory(photographer);
        // We create the photographer HTMLElements
        const userCardDOM = photographerModel.getUserCardDOM();

        // We append the HTMLElements to the container
        photographersSection.appendChild(userCardDOM);
    });

}

/**
 *
 *  Initialize the index.html page data
 *
 * @returns {Promise<void>}
 */
async function init() {

      // Getting photographer infos
      const photographers = await getPhotographers();

      // Once infos are fetched, we display them
      displayData(photographers);

}

// Once all HTMLElements have been added to the DOM
init().then(() => {});
