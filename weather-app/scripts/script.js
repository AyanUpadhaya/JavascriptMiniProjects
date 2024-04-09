const citynameInput = document.getElementById("citynameInput");
const searchBtn = document.getElementById("searchBtn");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
const weatherElement = document.querySelector(".weather");
const detailsElement = document.querySelector(".details");
const errorMsg = document.querySelector(".error");
const loader = document.querySelector(".loader");

async function fetchWeather(cityName) {
  loader.classList.remove("hidden");
  const apiKey = "7b6f87953d1e271ce027e8c3a3a1ecc9";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (response.status == 200) {
    loader.classList.add("hidden");
    city.innerHTML = data?.name ? data?.name : "City Name";
    temp.innerHTML = data?.main?.temp
      ? Math.round(data?.main?.temp) + "°C"
      : "0°C";
    humidity.innerHTML = data?.main?.humidity
      ? Math.round(data?.main?.humidity) + "%"
      : "0%";
    wind.innerHTML = data?.wind?.speed
      ? Math.round(data?.wind?.speed) + " km/h"
      : "0 km/h";

    if (data.weather[0].main.toLowerCase() == "clouds") {
      weatherIcon.src = "../images/clouds.png";
    }
    if (data.weather[0].main.toLowerCase() == "drizzle") {
      weatherIcon.src = "../images/drizzle.png";
    }
    if (data.weather[0].main.toLowerCase() == "rain") {
      weatherIcon.src = "../images/rain.png";
    }
    if (data.weather[0].main.toLowerCase() == "thunderstorm") {
      weatherIcon.src = "../images/rain.png";
    }
    if (data.weather[0].main.toLowerCase() == "clear") {
      weatherIcon.src = "../images/clear.png";
    }
    if (data.weather[0].main.toLowerCase() == "mist") {
      weatherIcon.src = "../images/mist.png";
    }

    weatherElement.classList.remove("hidden");
    detailsElement.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }
  if (response.status == 404) {
    weatherElement.classList.add("hidden");
    detailsElement.classList.add("hidden");
    errorMsg.classList.remove("hidden");
    loader.classList.add("hidden");
  }
}

searchBtn.addEventListener("click", function () {
  fetchWeather(citynameInput.value);
});
