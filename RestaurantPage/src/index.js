import "./style.css";
import loadHomePage from "./home";
import loadMenuPage from "./menu";
import loadAboutPage from "./about";

console.log("Hello World!");

function loadPage(page) {
    page = page || "home";
    let containerElem = document.querySelector("#content");
	containerElem.innerHTML = "";

    const pages = {
        home: loadHomePage,
        menu: loadMenuPage,
        about: loadAboutPage,
    }

    if (pages[page]) {
        containerElem.appendChild(pages[page]());
    } else {
        console.error(`Page function for "${page}" not found.`)
    }
}

loadPage();

let navButtonsElem = document.querySelector("#nav-buttons");

navButtonsElem.addEventListener("click", (event) => {
    if (event.target.classList.contains("nav-button")) {
        let buttonID = event.target.getAttribute("id");
        loadPage(buttonID);
    }
})

