// Imports
import {createElement} from "../utils/createElement.js";
import * as contactModal from "../utils/contactForm.js";

/**
 *
 * Factory for Photographer
 *
 * @param data
 * @returns {{getUserPageDOM: (function(): {btn_container: *, header_img_container: *, header_info: *}), country, city, price, name, tagline, id, getUserCardDOM: (function(): *), picture: string}}
 */
function photographerFactory(data) {

  // We get all json data
  const {name, id, city, country, tagline, price, portrait} = data;

  // We create the photographer thumbnail root path
  const picture = `./assets/photographers/thumbnails/${portrait}`;

  /**
   *
   * Create the photographer block on index.html
   *
   * @returns {HTMLElement}
   */
  function getUserCardDOM() {

    // We create all the HTMLElements
    const $article = createElement('article',["photographer"],null,  {"tabindex": 0, "aria-label": `${name} - Photograph Section`});
    const $photographer_link = createElement('a',["photographer-link"],null, {"href": `photographer.html?id=${id}`, "tabindex": 0});
    const $img_container = createElement('div', ["photographer-img-container"]);
    const $img = createElement("img",["photographer-img"], null, {"src" : picture, "alt": name, "tabindex": 0});
    const $h2 = createElement('h2',["photographer-name"], name, {"tabindex": 0});
    const $city_p = createElement('p',["photographer-city"], `${city}, ${country}`, {"tabindex": 0});
    const $tagline_p = createElement('p',["photographer-tagline"], tagline, {"tabindex": 0});
    const $price_p = createElement('p',["photographer-price"],`${price}€/jour`, {"tabindex": 0});

    // We append all the created HTMLElements
    $img_container.appendChild($img);
    $photographer_link.appendChild($img_container);
    $photographer_link.appendChild($h2)
    $article.appendChild($photographer_link);
    $article.appendChild($city_p);
    $article.appendChild($tagline_p);
    $article.appendChild($price_p);

    return ($article);

  }

  /**
   *
   * Create the user info blocks on photographer.js
   *
   * @returns {{btn_container, header_img_container, header_info}}
   */
  function getUserPageDOM() {

    // Header Infos HTMLElements
    const $header_info = createElement("div",["photograph-header-info"]);
    const $name = createElement("h1",["photograph-header-info-name", "mb-1"], name);
    const $location = createElement("p",["photograph-header-info-location", "mb-2"],`${city}, ${country}`,);
    const $tagline = createElement("p",["photograph-header-info-tagline"], tagline,);

    // Header Infos append HTMLElements
    $header_info.appendChild($name);
    $header_info.appendChild($location);
    $header_info.appendChild($tagline);

    // Modal button HTMLElement
    const $btn_container = createElement("div",["photograph-header-btn-container"]);
    const $modal_btn = createElement("button",["btn", "contact-btn"],"Contactez-moi",{"aria-label": "Contact Me"});
    // Adding the contact form modal click event to the contact-Me button
    $modal_btn.addEventListener("click", () => {
      contactModal.display();
    });

    // Modal button append HTMLElement
    $btn_container.appendChild($modal_btn);

    // Photographer img HTMLElements
    const $header_img_container = createElement("div",["photograph-header-img-container"]);
    const $header_img = createElement("img",["photograph-header-img"],null,{"src": picture, "alt": name});

    // Photographer img append HTMLElements
    $header_img_container.appendChild($header_img);

    // We return all 3 section of the photographer info block
    return {"header_info" : $header_info, "btn_container": $btn_container, "header_img_container": $header_img_container};
  }

  return {name, id, city, country, tagline, price, picture, getUserCardDOM, getUserPageDOM};
}

export {photographerFactory};