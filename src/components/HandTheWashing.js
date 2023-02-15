import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Push from 'push.js';
import { weatherAppAPI as API_KEY } from '../helpers/API';
import { Navbar } from './Navbar';
import { Button, Center, Flex, Icon, Input, useToast } from "@chakra-ui/react";


const HandTheWashing = () => {
  const [location, setLocation] = useState('');
  const [laundryDays, setLaundryDays] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchTemperature = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setTemperature(data.main.temp);
    };
    const fetchForecast = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setForecast(data.list);
    };
    fetchTemperature();
    fetchForecast();
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleLaundryDayChange = (event) => {
    const day = event.target.value;
    if (laundryDays.includes(day)) {
      setLaundryDays(laundryDays.filter((d) => d !== day));
    } else {
      setLaundryDays([...laundryDays, day]);
    }
  };

  const isLaundryDay = (day) => {
    return laundryDays.includes(day);
  };

  const isLowTemperature = (temp) => {
    return temp < 15;
  };

  const suggestLaundryDay = () => {
    const weatherByDay = {};
    forecast.forEach((item) => {
      const day = moment(item.dt_txt).format('dddd');
      if (isLaundryDay(day)) {
        if (!weatherByDay[day]) {
          weatherByDay[day] = {
            temperature: item.main.temp,
            weather: item.weather[0].main,
        };
      } else {
        weatherByDay[day].temperature = Math.max(
          weatherByDay[day].temperature,
          item.main.temp
        );
      }
    }
  });
  
  let suggestedDay = '';
  let maxTemperature = -Infinity;
  Object.entries(weatherByDay).forEach(([day, weather]) => {
    if (weather.temperature > maxTemperature) {
      maxTemperature = weather.temperature;
      suggestedDay = day;
    }
  });
  return suggestedDay;
};

const handleCheckTemperature = () => {
if (isLowTemperature(temperature)) {
Push.create('Low temperature warning', {
body: `Current temperature is ${temperature}°C. Consider washing clothes on a different day.`,
timeout: 5000,
});
}
const suggestedDay = suggestLaundryDay();
if (suggestedDay) {
Push.create('Laundry day suggestion', {
body: `The weather forecast suggests ${suggestedDay} is the best day to do laundry.`,
timeout: 5000,
});
} else {
Push.create('Laundry day suggestion', {
body: 'No suitable laundry day found in the next 6 days.',
timeout: 5000,
});
}
};

return (
<div>
<label>
Location:

  <div class="mb-3 xl:w-26">
    <div class="input-group relative flex flex-wrap items-stretch  mb-4">
      <input type="search" value={location} onChange={handleLocationChange}  class="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
      <button class="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </button>
    </div>
  </div>
  </label>
<label>
    Select days you could do Laundry<br />
Laundry day(s):
<br />
<input
       type="checkbox"
       value="Monday"
       onChange={handleLaundryDayChange}
     />
Monday
<br />
<input
       type="checkbox"
       value="Tuesday"
       onChange={handleLaundryDayChange}
     />
Tuesday
<br />
<input
       type="checkbox"
       value="Wednesday"
       onChange={handleLaundryDayChange}
     />
Wednesday
<br />
<input
       type="checkbox"
       value="Thursday"
       onChange={handleLaundryDayChange}
     />
Thursday
<br />
<input
       type="checkbox"
       value="Friday"
       onChange={handleLaundryDayChange}
     />
Friday
<br />
<input
       type="checkbox"
       value="Saturday"
       onChange={handleLaundryDayChange}
     />
Saturday
<br />
<input
       type="checkbox"
       value="Sunday"
       onChange={handleLaundryDayChange}
     />
Sunday
<br />
</label>
<br />
<button type="button" class="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out" onClick={handleCheckTemperature}>Suggest a Day</button>

<br />
<p>Current Temperature: {temperature}°C</p>
</div>
);
};

export default HandTheWashing;


