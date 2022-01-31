let now = new Date();

function showCurrentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Juny",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dayNumber = date.getDate();

  let currentDate = document.querySelector(".date");
  currentDate.innerHTML = `${day}, ${month} ${dayNumber}`;
  return currentDate;
}
showCurrentDate(now);

function getCurrentTime() {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let currentTime = document.querySelector(".time");
  currentTime.innerHTML = `${hour}:${minute}`;
  return currentTime;
}
getCurrentTime(now);

function showWeatherConditions(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("h1").innerHTML = response.data.name;
}

function showCity(inputCity) {
  let apiKey = "5c65b0445be84c47d8d9f65d36c11cc2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherConditions);
}
function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city").value;
  showCity(inputCity);
}

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5c65b0445be84c47d8d9f65d36c11cc2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let formCitySearch = document.querySelector("#city-search");
formCitySearch.addEventListener("submit", handleSubmit);

let currentSearch = document.querySelector("#current-position");
currentSearch.addEventListener("submit", getCurrentCity);

showCity("London");

function getFahrenheit() {
  let temperature = document.querySelector("#current-temp");
  let cTemp = temperature.innerHTML;
  cTemp = Number(cTemp);
  temperature.innerHTML = Math.round((cTemp * 9) / 5 + 32);
}
let fahrenheitUnit = document.querySelector("#fahrenheit-unit");
fahrenheitUnit.addEventListener("click", getFahrenheit);

function getCelsius() {
  let fahrenheit = document.querySelector("#current-temp");
  let fTemp = fahrenheit.innerHTML;
  fTemp = Number(fTemp);
  fahrenheit.innerHTML = Math.round(((fTemp - 32) * 5) / 9);
}
let celsiusUnit = document.querySelector("#celsius-unit");
celsiusUnit.addEventListener("click", getCelsius);
