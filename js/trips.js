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

  filterCards(); // initial render
});

//Clear All

//left aside accordian

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("filterSidebar");
  const aside = document.getElementById("filterAside");
  const cards = document.getElementById("cardsColumn");

  if (!sidebar || !aside || !cards) return;

  const topOffset = 65; // must match CSS top

  /* -----------------------------------
     Lock sidebar width (fixes fixed jump)
  ----------------------------------- */
  function lockWidth() {
    sidebar.style.width = aside.offsetWidth + "px";
  }

  lockWidth();
  window.addEventListener("resize", lockWidth);

  /* -----------------------------------
     MAIN STICKY LOGIC
  ----------------------------------- */
  function handleSidebarScroll() {
    const sidebarHeight = sidebar.offsetHeight;
    const cardsHeight = cards.offsetHeight;

    const asideTop = aside.offsetTop;
    const cardsBottom = cards.offsetTop + cardsHeight;
    const scrollY = window.scrollY;

    /* 🟢 CASE 1: NOT ENOUGH CARDS
       → Sidebar should scroll normally
    */
    if (cardsHeight <= sidebarHeight) {
      sidebar.classList.remove("is-fixed", "is-bottom");
      sidebar.classList.add("is-normal");
      return;
    }

    sidebar.classList.remove("is-normal");

    const startStick = asideTop - topOffset;
    const stopStick = cardsBottom - sidebarHeight - topOffset;

    /* 🟢 CASE 2: STICKY ZONE */
    if (scrollY > startStick && scrollY < stopStick) {
      sidebar.classList.add("is-fixed");
      sidebar.classList.remove("is-bottom");
    } else if (scrollY >= stopStick) {
      /* 🟢 CASE 3: BOTTOM REACHED */
      sidebar.classList.remove("is-fixed");
      sidebar.classList.add("is-bottom");
    } else {
      /* 🟢 CASE 4: ABOVE STICKY */
      sidebar.classList.remove("is-fixed", "is-bottom");
      sidebar.classList.add("is-normal");
    }
  }

  /* -----------------------------------
     EVENTS
  ----------------------------------- */
  window.addEventListener("scroll", handleSidebarScroll);
  window.addEventListener("load", handleSidebarScroll);

  /* -----------------------------------
     🔑 PUBLIC METHOD
     Call this AFTER filtering cards
  ----------------------------------- */
  window.recalculateSidebar = function () {
    requestAnimationFrame(() => {
      lockWidth();
      handleSidebarScroll();
    });
  };

  /* Initial run */
  handleSidebarScroll();
});
