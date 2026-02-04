function openSite() {
  console.log("openSite fired");

  const popup = document.getElementById("popup");
  const main = document.getElementById("main");

  popup.classList.add("hide");

  setTimeout(() => {
    console.log("inside timeout");
    main.classList.add("show");

    startEmojis();
    startTitleAnimation();
  }, 500);
}

function noClick() {
  document.getElementById("noMsg").style.display = "block";
  setTimeout(openSite, 1200);
}

// Happy Birthdayy Emojis Section

let emojiInterval; // control when emojis start

/* Falling Emojis Logic */

const emojis = ["🥰", "💕", "✨", "🌟", "🤗", "🤗"];

function startEmojis() {
  if (!emojiInterval) {
    emojiInterval = setInterval(createEmoji, 400);
  }
}

function createEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.animationDuration = 6 + Math.random() * 4 + "s";

  document.body.appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, 8000);
}

// const birthdayMessage = "Happy Birthday Tisha" + "🎂💖";
// let i = 0;

function startTitleAnimation() {
  const el = document.getElementById("birthdayText");
  const text = "Happy Birthday Tisha ";

  el.innerHTML = "";
  el.style.opacity = "1";

  let i = 0;

  const typing = setInterval(() => {
    el.innerHTML += text.charAt(i);
    i++;

    if (i >= text.length) {
      clearInterval(typing);
      setTimeout(() => {
        document.getElementById("letterIntro").classList.add("show");
      }, 1100);

      // Small delay before emojis appear
      setTimeout(() => {
        el.innerHTML +=
          '<span class="title-emoji">🎂</span> <span class="title-emoji">💖</span>';
      }, 450);
    }
  }, 140);
}

function showEnvelope() {
  document.getElementById("birthdayText").classList.add("corner-title");

  document.getElementById("letterIntro").classList.add("fade-out");

  document.getElementById("envelopeSection").classList.add("show");

  const hero = document.querySelector(".hero");
  if (hero) {
    hero.classList.add("compact");
  }

  const letter = document.getElementById("letter");
  if (letter) {
    setTimeout(() => {
      letter.classList.add("show");
    }, 250);
  }
}

const sequenceBtn = document.getElementById("sequenceBtn");
const memorySequence = document.getElementById("memorySequence");
const memoryModal = document.getElementById("memoryModal");
const memoryModalText = document.getElementById("memoryModalText");
const memoryClose = document.getElementById("memoryClose");

if (sequenceBtn && memorySequence) {
  sequenceBtn.addEventListener("click", () => {
    const letter = document.getElementById("letter");
    const envelopeSection = document.getElementById("envelopeSection");
    const main = document.getElementById("main");
    if (letter) {
      letter.classList.add("fade-out");
    }

    setTimeout(() => {
      memorySequence.classList.add("show");
      memorySequence.setAttribute("aria-hidden", "false");
      if (envelopeSection) {
        envelopeSection.classList.add("show-memory");
      }
      if (main) {
        main.classList.add("memory-mode");
      }
    }, 600);

    sequenceBtn.disabled = true;
    sequenceBtn.textContent = "Moment revealed";
    sequenceBtn.style.display = "none";
  });
}

document.querySelectorAll(".memory-card").forEach((card) => {
  let holdTimer;
  const holdDelay = 450;

  const openCard = () => {
    if (!memoryModal || !memoryModalText) return;
    memoryModalText.textContent = card.dataset.note || "";
    memoryModal.classList.add("show");
    memoryModal.setAttribute("aria-hidden", "false");
  };

  const startHold = () => {
    clearTimeout(holdTimer);
    holdTimer = setTimeout(openCard, holdDelay);
  };

  const cancelHold = () => {
    clearTimeout(holdTimer);
  };

  card.addEventListener("pointerdown", startHold);
  card.addEventListener("pointerup", cancelHold);
  card.addEventListener("pointerleave", cancelHold);
  card.addEventListener("pointercancel", cancelHold);
  card.addEventListener("click", openCard);
});

function closeMemoryModal() {
  if (!memoryModal) return;
  memoryModal.classList.remove("show");
  memoryModal.setAttribute("aria-hidden", "true");
}

if (memoryClose) {
  memoryClose.addEventListener("click", closeMemoryModal);
}

if (memoryModal) {
  memoryModal.addEventListener("click", (event) => {
    if (event.target === memoryModal) {
      closeMemoryModal();
    }
  });
}

// Fallback for older mobile browsers without dvh support
function setDynamicHeight() {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`,
  );
}
window.addEventListener("resize", setDynamicHeight);
setDynamicHeight();
