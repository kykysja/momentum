import { showTime } from "./js/calendar";
import { showDate } from "./js/calendar";
import { showGreeting, showUserName } from "./js/greeting";
import { setUserNameToLocalStorage } from "./js/greeting";
import { setBasicCityToLocalStorage } from "./js/weather";
import { setBackground } from "./js/bg-slider";
import { getWeather } from "./js/weather";
import { getQuote } from "./js/quotes-widget";
import { setAudioPlayer } from "./js/audio-player";
import {
  setBasicLanguageToLocalStorage,
  setBasicPhotoSourceToLocalStorage,
  renderSettings,
  setBasicWidgetsToLocalStorage,
  setWidgetsToLocalStorage,
} from "./js/settings";

const setDataToLocalStorage = () => {
  setUserNameToLocalStorage();
  setWidgetsToLocalStorage();
};

const handleWindowLoad = () => {
  setBasicLanguageToLocalStorage();
  showUserName();
  setBasicCityToLocalStorage();
  setBasicWidgetsToLocalStorage();
  setBasicPhotoSourceToLocalStorage();
  setAudioPlayer();
  setBackground();
  getWeather();
  getQuote();
  renderSettings();
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
