// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const {
    name, id, city, country, tagline, price, portrait,
  } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {

    const $article = createElement('article', null, ["photographer"]);
    const $img_container = createElement('div', null, ["photographer-img-container"]);
    $img_container.style.background = `transparent url("${picture}") no-repeat center center`;
    const $h2 = createElement('h2', name, ["photographer-name"]);
    const $city_p = createElement('p', `${city}, ${country}`, ["photographer-city"]);
    const $tagline_p = createElement('p', tagline, ["photographer-tagline"]);
    const $price_p = createElement('p', `${price}€/jour`, "photographer-price");
    $article.appendChild($img_container);
    $article.appendChild($h2);
    $article.appendChild($city_p);
    $article.appendChild($tagline_p);
    $article.appendChild($price_p);
    return ($article);

  }

  function createElement(tag, txt = null, classes = null, attributes = null) {

    const $elem = document.createElement(tag);

    if(Array.isArray(classes) && classes.length > 0) {
      classes.forEach((val) => {
        $elem.classList.add(val);
      });
    }

    if(Array.isArray(attributes) && attributes.length > 0) {
      attributes.forEach((attr, val) => {
        $elem.setAttribute(attr, val);
      });
    }

    if(txt != null){
      $elem.textContent = txt;
    }

    return $elem;

  }

  return {
    name, id, city, country, tagline, price, picture, getUserCardDOM,
  };
}
