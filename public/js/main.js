console.log('client side js file..')

const cityEl = document.getElementById('city')
const forecastEl = document.getElementById('forecast')
const addressEl = document.getElementById('address')
const locationEl = document.getElementById('location')
const errorEl = document.getElementById('error')
const loaderEl = document.getElementById('loader')

const fetchWeatherDetails = city => {
    loaderEl.innerHTML = 'Loading...'
    errorEl.innerHTML = ''
    forecastEl.innerHTML = ''
    addressEl.innerHTML = ''
    locationEl.innerHTML = ''
    fetch(`/weather?address=${city}`).then(response => {
        if (response.error) {
            return {error: response.error}
        }
        return response.json()
    }).then(({error, forecast, address, location} = {}) => {
        loaderEl.innerHTML = '';
        if (error) {
            errorEl.innerHTML = error;
            forecastEl.innerHTML = '';
            addressEl.innerHTML = '';
            locationEl.innerHTML = '';
        } else {
            errorEl.innerHTML = '';
            forecastEl.innerHTML = forecast;
            addressEl.innerHTML = address;
            locationEl.innerHTML = location;
        }
    })
}

function onSearch(event) {
    event.preventDefault();
    const city = cityEl.value
    fetchWeatherDetails(city)
}
