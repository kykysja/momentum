const cityInput = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

export async function getWeather() {
  weatherIcon.className = "weather-icon owf";

  const currentLanguage = localStorage.getItem("app-language");
  const currentCity = localStorage.getItem("city-weather");
  cityInput.value = currentCity;

  if (currentCity) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&lang=${currentLanguage}&appid=026c2fee3b41cefa7680ac5c131b232d&units=metric`;
    const res = await fetch(url);

    if (res.status === 200) {
      const data = await res.json();
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;

      wind.textContent = `${
        currentLanguage === "en" ? "Wind speed" : "Скорость ветра"
      }: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `${currentLanguage === "en" ? "Humidity" : "Влажность"}: ${Math.round(
        data.main.humidity,
      )}%`;
    } else if (res.status === 404) {
      temperature.textContent = `${
        currentLanguage === "en" ? "City not found" : "Город не найден"
      }`;
      weatherDescription.textContent = "";
      wind.textContent = "";
      humidity.textContent = "";
    }
  } else {
    temperature.textContent = `${
      currentLanguage === "en" ? "Nothing to geocode for" : "Нечего геокодировать"
    }`;
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
  }

  cityInput.placeholder = `${currentLanguage === "en" ? "[Enter city]" : "[Введите город]"}`;
}

export const setBasicCityToLocalStorage = () => {
  if (!localStorage.getItem("city-weather")) {
    localStorage.setItem("city-weather", "Minsk");
  }
};

export const setCityToLocalStorage = () => {
  localStorage.setItem("city-weather", cityInput.value);
};

export const useCityFromLocalStorage = () => {
  if (localStorage.getItem("city-weather")) {
    cityInput.value = localStorage.getItem("city-weather");
  } else {
    cityInput.value = "Minsk";
  }
};

cityInput.addEventListener("change", () => {
  setCityToLocalStorage();
  getWeather();
});
