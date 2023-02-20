import React, { useState, useEffect } from "react";
import { Loading } from "./Loading";
import { weatherAppAPI } from "../helpers/API";
import Footer from "./Footer";
const LaundryDays = () => {
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };


  const handleCurrentPositionClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherData(`lat=${latitude}&lon=${longitude}`);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getWeatherData = (query) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?${query}&units=metric&appid=${weatherAppAPI}`
    )
      .then((response) => response.json())
      .then((data) => setForecast(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getWeatherData("q=Nakuru"); 
  }, []);

  const getLaundryDays = () => {
    if (!forecast) return [];
  
    const laundryDays = new Set(); 
    const days = forecast.list;
  
    for (let i = 0; i < days.length; i += 1) {
      const day = days[i];
      const avgTemp = (day.main.temp_max + day.main.temp_min) / 2;
      const weatherConditions = day.weather[0].description;
  
      if (weatherConditions.includes("rain")) continue;
      if (avgTemp < 20 || avgTemp > 30) continue;
  
      const laundryDay = new Date(day.dt_txt).toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
      laundryDays.add(laundryDay);
    }
  
    return Array.from(laundryDays); 
  };
  
  return (
    <div className="App">
      <h1>Enter Your Location</h1>
      <div className="mb-3 xl:w-26">
    <div className="input-group relative flex flex-wrap items-stretch  mb-4">
      <input type="search" value={location} onChange={handleLocationChange}  className="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search Your City" aria-label="Search" aria-describedby="button-addon2" />
      <button className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </button>
    </div>
  </div>
      <button type="button"
  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
  onClick={handleCurrentPositionClick}>
  Use current Position
</button>
<h2 className="text-lg text-red-400">Detailed Weather Data at various time intervals</h2>
{forecast ? (
        <div>
          <h2 className="text-lg text-blue-700">{forecast.city.name}</h2>
          <ul>
            {forecast.list.map((day) => (
              <li key={day.dt}>
                <div>{day.dt_txt}</div>
                <div>{day.weather[0].description}</div>
                <div>{day.main.temp} °C</div>
              </li>
            ))}
          </ul>
          <br />
          <h2 className="text-lg text-red-400">Best days For laundry</h2>
          
        </div>
      ) : (
        <div>< Loading /></div>
      )} 
      <ul>
            {getLaundryDays().map((day) => (
              <li key={day.dt}>
                 {new Date(day).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </li>
            ))}
          </ul> 
      <Footer />
    </div>
  );
};

export default LaundryDays;
