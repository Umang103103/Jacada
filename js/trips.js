document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".tour-card");
  const searchInput = document.getElementById("searchInput");
  const resultCountEl = document.getElementById("resultCount");

  const monthSelect = document.getElementById("filterMonth");
  const minDaysSelect = document.getElementById("minDays");
  const maxDaysSelect = document.getElementById("maxDays");

  const getCheckedValues = (selector) =>
    Array.from(document.querySelectorAll(selector + ":checked")).map((el) =>
      el.value.trim().toLowerCase()
    );

  const clearBtn = document.getElementById("clearFilters");

  clearBtn?.addEventListener("click", () => {
    // 1. Clear search
    if (searchInput) searchInput.value = "";

    // 2. Uncheck all checkboxes
    document
      .querySelectorAll("input[type='checkbox']")
      .forEach((cb) => (cb.checked = false));

    // 3. Reset selects EXCEPT price
    document.querySelectorAll("select").forEach((select) => {
      if (select.id === "minPrice") {
        select.value = "0"; // default min
      } else if (select.id === "maxPrice") {
        select.value = "4500"; // default max
      } else {
        select.selectedIndex = 0;
      }
    });

    // 4. Run filter again
    filterCards();
  });

  function filterCards() {
    const searchText = searchInput?.value.trim().toLowerCase() || "";

    const selectedCountries = getCheckedValues(".filter-country");
    const selectedActivities = getCheckedValues(".filter-activity");
    const selectedDifficulties = getCheckedValues(".filter-difficulty");
    const selectedStyles = getCheckedValues(".filter-style");

    const selectedMonth = monthSelect?.value
      ? monthSelect.value.toLowerCase()
      : "";

    const minDays = minDaysSelect?.value ? parseInt(minDaysSelect.value) : null;

    const maxDays = maxDaysSelect?.value ? parseInt(maxDaysSelect.value) : null;

    const minPrice = parseInt(document.getElementById("minPrice")?.value || 0);
    const maxPrice = parseInt(
      document.getElementById("maxPrice")?.value || 999999
    );

    let visibleCount = 0;

    cards.forEach((card) => {
      const country = (card.dataset.country || "").toLowerCase();
      const activity = (card.dataset.activity || "").toLowerCase();
      const difficulty = (card.dataset.difficulty || "").toLowerCase();
      const style = (card.dataset.style || "").toLowerCase();
      const month = (card.dataset.month || "").toLowerCase();

      const days = parseInt(card.dataset.days || 0);
      const price = parseInt(card.dataset.price || 0);

      const cardText = card.innerText.toLowerCase();

      const matchesSearch = !searchText || cardText.includes(searchText);
      const matchesCountry =
        !selectedCountries.length || selectedCountries.includes(country);
      const matchesActivity =
        !selectedActivities.length || selectedActivities.includes(activity);
      const matchesDifficulty =
        !selectedDifficulties.length ||
        selectedDifficulties.includes(difficulty);
      const matchesStyle =
        !selectedStyles.length || selectedStyles.includes(style);
      const matchesMonth = !selectedMonth || month === selectedMonth;

      const matchesDays =
        (!minDays && !maxDays) ||
        ((minDays === null || days >= minDays) &&
          (maxDays === null || days <= maxDays));

      const matchesPrice = price >= minPrice && price <= maxPrice;

      const show =
        matchesSearch &&
        matchesCountry &&
        matchesActivity &&
        matchesDifficulty &&
        matchesStyle &&
        matchesMonth &&
        matchesDays &&
        matchesPrice;

      const col = card.closest(".col-xl-4");
      col.style.display = show ? "" : "none";

      if (show) visibleCount++;
    });

    if (resultCountEl) {
      resultCountEl.textContent = visibleCount;
    }

    if (window.recalculateSidebar) {
      window.recalculateSidebar();
    }
  }

  document
    .querySelectorAll("input[type='checkbox'], select")
    .forEach((el) => el.addEventListener("change", filterCards));

  searchInput?.addEventListener("keyup", filterCards);

  filterCards();
});

