function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM()
    {
        const $article = document.createElement( "article" );
        $article.classList.add("photographer");

        const $img_container= document.createElement("div");
        $img_container.classList.add("photographer-img-container");
        $img_container.style.background = "transparent url(\"" + picture + "\") no-repeat center center";

        const $img = document.createElement( "img" );
        /*$img.classList.add("photographer-img");
        $img.setAttribute("src", picture);*/
        const $h2 = document.createElement( "h2" );
        $h2.classList.add("photographer-name")
        $h2.textContent = name;
        const $city_p = document.createElement("p");
        $city_p.classList.add("photographer-city");
        $city_p.textContent = city + ", " + country;
        const $tagline_p = document.createElement("p");
        $tagline_p.classList.add("photographer-tagline");
        $tagline_p.textContent = tagline;
        const $price_p = document.createElement("p");
        $price_p.classList.add("photographer-price");
        $price_p.textContent = price + "€/jour";
        $article.appendChild($img_container);
        $article.appendChild($h2);
        $article.appendChild($city_p);
        $article.appendChild($tagline_p);
        $article.appendChild($price_p);
        return ($article);
    }
    return { name, id, city, country, tagline, price, picture, getUserCardDOM }
}