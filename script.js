var tableBody = document.getElementById('repo-table');
var cityNameEl = document.querySelector('#city');
var weatherFormEl = document.querySelector('#weather-form');
var resultsParagragh = document.querySelector('.results-p');
var markerArray = [];
var favoritesArray = [];

var storedFavorites = localStorage.getItem('favorites');

if (storedFavorites !== null) {

favoritesArray = JSON.parse(storedFavorites);
}

console.log(storedFavorites);
console.log(favoritesArray);

function convertToF(kelvin) {
    return Math.floor((kelvin - 273.15) * 1.8) + 32
}

function clearOverlays() {
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }
    markerArray.length = 0;
}

var formSubmitHandler = function (event) {
    console.log(event)
    event.preventDefault();
    // event.stopPropagation();

    var stateCode = cityNameEl.value.trim();

    console.log(stateCode);

    if (stateCode) {

        getApi(stateCode);
    }
}
let map;

// Initialize and add the map
function initMap() {
    // The location of Uluru

    // The map, centered at Uluru
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: { lat: 37.09, lng: -95.129 },
    });

}


//   google.maps.Map.prototype.clearMarkers = function() {
//     for(var i=0; i < this.markers.length; i++){
//         this.markers[i].setMap(null);
//     }
//     this.markers = new Array();
// };


