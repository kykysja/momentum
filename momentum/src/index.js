import { showTime } from "./js/calendar";
import { showDate } from "./js/calendar";
import { showGreeting } from "./js/greeting";
import { useUserNameFromLocalStorage } from "./js/greeting";
import { setUserNameToLocalStorage } from "./js/greeting";
import { useCityFromLocalStorage } from "./js/weather";
import { setCityToLocalStorage } from "./js/weather";
import { setBackground } from "./js/bg-slider";
import { getWeather } from "./js/weather";
import { getQuote } from "./js/quotes-widget";
import { setAudioPlayer } from "./js/audio-player";
import {
  setLanguageToLocalStorage,
  setPhotoSourceToLocalStorage,
  setSettings,
  setWidgetsToLocalStorage,
  useLanguageFromLocalStorage,
  usePhotoSourceFromLocalStorage,
  useWidgetsFromLocalStorage,
} from "./js/settings";

const setDataToLocalStorage = () => {
  setUserNameToLocalStorage();
  setCityToLocalStorage();
  setLanguageToLocalStorage();
  setWidgetsToLocalStorage();
  setPhotoSourceToLocalStorage();
};

const getDataFromLocalStorage = () => {
  useUserNameFromLocalStorage();
  useCityFromLocalStorage();
  useLanguageFromLocalStorage();
  useWidgetsFromLocalStorage();
  usePhotoSourceFromLocalStorage();
};

const handleWindowLoad = () => {
  setSettings();
  getDataFromLocalStorage();
  getWeather();
  setBackground();
  getQuote();
  setAudioPlayer();
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
