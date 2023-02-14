import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { weatherAppAPI } from '../helpers/API';
function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function getWeatherData(date) {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Nairobi,Ke&appid=${weatherAppAPI}&dt=${Math.round(date.getTime() / 1000)}`);

      if (!response.ok) {
        throw new Error(`Failed to retrieve weather data for ${date.toDateString()}`);
      }

      const data = await response.json();

      return data;
    }

    getWeatherData(selectedDate)
      .then(data => setWeatherData(data))
      .catch(error => console.error(error));
  }, [selectedDate]);

  function renderTableRow(date) {
    if (!weatherData) return null;

    return (
      <tr key={date.toISOString()}>
        
        <td>{date.toDateString()}</td>

        <td>{weatherData.weather[0].description}</td>

        <td>{weatherData.main.temp}</td>

        <td>{weatherData.main.humidity}</td>
      </tr>
    );
  }

  return (
    <div className="  sm:items-center md:w-2/3 mx-auto ">
      <h1 className='text-red bg-green-500 w-full'>Today's Weather Calendar</h1>
      
      <table>
        <thead>
          <tr>
            <th>Date </th>
            
            <th>Weather </th>
            <th>Temperature </th>

            <th>Humidity   </th>
          </tr>
        </thead>
        <tbody>
          {renderTableRow(selectedDate)}
        </tbody>
      </table>

      <section class="text-gray-600 body-font">
        <br />
     <h3 className="bg-green-500">Activities to try based on your current weather.</h3> 

  <div class="container px-5 py-5 mx-auto flex flex-wrap">

    <div class="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
      <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
        
      </div>
      
      <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">1</div>
      <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        <div class="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" class="w-12 h-12" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
            
          <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">Have a picnic</h2>
          <p class="leading-relaxed">For a picnic with a loved one or friend. Try a new, scenic spot like a nearby mountain, botanical garden or lake. Don’t forget the bug spray!</p>
        </div>
      </div>
    </div>
    <div class="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
      <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">2</div>
      <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        <div class="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" class="w-12 h-12" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">Go whitewater rafting</h2>
          <p class="leading-relaxed">Nothing says summer like whitewater rafting down a river with friends. Not only is it a fun (and usually closeby) getaway, it’s also very affordable for a large group. Trips can be mild for beginners, or expert rafters can enjoy a full day splashing through wild rapids.</p>
        </div>
      </div>
    </div>
    <div class="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
      <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">3</div>
      <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        <div class="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" class="w-12 h-12" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="3"></circle>
            <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
          </svg>
        </div>
        <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">Try Skydiving</h2>
          <p class="leading-relaxed">Skydiving isn’t just for honeymoons or trips abroad. It’s perfect for a simple summer day to feel the wind through your hair while experiencing an adrenaline rush. Remember to check coupon websites, too — you can frequently find deals for skydiving online.</p>
        </div>
      </div>
    </div>
    <div class="flex relative pb-10 sm:items-center md:w-2/3 mx-auto">
      <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">4</div>
      <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        <div class="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" class="w-12 h-12" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">Visit Movie Theatre</h2>
          <p class="leading-relaxed">Shhh! The movie’s playing — from the comfort of your own car. Bring blankets, soda, candy and popcorn to enjoy a movie with friends at a drive-in movie theater, right under a starry sky on a clear summer night.</p>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}

export default Calendar;
