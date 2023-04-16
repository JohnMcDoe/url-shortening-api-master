function validateURL() {
    const form = document.querySelector(".page__form");
    const input = document.querySelector("#url");
    const error = document.querySelector(".page__input-error");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (input.value === "" || !input.validity.valid || sessionStorage.getItem(input.value)) {
            input.classList.add("error");
            error.classList.add("active");
        } else {
            fetchURL(input.value);
            input.classList.remove("error");
            error.classList.remove("active");
        }
    });
}

async function fetchURL(url) {
    fetch("https://api.shrtco.de/v2/shorten?url=" + url)
        .then(response => response.json())
        .then((data) => {
            sessionStorage.setItem(data["result"]["original_link"], data["result"]["short_link"]);
            createShortLink(data["result"]["original_link"]);
        });
}

function createShortLink(original) {
    // parent element to get item attached to
    const form = document.querySelector(".page__form-items");

    // components for new item
    const itemContainer = document.createElement("div");
    const shortLinkContainer = document.createElement("div");
    const originalLink = document.createElement("p");
    const shortLink = document.createElement("p");
    const copy = document.createElement("button");

    // class names for components
    itemContainer.className = "page__form-item";
    shortLinkContainer.className = "page__short-link-container";
    originalLink.className = "page__original-link";
    shortLink.className = "page__short-link";
    copy.className = "page__copy-btn";

    // assign text to elements
    originalLink.textContent = original;
    shortLink.textContent = sessionStorage[original];
    copy.textContent = "Copy";

    // add event listener to copy button
    copy.addEventListener("click", (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(shortLink.textContent);
        const copies = document.getElementsByClassName("page__copy-btn");

        for (let i = 0; i < copies.length; i++) {
            copies[i].textContent = "Copy";
            copies[i].classList.remove("active");
        }

        copy.textContent = "Copied!";
        copy.classList.add("active");
    });

    // create item
    form.appendChild(itemContainer);
    itemContainer.appendChild(originalLink);
    itemContainer.appendChild(shortLinkContainer);
    shortLinkContainer.appendChild(shortLink);
    shortLinkContainer.appendChild(copy);
}

function loadData() {
    window.addEventListener("load", () => {
        for (let i = 0; i < sessionStorage.length; i++) {
            createShortLink(sessionStorage.key(i));
        }
    })
}

loadData();
validateURL();
