import { getTimeOfDay } from "./helpers";

const greetingContainer = document.querySelector(".greeting");
const userNameInput = document.querySelector(".user-name");

export const showGreeting = () => {
  const date = new Date();
  const timeOfDay = getTimeOfDay(date);
  let greeting;
  if (timeOfDay === "утро") {
    greeting = "Доброе";
  } else if (timeOfDay === "день" || timeOfDay === "вечер") {
    greeting = "Добрый";
  } else if (timeOfDay === "ночи") {
    greeting = "Доброй";
  } else {
    greeting = "Good";
  }

  greetingContainer.textContent = `${greeting} ${timeOfDay}`;

  const userNameInput = document.querySelector(".user-name");
  userNameInput.placeholder = `${
    localStorage.getItem("language") === "en" ? "[Enter name]" : "[Введите имя]"
  }`;
};

export const setUserNameToLocalStorage = () => {
  localStorage.setItem("user-name", userNameInput.value);
};

export const useUserNameFromLocalStorage = () => {
  userNameInput.value = localStorage.getItem("user-name");
};
