import { setBackground } from "./bg-slider";
import { showDate } from "./calendar";
import { getFromLocalStorageWrap, setToLocalStorageWrap } from "./helpers";
import { getLinkToImage } from "./image-api";
import { translateQuote } from "./quotes-widget";
import { getWeather } from "./weather";

const footer = document.querySelector(".footer");
const settingsBtn = document.querySelector(".settings-btn");
const overlay = document.querySelector(".overlay");
const weatherContainer = document.querySelector(".weather");
const dateContainer = document.querySelector(".date");
const greetingContainer = document.querySelector(".greeting-container");

const settingsObj = {
  language: ["en", "ru"],
  photoSource: ["github", "unsplash"],
  widgets: [
    { en: "time", ru: "время" },
    { en: "date", ru: "дата" },
    { en: "greeting", ru: "приветствие" },
    { en: "quotes", ru: "цитаты" },
    { en: "weather", ru: "погода" },
    { en: "audio-player", ru: "аудио плеер" },
  ],
};

const createLanguageElemList = () => {
  let languageElemList = "";

  for (let i = 0; i < settingsObj.language.length; i++) {
    const input = `<input class="settings-radio-btn language-radio-btn" type="radio" name="language" id="${settingsObj.language[i]}">`;
    const label = `<label class="settings-label" for="${settingsObj.language[i]}">${settingsObj.language[i]}<label>`;

    languageElemList += `<div class="list-item">${input + label}</div>`;
  }
  return languageElemList;
};

const createWidgetElemList = () => {
  let widgetElemList = "";

  for (let i = 0; i < settingsObj.widgets.length; i++) {
    let widgetName;
    localStorage.getItem("language") === "en"
      ? (widgetName = settingsObj.widgets[i].en)
      : (widgetName = settingsObj.widgets[i].ru);
    const input = `<input class="settings-checkbox" type="checkbox" name="widgets" id="${settingsObj.widgets[i].en}">`;
    const label = `<label class="settings-label checkbox-label" for="${settingsObj.widgets[i].en}">${widgetName}<label>`;

    widgetElemList += `<div class="list-item">${input + label}</div>`;
  }
  return widgetElemList;
};

const createPhotosElemList = () => {
  let elemsList = "";

  for (let i = 0; i < settingsObj.photoSource.length; i++) {
    const input = `<input class="settings-radio-btn photo-source-radio-btn" type="radio" name="photo-source" id="${settingsObj.photoSource[i]}">`;
    const label = `<label class="settings-label" for="${settingsObj.photoSource[i]}">${settingsObj.photoSource[i]}<label>`;

    elemsList += `<div class="list-item">${input + label}</div>`;
  }
  return elemsList;
};

