import { setBackground } from './bg-slider';
import { getFromLocalStorageWrap, setToLocalStorageWrap } from './helpers';
import { translateQuote } from './quotes-widget';
import { getWeather } from './weather';

const footer = document.querySelector('.footer');
const settingsBtn = document.querySelector('.settings-btn');
const overlay = document.querySelector('.overlay');
const weatherContainer = document.querySelector('.weather');
const dateContainer = document.querySelector('.date');
const greetingContainer = document.querySelector('.greeting-container');

const settingsObj = {
  language: ['en', 'ru'],
  photoSource: ['github', 'unsplash', 'flickr'],
  widgets: ['time', 'date', 'greeting', 'quotes', 'weather', 'audio-player'],
  widgetsRu: ['время', 'дата', 'приветствие', 'цитаты', 'погода', 'аудио плеер'],
};

const setCheckedLanguage = (i) => {
  const currentLanguage = localStorage.getItem('app-language');
  if (settingsObj.language[i] === currentLanguage) return 'checked';
};

const createLanguageElemList = () => {
  let languageElemList = '';

  for (let i = 0; i < settingsObj.language.length; i++) {
    const input = `<input class="settings-radio-btn language-radio-btn" type="radio" name="language" ${setCheckedLanguage(
      i,
    )} id="${settingsObj.language[i]}">`;
    const label = `<label class="settings-label" for="${settingsObj.language[i]}">${settingsObj.language[i]}<label>`;

    languageElemList += `<div class="list-item">${input + label}</div>`;
  }
  return languageElemList;
};

const setCheckedWidget = (i) => {
  const currentWidgets = getFromLocalStorageWrap('widgets');
  if (currentWidgets.indexOf(settingsObj.widgets[i]) !== -1) {
    document.querySelector(`#${settingsObj.widgets[i]}-widget`).classList.remove('hidden');
    return 'checked';
  } else {
    document.querySelector(`#${settingsObj.widgets[i]}-widget`).classList.add('hidden');
  }
};

const createWidgetElemList = () => {
  let widgetElemList = '';

  for (let i = 0; i < settingsObj.widgets.length; i++) {
    let widgetName;
    localStorage.getItem('app-language') === 'en'
      ? (widgetName = settingsObj.widgets[i])
      : (widgetName = settingsObj.widgetsRu[i]);
    const input = `<input class="settings-checkbox" type="checkbox" name="widgets" ${setCheckedWidget(
      i,
    )} id="${settingsObj.widgets[i]}">`;
    const label = `<label class="settings-label checkbox-label" for="${settingsObj.widgets[i]}">${widgetName}<label>`;

    widgetElemList += `<div class="list-item">${input + label}</div>`;
  }
  return widgetElemList;
};

const setCheckedPhotoSource = (i) => {
  const currentPhotoSource = localStorage.getItem('photoSource');
  if (settingsObj.photoSource[i] === currentPhotoSource) return 'checked';
};

const createPhotosElemList = () => {
  let elemsList = '';

  for (let i = 0; i < settingsObj.photoSource.length; i++) {
    const input = `<input class="settings-radio-btn photo-source-radio-btn" type="radio" name="photo-source" ${setCheckedPhotoSource(
      i,
    )} id="${settingsObj.photoSource[i]}">`;
    const label = `<label class="settings-label" for="${settingsObj.photoSource[i]}">${settingsObj.photoSource[i]}<label>`;

    elemsList += `<div class="list-item">${input + label}</div>`;
  }
  return elemsList;
};

export const renderSettings = () => {
  const settingsContainer = document.createElement('div');
  settingsContainer.className = 'settings-container';
  settingsContainer.innerHTML = `
    <div class="settings-title language-title"><span>${
      localStorage.getItem('app-language') === 'en' ? 'Language' : 'Язык'
    }</span></div>
    <div class="setting-wrap">
      ${createLanguageElemList()}
    </div>
    <div class="settings-title widgets-title"><span>${
      localStorage.getItem('app-language') === 'en' ? 'Show' : 'Показать'
    }</span></div>
    <div class="setting-wrap widgets-wrap">
      ${createWidgetElemList()}
    </div>
    <div class="settings-title photo-source-title"><span>${
      localStorage.getItem('app-language') === 'en' ? 'Photo source' : 'Источник изображений'
    }</span></div>
    <div class="setting-wrap photo-source-wrap">
      ${createPhotosElemList()}
      <div class="photo-category">
        <input class="photo-category-input" type="text" placeholder="${
          localStorage.getItem('app-language') === 'en' ? '[Enter tag name]' : '[Введите тег]'
        }" value="${
    localStorage.getItem('photoCategory') ? localStorage.getItem('photoCategory') : ''
  }">
      </div>
      </div>
  `;
  footer.appendChild(settingsContainer);

  settingsBtn.addEventListener('click', () => {
    openSettings(settingsContainer);
  });

  overlay.addEventListener('click', () => {
    overlay.classList.add('overlay-hidden');
    settingsContainer.classList.remove('opened');
  });

  const widgetElemList = document.querySelectorAll('.settings-checkbox');
  const photoCategoryInput = document.querySelector('.photo-category-input');
  const radoiLanguageInputs = document.querySelectorAll('.language-radio-btn');
  const radoiPhotoSourceInputs = document.querySelectorAll('.photo-source-radio-btn');

  widgetElemList.forEach((el) => el.addEventListener('change', displayHideWidget));

  radoiLanguageInputs.forEach((input) =>
    input.addEventListener('change', () => {
      handleLanguageChange(photoCategoryInput);
    }),
  );

  photoCategoryInput.addEventListener('change', handlePhotoCategoryInputChange);

  radoiPhotoSourceInputs.forEach((input) =>
    input.addEventListener('change', () => {
      handlePhotoSourceChange(photoCategoryInput);
    }),
  );

  if (localStorage.getItem('photoSource') === 'github') {
    photoCategoryInput.disabled = true;
  } else {
    photoCategoryInput.disabled = false;
  }
};

