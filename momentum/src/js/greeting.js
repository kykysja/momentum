import { getTimeOfDay } from "./helpers";

const greetingContainer = document.querySelector(".greeting");
const userNameInput = document.querySelector(".user-name");

export const showGreeting = () => {
  const date = new Date();
  const timeOfDay = getTimeOfDay(date);
  greetingContainer.textContent = `Good ${timeOfDay}`;
};

export const setUserNameToLocalStorage = () => {
  localStorage.setItem("user-name", userNameInput.value);
};

export const useUserNameFromLocalStorage = () => {
  userNameInput.value = localStorage.getItem("user-name");
};
