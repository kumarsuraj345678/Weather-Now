const apiKey = "311540a6489cccc2a48785f086b3d254";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const aqiUrl = "https://api.openweathermap.org/data/2.5/air_pollution?";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

// Weather icons mapping
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

// AQI descriptions mapping
const aqiDescriptions = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor"
};

// Format local time
function formatLocalTime(localTime) {
    const options = {
        weekday: "long",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    return localTime.toLocaleString("en-US", options);
}

// Fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found. Please try again.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// Fetch AQI data
async function fetchAQI(lat, lon) {
    try {
        const response = await fetch(`${aqiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Failed to fetch AQI data.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// Update UI with weather and AQI data
function updateUI(data, aqiValue, timezoneOffsetSeconds) {
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp.toFixed(1) + "&deg;C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";
    document.querySelector(".desc").textContent = data.weather[0].description;
    document.querySelector(".feels_like").innerHTML = data.main.feels_like.toFixed(1) + "&deg;C";
    document.querySelector(".aqi-value").textContent = aqiDescriptions[aqiValue];

    const weatherMain = data.weather[0].main.toLowerCase();
    weatherIcon.src = weatherIcons[weatherMain] || "images/starry-night.svg";

    const currentTime = new Date();
    const timezoneOffset = currentTime.getTimezoneOffset() * 60 * 1000;
    const adjustedTime = new Date(
        currentTime.getTime() + timezoneOffset + timezoneOffsetSeconds * 1000
    );

    const formattedTime = formatLocalTime(adjustedTime);
    document.querySelector(".local-time").textContent = `${formattedTime}`;
}

// Check weather and update UI
async function checkWeather(city) {
    try {
        const weatherData = await fetchWeather(city);
        const { coord } = weatherData;
        const aqiData = await fetchAQI(coord.lat, coord.lon);
        const timezoneOffsetSeconds = weatherData.timezone;
        const aqiValue = aqiData.list[0].main.aqi;
        updateUI(weatherData, aqiValue, timezoneOffsetSeconds);
        errorElement.style.display = "none";
        weatherElement.style.display = "block";
    } catch (error) {
        errorElement.textContent = error.message;
        errorElement.style.display = "block";
        weatherElement.style.display = "none";
    }
}

// Event listeners for search button and enter key
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
