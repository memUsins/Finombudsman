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
const uiList = [body, overlay, sidebar, modalClose, sidebarOpen];

// Main Functions

// Show item
const showItem = (data, className = activeClass) => {
    if (Array.isArray(data)) {
        data.forEach((item) => item.classList.add(className));
    } else {
        data.classList.add(className);
    }
};

// Hide item
const hideItem = (data, className = activeClass) => {
    if (Array.isArray(data)) data.forEach((item) => item.classList.remove(className));
    else if (data === "all") {
        uiList.forEach((item) => {
            if (item.classList.contains(className)) item.classList.remove(className);
        });
    } else data.classList.remove(className);
};

// Open-close item
const accordionFunc = (data, className = activeClass) => {
    if (!data.classList.contains(className)) showItem([data]);
    else hideItem([data]);
};

// Modal
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

// Accordion
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

// Modals
let modalsAll = document.querySelectorAll(".modal-open");
if (modalsAll) modal(modalsAll);

// Overlay
if (overlay) overlay.addEventListener("click", () => hideItem("all"));
if (modalClose) modalClose.addEventListener("click", () => hideItem("all"));

// Tabs
let tabs = document.querySelectorAll(".tab");
if (tabs) tab(tabs);

// Accordion
let accordions = document.querySelectorAll(".accordion-list");
if (accordions) accordion(accordions);

// Dropdown
let dropdownItems = document.querySelectorAll(".dropdown .item");
if (dropdownItems) {
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
}

// Sidebar
searchOpen.addEventListener("click", () => showItem(search));
searchClose.addEventListener("click", () => hideItem(search));

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

// Sidebar nav
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

if (stepItems) {
    stepItems.forEach((step) => {
        step.addEventListener("click", () => {
            if (!step.classList.contains(activeClass)) {
                stepItems.forEach((item) => hideItem([item]));
                showItem(step);
            }
        });
    });
}

// Content sidebar nav
let contentSidebar = document.querySelectorAll(".content-sidebar .list .item");

if (contentSidebar) {
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
}