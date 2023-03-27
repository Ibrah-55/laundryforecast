import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { weatherAppAPI as API_KEY } from '../helpers/API';
import { position } from '@chakra-ui/react';
import { googleMapAPI as GEOCODING_API_KEY} from '../helpers/API';

const WashingClothesApp = () => {
  const [location, setLocation] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [error, setError] = useState(null);

  const [days, setDays] = useState([]);

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    });
  }, []);

  useEffect(() => {
    if (location) {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}`;
      
      axios.get(API_URL)

        .then(response => setWeatherData(response.data))
       
        .catch(error => console.log(error));
    }
  }, [location]);
// const locations= () =>{
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const GEOCODING_API_URL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${GEOCODING_API_KEY}`;
//           fetch(GEOCODING_API_URL)
//             .then((response) => {
//               if (!response.ok) {
//                 throw new Error("Network response was not ok");
//               }
//               return response.json();
//             })
//             .then((data) => {
//               const city = data.results[0].components.city;
//               console.log(`Your current city is ${city}`);
//               return city;
//             })
//             .catch((error) => console.error(error));
//         },
//         (error) => {
//           console.error(error);
//         }
    
//       );

//   }

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

  const isGoodDayForWashingClothes = () => {
    if (!weatherData) {
      return null;
    }

    const { weather, main } = weatherData;
    const { temp, humidity } = main;
    const { id } = weather[0];
    
    const isRaining = (id >= 200 && id <= 300) || (id >= 300 && id <= 531);
    const isHumid = humidity >= 60;
    const isWindy = weatherData.wind.speed >= 2;
    const isCold = temp < 5;

    return !isRaining && !isHumid && !isWindy && !isCold;
  };

  const getDaysForWashingClothes = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(day.getDate() + i);
      const dayOfWeek = daysOfWeek[day.getDay()];

      days.push({
        dayOfWeek,
        isGoodDay: true, 
      });
    }

    days.forEach(day => {
      const API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&cnt=8&units=metric`;
      
      axios.get(API_URL)
        .then(response => {
          const forecastData = response.data;
          const forecast = forecastData.list.find(item => item.dt_txt.includes(day.dayOfWeek));
          
          if (forecast) {
            const { weather, main } = forecast;
            const { temp, humidity } = main;
            const { id } = weather[0];

            const isRaining = (id >= 200 && id <= 332) || (id >= 300 && id <= 531);
            const isHumid = humidity >= 70;
            const isWindy = forecastData.wind.speed >= 20;
            const isCold = temp < 10;
    
            day.isGoodDay = !isRaining && !isHumid && !isWindy && !isCold;
          }
    
          setDays([...days]);
        })
        .catch(error => console.log(error));
    });
};

return (
<div>
{!location && <p>Loading...</p>}
{location && !weatherData && <p>Getting weather data...</p>}
{weatherData && (
<div>
<h1>Today's Weather</h1>
<h1>{cityName}</h1>

<p>Temperature: {weatherData.main.temp}°C</p>
<p>Humidity: {weatherData.main.humidity}%</p>
<p>Wind Speed: {weatherData.wind.speed} m/s</p>

<p>{isGoodDayForWashingClothes() ? 'It is Not a good day for washing clothes!' :
 'Today It is a good day for washing clothes.'}</p>
 
</div>


)}
{days.length > 0 && (
<div>
<h1>Best Days for Washing Clothes</h1>

<ul>

{days.map((day, index) => (
  <div>
    <p>{getDaysForWashingClothes() ? 'It is Not a good day for washing clothes!' :
 'It is a good day for washing clothes.'}</p>
    <li key={index}>{day.dayOfWeek}: {day.isGoodDay ? 'Yes' : 'No'}</li>

  </div>
))}
</ul>
</div>
)}
</div>
);
};

export default WashingClothesApp;
