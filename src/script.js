function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let h1 = document.querySelector("h1");  

  let apiKey = "17a3051593bacf7917fd288879592ec0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherObject => {
    setWeatherData(city, weatherObject);
  }).catch(error => {
    failedApiCall(error);
  });
}


function setWeatherData(city, weatherObject) {
  let weatherData = weatherObject.data;
  changeName(city);
  changeTemp(weatherData);
  changeDay(weatherData);
  changeNight(weatherData);
}

function changeName(city) {
  let h1 = document.querySelector("h1");  
  h1.innerHTML = `${city}`;
}

function changeTemp(weatherData) {
  let temp = weatherData.main.temp;
  let tempHeader = document.querySelector("#temperature");
  tempHeader.innerHTML = `${Math.round(temp)}`;
}

function changeDay (weatherData) {
  document.querySelector("#temp").innerHTML = `Temperature: ${Math.round(
    weatherData.main.temp
  )} °C`;
  document.querySelector(
    "#temp-feel"
  ).innerHTML = `Feel temperature: ${Math.round(
    weatherData.main.feels_like
  )} °C`;

  document.querySelector(
    "#day-hum"
  ).innerHTML = `Humidity: ${weatherData.main.humidity} %`;
  document.querySelector("#day-wind").innerHTML = `Wind: ${Math.round(
    weatherData.wind.speed
  )} km/h `;
  document.querySelector(
    "#day-desc"
  ).innerHTML = `Sky: ${weatherData.weather[0].main}`; 
}

function changeNight (weatherData) {

}


function failedApiCall(error) {
  let h1 = document.querySelector("h1"); 
  h1.innerHTML = `Not found`;
  alert("Please type a city");
}


function searchLocation(position) {
  let apiKey = "17a3051593bacf7917fd288879592ec0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(renameCurrentCity);
}

function renameCurrentCity (weatherData) {
let city = weatherData.data.name;
setWeatherData(city, weatherData); }

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


function renameCel(event) {
  event.preventDefault();
  let celsium = document.querySelector("#celsium");
  let farenheit = document.querySelector("#farenheit");
  let temperature = document.querySelector("#temperature");
  let temperatureValue = document.querySelector("#temperature.value");
  let celTemperature = Math.round((temperatureValue-32)/1.8);

  celsium.innerHTML = "<b>°C";
  farenheit.innerHTML = "°F";
  temperature.innerHTML = celTemperature;
 }

function renameFar(event) {
  event.preventDefault();
  let farenheit = document.querySelector("#farenheit");
  let celsium = document.querySelector("#celsium");
  let temperatureValue = document.querySelector("#temperature.value");
  let temperature = document.querySelector("#temperature");
  let farTemperature = Math.round((temperatureValue * 1.8) + 32);
  
  farenheit.innerHTML = "<b> °F";
  celsium.innerHTML = "°C";
  temperature.innerHTML = farTemperature;
  }



let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "Jun",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dates = document.querySelector("#dates");
dates.innerHTML = `${date}. ${month} ${year}`;
let time = document.querySelector("#time");
time.innerHTML = `${hour}:${minutes}`;



let form = document.querySelector("#search-form");
form.addEventListener("submit", search);


let currentLocationButton = document.querySelector("#current-position");
currentLocationButton.addEventListener("click", getCurrentLocation);


let celsium = document.querySelector("#celsium");
let fahrenheit = document.querySelector("#farenheit");
celsium.addEventListener("click", renameCel);
fahrenheit.addEventListener("click", renameFar);