var weatherFormEl = document.querySelector('#weather-form');
var cityNameEL = document.querySelector('#city');
var weatherSection = document.querySelector('#city-weather-display');


var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityNameEL.value.trim();

    console.log(cityName);

    if (cityName) {

        getCityWeather(cityName);

        weatherSection.textContent = '';
        cityNameEL.value = '';
    } else {
        alert('Please Enter City');
    }
   
};



var getCityWeather = function (city) {

    var apikey = 'd42360dd80194eb3d86e1aac7890342a';
    var requestURl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apikey
   console.log(requestURl)
    fetch(requestURl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data, city);
                    console.log(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to load weather');
        });

        
};        


var displayWeather = function () {

    var weatherEL = document.createElement('div');
    weatherEL.classList = 'list-item';

    var titleEl = document.createElement('span');
    titleEl.textContent = city
 
weatherEL.app
};



weatherFormEl.addEventListener('submit', formSubmitHandler);



$(document).ready(function () {
    M.updateTextFields();
});


