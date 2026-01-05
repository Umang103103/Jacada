//Gallery modal
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector(".view-all-btn");
  const modal = document.getElementById("galleryModal");
  const closeBtn = document.getElementById("closeGallery");
  const overlay = modal.querySelector(".gallery-modal-overlay");

  if (!openBtn || !modal) return;

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
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
