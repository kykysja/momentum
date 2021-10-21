const body = document.body;

const timeContainer = document.querySelector(".time");
const dateContainer = document.querySelector(".date");
const greetingContainer = document.querySelector(".greeting");

export const handleTimeChanging = () => {
  showTime();
  showDate();
  showGreeting();

  setTimeout(handleTimeChanging, 1);
};

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeContainer.textContent = `${currentTime}`;
};

const showDate = () => {
  const date = new Date();
  const options = {
    month: "long",
    weekday: "long",
    day: "numeric",
  };
  const currentDate = date.toLocaleDateString("en-Br", options);
  dateContainer.textContent = `${currentDate}`;
};

export const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();

  if ((hours >= 6) & (hours < 12)) return "morning";
  if ((hours >= 12) & (hours < 18)) return "day";
  if ((hours >= 18) & (hours < 24)) return "evening";
  return "night";
};

const showGreeting = () => {
  const date = new Date();
  const timeOfDay = getTimeOfDay(date);
  greetingContainer.textContent = `Good ${timeOfDay}`;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const setBackground = () => {
  const randomInt = getRandomInt(0, 20);
  const randomIntToString = String(randomInt).padStart(2, 0);
  const backgroundUrl = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${randomIntToString}.jpg')`;

  body.style.backgroundImage = backgroundUrl;
};
