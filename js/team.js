const regionFilter = document.getElementById("regionFilter");
const nameSearch = document.getElementById("nameSearch");
const teamCards = document.querySelectorAll(".team-card");

function filterTeam() {
  const selectedRegion = regionFilter.value;
  const searchText = nameSearch.value.toLowerCase();

  teamCards.forEach((card) => {
    const cardRegion = card.dataset.region;
    const cardName = card.dataset.name;

    const matchRegion =
      selectedRegion === "all" || cardRegion === selectedRegion;

    const matchName = cardName.includes(searchText);

    if (matchRegion && matchName) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

regionFilter.addEventListener("change", filterTeam);
nameSearch.addEventListener("input", filterTeam);
