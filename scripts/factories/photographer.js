// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const {name, id, city, country, tagline, price, portrait} = data;

  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {

    // eslint-disable-next-line no-undef
    const $article = createElement('article',["photographer"],null,  {"data-link-id": id});
    // eslint-disable-next-line no-undef
    const $img_container = createElement('div',["photographer-img-container"]);
    // eslint-disable-next-line no-undef
    const $img = createElement("img",["photographer-img"], null, {"src" : picture, "alt": name});
    // eslint-disable-next-line no-undef
    const $h2 = createElement('h2',["photographer-name"], name);
    // eslint-disable-next-line no-undef
    const $city_p = createElement('p',["photographer-city"], `${city}, ${country}`,);
    // eslint-disable-next-line no-undef
    const $tagline_p = createElement('p',["photographer-tagline"], tagline);
    // eslint-disable-next-line no-undef
    const $price_p = createElement('p',["photographer-price"],`${price}€/jour`,);

    $img_container.appendChild($img);
    $article.appendChild($img_container);
    $article.appendChild($h2);
    $article.appendChild($city_p);
    $article.appendChild($tagline_p);
    $article.appendChild($price_p);

    return ($article);

  }

  function getUserPageDOM() {

    // Header Infos
    // eslint-disable-next-line no-undef
    const $header_info = createElement("div",["photograph-header-info"]);
    // eslint-disable-next-line no-undef
    const $name = createElement("h1",["photograph-header-info-name", "mb-1"], name);
    // eslint-disable-next-line no-undef
    const $location = createElement("p",["photograph-header-info-location", "mb-2"],`${city}, ${country}`,);
    // eslint-disable-next-line no-undef
    const $tagline = createElement("p",["photograph-header-info-tagline"], tagline,);

    $header_info.appendChild($name);
    $header_info.appendChild($location);
    $header_info.appendChild($tagline);

    // Modal button
    // eslint-disable-next-line no-undef
    const $btn_container = createElement("div",["photograph-header-btn-container"]);
    // eslint-disable-next-line no-undef
    const $modal_btn = createElement("button",["btn", "contact-btn"],"Contactez-moi",{"onclick": "displayModal()"});

    $btn_container.appendChild($modal_btn);

    // Photographer img
    // eslint-disable-next-line no-undef
    const $header_img_container = createElement("div",["photograph-header-img-container"]);
    // eslint-disable-next-line no-undef
    const $header_img = createElement("img",["photograph-header-img"],null,{"src": picture, "alt": name});

    $header_img_container.appendChild($header_img);


    return {"header_info" : $header_info, "btn_container": $btn_container, "header_img_container": $header_img_container};
  }

  return {name, id, city, country, tagline, price, picture, getUserCardDOM, getUserPageDOM};
}
