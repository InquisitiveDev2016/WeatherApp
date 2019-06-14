let appId = "cfa4adbc3034b0d94fbc43de23cf46ac";
let units = 'metric';
let searchMethod ;

function getSearchMethod(searchTerm) {
  if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    //if searchTerm's length is 5 and every single item inside of the searchTerm is a number //
    // This is to check if something can be considered as a zipCode //
    searchMethod = 'zip';
  else
    searchMethod = 'q';
}
function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  // You can inject javaScript into a URL by typing in ${} at the end //
  // Using the searchMethod variable to find the weather for different cities //
  // The & symbol seperates each query parameter //
  // AppID used to fetch weather data from the api //
  fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
    return result.json();
  }).then(result => {
      init(result);
  })
}
// First the 'then' function is used to wait for information from the server and then converting it into JSON//
// When that is done we are calling 'init' with the result from the server //


function init(resultFromServer){
  switch (resultFromServer.weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImg = 'url("clear.jpg")';
      break;

    case 'Clouds':
      document.body.style.backgroundImage = 'url("cloudy.jpg")';
      break;

    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      document.body.style.backgroundImage = 'url("rain.jpg")';
      break;

   case 'Thunderstorm':
    document.body.style.backgroundImage = 'url("storm.jpg")';
    break;

    case 'Snow':
      document.body.style.backgroundImage = 'url("snow.jpg")';
      break;


    default:
      document.body.style.backgroundImage = 'url("default.jpg")';
      break;
  }

  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let temperatureElement = document.getElementById('temperature');
  let humidityElement = document.getElementById('humidity');
  let windSpeedElement = document.getElementById('windSpeed');
  let cityHeader = document.getElementById('cityHeader');
  let weatherIcon = document.getElementById('documentIconImg');

  weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176' //code for degree symbol //;
  windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

  setPositionForWeatherInfo();

}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
  weatherContainer.style.visibility = `visible`;

}

document.getElementById('searchBtn').addEventListener('click', () =>{
  let searchTerm = document.getElementById('searchInput').value;
  if(searchTerm)
    searchWeather(searchTerm);
})
