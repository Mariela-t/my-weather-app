function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();

  if (hours < 10) {
    hour = `0${hours}`;
  }
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function showForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
        <div class="forecast-day">${day}</div>
                <img
                  src="https://openweathermap.org/img/wn/01n@2x.png"
                  alt=""
                  width="42"
                />
          <div class="forecast-temp">
              <span class="forecast-temp-max"> 18 </span> |
              <span class="forecast-temp-min">12</span>
        </div>
      </div>
            `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9f89053bd4f1be266f217aa66c188ea7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#current-temp").innerHTML = celsiusTemperature;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-day").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "9f89053bd4f1be266f217aa66c188ea7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search").value;
  search(cityInput);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", enterCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

search("New York");
showForecast();
