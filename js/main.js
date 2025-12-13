/*navbar js*/
var prevScrollpos = window.pageYOffset;

window.addEventListener("scroll", function () {
  // ✅ run ONLY on mobile
  if (window.innerWidth > 767) return;
  if (
    mobileNav?.classList.contains("open") ||
    document.getElementById("mobileSearchPanel")?.classList.contains("open")
  ) {
    return;
  }

  var currentScrollPos = window.pageYOffset;
  var navbar = document.getElementById("navbar");
  if (!navbar) return;

  if (prevScrollpos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-50px";
  }

  prevScrollpos = currentScrollPos;
});

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
