// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const {name, id, city, country, tagline, price, portrait} = data;

  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {

    const $article = createElement('article', null, ["photographer"], {"data-link-id": id});
    const $img_container = createElement('div', null, ["photographer-img-container"]);
    const $img = createElement("img", null, ["photographer-img"], {"src" : picture, "alt": name});
    const $h2 = createElement('h2', name, ["photographer-name"]);
    const $city_p = createElement('p', `${city}, ${country}`, ["photographer-city"]);
    const $tagline_p = createElement('p', tagline, ["photographer-tagline"]);
    const $price_p = createElement('p', `${price}€/jour`, ["photographer-price"]);

    $img_container.appendChild($img);
    $article.appendChild($img_container);
    $article.appendChild($h2);
    $article.appendChild($city_p);
    $article.appendChild($tagline_p);
    $article.appendChild($price_p);

    return ($article);

  }

  function getUserPageDOM() {

    const $header = createElement("div", null, ["photograph-header", "container"])

    // Header Infos
    const $header_info = createElement("div", null, ["photograph-header-info"]);
    const $name = createElement("h1", name, ["photograph-header-info-name", "mb-1"]);
    const $location = createElement("p", `${city}, ${country}`, ["photograph-header-info-location", "mb-2"]);
    const $tagline = createElement("p", tagline, ["photograph-header-info-tagline"]);

    $header_info.appendChild($name);
    $header_info.appendChild($location);
    $header_info.appendChild($tagline);
    $header.appendChild($header_info);

    // Modal button
    const $btn_container = createElement("div", null, ["photograph-header-btn-container"]);
    const $modal_btn = createElement("button", "Contactez-moi", ["contact_button"], {"onclick": "displayModal()"});

    $btn_container.appendChild($modal_btn);
    $header.appendChild($btn_container);

    // Photographer img
    const $header_img_container = createElement("div", null, ["photograph-header-img-container"]);
    const $header_img = createElement("img", null, ["photograph-header-img"], {"src": picture, "alt": name});

    $header_img_container.appendChild($header_img);
    $header.appendChild($header_img_container);


    return $header;
  }

  function createElement(tag, txt = null, classes = null, attributes = null) {

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

  }

  return {name, id, city, country, tagline, price, picture, getUserCardDOM, getUserPageDOM};
}
