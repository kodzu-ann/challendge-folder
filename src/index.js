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

let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);

let celsius = document.querySelector("#celsius-temperature");

let farenheit = document.querySelector("#fahrenheit-temperature");

function showCelsius(event) {
  event.preventDefault();

  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = `21`;
}

celsius.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();

  let currentTemperature = document.querySelector("#currentTemperature");

  currentTemperature.innerHTML = `66`;
}
farenheit.addEventListener("click", showFahrenheit);

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
