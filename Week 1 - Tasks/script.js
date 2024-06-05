const apiKey = "311540a6489cccc2a48785f086b3d254";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

const weatherIcons = {
  thunderstorm: "images/thunderstorms-overcast-rain.svg",
  drizzle: "images/overcast-drizzle.svg",
  rain: "images/overcast-rain.svg",
  snow: "images/overcast-snow.svg",
  mist: "images/mist.svg",
  smoke: "images/overcast-smoke.svg",
  haze: "images/overcast-haze.svg",
  fog: "images/overcast-fog.svg",
  clear: "images/clear-day.svg",
  clouds: "images/overcast.svg",
  dust: "images/dust-wind.svg",
  sand: "images/dust-wind.svg",
  ash: "images/code-yellow.svg",
  squall: "images/hurricane.svg",
  tornado: "images/tornado.svg",
};

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("Oops! City not found. Please try again.");
    }
    const data = await response.json();
    updateWeatherUI(data);
    errorElement.style.display = "none";
    weatherElement.style.display = "block";
  } catch (error) {
    errorElement.textContent = error.message;
    errorElement.style.display = "block";
    weatherElement.style.display = "none";
  }
}

function updateWeatherUI(data) {
  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").innerHTML = data.main.temp.toFixed(1) + "&deg;C";
  document.querySelector(".humidity").textContent = data.main.humidity + "%";
  document.querySelector(".wind").textContent = data.wind.speed + " km/h";
  document.querySelector(".desc").textContent = data.weather[0].description;
  document.querySelector(".feels_like").innerHTML = data.main.feels_like.toFixed(1) + "&deg;C";

  const weatherMain = data.weather[0].main.toLowerCase();
  weatherIcon.src = weatherIcons[weatherMain] || "images/starry-night.svg";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
