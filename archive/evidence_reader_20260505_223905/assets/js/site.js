(function () {
  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  if (!slides.length) return;

  let current = 0;

  function showSlide(index) {
    current = Math.max(0, Math.min(index, slides.length - 1));
    slides[current].scrollIntoView({ behavior: "smooth", block: "start" });

    const progress = document.querySelector("[data-progress]");
    if (progress) {
      const pct = ((current + 1) / slides.length) * 100;
      progress.style.width = pct + "%";
    }
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      showSlide(current + 1);
    }

    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      showSlide(current - 1);
    }
  });
})();
