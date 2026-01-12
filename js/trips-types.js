//Gallery modal
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("galleryModal");
  const closeBtn = document.getElementById("closeGallery");
  const overlay = modal.querySelector(".gallery-modal-overlay");
  const openButtons = document.querySelectorAll(".view-all-btn, .open-gallery");

  if (!modal || openButtons.length === 0) return;

  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
});

//Save button
document.querySelectorAll(".save-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.classList.toggle("active");
  });
});

//itnerary cards click
document.getElementById("expandAll").addEventListener("click", function () {
  const items = document.querySelectorAll(".accordion-collapse");

  const expanded = this.classList.toggle("open");

  items.forEach((item) => {
    const collapse = new bootstrap.Collapse(item, { toggle: false });
    expanded ? collapse.show() : collapse.hide();
  });

  this.textContent = expanded ? "Collapse All –" : "Expand All +";
});

//Date & Prices Section - Toggle
document.querySelectorAll(".month-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const month = btn.dataset.month;

    document
      .querySelectorAll(".month-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    document
      .querySelectorAll(".month-content")
      .forEach((content) => content.classList.remove("active"));
    document.getElementById(month).classList.add("active");
  });
});
