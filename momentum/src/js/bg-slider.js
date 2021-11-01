import { getTimeOfDay } from "./helpers";
import { getRandomNum } from "./helpers";

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
  } else {
    getLinkToImage();
  }
};

const getLinkToImage = async () => {
  const category = localStorage.getItem("photoCategory");
  let url;
  localStorage.getItem("photoSource") === "unsplash"
    ? (url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${
        category ? category : "nature"
      }&client_id=fGlV0HC45V7V87jE1wKsTowzFiC9xI6nSVz7F9ll-EY`)
    : (url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=735d81808a1a2dd67820e1996584b99f&tags=${
        category ? category : "nature"
      }&extras=url_l&per_page=50&format=json&nojsoncallback=1`);
  const res = await fetch(url);
  const data = await res.json();

  img.src =
    localStorage.getItem("photoSource") === "unsplash"
      ? data.urls.regular
      : data.photos.photo[getRandomNum(0, 49)].url_l;

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
