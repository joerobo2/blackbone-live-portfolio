/* PRESENTATION_AUDIO_PLAYER_V2 */
(() => {
  const AUDIO_ROOT = "/assets/audio/presentation";
  const PLAYING_CLASS = "is-playing";

  let activeAudio = null;
  let activeButton = null;
  const audioCache = new Map();

  function getAudio(slideNumberRaw) {
    const slideNumber = String(slideNumberRaw).padStart(2, "0");

    if (!audioCache.has(slideNumber)) {
      const audio = new Audio(`${AUDIO_ROOT}/slide-${slideNumber}.mp3`);
      audio.preload = "metadata";
      audioCache.set(slideNumber, audio);
    }

    return audioCache.get(slideNumber);
  }

  function setButtonState(button, isPlaying) {
    if (!button) return;

    button.classList.toggle(PLAYING_CLASS, isPlaying);
    button.setAttribute("aria-pressed", isPlaying ? "true" : "false");

    const label = button.querySelector(".audio-label");
    if (label) {
      label.textContent = isPlaying ? "Pause" : "Listen";
    }
  }

  function resetAllButtons() {
    document.querySelectorAll(".slide-audio-button").forEach((button) => {
      setButtonState(button, false);
    });
  }

  function stopActiveAudio() {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = activeAudio.currentTime;
    }

    resetAllButtons();

    activeAudio = null;
    activeButton = null;
  }

  function isSlideVisible(slide) {
    if (!slide) return false;

    const style = window.getComputedStyle(slide);

    return (
      !slide.hidden &&
      slide.getAttribute("aria-hidden") !== "true" &&
      style.display !== "none" &&
      style.visibility !== "hidden"
    );
  }

  function getCurrentSlideNumber() {
    const slides = Array.from(document.querySelectorAll(".presentation-slide[data-slide]"));

    const activeSlide =
      slides.find((slide) => slide.classList.contains("is-active")) ||
      slides.find((slide) => slide.classList.contains("active")) ||
      slides.find((slide) => slide.getAttribute("aria-current") === "true") ||
      slides.find(isSlideVisible) ||
      slides[0];

    return activeSlide?.getAttribute("data-slide") || "1";
  }

  function createAudioButton({ className = "", fixedSlideNumber = null } = {}) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `slide-audio-button ${className}`.trim();
    button.setAttribute("aria-label", "Play narration");
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `
      <span class="audio-icon" aria-hidden="true">🎙</span>
      <span class="audio-label">Listen</span>
    `;

    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const slideNumberRaw = fixedSlideNumber || getCurrentSlideNumber();
      const audio = getAudio(slideNumberRaw);

      if (activeAudio && activeAudio !== audio) {
        stopActiveAudio();
      }

      if (audio.paused) {
        try {
          await audio.play();
          activeAudio = audio;
          activeButton = button;
          setButtonState(button, true);

          audio.onended = () => {
            if (activeAudio === audio) {
              stopActiveAudio();
            }
          };
        } catch (error) {
          console.error("Presentation audio playback failed:", error);
          setButtonState(button, false);
        }
      } else {
        stopActiveAudio();
      }
    });

    return button;
  }

  function attachMobileSlideButtons() {
    const slides = document.querySelectorAll(".presentation-slide[data-slide]");

    slides.forEach((slide) => {
      if (slide.querySelector(".slide-audio-button--slide")) return;

      const slideNumberRaw = slide.getAttribute("data-slide");
      if (!slideNumberRaw) return;

      const button = createAudioButton({
        className: "slide-audio-button--slide",
        fixedSlideNumber: slideNumberRaw,
      });

      slide.appendChild(button);
    });
  }

  function attachDesktopControlButton() {
    const controls = document.querySelector(".presentation-controls");
    if (!controls || controls.querySelector(".slide-audio-button--control")) return;

    const button = createAudioButton({
      className: "slide-audio-button--control",
    });

    const returnControl = Array.from(controls.children).find((child) =>
      /return/i.test(child.textContent || "")
    );

    if (returnControl) {
      controls.insertBefore(button, returnControl);
    } else {
      controls.appendChild(button);
    }
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
    attachMobileSlideButtons();
    attachDesktopControlButton();
    bindNavigationPause();
  });
})();
