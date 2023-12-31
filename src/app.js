function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];


}

function displayForecast (response) {
 let forecast = response.data.daily;
  let forecastElement=document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;

forecast.forEach(function(forecastDay, index) {
  if (index<6) {
forecastHTML =
  forecastHTML +
  `
    <div class="col-2">
      <div class="weather-forecast-day">${formatDay(forecastDay.dt)}
        <br/>
        </div>
       
        <img
        src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width = "60";
        />
        <div class=" weather-forecast-temp">
          <span class="weather-forecast-temp-max">
          ${Math.round(forecastDay.temp.max)}°  
          </span>
                  
          <span class="weather-forecast-temp-min">
         ${Math.round(forecastDay.temp.min)}° 
          </span>
        
      </div>
    </div>
    `;
      }

})


forecastHTML=forecastHTML+`</div>`;
forecastElement.innerHTML = forecastHTML;


}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "197ef3a642b76eef90e131866f74a0a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let precipitationElement = document.querySelector("#precipitation");
  let windElement = document.querySelector("#wind");
  let iconElement=document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  precipitationElement.innerHTML = response.data.main.precipitation;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
  
}
function search(city){
  let apiKey = "ed53d80a50f0ade46ca93a05ecdad3fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement=document.querySelector("#city-input");
  search(cityInputElement.value);

}

function displayCelsiusTemperature(event) {
  event.preventDefault();
 let temperatureElement=document.querySelector("#temperature");
 
 fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML= Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");


  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;



let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

search("Boston");




