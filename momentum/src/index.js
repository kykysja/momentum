import { setBackground } from "./js/calendar";
import { getUserNameFromLocalStorage } from "./js/user-name";
import { setUserNameToLocalStorage } from "./js/user-name";
import { handleTimeChanging } from "./js/calendar";

setBackground();

window.addEventListener("load", getUserNameFromLocalStorage);
window.addEventListener("beforeunload", setUserNameToLocalStorage);

handleTimeChanging();
