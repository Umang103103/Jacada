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

//Search panel functionality

//Tailored Sections
const track = document.getElementById("sliderTrack");
const wrapper = document.querySelector(".slider-wrapper");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const firstClone = track.children[0].cloneNode(true);
const lastClone = track.children[track.children.length - 1].cloneNode(true);

let slideWidth = 0;
let baseOffset = 0;
let isAnimating = false;

track.appendChild(firstClone);
track.insertBefore(lastClone, track.firstElementChild);

function updateWidth() {
  slideWidth = track.children[0].offsetWidth;

  const paddingLeft = parseFloat(getComputedStyle(wrapper).paddingLeft);

  /* 🔑 THIS is the correct resting position */
  baseOffset = paddingLeft + slideWidth * 0.5;

  track.style.transition = "none";
  track.style.transform = `translate3d(-${baseOffset}px, 0, 0)`;
}

function moveNext() {
  if (isAnimating) return;
  isAnimating = true;

  track.style.transition = "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)";
  track.style.transform = `translate3d(-${baseOffset + slideWidth}px, 0, 0)`;

  track.addEventListener(
    "transitionend",
    () => {
      track.style.transition = "none";
      track.appendChild(track.firstElementChild);
      track.style.transform = `translate3d(-${baseOffset}px, 0, 0)`;
      isAnimating = false;
    },
    { once: true }
  );
}

function movePrev() {
  if (isAnimating) return;
  isAnimating = true;

  track.style.transition = "none";
  track.insertBefore(track.lastElementChild, track.firstElementChild);
  track.style.transform = `translate3d(-${baseOffset + slideWidth}px, 0, 0)`;

  requestAnimationFrame(() => {
    track.style.transition = "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)";
    track.style.transform = `translate3d(-${baseOffset}px, 0, 0)`;
  });

  track.addEventListener(
    "transitionend",
    () => {
      isAnimating = false;
    },
    { once: true }
  );
}

nextBtn.addEventListener("click", moveNext);
prevBtn.addEventListener("click", movePrev);
window.addEventListener("resize", updateWidth);

/* INIT */
updateWidth();
