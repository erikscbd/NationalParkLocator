var tableBody = document.getElementById('repo-table');
var cityNameEl = document.querySelector('#city');
var weatherFormEl = document.querySelector('#weather-form');
var resultsParagragh = document.querySelector('.results-p');
var mainInfo = document.querySelector('#park-weather-info');

console.log(weatherFormEl);
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



function getApi(state) {

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


                var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityFromRequestUrl + '&appid=d42360dd80194eb3d86e1aac7890342a';
                var encodedUrl = encodeURI(weatherUrl);
                console.log(encodedUrl);
                fetch(encodedUrl)
                .catch(function (error){
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
                        console.log('WEATHER', weatherData);

                        var createTableRow = document.createElement('tr');
                        var tableData = document.createElement('td');
                        var parkName = document.createElement('h1')
                        var parkImg = document.createElement('img')
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
                        var temp = document.createElement('p');


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
                        locationResults.textContent = data.data[i].addresses[0].city;
                        countryResults.textContent = data.data[i].states;
                        if(weatherData.cod == 404){
                            
                        }else{
                            temp.textContent = weatherData.weather[0].description;
                        }
                        

                        resultsParagragh.appendChild(resultsP);
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
                        tableData.appendChild(temp);
                        createTableRow.appendChild(tableData);
                        tableBody.appendChild(createTableRow);
                        mainInfo.appendChild(tableBody);
                    }
                    )

            }
        })
        .catch(function (error) {
            console.log(error)
        })
}


weatherFormEl.addEventListener('click', formSubmitHandler)




