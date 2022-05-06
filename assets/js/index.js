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
let modalCloseBtn = document.querySelector(".button_close");

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
if (modalCloseBtn) modalCloseBtn.addEventListener("click", () => hideItem("all"));

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
        dataItem = dataItem.querySelectorAll('li')
        dataItem.forEach((liItem) => {
            liItem.addEventListener("click", () => {
                if (!liItem.classList.contains(activeClass)) {
                    dataItem.forEach((item) => hideItem([item]));
                    showItem(liItem);
                } else accordionFunc(liItem);
            });
        })
    });
};


let accordions = document.querySelectorAll(".accordion-list");
accordion(accordions)

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
    if (!sidebar.classList.contains('active')) {
        showItem([sidebar, sidebarOpen, overlay, body])
    } else {
        hideItem([sidebar, sidebarOpen, overlay, body])
    }
});
sidebarClose.addEventListener("click", () => {
    if (!sidebar.classList.contains('active')) {
        showItem([sidebar, sidebarOpen, overlay, body])
    } else {
        hideItem([sidebar, sidebarOpen, overlay, body])
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
    item.addEventListener('click', () => {
        if (item.classList.contains(activeClass)) {
            contentSidebar.forEach((i) => hideItem(i));
            hideItem(item);
        } else {
            contentSidebar.forEach((i) => hideItem(i));
            item.classList.add('active');
            ShowItem(item);
        }
    })
});

// Sidebar
searchOpen.addEventListener("click", () => showItem(search));
searchClose.addEventListener("click", () => hideItem(search));

// quiz

let quizNextCtrl = document.querySelectorAll(".quiz_next-ctrl")
let quizPrevCtrl = document.querySelectorAll(".quiz_prev-ctrl")

let quizNextScreen = (item) => {
    let currentItem = item.parentNode.parentNode;
    let nextItem = currentItem.nextElementSibling;

    if (nextItem != null) {
        hideItem(currentItem);
        showItem(nextItem);
    }
}

quizPrevCtrl.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        let currentItem = item.parentNode.parentNode;
        let prevItem = currentItem.previousElementSibling;

        if (prevItem != null) {
            hideItem(currentItem);
            showItem(prevItem);
        }
    });
});

let firstQuizCtrl = document.querySelectorAll(".quiz_first-screen__next");

firstQuizCtrl.forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault()
        quizNextScreen(item);
    });
});

let secondQuizCtrl = document.querySelector(".quiz_second-screen__next");
let warningModal = document.querySelector('#warning-modal-content');
uiList.push(warningModal);

secondQuizCtrl.addEventListener("click", (e) => {
    e.preventDefault()
    let inputs = document.querySelectorAll('.input-file');

    let errorList = [];

    inputs.forEach((field) => {
        console.log(field.files.length)
        if (field.files.length == 0) {
            showItem([warningModal, overlay, body])
            errorList.push(true)
        }
    })
    if (errorList.length == 0) quizNextScreen(secondQuizCtrl);
});

let thirdQuizCtrl = document.querySelector(".quiz_third-screen__next");

thirdQuizCtrl.addEventListener("click", (e) => {
    e.preventDefault()
    quizNextScreen(thirdQuizCtrl);
});

// let formFiles = document.querySelector("#form-files");

let inputs = document.querySelectorAll('.input-file');

inputs.forEach((item) => {
    item.addEventListener('change', () => {
        if (item.files.length > 0) {
            let fileInfo = item.previousElementSibling;
            fileInfo.classList.add('active')
            fileInfo.querySelector('.title').innerHTML = item.files[0].name;
        }
    })
})