function setupForm() {
    const wrapper = document.querySelector(".page__form-wrapper");
    const formItems = document.querySelector(".page__form-items");
    let gap = 24;

    wrapper.style.top = -(wrapper.offsetHeight / 2) + "px";
    formItems.style.paddingTop = Math.abs(parseFloat(wrapper.style.top)) + gap + "px";

    window.addEventListener("resize", () => {
        wrapper.style.top = -(wrapper.offsetHeight / 2) + "px";
        formItems.style.paddingTop = Math.abs(parseFloat(wrapper.style.top)) + gap + "px";
    });
}

function toggleNav() {
    const hamburger = document.querySelector(".page__hamburger-menu");
    const menu = document.querySelector(".page__top-nav");

    hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
        menu.classList.add("activated");
    });

    menu.addEventListener("transitionend", () => {
        menu.classList.remove("activated");
    });
}

setupForm();
toggleNav();