// js

// Sidebar
let sidebarOpenButton = document.querySelector(".header__sidebar-bar");
let sidebarCloseButton = document.querySelector(".sidebar__bar");
let sidebar = document.querySelector(".sidebar");

// Youtube Modal
let welcomeModalButton = document.querySelector(".welcome-screen__player-ctrl");
let welcomeModal = document.querySelector(".youtube-modal");

// Main
let overlay = document.querySelector(".overlay");
let modalClose = document.querySelector(".modal__close");

const activeClassName = "active";
const modalList = [sidebar, overlay, welcomeModal, modalClose];

// Main Functions
const showItem = (data, className = activeClassName) => {
    if (Array.isArray(data)) {
        data.forEach((item) => {
            item.classList.add(className);
        })
    } else {
        data.classList.add(className);
    }
}

const hideItem = (data, className = activeClassName) => {
    if (Array.isArray(data)) {
        data.forEach((item) => {
            item.classList.remove(className);
        })
    } else if (data === "all") {
        modalList.forEach((item) => {
            if (item.classList.contains(className)) {
                item.classList.remove(className);
            }
        });
    } else {
        data.classList.remove(className);
    }
}

const accordionFunc = (item, className = activeClassName) => {
    if (!item.classList.contains(className)) {
        showItem([item]);
    } else {
        hideItem([item]);
    }
}

overlay.addEventListener("click", () => {
    hideItem("all");
});

modalClose.addEventListener("click", () => {
    hideItem("all");
});

// Sidebar
sidebarOpenButton.addEventListener("click", () => {
    showItem([sidebar, overlay]);
});

sidebarCloseButton.addEventListener("click", () => {
    hideItem([sidebar, overlay]);
});

let sidebarNavAaccordion = document.querySelectorAll(".sidebar__nav-item");
sidebarNavAaccordion.forEach((accordion) => {
    accordion.addEventListener('click', () => {
        if (!accordion.classList.contains(activeClassName)) {
            sidebarNavAaccordion.forEach((item) => {
                hideItem([item]);
            })
            showItem(accordion);
        } else {
            accordionFunc(accordion);
        }
    }, false);
});

// Youtube
welcomeModalButton.addEventListener("click", () => {
    showItem([welcomeModal, modalClose, overlay]);
});