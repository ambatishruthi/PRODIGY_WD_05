document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('locationInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherInfo = document.getElementById('weatherInfo');

    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

    getWeatherBtn.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location === '') {
            alert('Please enter a location.');
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                const { name, weather, main } = data;
                const { description } = weather[0];
                const { temp, feels_like, humidity } = main;

                weatherInfo.innerHTML = `
                    <h2>${name}</h2>
                    <p><strong>Weather:</strong> ${description}</p>
                    <p><strong>Temperature:</strong> ${temp}°C</p>
                    <p><strong>Feels Like:</strong> ${feels_like}°C</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
            });
    });
});
