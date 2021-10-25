const timeContainer = document.querySelector(".time");
const dateContainer = document.querySelector(".date");

export const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeContainer.textContent = `${currentTime}`;
};

export const showDate = () => {
  const date = new Date();
  const options = {
    month: "long",
    weekday: "long",
    day: "numeric",
  };
  const currentLanguage = localStorage.getItem("language");
  const currentDate =
    currentLanguage === "en"
      ? date.toLocaleDateString("en-Br", options)
      : date.toLocaleDateString("ru", options);
  dateContainer.textContent = `${currentDate}`;
};
