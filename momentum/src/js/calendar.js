const timeContainer = document.querySelector(".time");
const dateContainer = document.querySelector(".date");
const greetingContainer = document.querySelector(".greeting");

export const handleTimeChanging = () => {
  const date = new Date();

  showTime(date);
  showDate(date);
  showGreeting(date);

  setTimeout(handleTimeChanging, 1);
};

const showTime = (date) => {
  const currentTime = date.toLocaleTimeString();
  timeContainer.textContent = `${currentTime}`;
};

const showDate = (date) => {
  const options = {
    month: "long",
    weekday: "long",
    day: "numeric",
  };
  const currentDate = date.toLocaleDateString("en-Br", options);
  dateContainer.textContent = `${currentDate}`;
};

const getTimeOfDay = (date) => {
  const hours = date.getHours();

  if ((hours >= 6) & (hours < 12)) return "morning";
  if ((hours >= 12) & (hours < 18)) return "day";
  if ((hours >= 18) & (hours < 24)) return "evening";
  return "night";
};

const showGreeting = (date) => {
  const timeOfDay = getTimeOfDay(date);
  greetingContainer.textContent = `Good ${timeOfDay}`;
};
