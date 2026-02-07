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

// const birthdayMessage = "Happy Birthday Chotu" + "🎂💖";
// let i = 0;

function startTitleAnimation() {
  const el = document.getElementById("birthdayText");
  const text = "Happy Birthday Chotu ";

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
  const scrollY = window.scrollY || window.pageYOffset;
  document.body.dataset.scrollY = String(scrollY);
  document.documentElement.classList.add("lock-scroll");
  document.body.classList.add("lock-scroll");
  document.body.style.top = `-${scrollY}px`;

  const hero = document.querySelector(".hero");
  if (hero) {
    hero.classList.add("compact");
  }

  const letter = document.getElementById("sweetLetter");
  if (letter) {
    setTimeout(() => {
      letter.classList.add("show");
    }, 250);
  }
}


const sweetCover = document.getElementById("sweetCover");
const sweetClickHere = document.querySelector(".sweet-clickHere");
const sweetLetterSheet = document.getElementById("sweetLetterSheet");
const sweetLetter = document.getElementById("sweetLetter");
const sweetShadowLetter = document.getElementById("sweetShadowLetter");
const sweetEnvelope = document.querySelector(".sweet-envelope");

function openSweetLetter() {
  if (!sweetCover || !sweetLetterSheet || !sweetLetter) return;
  sweetCover.classList.add("open");
  setTimeout(() => {
    sweetLetterSheet.style.zIndex = "2";
    if (sweetClickHere) {
      sweetClickHere.style.display = "none";
    }
    sweetLetter.style.animationIterationCount = "1";
    if (sweetShadowLetter) {
      sweetShadowLetter.style.animationIterationCount = "1";
    }
    sweetLetterSheet.classList.add("zoomIn");
  }, 1500);
}

if (sweetEnvelope) {
  sweetEnvelope.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openSweetLetter();
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