//left aside accordian

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("filterSidebar");
  const aside = document.getElementById("filterAside");
  const cards = document.getElementById("cardsColumn");

  if (!sidebar || !aside || !cards) return;

  const topOffset = 65;

  function lockWidth() {
    sidebar.style.width = aside.offsetWidth + "px";
  }

  lockWidth();
  window.addEventListener("resize", lockWidth);

  function handleSidebarScroll() {
    const sidebarHeight = sidebar.offsetHeight;
    const cardsHeight = cards.offsetHeight;

    const asideTop = aside.offsetTop;
    const cardsBottom = cards.offsetTop + cardsHeight;
    const scrollY = window.scrollY;

    if (cardsHeight <= sidebarHeight) {
      sidebar.classList.remove("is-fixed", "is-bottom");
      sidebar.classList.add("is-normal");
      return;
    }

    sidebar.classList.remove("is-normal");

    const startStick = asideTop - topOffset;
    const stopStick = cardsBottom - sidebarHeight - topOffset;

    if (scrollY > startStick && scrollY < stopStick) {
      sidebar.classList.add("is-fixed");
      sidebar.classList.remove("is-bottom");
    } else if (scrollY >= stopStick) {
      sidebar.classList.remove("is-fixed");
      sidebar.classList.add("is-bottom");
    } else {
      sidebar.classList.remove("is-fixed", "is-bottom");
      sidebar.classList.add("is-normal");
    }
  }

  window.addEventListener("scroll", handleSidebarScroll);
  window.addEventListener("load", handleSidebarScroll);

  window.recalculateSidebar = function () {
    requestAnimationFrame(() => {
      lockWidth();
      handleSidebarScroll();
    });
  };

  /* Initial run */
  handleSidebarScroll();
});

//mobile panel filter
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openFilters");
  const closeBtn = document.getElementById("closeFilters");
  const panel = document.getElementById("mobileFilterPanel");
  const overlay = document.getElementById("mobileFilterOverlay");
  const sidebar = document.getElementById("filterSidebar");
  const mobileBody = document.querySelector(".mobile-filter-body");
  const aside = document.getElementById("filterAside");

  if (!openBtn || !sidebar) return;

  function moveSidebarToMobile() {
    if (window.innerWidth < 992) {
      if (!mobileBody.contains(sidebar)) {
        mobileBody.appendChild(sidebar);
      }
    } else {
      if (!aside.contains(sidebar)) {
        aside.appendChild(sidebar);
      }
      panel.classList.remove("active");
      overlay.classList.remove("active");
    }
  }

  openBtn.addEventListener("click", () => {
    panel.classList.add("active");
    overlay.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    panel.classList.remove("active");
    overlay.classList.remove("active");
  });

  window.addEventListener("resize", moveSidebarToMobile);

  moveSidebarToMobile();
});
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const mobileSearchSlot = document.querySelector(".mobile-search");
  const desktopSearchWrapper = document.querySelector(".filter-search");
  const resultCount = document.getElementById("resultCount");
  const mobileResultCount = document.getElementById("mobileResultCount");

  function handleMobileLayout() {
    if (window.innerWidth < 992) {
      if (
        searchInput &&
        mobileSearchSlot &&
        !mobileSearchSlot.contains(searchInput)
      ) {
        mobileSearchSlot.appendChild(searchInput);
      }
    } else {
      if (desktopSearchWrapper && !desktopSearchWrapper.contains(searchInput)) {
        desktopSearchWrapper
          .querySelector(".position-relative")
          .appendChild(searchInput);
      }
    }

    // Sync result count
    if (resultCount && mobileResultCount) {
      mobileResultCount.textContent = resultCount.textContent;
    }
  }

  window.addEventListener("resize", handleMobileLayout);
  handleMobileLayout();
});
