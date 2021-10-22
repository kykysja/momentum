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
