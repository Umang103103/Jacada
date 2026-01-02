document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".tour-card");
  const searchInput = document.getElementById("searchInput");

  const getCheckedValues = (selector) =>
    Array.from(document.querySelectorAll(selector + ":checked")).map((el) =>
      el.value.toLowerCase().trim()
    );

  function filterCards() {
    const searchText = searchInput.value.toLowerCase().trim();

    const selectedCountries = getCheckedValues(".filter-country");
    const selectedActivities = getCheckedValues(".filter-activity");
    const selectedDifficulties = getCheckedValues(".filter-difficulty");
    const selectedStyles = getCheckedValues(".filter-style");

    const minPrice = parseInt(document.getElementById("minPrice")?.value || 0);
    const maxPrice = parseInt(
      document.getElementById("maxPrice")?.value || 99999
    );

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

      card.closest(".col-xl-4").style.display = show ? "" : "none";
    });
  }

  document
    .querySelectorAll("input[type='checkbox'], select")
    .forEach((el) => el.addEventListener("change", filterCards));

  searchInput.addEventListener("keyup", filterCards);
});
