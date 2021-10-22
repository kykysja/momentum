import sounds from "../assets/sounds/sounds";

const playListContainer = document.querySelector(".play-list");
const playBtn = document.querySelector(".play");
const playNextBtn = document.querySelector(".play-next");
const playprevBtn = document.querySelector(".play-prev");

const audio = new Audio();

let currentAudioNum = 0;
let isPlay = false;

for (let i = 0; i < sounds.length; i++) {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = sounds[i].title;
  playListContainer.append(li);
}

export function playAudio() {
  audio.src = sounds[currentAudioNum].src;
  audio.currentTime = 0;
  event.target.classList.toggle("pause");

  const playListItems = document.querySelectorAll(".play-item");
  playListItems.forEach((item) => item.classList.remove("item-active"));
  playListItems[currentAudioNum].classList.add("item-active");

  if (isPlay) {
    audio.pause();
    isPlay = false;
  } else {
    audio.play();
    isPlay = true;
  }
}

const handleNextPrevAudioButtonsClick = () => {
  isPlay ? (isPlay = false) : playBtn.classList.toggle("pause");

  if (event.target.classList.contains("play-next")) {
    currentAudioNum < 3 ? currentAudioNum++ : (currentAudioNum = 0);
  } else {
    currentAudioNum > 0 ? currentAudioNum-- : (currentAudioNum = 3);
  }
  playAudio();
};

playNextBtn.addEventListener("click", handleNextPrevAudioButtonsClick);
playprevBtn.addEventListener("click", handleNextPrevAudioButtonsClick);
