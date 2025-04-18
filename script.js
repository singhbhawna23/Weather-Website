const apiKey = "7da88e7383771311aea0258de1b40233"; // Replace with your OpenWeatherMap API key
const apiBase = "https://api.openweathermap.org/data/2.5/weather";

function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            console.log(response); // Debug: check if the response is OK
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Debug: check the actual returned data
            displayResults(data);
        })
        .catch(error => {
            document.getElementById('weatherInfo').innerHTML = `<p>${error.message}</p>`;
        });
}


function displayResults(weather) {
    const weatherInfoDiv = document.getElementById('weatherInfo');

    const city = `${weather.name}, ${weather.sys.country}`;
    const temp = `${Math.round(weather.main.temp)}°C`;
    const description = weather.weather[0].description;
    const minMaxTemp = `Min: ${Math.round(weather.main.temp_min)}°C / Max: ${Math.round(weather.main.temp_max)}°C`;

    weatherInfoDiv.innerHTML = `
        <h2>${city}</h2>
        <p>${temp}</p>
        <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        <p>${minMaxTemp}</p>
    `;
}
