import { useEffect, useState } from 'react'
import './weather.css'
import search from './images/search.png'
import wind from './images/wind.png'
import humidity from './images/humidity.png'
import axios from 'axios'

import clear from './images/clear.png'
import clouds from './images/clouds.png'
import drizzle from './images/drizzle.png'
import mist from './images/mist.png'
import rain from './images/rain.png'
import snow from './images/snow.png'
import thunder from './images/thunderstrom.png'

function Weather() {

  const [weatherIcon, setWeatherIcon] = useState(clear)
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({
    humidity: null,
    temperature: null,
    wind: null,
    location: ''
  })

  const weatherImages = {
    "01d" : clear,
    "01n" : clear,
    "02d" : clouds,
    "02n" : clouds,
    "03d" : clouds,
    "03n" : clouds,
    "04d" : drizzle,
    "04n" : drizzle,
    "09d" : rain,
    "09n" : rain,
    "10d" : rain,
    "10n" : rain,
    "11d" : thunder,
    "11n" : thunder,
    "13d" : snow,
    "13n" : snow,
    "50d" : mist,
    "50n" : mist,
}

  const API_KEY = 'a8f902af563ec0ead220277f6d0eba5d'

  const handleSearch = async (cityName) => {
    if (!cityName) return

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      )
      console.log(response.data);
      
      setWeather({
        humidity: response.data.main.humidity,
        temperature: Math.floor(response.data.main.temp),
        wind: response.data.wind.speed,
        location: response.data.name
      })
      const iconCode = response.data.weather[0].icon
      setWeatherIcon(weatherImages[iconCode] || clear)
    } catch (e) {
      setWeather({
        humidity: null,
        temperature: null,
        wind: null,
        location: ''
      })
    }
  }
  useEffect(() => {
    handleSearch('london')
  }, [])

  return (
    <div>
      <div className="box">

        <div className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Enter the city name.."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="search-button"
            onClick={() => handleSearch(city)}
          >
            <img src={search} alt="search" />
          </button>
        </div>

        <div className="content">
          <div className="weather-image">
            <img src={weatherIcon} alt="weather-img" />
          </div>
          <div className="city-temperature">
            <p className="temperature">
              {weather.temperature !== null ? `${weather.temperature}°C` : '--°C'}
            </p>
          </div>
          <div className="city-name">
            <p className="name">{weather.location || '--'}</p>
          </div>
        </div>

        <div className="footer">
          <div className="humidity-block">
            <img src={humidity} alt="humidity" />
            <div>
              <p className="humidity">
                {weather.humidity !== null ? `${weather.humidity}%` : '--%'}
              </p>
              <p className="h">humidity</p>
            </div>
          </div>
          <div className="wind-speed-block">
            <img src={wind} alt="wind" />
            <div className="wind-speed">
              <p className="wind">
                {weather.wind !== null ? `${weather.wind} km/h` : '-- km/h'}
              </p>
              <p className="w">wind speed</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Weather