const openSettings = (settingsContainer) => {
  settingsContainer.classList.toggle('opened');
  overlay.classList.toggle('overlay-hidden');
};

const handleLanguageChange = (photoCategoryInput) => {
  localStorage.setItem('app-language', document.querySelector('.language-radio-btn:checked').id);
  translateQuote();

  const languageTitle = document.querySelector('.language-title');
  const widgetsTitle = document.querySelector('.widgets-title');
  const currentLanguage = localStorage.getItem('app-language');
  const cityInput = document.querySelector('.city');
  const userNameInput = document.querySelector('.user-name');
  const photoSourceTitle = document.querySelector('.photo-source-title');

  languageTitle.textContent = `${currentLanguage === 'en' ? 'Language' : 'Язык'}`;
  widgetsTitle.textContent = `${currentLanguage === 'en' ? 'Show' : 'Показать'}`;
  cityInput.placeholder = `${currentLanguage === 'en' ? '[Enter city]' : '[Введите город]'}`;
  userNameInput.placeholder = `${currentLanguage === 'en' ? '[Enter name]' : '[Введите имя]'}`;
  photoSourceTitle.textContent = `${
    currentLanguage === 'en' ? 'Photo source' : 'Источник изображений'
  }`;
  photoCategoryInput.placeholder = `${
    currentLanguage === 'en' ? '[Enter tag name]' : '[Введите тег]'
  }`;

  for (let i = 0; i < settingsObj.widgets.length; i++) {
    let widgetName;
    currentLanguage === 'en'
      ? (widgetName = settingsObj.widgets[i])
      : (widgetName = settingsObj.widgetsRu[i]);
    document.querySelector(`#${settingsObj.widgets[i]}`).nextElementSibling.textContent =
      widgetName;
  }
  getWeather();
};

const handlePhotoCategoryInputChange = () => {
  setPhotoCategoryToLocalStorage(event.target.value);
  setBackground();
};

const handlePhotoSourceChange = (photoCategoryInput) => {
  setPhotoSourceToLocalStorage();
  setBackground();
  if (event.target.nextElementSibling.textContent === 'github') {
    photoCategoryInput.disabled = true;
  } else {
    photoCategoryInput.disabled = false;
  }
};

export const setBasicLanguageToLocalStorage = () => {
  if (!localStorage.getItem('app-language')) {
    localStorage.setItem('app-language', 'en');
  }
};

export const useLanguageFromLocalStorage = () => {
  document.querySelector(`#${localStorage.getItem('app-language')}`).checked = true;
};

export const setBasicWidgetsToLocalStorage = () => {
  if (!getFromLocalStorageWrap('widgets')) {
    setToLocalStorageWrap('widgets', settingsObj.widgets);
  }
};

export const setWidgetsToLocalStorage = () => {
  let currentWidgetsArr = [];
  const currentWidgets = document.querySelectorAll('.settings-checkbox:checked');

  currentWidgets.forEach((el) => {
    currentWidgetsArr.push(el.id);
  });
  setToLocalStorageWrap('widgets', currentWidgetsArr);
};

export const useWidgetsFromLocalStorage = () => {
  getFromLocalStorageWrap('widgets').forEach((el) => {
    console.log(el);
    document.querySelector(`#${el}`).checked = true;
    document.querySelector(`#${el}-widget`).classList.remove('hidden');
  });
};

export const setBasicPhotoSourceToLocalStorage = () => {
  !localStorage.getItem('photoSource') ? localStorage.setItem('photoSource', 'github') : null;
};

export const setPhotoSourceToLocalStorage = () => {
  localStorage.setItem('photoSource', document.querySelector('.photo-source-radio-btn:checked').id);
};

export const usePhotoSourceFromLocalStorage = () => {
  document.querySelector(`#${localStorage.getItem('photoSource')}`).checked = true;
};

export const setPhotoCategoryToLocalStorage = (category) => {
  localStorage.setItem('photoCategory', category);
};

const displayHideWidget = () => {
  const widgetId = `${event.target.id}-widget`;
  const widgetElem = document.querySelector(`#${widgetId}`);
  event.target.checked === true
    ? widgetElem.classList.remove('hidden')
    : widgetElem.classList.add('hidden');
};
