const apiKey = "311540a6489cccc2a48785f086b3d254";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      data.main.temp.toFixed(1) + "&deg;C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".desc").textContent = data.weather[0].description;
    document.querySelector(".feels_like").innerHTML =
      data.main.feels_like.toFixed(1) + "&deg;C";

    if (data.weather[0].main == "Thunderstorm") {
      weatherIcon.src = "images/thunderstorms.svg";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.svg";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.svg";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.svg";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.svg";
    } else if (data.weather[0].main == "Smoke") {
      weatherIcon.src = "images/smoke.svg";
    } else if (data.weather[0].main == "Haze") {
      weatherIcon.src = "images/haze.svg";
    } else if (data.weather[0].main == "Fog") {
      weatherIcon.src = "images/fog.svg";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear-day.svg";
    } else if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/cloudy.svg";
    } else if (data.weather[0].main == "night") {
      weatherIcon.src = "images/clear-night.svg";
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
