const userNameInput = document.querySelector(".user-name");

export const setUserNameToLocalStorage = () => {
  localStorage.setItem("user-name", userNameInput.value);
};

export const getUserNameFromLocalStorage = () => {
  if (localStorage.getItem("user-name")) {
    userNameInput.value = localStorage.getItem("user-name");
  }
};
