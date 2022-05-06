// js

// Sidebar
let sidebarOpen = document.querySelector(".header__sidebar-bar");
let sidebarClose = document.querySelector(".sidebar__bar");
let sidebar = document.querySelector(".sidebar");

// Search
let searchOpen = document.querySelector(".search__open");
let searchClose = document.querySelector(".search__close");
let search = document.querySelector(".header__search-mobile .hide");

// Main
let overlay = document.querySelector(".overlay");
let body = document.querySelector("body");
let modalClose = document.querySelector(".modal__close");

const activeClass = "active";
const uiList = [body, overlay, sidebar, modalClose];

// Main Functions
const showItem = (data, className = activeClass) => {
    if (Array.isArray(data)) {
        data.forEach((item) => item.classList.add(className));
    } else {
        data.classList.add(className);
    }
};

const hideItem = (data, className = activeClass) => {
    if (Array.isArray(data)) data.forEach((item) => item.classList.remove(className));
    else if (data === "all") {
        uiList.forEach((item) => {
            if (item.classList.contains(className)) item.classList.remove(className);
        });
    } else data.classList.remove(className);
};

const accordionFunc = (data, className = activeClass) => {
    if (!data.classList.contains(className)) showItem([data]);
    else hideItem([data]);
};

const modal = (data) => {
    data.forEach((dataItem) => {
        let modal = document.querySelector(`#${dataItem.id}-content`);
        uiList.push(modal);
        dataItem.addEventListener("click", () => {
            hideItem("all");
            showItem([modal, modalClose, overlay, body]);
        });
    });
};

let modalsAll = document.querySelectorAll(".modal-open");
modal(modalsAll);

overlay.addEventListener("click", () => hideItem("all"));
modalClose.addEventListener("click", () => hideItem("all"));

// Tabs
const tab = (data) => {
    data.forEach((tabList) => {
        let tabsTitle = document.querySelectorAll(`#${tabList.id}-header__title > li`);
        let isTitle = tabsTitle.length > 0;

        let tabs = document.querySelectorAll(`#${tabList.id}-content > li`);
        let triggers = document.querySelectorAll(`#${tabList.id} > li`);

        triggers.forEach((trigger, index) => {
            trigger.addEventListener("click", () => {
                triggers.forEach((item) => hideItem(item));
                if (isTitle) tabsTitle.forEach((item) => hideItem(item));

                tabs.forEach((item) => {
                    hideItem(item);
                    if (isTitle) showItem(tabsTitle[index]);
                    showItem([trigger, tabs[index]]);
                });
            });
        });
    });
};

let tabs = document.querySelectorAll(".tab");
tab(tabs);

// Accordion faq

const accordion = (data) => {
    data.forEach((dataItem) => {
        dataItem = dataItem.querySelectorAll("li");
        dataItem.forEach((liItem) => {
            liItem.addEventListener("click", () => {
                if (!liItem.classList.contains(activeClass)) {
                    dataItem.forEach((item) => hideItem([item]));
                    showItem(liItem);
                } else accordionFunc(liItem);
            });
        });
    });
};

let accordions = document.querySelectorAll(".accordion-list");
accordion(accordions);

let dropdownItems = document.querySelectorAll(".dropdown .item");
dropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        if (item.classList.contains(activeClass)) {
            accordionFunc(e.target.parentNode.parentNode.parentNode);
        } else {
            let itemParentList = e.target.parentNode.parentNode;
            itemParentList = itemParentList.querySelectorAll(".item");
            itemParentList.forEach((allItem) => hideItem(allItem));
            showItem(item);
            hideItem(e.target.parentNode.parentNode.parentNode);
        }
    });
});

// Sidebar
sidebarOpen.addEventListener("click", () => {
    if (!sidebar.classList.contains("active")) {
        showItem([sidebar, sidebarOpen, overlay, body]);
        showItem(overlay, "overlay_mobile");
    } else {
        hideItem([sidebar, sidebarOpen, overlay, body]);
        hideItem(overlay, "overlay_mobile");
    }
});
sidebarClose.addEventListener("click", () => {
    if (!sidebar.classList.contains("active")) {
        showItem([sidebar, sidebarOpen, overlay, body]);
        showItem(overlay, "overlay_mobile");
    } else {
        hideItem([sidebar, sidebarOpen, overlay, body]);
        hideItem(overlay, "overlay_mobile");
    }
});

let sidebarNavAaccordion = document.querySelectorAll(".sidebar__nav-item");

sidebarNavAaccordion.forEach((accordion) => {
    accordion.addEventListener("click", () => {
        if (!accordion.classList.contains(activeClass)) {
            sidebarNavAaccordion.forEach((item) => hideItem([item]));
            showItem(accordion);
        } else accordionFunc(accordion);
    });
});

// Steps
let stepItems = document.querySelectorAll(".step .item");

stepItems.forEach((step) => {
    step.addEventListener("click", () => {
        if (!step.classList.contains(activeClass)) {
            stepItems.forEach((item) => hideItem([item]));
            showItem(step);
        } else accordionFunc(step);
    });
});

let contentSidebar = document.querySelectorAll(".content-sidebar .list .item");

contentSidebar.forEach((item) => {
    item.addEventListener("click", () => {
        if (item.classList.contains(activeClass)) {
            contentSidebar.forEach((i) => hideItem(i));
            hideItem(item);
        } else {
            contentSidebar.forEach((i) => hideItem(i));
            item.classList.add("active");
            ShowItem(item);
        }
    });
});

// Sidebar
searchOpen.addEventListener("click", () => showItem(search));
searchClose.addEventListener("click", () => hideItem(search));