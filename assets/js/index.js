// js

let sidebarOpenButton = document.querySelector(".header__sidebar-bar");
let sidebarCloseButton = document.querySelector(".sidebar__bar");
let sidebar = document.querySelector(".sidebar");
let overlay = document.querySelector(".overlay");

const activeClassName = "active";
const modalList = [sidebar, overlay];

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

const accordeonFunc = (item, className) => {
    if (!item.classList.contains(className)) {
        showItem(item);
    } else {
        hideItem(item);
    }
}

sidebarOpenButton.addEventListener("click", () => {
    showItem([sidebar, overlay]);
});

sidebarCloseButton.addEventListener("click", () => {
    hideItem([sidebar, overlay]);
});

overlay.addEventListener("click", () => {
    hideItem("all");
});