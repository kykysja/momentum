import { showTime } from "./js/calendar";
import { showDate } from "./js/calendar";
import { showGreeting } from "./js/greeting";
import { getUserNameFromLocalStorage } from "./js/greeting";
import { setUserNameToLocalStorage } from "./js/greeting";
import { setBackground } from "./js/bg-slider";

window.addEventListener("load", getUserNameFromLocalStorage);
window.addEventListener("beforeunload", setUserNameToLocalStorage);

const handleTimeChanging = () => {
  showTime();
  showDate();
  showGreeting();

  setTimeout(handleTimeChanging, 1);
};

setBackground();
handleTimeChanging();
