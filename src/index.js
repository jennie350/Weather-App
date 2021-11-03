let now = new Date();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[now.getDay()];
let currentDay = document.querySelector("#day");
let time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
currentDay.innerHTML = `${day} ${time}`;

function showWeather(response) {
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".current-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("h1").innerHTML = response.data.name;
}

function submitSearch(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search-input").value;
  let apiKey = `e26555d3812486da4794499d94833f23`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", submitSearch);

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e26555d3812486da4794499d94833f23&units=metric`;
  axios.get(apiURL).then(showWeather);
}
function currentLocationSearch() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocationButton = document.querySelector(".location-button");
currentLocationButton.addEventListener("click", currentLocationSearch);

function fahrenheitTemp() {
  let currentTemp = document.querySelector(".temp");

  let convertedTempC = (currentTemp - 32) / 1.8;

  currentTemp.innerHTML = convertedTempC;
}
