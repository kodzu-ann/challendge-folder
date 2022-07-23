let month = [
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

let dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let showCurrentDate = document.querySelector("h3");

let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = month[currentDate.getMonth()];
let currentWeekDay = dayOfWeek[currentDate.getDay()];

showCurrentDate.innerHTML = `${currentWeekDay}, ${currentMonth} ${currentDay}`;

let showTime = document.querySelector("#time");

let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();

let currentTime = `${hours} : ${minutes}`;
showTime.innerHTML = `${currentTime}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ` <div class="row g-0">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
     <div class="col-2 week-days">
        ${formatDay(forecastDay.dt)}
        <br />
      
        <span class="material-symbols-sharp icon"> partly_cloudy_day </span>
      <div class="temp">${Math.round(forecastDay.temp.eve)}°C</div>
      </div> 
       
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>  `;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "3f121476484fbe98889e89e05fa05cde";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  getForecast(response.data.coord);
}

function searchByDefault(city) {
  let apiKey = "3f121476484fbe98889e89e05fa05cde";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function searchLocation(position) {
  let apiKey = "3f121476484fbe98889e89e05fa05cde";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-text-input").value;
  searchByDefault(city);
}

searchByDefault("Kyiv");

function getLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getLocation);
