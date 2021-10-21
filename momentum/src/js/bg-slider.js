import { getTimeOfDay } from "./helpers";
import { getRandomNum } from "./helpers";

const body = document.body;
const slideNextBtn = document.querySelector(".slide-next");
const slidePrevBtn = document.querySelector(".slide-prev");

let randomNum = getRandomNum(0, 20);

export const setBackground = () => {
  const randomNumToString = String(randomNum).padStart(2, 0);

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNumToString}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
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