function getApi(state) {

    clearOverlays();

    var requestUrl = 'https://developer.nps.gov/api/v1/parks?api_key=n0NWS1TTSoP9PTPB2SwRlKnJTdr58CkVD79Lvx9g&stateCode=' + state;

    fetch(requestUrl)
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {



            var resultsP = document.createElement('p');
            const table = document.querySelector('#repo-table')
            table.innerHTML = '';
            resultsParagragh.innerHTML = '';
            for (let i = 0; i <= data.data.length; i++) {
                var cityFromRequestUrl = data.data[i].addresses[0].city;

                let cityLat = data.data[i].latitude;
                let cityLon = data.data[i].longitude;

                console.log(cityLat);
                console.log(cityLon);

                var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityFromRequestUrl + '&appid=d42360dd80194eb3d86e1aac7890342a';
                var encodedUrl = encodeURI(weatherUrl);
                console.log(encodedUrl);
                fetch(encodedUrl)
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function (response) {

                        // console.log(response)
                        return response.json()

                    })
                    .then(function (weatherResponse) {
                        const weatherData = weatherResponse
                        const status = '';

                        console.log('DATA', data.data)
                        console.log(i);
                        console.log('WEATHERDATA', weatherData);

                        var createTableRow = document.createElement('tr');
                        var tableData = document.createElement('td');
                        var parkName = document.createElement('h1')
                        var parkImg = document.createElement('img')
                        parkImg.classList = 'responsive-img';
                        var description = document.createElement('p');
                        var weatherInfo = document.createElement('p')
                        var entranceFees = document.createElement('p');
                        var address = document.createElement('p');
                        var hoursList = document.createElement('ol')
                        var monday = document.createElement('li');
                        var tuesday = document.createElement('li');
                        var wednesday = document.createElement('li');
                        var thursday = document.createElement('li');
                        var friday = document.createElement('li');
                        var saturday = document.createElement('li');
                        var sunday = document.createElement('li');
                        var locationResults = document.createElement('p');
                        var countryResults = document.createElement('p');
                        var tempCard = document.createElement('div');
                        tempCard.classList = 'card horizontal teal';

                        var favoritesBtn = document.createElement('button');
                        favoritesBtn.textContent = "Favorite"
                        favoritesBtn.setAttribute("data-name", data.data[i].fullName);

                        console.log(data.data[i].fullName);


                        var tempDescription = document.createElement('p');
                        var tempCurrent = document.createElement('p');
                        var tempMin = document.createElement('p');
                        var tempMax = document.createElement('p');


                        resultsP.textContent = 'Results'
                        parkName.textContent = data.data[i].fullName;
                        parkImg.setAttribute('src', data.data[i].images[0].url);
                        parkImg.setAttribute('width', '400');
                        parkImg.setAttribute('height', '200')
                        description.textContent = data.data[i].description;
                        weatherInfo.textContent = data.data[i].weatherInfo;
                        entranceFees.textContent = 'Entrance Fee Cost: ' + data.data[i].entranceFees[0].cost + ' ---------- ' + data.data[i].entranceFees[0].description;
                        address.textContent = 'Address: ' + data.data[i].addresses[0].line1;
                        monday.textContent = 'Monday: ' + data.data[i].operatingHours[0].standardHours.monday;
                        tuesday.textContent = 'Tuesday: ' + data.data[i].operatingHours[0].standardHours.tuesday;
                        wednesday.textContent = 'Wednesday: ' + data.data[i].operatingHours[0].standardHours.wednesday;
                        thursday.textContent = 'Thursday: ' + data.data[i].operatingHours[0].standardHours.thursday;
                        friday.textContent = 'Friday: ' + data.data[i].operatingHours[0].standardHours.friday;
                        saturday.textContent = 'Saturday: ' + data.data[i].operatingHours[0].standardHours.saturday;
                        sunday.textContent = 'Sunday: ' + data.data[i].operatingHours[0].standardHours.sunday;
                        locationResults.textContent = data.data[i].addresses[0].city + ', ' + data.data[i].states;
                        
                        if (weatherData.cod == 404) {

                        } else {

                            tempCurrent.textContent = 'Temperature: ' + convertToF(weatherData.main.temp) + ' ';

                            tempMin.textContent = 'Low: ' + convertToF(weatherData.main.temp_min) + ' ';

                            tempMax.textContent = 'Max: ' + convertToF(weatherData.main.temp_max) + ' ';

                            tempDescription.textContent = weatherData.weather[0].description + ' ';
                        }


                        resultsParagragh.appendChild(resultsP);
                        resultsParagragh.classList = 'input-font';
                        tableData.appendChild(parkName);
                        tableData.appendChild(parkImg);
                        tableData.appendChild(description);
                        tableData.appendChild(weatherInfo);
                        tableData.appendChild(entranceFees);
                        tableData.appendChild(address);
                        tableData.appendChild(hoursList);
                        hoursList.appendChild(monday);
                        hoursList.appendChild(tuesday);
                        hoursList.appendChild(wednesday);
                        hoursList.appendChild(thursday);
                        hoursList.appendChild(friday);
                        hoursList.appendChild(saturday);
                        hoursList.appendChild(sunday);
                        tableData.appendChild(locationResults);
                        tableData.appendChild(countryResults);
                        tableData.appendChild(tempCard);
                        tempCard.appendChild(tempCurrent);
                        tempCard.appendChild(tempMax);
                        tempCard.appendChild(tempMin);
                        tempCard.appendChild(tempDescription);
                        createTableRow.appendChild(tableData);
                        tableBody.appendChild(createTableRow);
                        tableData.appendChild(favoritesBtn);
                        favoritesBtn.addEventListener("click", handleFavoritesButton);
                        favoritesBtn.classList = 'favorites btn';
                        console.log(cityLat, cityLon);
                        const markerCoordinates = { lat: parseFloat(cityLat), lng: parseFloat(cityLon) };


                        var marker = new google.maps.Marker({
                            position: markerCoordinates,
                            map: map,
                        })
                        markerArray.push(marker);
                    }
                    )

            }
        })
        .catch(function (error) {
            console.log(error)
        })

}
function handleFavoritesButton(event) {

    var parkName = event.target.dataset.name
    console.log(parkName);
    favoritesArray.push(parkName);
    localStorage.setItem('favorites', JSON.stringify(favoritesArray));

}


weatherFormEl.addEventListener('click', formSubmitHandler)


// Initialize and add the map
function showMap(latitude, longitude, mapElement) {
    // The location of Uluru
    const uluru = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}



$('#textarea1').val('New Text');
M.textareaAutoResize($('#textarea1'));





