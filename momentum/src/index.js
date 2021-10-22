import { showTime } from "./js/calendar";
import { showDate } from "./js/calendar";
import { showGreeting } from "./js/greeting";
import { getUserNameFromLocalStorage } from "./js/greeting";
import { setUserNameToLocalStorage } from "./js/greeting";
import { getCityFromLocalStorage } from "./js/weather";
import { setCityToLocalStorage } from "./js/weather";
import { setBackground } from "./js/bg-slider";
import { getWeather } from "./js/weather";
import { getQuote } from "./js/quotes-widget";
import { playAudio } from "./js/audio-player";

const getDataFromLocalStorage = () => {
  getUserNameFromLocalStorage();
  getCityFromLocalStorage();
};
const setDataToLocalStorage = () => {
  setUserNameToLocalStorage();
  setCityToLocalStorage();
};

const handleWindowLoad = () => {
  getDataFromLocalStorage();
  getWeather();
  setBackground();
  getQuote();
  handleTimeChanging();
};

window.addEventListener("load", handleWindowLoad);
window.addEventListener("beforeunload", setDataToLocalStorage);

const handleTimeChanging = () => {
  showTime();
  showDate();
  showGreeting();
  setTimeout(handleTimeChanging, 1);
};

const playBtn = document.querySelector(".play");
playBtn.addEventListener("click", playAudio);
