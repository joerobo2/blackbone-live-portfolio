/* PRESENTATION_AUDIO_PLAYER_V1 */
(() => {
  const AUDIO_ROOT = "/assets/audio/presentation";
  const PLAYING_CLASS = "is-playing";

  let activeAudio = null;
  let activeButton = null;

  function setButtonState(button, isPlaying) {
    if (!button) return;

    button.classList.toggle(PLAYING_CLASS, isPlaying);
    button.setAttribute("aria-pressed", isPlaying ? "true" : "false");

    const label = button.querySelector(".audio-label");
    if (label) {
      label.textContent = isPlaying ? "Pause" : "Listen";
    }
  }

  function stopActiveAudio() {
    if (activeAudio) {
      activeAudio.pause();
    }

    if (activeButton) {
      setButtonState(activeButton, false);
    }

    activeAudio = null;
    activeButton = null;
  }

  function createAudioButton(slide, slideNumberRaw) {
    const slideNumber = String(slideNumberRaw).padStart(2, "0");
    const audio = new Audio(`${AUDIO_ROOT}/slide-${slideNumber}.mp3`);
    audio.preload = "metadata";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "slide-audio-button";
    button.setAttribute("aria-label", `Play narration for slide ${slideNumberRaw}`);
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `
      <span class="audio-icon" aria-hidden="true">🎙</span>
      <span class="audio-label">Listen</span>
    `;

    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (activeAudio && activeAudio !== audio) {
        stopActiveAudio();
      }

      if (audio.paused) {
        try {
          await audio.play();
          activeAudio = audio;
          activeButton = button;
          setButtonState(button, true);
        } catch (error) {
          console.error("Presentation audio playback failed:", error);
          setButtonState(button, false);
        }
      } else {
        stopActiveAudio();
      }
    });

    audio.addEventListener("ended", () => {
      if (activeAudio === audio) {
        stopActiveAudio();
      } else {
        setButtonState(button, false);
      }
    });

    audio.addEventListener("pause", () => {
      if (activeAudio === audio && !audio.ended) {
        setButtonState(button, false);
      }
    });

    return button;
  }

  function attachAudioButtons() {
    const slides = document.querySelectorAll(".presentation-slide[data-slide]");

    slides.forEach((slide) => {
      if (slide.querySelector(".slide-audio-button")) return;

      const slideNumberRaw = slide.getAttribute("data-slide");
      if (!slideNumberRaw) return;

      const button = createAudioButton(slide, slideNumberRaw);
      slide.appendChild(button);
    });
  }

  function observeSlideChanges() {
    const slides = document.querySelectorAll(".presentation-slide[data-slide]");

    const observer = new MutationObserver(() => {
      const activeSlide = activeButton?.closest(".presentation-slide");
      if (!activeSlide) return;

      const isHidden =
        activeSlide.hidden ||
        activeSlide.getAttribute("aria-hidden") === "true" ||
        activeSlide.classList.contains("is-hidden") ||
        activeSlide.style.display === "none";

      if (isHidden) {
        stopActiveAudio();
      }
    });

    slides.forEach((slide) => {
      observer.observe(slide, {
        attributes: true,
        attributeFilter: ["class", "style", "hidden", "aria-hidden"],
      });
    });
  }

  function bindNavigationPause() {
    document.addEventListener("keydown", (event) => {
      const navigationKeys = ["ArrowRight", "ArrowLeft", "PageUp", "PageDown", "Home", "End"];

      if (navigationKeys.includes(event.key)) {
        stopActiveAudio();
      }
    });

    document.addEventListener(
      "click",
      (event) => {
        if (event.target.closest(".slide-audio-button")) return;

        const clickedNavigation = event.target.closest(
          ".presentation-controls, .presentation-nav, .slide-nav, .slide-dot, [data-slide-target], [data-goto-slide], .next-slide, .prev-slide"
        );

        if (clickedNavigation) {
          stopActiveAudio();
        }
      },
      true
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    attachAudioButtons();
    observeSlideChanges();
    bindNavigationPause();
  });
})();
