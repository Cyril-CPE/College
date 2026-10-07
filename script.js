"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

if (yesButton) {
  yesButton.addEventListener("click", handleYesClick);
}

if (noButton) {
  noButton.addEventListener("click", function () {
    if (play) {
      noCount++;
      if (noCount > MAX_IMAGES) {
        play = false;
        buttonsContainer.classList.add("hidden");

        titleElement.innerHTML = `
          AHAHAHAH Its okay, I understand. If you can, can you keep this as a secret sa others😁?  Anyways, its worth the risk, naman so yea You can close this website now. Thank You
          <div id="feedback-container" style="margin-top: 20px;">
            <input type="text" id="user-message-input" placeholder="Leave a message here..." style="padding: 8px 12px; border-radius: 8px; border: 1px solid #ccc; width: 80%; max-width: 300px; font-size: 14px;">
            <button id="send-msg-btn" onclick="sendCustomMessage()" style="padding: 8px 14px; border-radius: 8px; border: none; background-color: #ff4d6d; color: white; cursor: pointer; font-size: 14px; margin-left: 6px;">Send</button>
          </div>
        `;

        sendTelegramNotification("NO 💔");
      } else {
        const imageIndex = Math.min(noCount, MAX_IMAGES);
        changeImage(imageIndex);
        resizeYesButton();
        updateNoButtonText();
      }
    }
  });
}

function handleYesClick() {
  buttonsContainer.classList.add("hidden");

  titleElement.innerHTML = `
    So ano hahaahhah well I just wanna get this off my chest man gud and I dont wanna live with any regrets so yea, No pressure though, I just want to get to know you more and stuff you like😁😁.
    <div id="feedback-container" style="margin-top: 20px;">
      <input type="text" id="user-message-input" placeholder="Leave a message here..." style="padding: 8px 12px; border-radius: 8px; border: 1px solid #ccc; width: 80%; max-width: 300px; font-size: 14px;">
      <button id="send-msg-btn" onclick="sendCustomMessage()" style="padding: 8px 14px; border-radius: 8px; border: none; background-color: #ff4d6d; color: white; cursor: pointer; font-size: 14px; margin-left: 6px;">Send</button>
    </div>
  `;

  changeImage("yes");
  confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  sendTelegramNotification("YES! ❤️");
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
    "Roblox Angelica? HAHAHAHAH",
    "Ay legit? :(",
    "Baka naman ano lang crushback",
    "ummmmmm...",
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

function sendTelegramNotification(responseType) {
  const token = "8870251225:AAGnVA7ty8Y9bgRmVqxCECLf6-MDRS02PRw";
  const chatId = "8239101227";
  const text = encodeURIComponent(`Alert! Angelica just clicked: ${responseType}`);

  fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`);
}

function sendCustomMessage() {
  const inputElement = document.getElementById("user-message-input");
  const sendBtn = document.getElementById("send-msg-btn");
  const userText = inputElement.value.trim();

  if (userText === "") return;

  sendTelegramNotification(`User Message: "${userText}"`);

  inputElement.value = "";
  inputElement.placeholder = "Message sent! Thank you ❤️";
  inputElement.disabled = true;
  sendBtn.disabled = true;
  sendBtn.textContent = "Sent!";
}
/* Utility class to hide stages */
.hidden {
  display: none !important;
}

/* Optional fade-in animation for smooth transition */
.stage {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
