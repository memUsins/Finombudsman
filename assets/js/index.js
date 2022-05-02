// js

// Sidebar
let sidebarOpenButton = document.querySelector(".header__sidebar-bar");
let sidebarCloseButton = document.querySelector(".sidebar__bar");
let sidebar = document.querySelector(".sidebar");

// Main
let overlay = document.querySelector(".overlay");
let body = document.querySelector("body");
let modalClose = document.querySelector(".modal__close");

const activeClassName = "active";
const uiList = [body, overlay, sidebar, modalClose];


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
        uiList.forEach((item) => {
            if (item.classList.contains(className)) {
                item.classList.remove(className);
            }
        });
    } else {
        data.classList.remove(className);
    }
}

const accordionFunc = (data, className = activeClassName) => {
    if (!data.classList.contains(className)) {
        showItem([data]);
    } else {
        hideItem([data]);
    }
}

const modal = (data) => {
    data.forEach((dataItem) => {
        let modal = document.querySelector(`#${dataItem.id}-content`);
        uiList.push(modal);
        dataItem.addEventListener("click", () => {
            showItem([modal, modalClose, overlay, body]);
        });
    })
}

let modalsAll = document.querySelectorAll(".modal-open");
modal(modalsAll);


overlay.addEventListener("click", () => {
    hideItem("all");
});

modalClose.addEventListener("click", () => {
    hideItem("all");
});

// Sidebar
sidebarOpenButton.addEventListener("click", () => {
    showItem([sidebar, overlay, body]);
});

sidebarCloseButton.addEventListener("click", () => {
    hideItem([sidebar, overlay, body]);
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

// Steps
let stepItems = document.querySelectorAll(".step-screen__list-item");
stepItems.forEach((step) => {
    step.addEventListener('click', () => {
        if (!step.classList.contains(activeClassName)) {
            stepItems.forEach((item) => {
                hideItem([item]);
            })
            showItem(step);
        } else {
            accordionFunc(step);
        }
    }, false);
});


// Tabs
const tab = (data) => {
    data.forEach((tabList) => {
        let tabTitleArray = [];
        let tabsTitle = "";
        let isTitle = false;

        if (document.querySelectorAll(`#${tabList.id}-header__title > li`).length > 0) {
            console.log(true)
            isTitle = true;
        }

        if (isTitle) {
            tabsTitle = document.querySelectorAll(`#${tabList.id}-header__title > li`);
            tabsTitle.forEach((item) => {
                if (item instanceof Text === true) return
                tabTitleArray.push(item);
            });
        }

        let tabs = document.querySelectorAll(`#${tabList.id}-content > li`);
        let triggers = document.querySelectorAll(`#${tabList.id} > li`);
        let triggerArray = [];
        let tabArray = [];

        tabs.forEach((item) => {
            if (item instanceof Text === true) return
            tabArray.push(item);
        });

        triggers.forEach((item) => {
            if (item instanceof Text === true) return
            triggerArray.push(item);
        });

        triggerArray.forEach((trigger, index) => {
            trigger.addEventListener("click", () => {
                console.log(isTitle)
                triggerArray.forEach((item) => hideItem(item));
                if (isTitle) {
                    tabsTitle.forEach((item) => hideItem(item));
                }

                tabArray.forEach((item) => {
                    hideItem(item)
                    if (isTitle) {
                        showItem(tabTitleArray[index])
                    }
                    showItem([trigger, tabArray[index]])
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
        if (!accordion.classList.contains(activeClassName)) {
            faqAaccordion.forEach((item) => {
                hideItem([item]);
            })
            showItem(accordion);
        } else {
            accordionFunc(accordion);
        }
    }, false);
});