// Exercise 1

const text = `{
"employees": [
    {"firstname": "Porca", "lastname": "Lamadonna"},
    {"firstname": "Mannaggia", "lastname": "Gesùcristo"},
    {"firstname": "Dio", "lastname": "Bubu"}
]
}`;

const jsonData = JSON.parse(text);

const buttons = document.querySelectorAll('button')

buttons[0].addEventListener('click', displayNames);
buttons[1].addEventListener('click', displayAllData);

function displayNames(){
    const output = jsonData.employees.map(emp => `${emp.firstname} ${emp.lastname}`).join('<br>');
    document.getElementById('jsondata').innerHTML = output;
} 

function displayAllData(){
    const output = jsonData.employees.map(emp => JSON.stringify(emp)).join('<br>')
    document.getElementById('jsondata').innerHTML = output;
}

// Exercise 2

const apiUrl = "https://www.omdbapi.com/?s=star+wars&apikey=cbbc6750"

function loadRawData() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        document.getElementById('rawdata').innerHTML = JSON.stringify(data, null, 2);
      })
      .catch(err => console.error(err));
  }

  function loadAndParseData() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const movies = data.Search.map(movie => `<tr>
          <td>${movie.Title}</td>
          <td>${movie.Year}</td>
          <td><img src="${movie.Poster}" alt="${movie.Title}" width="50"></td>
        </tr>`).join('');
        document.getElementById('rawdata').innerHTML = `
          <table border="1">
            <tr><th>Title</th><th>Year</th><th>Poster</th></tr>
            ${movies}
          </table>`;
      })
      .catch(err => console.error(err));
  }

  // Exercise 3

  const getWeatherBtn = document.getElementById('getWeatherBtn');

  //buttons[4].addEventListener('click', getdata);
  buttons[5].addEventListener('click', searchCity);

  function getdata(){
    const city = document.getElementById('city').value;
    featchWeather(city);
  }

  function searchCity() {
    const city = document.getElementById('citysearch').value;
    if(city){
        featchWeather(city);
    } else {
        document.getElementById('weatherdata').innerHTML = "Please enter a city name";
    }
  }

  function featchWeather(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&mode=JSON&APPID=ff64c247a136f706923d1ee0d55d71e2`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const output = `
          <h3>Weather in ${data.name}</h3>
          <p>Temperature: ${data.main.temp} °C</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Clouds: ${data.clouds.all}%</p>
        `;
        document.getElementById('weatherdata').innerHTML = output;
  } else{
    document.getElementById('weatherdata').innerHTML = "City not found.";
  }
})
 .catch(err => console.error(err));

}