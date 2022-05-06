// quiz
let modalCloseBtn = document.querySelector(".button_close");
if (modalCloseBtn) modalCloseBtn.addEventListener("click", () => hideItem("all"));

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