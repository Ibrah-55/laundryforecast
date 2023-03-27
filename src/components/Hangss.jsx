import React, { useState, useEffect } from "react";
import axios from "axios";
import { weatherAppAPI as API_KEY } from '../helpers/API';

const Hangss = () => {
    const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [error, setError] = useState(null);
  const [days, setDays] = useState([]);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherData(latitude, longitude);
          getCityName(latitude, longitude);
        },
        (error) => setError(error.message)
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const getWeatherData = async (latitude, longitude) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setError("Unable to fetch weather data");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const getCityName = async (latitude, longitude) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setCityName(data.name);
      } else {
        setError("Unable to fetch city name");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const isWashingDay = (day) => {
    if (
      day.rain < 0.1 &&
      day.humidity < 60 &&
      day.windSpeed < 20 &&
      day.temperature > 15 &&
      day.temperature < 25
    ) {
      return true;
    }
    return false;
  };

  const getWashingDays = () => {
    const washingDays = [];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    const weatherDays = weatherData.daily.slice(1, 8);

    for (let i = 0; i < 7; i++) {
      if (isWashingDay(weatherDays[i])) {
        if (i === today) {
          washingDays.push("Today");
        } else {
          washingDays.push(days[i]);
        }
      }
    }

    return washingDays;
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      {error && <div>{error}</div>}
      {weatherData && (
        <div>
          <h1>{cityName}</h1>
          <h2>Today's Weather: {weatherData.current.weather[0].description}</h2>
          <h3>Temperature: {weatherData.current.temp}°C</h3>
          <h3>Humidity: {weatherData.current.humidity}%</h3>
              </div>
         
      ) 
      }

{days.length > 0 && (
<div>
    
<h1>Best Days for Washing Clothes</h1>
<ul>

{days.map((day, index) => (
<li key={index}>{day.days}: {day.isWashingDay ? 'Yes' : 'No'}</li>
))}
</ul>
</div>
)}
    </div>
  );
};

export default Hangss;