export const setSettings = () => {
  const settingsContainer = document.createElement("div");
  settingsContainer.className = "settings-container";
  settingsContainer.innerHTML = `
    <div class="settings-title language-title"><span>${
      localStorage.getItem("language") === "en" ? "Language" : "Язык"
    }</span></div>
    <div class="setting-wrap">
      ${createLanguageElemList()}
    </div>
    <div class="settings-title widgets-title"><span>${
      localStorage.getItem("language") === "en" ? "Show" : "Показать"
    }</span></div>
    <div class="setting-wrap widgets-wrap">
      ${createWidgetElemList()}
    </div>
    <div class="settings-title photo-source-title"><span>${
      localStorage.getItem("language") === "en" ? "Photo source" : "Источник изображений"
    }</span></div>
    <div class="setting-wrap photo-source-wrap">
      ${createPhotosElemList()}
      <div class="photo-category">
        <input class="photo-category-input" type="text" disabled placeholder="${
          localStorage.getItem("language") === "en" ? "[Enter tag name]" : "[Введите тег]"
        }">
      </div>
      </div>
    <button class="change-photo-btn" disabled>${
      localStorage.getItem("language") === "en" ? "Change photo" : "Изменить изображение"
    }</button>
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

  const addAnimation = () => {
    weatherContainer.classList.remove("hidden");
    dateContainer.classList.remove("hidden");
    greetingContainer.classList.remove("hidden");
  };

  const photoCategoryInput = document.querySelector(".photo-category-input");
  const changePhotoBtn = document.querySelector(".change-photo-btn");

  const handleLanguageChange = () => {
    setLanguageToLocalStorage();
    translateQuote();

    weatherContainer.classList.add("hidden");
    dateContainer.classList.add("hidden");
    greetingContainer.classList.add("hidden");

    const languageTitle = document.querySelector(".language-title");
    const widgetsTitle = document.querySelector(".widgets-title");
    const currentLanguage = localStorage.getItem("language");
    const cityInput = document.querySelector(".city");
    const userNameInput = document.querySelector(".user-name");

    languageTitle.textContent = `${currentLanguage === "en" ? "Language" : "Язык"}`;
    widgetsTitle.textContent = `${currentLanguage === "en" ? "Show" : "Показать"}`;
    cityInput.placeholder = `${currentLanguage === "en" ? "[Enter city]" : "[Введите город]"}`;
    userNameInput.placeholder = `${currentLanguage === "en" ? "[Enter name]" : "[Введите имя]"}`;
    photoCategoryInput.placeholder = `${
      currentLanguage === "en" ? "[Enter tag name]" : "[Введите тег]"
    }`;
    changePhotoBtn.textContent = `${
      currentLanguage === "en" ? "Change photo" : "Изменить изображение"
    }`;

    for (let i = 0; i < settingsObj.widgets.length; i++) {
      let widgetName;
      currentLanguage === "en"
        ? (widgetName = settingsObj.widgets[i].en)
        : (widgetName = settingsObj.widgets[i].ru);
      document.querySelector(`#${settingsObj.widgets[i].en}`).nextElementSibling.textContent =
        widgetName;
    }

    setTimeout(() => {
      getWeather();
      addAnimation();
    }, 300);
  };

  const handlePhotoCategoryInputChange = () => {
    setPhotoCategoryToLocalStorage(event.target.value);
  };

  const changePhoto = () => {
    getLinkToImage(localStorage.getItem("photoCategory"));
  };

  const handlePhotoSourceChange = () => {
    console.log(event.target.nextElementSibling.textContent);
    if (event.target.nextElementSibling.textContent === "github") {
      photoCategoryInput.disabled = true;
      changePhotoBtn.disabled = true;
      setPhotoSourceToLocalStorage();
      setBackground();
    } else {
      photoCategoryInput.disabled = false;
      changePhotoBtn.disabled = false;
      setPhotoSourceToLocalStorage();
      getLinkToImage();
    }
  };

  const radoiLanguageInputs = document.querySelectorAll(".language-radio-btn");
  radoiLanguageInputs.forEach((input) => input.addEventListener("change", handleLanguageChange));
  photoCategoryInput.addEventListener("change", handlePhotoCategoryInputChange);
  changePhotoBtn.addEventListener("click", changePhoto);
  const radoiPhotoSourceInputs = document.querySelectorAll(".photo-source-radio-btn");
  radoiPhotoSourceInputs.forEach((input) =>
    input.addEventListener("change", handlePhotoSourceChange),
  );
};

export const setLanguageToLocalStorage = () => {
  localStorage.getItem("language")
    ? localStorage.setItem("language", document.querySelector(".language-radio-btn:checked").id)
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

export const setPhotoSourceToLocalStorage = () => {
  localStorage.getItem("photoSource")
    ? localStorage.setItem(
        "photoSource",
        document.querySelector(".photo-source-radio-btn:checked").id,
      )
    : localStorage.setItem("photoSource", "github");
};

export const usePhotoSourceFromLocalStorage = () => {
  document.querySelector(`#${localStorage.getItem("photoSource")}`).checked = true;
};

export const setPhotoCategoryToLocalStorage = (category = nature) => {
  localStorage.setItem("photoCategory", category);
};

const displayHideWidget = () => {
  const widgetId = `${event.target.id}-widget`;
  const widgetElem = document.querySelector(`#${widgetId}`);
  event.target.checked === true
    ? widgetElem.classList.remove("hidden")
    : widgetElem.classList.add("hidden");
};
