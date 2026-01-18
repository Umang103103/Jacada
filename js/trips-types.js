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

document.addEventListener("DOMContentLoaded", function () {
  const monthButtons = Array.from(document.querySelectorAll(".month-btn"));
  const monthContents = Array.from(document.querySelectorAll(".month-content"));

  const months = monthButtons.map((btn) => ({
    key: btn.dataset.month,
    label: btn.textContent.trim().split("\n")[0].trim() + " 2026",
  }));

  const mobileLabel = document.querySelector(".month-label");
  const prevBtn = document.querySelector(".prev-month");
  const nextBtn = document.querySelector(".next-month");

  let currentIndex = monthContents.findIndex((c) =>
    c.classList.contains("active"),
  );
  if (currentIndex === -1) currentIndex = 0;

  function updateMonthByIndex(index) {
    const month = months[index];
    if (!month) return;

    currentIndex = index;

    // Update blocks
    monthContents.forEach((c) => c.classList.remove("active"));
    document.getElementById(month.key)?.classList.add("active");

    // Update desktop tabs
    monthButtons.forEach((b) => b.classList.remove("active"));
    document
      .querySelector(`.month-btn[data-month="${month.key}"]`)
      ?.classList.add("active");

    // Update mobile label
    if (mobileLabel) {
      mobileLabel.textContent = month.label;
    }
  }

  /* ===============================
     DESKTOP TAB CLICK
  =============================== */
  monthButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      updateMonthByIndex(index);
    });
  });
  prevBtn?.addEventListener("click", () => {
    if (currentIndex > 0) {
      updateMonthByIndex(currentIndex - 1);
    }
  });

  nextBtn?.addEventListener("click", () => {
    if (currentIndex < months.length - 1) {
      updateMonthByIndex(currentIndex + 1);
    }
  });
  updateMonthByIndex(currentIndex);
});
