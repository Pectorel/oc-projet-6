// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const {
    name, id, city, country, tagline, price, portrait,
  } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {

    const $article = createElement('article', null, ["photographer"], {"data-link-id": id});
    const $img_container = createElement('div', null, ["photographer-img-container"]);
    const $img = createElement("img", null, ["photographer-img"], {"src" : `${picture}`, "alt": name});
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

  return {
    name, id, city, country, tagline, price, picture, getUserCardDOM,
  };
}
