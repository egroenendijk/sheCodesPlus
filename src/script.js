// Homework week 4 Feature #1

let now = new Date();

let currentDate = document.querySelector(".currentDate");
let currentTime = document.querySelector(".currentTime");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

currentDate.innerHTML = `${day} ${month} ${date}`;
currentTime.innerHTML = `${hours}:${minutes}`;

// Homework week 4 Feature #2
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#search-input");
  cityElement.innerHTML = cityInput.value;

  let apiKey = "ff48e8f1972c30f87339cf84950e7d10";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(weatherCondition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Homework week 5 search engine

function weatherCondition(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;

  let percipitation = document.querySelector("#percipitation");
  percipitation.innerHTML = Math.round(response.data.main.humidity);

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector("#forecast-icon-0");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  let apiKey = "ff48e8f1972c30f87339cf84950e7d10";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(weatherCondition);
}

// Homework week 5 current location

function locatePosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  let apiKey = "ff48e8f1972c30f87339cf84950e7d10";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(weatherCondition);
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locatePosition);
}

let currentButton = document.querySelector(".current-button");
currentButton.addEventListener("click", findLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classlist.remove("active");
  fahrenheitLink.classlist.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classlist.add("active");
  fahrenheitLink.classlist.remove("active");
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// Final project
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row>`;
  forecastHTML =
    forecastHTML +
    `
    <div class="row">
      <div class="col-2">
        <div class="weather-forecast-date">Sun</div>
        <img
        src="http://openweathermap.org/img/wn/01d.png"
        alt=""
        width="50"
        />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">21°</span>
          <span class="weather-forecast-temperature-min">14°</span>
        </div>
      </div>
    </div>
  `;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
