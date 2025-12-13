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

    // Button click toggles open/close (overrides lockHover — user-intent)
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        selector.classList.toggle("open");
        if (selector.classList.contains("open")) {
          // close other selectors
          document.querySelectorAll(".currency-selector.open").forEach((s) => {
            if (s !== selector) s.classList.remove("open");
          });
          selector.classList.remove("freeze");
          lockHover = false;
        }
      });
    }

    // Item click — update button, close, lock hover until pointer leaves
    items.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();
        const symbolEl = this.querySelector(".item-symbol");
        const codeEl = this.querySelector(".item-code");
        if (symbolEl && codeEl && btnSymbol && btnLabel) {
          btnSymbol.textContent = symbolEl.textContent.trim();
          btnLabel.textContent = codeEl.textContent.trim();
        }
        // close dropdown
        selector.classList.remove("open");
        // lock hover until pointer leaves selector area
        lockHover = true;
        selector.classList.add("freeze");
      });
    });

    // Hover open only when not locked
    selector.addEventListener("pointerenter", function () {
      if (!lockHover) {
        // close other selectors
        document.querySelectorAll(".currency-selector.open").forEach((s) => {
          if (s !== selector) s.classList.remove("open");
        });
        selector.classList.add("open");
      } else {
        selector.classList.remove("open");
        selector.classList.add("freeze");
      }
    });

    // On leave, clear locks and close
    selector.addEventListener("pointerleave", function () {
      lockHover = false;
      selector.classList.remove("freeze");
      selector.classList.remove("open");
    });

    // Prevent clicks inside list from bubbling
    if (list) {
      list.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }
  });

  // ONE global document click listener: closes any open selectors and mobile menu
  document.addEventListener("click", function () {
    document.querySelectorAll(".currency-selector.open").forEach((s) => {
      s.classList.remove("open");
    });
  });

  /* ---------------------------
     Mobile menu toggle behavior
     --------------------------- */
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuBackdrop = document.querySelector(".menu-backdrop");
  if (menuBtn && mobileMenu) {
    const menuIcon = menuBtn.querySelector(".menu-icon");
    const closeIcon = menuBtn.querySelector(".close-icon");

    function openMobileMenu() {
      mobileMenu.classList.add("show");
      menuBackdrop && menuBackdrop.classList.add("show");
      menuIcon && menuIcon.classList.add("d-none");
      closeIcon && closeIcon.classList.remove("d-none");
      menuBtn.setAttribute("aria-expanded", "true");
      mobileMenu.setAttribute("aria-hidden", "false");
      // lock page scroll
      document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
      mobileMenu.classList.remove("show");
      menuBackdrop && menuBackdrop.classList.remove("show");
      menuIcon && menuIcon.classList.remove("d-none");
      closeIcon && closeIcon.classList.add("d-none");
      menuBtn.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
      // unlock page scroll
      document.body.style.overflow = "";
    }

    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (mobileMenu.classList.contains("show")) closeMobileMenu();
      else openMobileMenu();
    });

    // clicking backdrop closes menu
    if (menuBackdrop) {
      menuBackdrop.addEventListener("click", function (e) {
        closeMobileMenu();
      });
    }

    // clicking outside closes mobile menu (global handler) — keep this defensive but ensure it doesn't fire when clicking inside
    document.addEventListener("click", function () {
      if (mobileMenu.classList.contains("show")) {
        closeMobileMenu();
      }
    });

    // prevent clicks inside mobile menu from closing immediately
    mobileMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    // close mobile menu on link click (mobile)
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", function () {
        // small delay to allow navigation to start smoothly, then close UI
        setTimeout(closeMobileMenu, 50);
      });
    });
  }

  /* ---------------------------
     Accessibility: Escape to close menus
     --------------------------- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      // close mobile menu
      const mm = document.querySelector(".mobile-menu.show");
      if (mm) {
        const backdrop = document.querySelector(".menu-backdrop");
        mm.classList.remove("show");
        if (backdrop) backdrop.classList.remove("show");
        const menuBtnEl = document.querySelector(".mobile-menu-btn");
        if (menuBtnEl) {
          const menuIcon = menuBtnEl.querySelector(".menu-icon");
          const closeIcon = menuBtnEl.querySelector(".close-icon");
          menuIcon && menuIcon.classList.remove("d-none");
          closeIcon && closeIcon.classList.add("d-none");
          menuBtnEl.setAttribute("aria-expanded", "false");
        }
        document.body.style.overflow = "";
      }

      // close any open currency selectors
      document.querySelectorAll(".currency-selector.open").forEach((s) => {
        s.classList.remove("open");
      });
    }
  });
});
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
