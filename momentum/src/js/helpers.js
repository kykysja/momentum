export const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();

  if ((hours >= 6) & (hours < 12)) return "morning";
  if ((hours >= 12) & (hours < 18)) return "afternoon";
  if ((hours >= 18) & (hours < 24)) return "evening";
  return "night";
};

export const getRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getTimeCodeFromNum = (num) => {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
};

export const setToLocalStorageWrap = (key, value) => {
  let stringifyValue;
  if (typeof value !== "string") {
    stringifyValue = JSON.stringify(value);
  } else {
    stringifyValue = value;
  }
  localStorage.setItem(key, stringifyValue);
};

export const getFromLocalStorageWrap = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
