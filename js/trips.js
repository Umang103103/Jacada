document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".tour-card");
  const searchInput = document.getElementById("searchInput");
  const resultCountEl = document.getElementById("resultCount");

  const getCheckedValues = (selector) =>
    Array.from(document.querySelectorAll(selector + ":checked")).map((el) =>
      el.value.toLowerCase().trim()
    );

  function filterCards() {
    const searchText = searchInput?.value.toLowerCase().trim() || "";

    const selectedCountries = getCheckedValues(".filter-country");
    const selectedActivities = getCheckedValues(".filter-activity");
    const selectedDifficulties = getCheckedValues(".filter-difficulty");
    const selectedStyles = getCheckedValues(".filter-style");

    const minPrice = parseInt(document.getElementById("minPrice")?.value || 0);
    const maxPrice = parseInt(
      document.getElementById("maxPrice")?.value || 99999
    );

    let visibleCount = 0;

    cards.forEach((card) => {
      const country = (card.dataset.country || "").toLowerCase();
      const activity = (card.dataset.activity || "").toLowerCase();
      const difficulty = (card.dataset.difficulty || "").toLowerCase();
      const style = (card.dataset.style || "").toLowerCase();
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
      const matchesPrice = price >= minPrice && price <= maxPrice;

      const show =
        matchesSearch &&
        matchesCountry &&
        matchesActivity &&
        matchesDifficulty &&
        matchesStyle &&
        matchesPrice;

      const col = card.closest(".col-xl-4");
      col.style.display = show ? "" : "none";

      if (show) visibleCount++;
    });

    // ✅ Update result count with correct grammar
    if (resultCountEl) {
      resultCountEl.textContent = visibleCount;

      const labelNode = resultCountEl.parentElement;
      const text = visibleCount === 1 ? " adventure" : " adventures";

      labelNode.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = text;
        }
      });
    }
  }

  // Listen to all filters
  document
    .querySelectorAll("input[type='checkbox'], select")
    .forEach((el) => el.addEventListener("change", filterCards));

  // Search input
  searchInput?.addEventListener("keyup", filterCards);

  // Run once on page load
  filterCards();
});
