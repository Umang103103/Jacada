document.addEventListener("DOMContentLoaded", function () {
  /* ---------------------------
     Currency selector behavior
     --------------------------- */
  document.querySelectorAll(".currency-selector").forEach((selector) => {
    const btn = selector.querySelector(".currency-btn");
    const btnSymbol = selector.querySelector(".currency-symbol");
    const btnLabel = selector.querySelector(".currency-label");
    const list = selector.querySelector(".currency-list");
    const items = selector.querySelectorAll(".currency-list li");

    let lockHover = false;

    if (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        selector.classList.toggle("open");

        if (selector.classList.contains("open")) {
          document
            .querySelectorAll(".currency-selector.open")
            .forEach((s) => s !== selector && s.classList.remove("open"));
          selector.classList.remove("freeze");
          lockHover = false;
        }
      });
    }

    items.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();

        const symbolEl = this.querySelector(".item-symbol");
        const codeEl = this.querySelector(".item-code");

        if (symbolEl && codeEl && btnSymbol && btnLabel) {
          btnSymbol.textContent = symbolEl.textContent.trim();
          btnLabel.textContent = codeEl.textContent.trim();
        }

        selector.classList.remove("open");
        lockHover = true;
        selector.classList.add("freeze");
      });
    });

    selector.addEventListener("pointerenter", function () {
      if (!lockHover) {
        document
          .querySelectorAll(".currency-selector.open")
          .forEach((s) => s !== selector && s.classList.remove("open"));
        selector.classList.add("open");
      }
    });

    selector.addEventListener("pointerleave", function () {
      lockHover = false;
      selector.classList.remove("freeze");
      selector.classList.remove("open");
    });

    if (list) {
      list.addEventListener("click", (e) => e.stopPropagation());
    }
  });

  // Close currency dropdowns on outside click
  document.addEventListener("click", function () {
    document.querySelectorAll(".currency-selector.open").forEach((s) => {
      s.classList.remove("open");
    });
  });

  // Close currency dropdowns on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".currency-selector.open").forEach((s) => {
        s.classList.remove("open");
      });
    }
  });
});
/* Hamburger menu */

const hamburger = document.querySelector(".first-button");
const hamburgerIcon = document.querySelector(".animated-icon1");
const mobileNav = document.querySelector(".mobile-nav");
const panels = document.querySelectorAll(".menu-panel");

/* Hamburger toggle */
hamburger.addEventListener("click", () => {
  hamburgerIcon.classList.toggle("open");
  mobileNav.classList.toggle("open");

  const open = mobileNav.classList.contains("open");
  document.body.style.overflow = open ? "hidden" : "";

  if (!open) resetPanels();
});

/* Open submenu */
document.querySelectorAll(".panel-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;

    panels.forEach((p) => p.classList.remove("active", "left"));
    document.querySelector('[data-panel="main"]').classList.add("left");
    document.querySelector(`[data-panel="${target}"]`).classList.add("active");
  });
});

/* Back */
document.querySelectorAll(".panel-back").forEach((btn) => {
  btn.addEventListener("click", () => {
    panels.forEach((p) => p.classList.remove("active"));
    document.querySelector('[data-panel="main"]').classList.remove("left");
    document.querySelector('[data-panel="main"]').classList.add("active");
  });
});

/* Reset when closed */
function resetPanels() {
  panels.forEach((p) => p.classList.remove("active", "left"));
  document.querySelector('[data-panel="main"]').classList.add("active");
}

//Navbar
const navbar = document.getElementById("navbar");
const stickyOffset = 108; // same as topbar height

window.addEventListener("scroll", () => {
  if (window.scrollY > stickyOffset) {
    navbar.classList.add("is-sticky");
  } else {
    navbar.classList.remove("is-sticky");
  }
});

//Tailored js
document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".tailored-swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,

    loop: true,
    loopAdditionalSlides: 3,
    loopPreventsSliding: false,

    initialSlide: 1,
    speed: 700,

    grabCursor: true,
    watchSlidesProgress: true,

    navigation: {
      nextEl: ".tailored-swiper .swiper-button-next",
      prevEl: ".tailored-swiper .swiper-button-prev",
    },

    pagination: {
      el: ".tailored-swiper .swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      0: {
        slidesPerView: 0,
      },
      768: {
        slidesPerView: "auto",
      },
      992: {
        slidesPerView: "auto",
      },
    },
  });
});

//Destination Section

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".destinations-list li");

  // 🔹 Preload all images
  items.forEach((item) => {
    const img = new Image();
    img.src = item.dataset.image;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const imageEl = document.getElementById("destinationImage");
  const captionEl = document.getElementById("destinationCaption");
  const items = document.querySelectorAll(".destinations-list li");

  let isTransitioning = false;

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      if (isTransitioning) return;

      const newSrc = item.dataset.image;
      const newCaption = item.dataset.caption;

      if (!newSrc || imageEl.src.includes(newSrc)) return;

      isTransitioning = true;

      const tempImg = new Image();
      tempImg.src = newSrc;

      tempImg.onload = () => {
        imageEl.style.opacity = "0";

        setTimeout(() => {
          imageEl.src = newSrc;
          captionEl.textContent = newCaption || "";
          imageEl.style.opacity = "1";
          isTransitioning = false;
        }, 250);
      };
    });
  });
});

//Reviews Section

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".reviews-swiper", {
    slidesPerView: 1,
    loop: true,
    speed: 700,

    navigation: {
      nextEl: ".reviews-button-next",
      prevEl: ".reviews-button-prev",
    },

    pagination: {
      el: ".reviews-pagination",
      clickable: true,
    },
  });
});

//Inspiration swiper Section

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".inspiration-swiper", {
    slidesPerView: "auto",
    spaceBetween: 32,

    loop: true,
    loopAdditionalSlides: 3,
    loopPreventsSlide: false,

    initialSlide: 1,
    speed: 700,

    grabCursor: true,
    watchSlidesProgress: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      0: {
        slidesPerView: 1.1,
      },
      768: {
        slidesPerView: "auto",
      },
      992: {
        slidesPerView: "auto",
      },
    },
  });
});
