import { getTimeOfDay } from "./helpers";
import { getRandomNum } from "./helpers";
import { getLinkToImage } from "./image-api";

const body = document.body;
const slideNextBtn = document.querySelector(".slide-next");
const slidePrevBtn = document.querySelector(".slide-prev");

const img = new Image();

let randomNum = getRandomNum(1, 20);

export const setBackground = () => {
  const photoSource = localStorage.getItem("photoSource");
  if (photoSource === "github") {
    const randomNumToString = String(randomNum).padStart(2, 0);
    let currentTimeOfDay = getTimeOfDay();

    if (currentTimeOfDay === "утро") currentTimeOfDay = "morning";
    if (currentTimeOfDay === "день") currentTimeOfDay = "afternoon";
    if (currentTimeOfDay === "вечер") currentTimeOfDay = "evening";
    if (currentTimeOfDay === "ночи") currentTimeOfDay = "night";

    img.src = `https://raw.githubusercontent.com/kykysja/stage1-tasks/assets/images/${currentTimeOfDay}/${randomNumToString}.jpg`;
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
    };
  } else if (photoSource === "unsplash") {
    getLinkToImage();
  }
};

const showSlideNext = () => {
  randomNum < 20 ? (randomNum += 1) : (randomNum = 1);
  setBackground();
};

const showSlidePrev = () => {
  randomNum > 1 ? (randomNum -= 1) : (randomNum = 20);
  setBackground();
};

slideNextBtn.addEventListener("click", showSlideNext);
slidePrevBtn.addEventListener("click", showSlidePrev);
