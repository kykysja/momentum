import { getFromLocalStorageWrap, setToLocalStorageWrap } from "./helpers";

const footer = document.querySelector(".footer");
const settingsBtn = document.querySelector(".settings-btn");
const overlay = document.querySelector(".overlay");

const settingsObj = {
  language: ["en", "ru"],
  photoSource: ["github"],
  widgets: ["time", "date", "greeting", "quotes", "weather", "audio-player"],
};

const createLanguageElemList = () => {
  let languageElemList = "";

  for (let i = 0; i < settingsObj.language.length; i++) {
    const input = `<input class="settings-radio-btn" type="radio" name="language" id="${settingsObj.language[i]}">`;
    const label = `<label class="settings-label" for="${settingsObj.language[i]}">${settingsObj.language[i]}<label>`;

    languageElemList += `<div class="list-item">${input + label}</div>`;
  }
  return languageElemList;
};

const createWidgetElemList = () => {
  let widgetElemList = "";

  for (let i = 0; i < settingsObj.widgets.length; i++) {
    const input = `<input class="settings-checkbox" type="checkbox" name="widgets" id="${settingsObj.widgets[i]}">`;
    const label = `<label class="settings-label checkbox-label" for="${settingsObj.widgets[i]}">${settingsObj.widgets[i]}<label>`;

    widgetElemList += `<div class="list-item">${input + label}</div>`;
  }
  return widgetElemList;
};

export const setSettings = () => {
  const settingsContainer = document.createElement("div");
  settingsContainer.className = "settings-container";
  settingsContainer.innerHTML = `
    <div class="settings-title"><span>Language</span></div>
    <div class="setting-wrap">
      ${createLanguageElemList()}
    </div>
    <div class="settings-title"><span>Show</span></div>
    <div class="setting-wrap widgets-wrap">
      ${createWidgetElemList()}
    </div>
  `;
  footer.appendChild(settingsContainer);

  const openSettings = () => {
    settingsContainer.classList.toggle("opened");
    overlay.classList.toggle("overlay-hidden");
  };
  settingsBtn.addEventListener("click", openSettings);
  overlay.addEventListener("click", () => {
    overlay.classList.add("overlay-hidden");
    settingsContainer.classList.remove("opened");
  });

  const widgetElemList = document.querySelectorAll(".settings-checkbox");
  widgetElemList.forEach((el) => el.addEventListener("change", displayHideWidget));
};

export const setLanguageToLocalStorage = () => {
  localStorage.getItem("language")
    ? localStorage.setItem("language", document.querySelector(".settings-radio-btn:checked").id)
    : localStorage.setItem("language", "en");
};

export const useLanguageFromLocalStorage = () => {
  document.querySelector(`#${localStorage.getItem("language")}`).checked = true;
};

export const setWidgetsToLocalStorage = () => {
  if (!getFromLocalStorageWrap("widgets")) {
    setToLocalStorageWrap("widgets", settingsObj.widgets);
  } else {
    let currentWidgetsArr = [];
    const currentWidgets = document.querySelectorAll(".settings-checkbox:checked");
    currentWidgets.forEach((el) => {
      currentWidgetsArr.push(el.id);
    });
    setToLocalStorageWrap("widgets", currentWidgetsArr);
  }
};

export const useWidgetsFromLocalStorage = () => {
  getFromLocalStorageWrap("widgets").forEach((el) => {
    document.querySelector(`#${el}`).checked = true;
    document.querySelector(`#${el}-widget`).classList.remove("hidden");
  });
};

const displayHideWidget = () => {
  const widgetId = `${event.target.id}-widget`;
  const widgetElem = document.querySelector(`#${widgetId}`);
  event.target.checked === true
    ? widgetElem.classList.remove("hidden")
    : widgetElem.classList.add("hidden");
};
