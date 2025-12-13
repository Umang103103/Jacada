/*navbar js*/
var prevScrollpos = window.pageYOffset;

window.addEventListener("scroll", function () {
  // ✅ run ONLY on mobile
  if (window.innerWidth > 767) return;

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
(function () {
  const searchBtn = document.querySelector(".search-btn"); // header button
  const searchIcon = searchBtn && searchBtn.querySelector("i"); // <i class="bi ...">
  const panel = document.getElementById("mobileSearchPanel");
  const input = document.getElementById("mobileSearchInput");

  if (!searchBtn || !panel) return;

  // Utility: swap to cross (bi-x) or search (bi-search)
  function setIconToX() {
    if (!searchIcon) return;
    searchIcon.classList.remove("bi-search");
    searchIcon.classList.add("bi-x");
  }
  function setIconToSearch() {
    if (!searchIcon) return;
    searchIcon.classList.remove("bi-x");
    searchIcon.classList.add("bi-search");
  }

  function openPanel() {
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    searchBtn.setAttribute("aria-expanded", "true");
    setIconToX();
    // prevent page scroll behind panel
    document.documentElement.style.overflow = "hidden";
    setTimeout(() => input && input.focus(), 200);
  }

  function closePanel() {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    searchBtn.setAttribute("aria-expanded", "false");
    setIconToSearch();
    document.documentElement.style.overflow = "";
    searchBtn.focus();
  }

  // Toggle on header button click
  searchBtn.addEventListener("click", (e) => {
    // If desktop, do nothing (or you can fallback to other behavior)
    if (window.innerWidth > 767) return;
    const isOpen = panel.classList.contains("open");
    if (isOpen) closePanel();
    else openPanel();
  });

  // Close when clicking outside the inner content (i.e., background)
  panel.addEventListener("click", (evt) => {
    if (evt.target === panel) closePanel();
  });

  // Close on Escape
  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape" && panel.classList.contains("open")) closePanel();
  });

  // If user resizes to desktop while open, close and restore icon
  window.addEventListener("resize", () => {
    if (window.innerWidth > 767 && panel.classList.contains("open")) {
      closePanel();
    }
  });

  // Optional: handle Enter on input to trigger your search (hook your logic)
  input &&
    input.addEventListener("keydown", (evt) => {
      if (evt.key === "Enter") {
        evt.preventDefault();
        const q = input.value.trim();
        if (!q) return input.focus();
        console.log("Search for:", q);
        // TODO: run your search flow (navigate / API)
        // closePanel(); // uncomment if you want to close after submit
      }
    });
})();
