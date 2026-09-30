"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", handleNoClick);
function handleNoClick() {
  noCount++;

  if (noCount >= 6) {
    buttonsContainer.classList.add("hidden");
    titleElement.innerHTML = "AHAHAHAHH Its okay, I understand, You can close this website now";
    changeImage("sad");
  } else {
    resizeYesButton();
    updateNoButtonText();
    changeImage(noCount);
  }
}
});

function handleYesClick() {
  titleElement.innerHTML = "Yayyy HAHAHAHAHAH!! :3";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
  confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "Are you sure?",
    "Pookie please",
    "Don't do this to me :(",
    "You're breaking my heart",
    "Di jk lng, its worth the risk naman...",
   
  ];

  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart-particle");
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 400);
