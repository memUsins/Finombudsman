// js

// Sidebar
let sidebarOpen = document.querySelector(".header__sidebar-bar");
let sidebarClose = document.querySelector(".sidebar__bar");
let sidebar = document.querySelector(".sidebar");

// Main
let overlay = document.querySelector(".overlay");
let body = document.querySelector("body");
let modalClose = document.querySelector(".modal__close");

const activeClass = "active";
const uiList = [body, overlay, sidebar, modalClose];


// Main Functions
const showItem = (data, className = activeClass) => {
    if (Array.isArray(data)) {
        data.forEach((item) => item.classList.add(className))
    } else {
        data.classList.add(className);
    }
}

const hideItem = (data, className = activeClass) => {
    if (Array.isArray(data)) data.forEach((item) => item.classList.remove(className))
    else if (data === "all") {
        uiList.forEach((item) => {
            if (item.classList.contains(className)) item.classList.remove(className);
        });
    } else data.classList.remove(className);
}

const accordionFunc = (data, className = activeClass) => {
    if (!data.classList.contains(className)) showItem([data]);
    else hideItem([data]);
}

const modal = (data) => {
    data.forEach((dataItem) => {
        let modal = document.querySelector(`#${dataItem.id}-content`);
        uiList.push(modal);
        dataItem.addEventListener("click", () => showItem([modal, modalClose, overlay, body]));
    })
}

let modalsAll = document.querySelectorAll(".modal-open");
modal(modalsAll);

overlay.addEventListener("click", () => hideItem("all"));
modalClose.addEventListener("click", () => hideItem("all"));


// Sidebar
sidebarOpen.addEventListener("click", () => showItem([sidebar, overlay, body]));
sidebarClose.addEventListener("click", () => hideItem([sidebar, overlay, body]));

let sidebarNavAaccordion = document.querySelectorAll(".sidebar__nav-item");

sidebarNavAaccordion.forEach((accordion) => {
    accordion.addEventListener('click', () => {
        if (!accordion.classList.contains(activeClass)) {
            sidebarNavAaccordion.forEach((item) => hideItem([item]))
            showItem(accordion);
        } else accordionFunc(accordion);
    });
});


// Steps
let stepItems = document.querySelectorAll(".step-screen__list-item");

stepItems.forEach((step) => {
    step.addEventListener('click', () => {
        if (!step.classList.contains(activeClass)) {
            stepItems.forEach((item) => hideItem([item]))
            showItem(step);
        } else accordionFunc(step);
    });
});


// Tabs
const tab = (data) => {
    data.forEach((tabList) => {
        let tabsTitle = document.querySelectorAll(`#${tabList.id}-header__title > li`);
        let isTitle = tabsTitle.length > 0 ? true : false;

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
                })
            });
        })
    })
}

let newsScreenTab = document.querySelectorAll(".tab");
tab(newsScreenTab);


// Accordion faq
let faqAaccordion = document.querySelectorAll(".faq-screen__list-item");
faqAaccordion.forEach((accordion) => {
    accordion.addEventListener('click', () => {
        if (!accordion.classList.contains(activeClass)) {
            faqAaccordion.forEach((item) => hideItem([item]))
            showItem(accordion);
        } else accordionFunc(accordion);
    });
});