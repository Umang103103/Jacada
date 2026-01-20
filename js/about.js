document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".experienceSwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    centeredSlides: false,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      576: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
});
