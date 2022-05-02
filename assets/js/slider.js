// Slider
document.addEventListener('DOMContentLoaded', function () {
    let stepSlider = new Splide('.splide', {
        drag: 'free',
        arrows: false,
        pagination: false
    });
    let newsSliders = document.querySelectorAll(".splide-news");
    for (let i = 0; i < newsSliders.length; i++) {
        new Splide(newsSliders[i], {
            drag: 'free',
            arrows: false,
            pagination: false
        }).mount();
    }
    stepSlider.mount();
});