const cityInput = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

export async function getWeather() {
  weatherIcon.className = "weather-icon owf";

  if (cityInput.value) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=en&appid=026c2fee3b41cefa7680ac5c131b232d&units=metric`;
    const res = await fetch(url);

    if (res.status === 200) {
      const data = await res.json();
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
    } else if (res.status === 404) {
      temperature.textContent = "City not found";
      weatherDescription.textContent = "";
      wind.textContent = "";
      humidity.textContent = "";
    }
  } else {
    temperature.textContent = "Nothing to geocode for";
    weatherDescription.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
  }
}

export const setCityToLocalStorage = () => {
  localStorage.setItem("city", cityInput.value);
};

export const useCityFromLocalStorage = () => {
  if (localStorage.getItem("city")) {
    cityInput.value = localStorage.getItem("city");
  } else {
    cityInput.value = "Minsk";
  }
};

cityInput.addEventListener("change", getWeather);
