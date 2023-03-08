// eslint-disable-next-line no-unused-vars
function displayModal() {
    const $main = document.querySelector("main");
    const $modal = document.getElementById("contact-modal");
    const $first_input = $modal.querySelector("input");
	$modal.style.display = "block";
    $modal.setAttribute("aria-hidden", "false");
    $main.setAttribute("aria-hidden", "true");
    $first_input.focus();
}

// eslint-disable-next-line no-unused-vars
function closeModal() {
    const $main = document.querySelector("main");
    const $modal = document.getElementById("contact-modal");
    $modal.style.display = "none";
    $modal.setAttribute("aria-hidden", "true");
    $main.setAttribute("aria-hidden", "false");
}
