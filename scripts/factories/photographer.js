// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const {name, id, city, country, tagline, price, portrait} = data;

  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {

    const $article = createElement('article',["photographer"],null,  {"data-link-id": id});
    const $img_container = createElement('div',["photographer-img-container"]);
    const $img = createElement("img",["photographer-img"], null, {"src" : picture, "alt": name});
    const $h2 = createElement('h2',["photographer-name"], name);
    const $city_p = createElement('p',["photographer-city"], `${city}, ${country}`,);
    const $tagline_p = createElement('p',["photographer-tagline"], tagline);
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
    const $header_info = createElement("div",["photograph-header-info"]);
    const $name = createElement("h1",["photograph-header-info-name", "mb-1"], name);
    const $location = createElement("p",["photograph-header-info-location", "mb-2"],`${city}, ${country}`,);
    const $tagline = createElement("p",["photograph-header-info-tagline"], tagline,);

    $header_info.appendChild($name);
    $header_info.appendChild($location);
    $header_info.appendChild($tagline);

    // Modal button
    const $btn_container = createElement("div",["photograph-header-btn-container"]);
    const $modal_btn = createElement("button",["contact_button"],"Contactez-moi",{"onclick": "displayModal()"});

    $btn_container.appendChild($modal_btn);

    // Photographer img
    const $header_img_container = createElement("div",["photograph-header-img-container"]);
    const $header_img = createElement("img",["photograph-header-img"],null,{"src": picture, "alt": name});

    $header_img_container.appendChild($header_img);


    return {"header_info" : $header_info, "btn_container": $btn_container, "header_img_container": $header_img_container};
  }

  /*function createElement(tag, txt = null, classes = null, attributes = null) {

    const $elem = document.createElement(tag);

    if(Array.isArray(classes) && classes.length > 0) {
      classes.forEach((val) => {
        $elem.classList.add(val);
      });
    }

    if(attributes != null && Object.keys(attributes).length > 0) {

      for(let i in attributes) {
        $elem.setAttribute(i, attributes[i]);
      }
    }

    if(txt != null){
      $elem.textContent = txt;
    }

    return $elem;

  }*/

  return {name, id, city, country, tagline, price, picture, getUserCardDOM, getUserPageDOM};
}
