import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { weatherAppAPI } from '../helpers/API';
import Footer from './Footer';
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
    <>
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

      <section className="text-gray-600 body-font">
        <br />
     <h3 className="bg-green-500">Activities to try based on your current weather.</h3> 

  <div className="container px-5 py-5 mx-auto flex flex-wrap">

    <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
      <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
        
      </div>
      
      <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">1</div>
      <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-10 h-8 text-center mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill="currentColor" d="M400 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 448c-8.8 0-16 7.2-16 16s-7.2 16-16 16h-96c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c26.5 0 48-21.5 48-48 0-8.8-7.2-16-16-16zm-282.2 8.6c-6.2 6.2-16.4 6.3-22.6 0l-67.9-67.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l67.9 67.9c9.4 9.4 21.7 14 34 14s24.6-4.7 33.9-14c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.3-22.7 0zm56.1-179.8l-93.7 93.7c-12.5 12.5-12.5 32.8 0 45.2 6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4l91.9-91.9-30.2-30.2c-5-5-9.4-10.7-13.2-16.8zM128 160h105.5l-20.1 17.2c-13.5 11.5-21.6 28.4-22.3 46.1-.7 17.8 6.1 35.2 18.7 47.7l78.2 78.2V432c0 17.7 14.3 32 32 32s32-14.3 32-32v-89.4c0-12.6-5.1-25-14.1-33.9l-61-61c.5-.4 1.2-.6 1.7-1.1l82.3-82.3c11.5-11.5 14.9-28.6 8.7-43.6-6.2-15-20.7-24.7-37-24.7H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"></path>
    </svg>
        </div>
        <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
            
          <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Have a picnic</h2>
          <p className="leading-relaxed">For a picnic with a loved one or friend. Try a new, scenic spot like a nearby mountain, botanical garden or lake. Don’t forget the bug spray!</p>
        </div>
      </div>
    </div>
    <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
      <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">2</div>
      <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-10 h-8 text-center mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path fill="currentColor" d="M336 96c26.5 0 48-21.5 48-48S362.5 0 336 0s-48 21.5-48 48 21.5 48 48 48zm216 320c-13.2 0-24 10.7-24 24 0 13.2-10.8 24-24 24h-69.5L460 285.6c11.7-4.7 20.1-16.2 20.1-29.6 0-17.7-14.3-32-32-32h-44L378 170.8c-12.5-25.5-35.5-44.2-61.8-50.9L245 98.7c-28.3-6.8-57.8-.5-80.8 17.1l-39.7 30.4c-14 10.7-16.7 30.8-5.9 44.9.7.9 1.7 1.3 2.4 2.1L66.9 464H24c-13.2 0-24 10.7-24 24s10.8 24 24 24h480c39.7 0 72-32.3 72-72 0-13.2-10.8-24-24-24zm-260.5 48h-96.9l43.1-91-22-13c-12.1-7.2-21.9-16.9-29.5-27.8L123.7 464H99.5l52.3-261.4c4.1-1 8.1-2.9 11.7-5.6l39.7-30.4c7.7-5.9 17.4-8 25.3-6.1l14.7 4.4-37.5 87.4c-12.6 29.5-1.3 64 26.3 80.3l85 50.2-25.5 81.2zm110.6 0h-43.6l23.6-75.5c5.9-20.8-2.9-43.1-21.6-54.4L299.3 298l31.3-78.3 20.3 41.4c8 16.3 24.9 26.9 43.1 26.9h33.3l-25.2 176z"></path>
    </svg>
        </div>
        <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Go whitewater rafting</h2>
          <p className="leading-relaxed">Nothing says summer like whitewater rafting down a river with friends. Not only is it a fun (and usually closeby) getaway, it’s also very affordable for a large group. Trips can be mild for beginners, or expert rafters can enjoy a full day splashing through wild rapids.</p>
        </div>
      </div>
    </div>
    <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
      <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">3</div>
      <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-10 h-8 text-center mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="currentColor" d="M432 96c26.5 0 48-21.5 48-48S458.5 0 432 0s-48 21.5-48 48 21.5 48 48 48zm28.8 153.6c5.8 4.3 12.5 6.4 19.2 6.4 9.7 0 19.3-4.4 25.6-12.8 10.6-14.1 7.8-34.2-6.4-44.8l-111.4-83.5c-13.8-10.3-29.1-18.4-45.4-23.8l-63.7-21.2-26.1-52.1C244.7 2 225.5-4.4 209.7 3.5c-15.8 7.9-22.2 27.1-14.3 42.9l29.1 58.1c5.7 11.4 15.6 19.9 27.7 24l16.4 5.5-41.2 20.6c-21.8 10.9-35.4 32.8-35.4 57.2v53.1l-74.1 24.7c-16.8 5.6-25.8 23.7-20.2 40.5 1.7 5.2 4.9 9.4 8.7 12.9l-38.7-14.1c-9.7-3.5-17.4-10.6-21.8-20-5.6-12-19.9-17.2-31.9-11.6s-17.2 19.9-11.6 31.9c9.8 21 27.1 36.9 48.9 44.8l364.8 132.7c9.7 3.5 19.7 5.3 29.7 5.3 12.5 0 24.9-2.7 36.5-8.2 12-5.6 17.2-19.9 11.6-31.9S474 454.7 462 460.3c-9.3 4.4-19.8 4.8-29.5 1.3l-90.8-33.1c8.7-4.1 15.6-11.8 17.8-21.9l21.9-102c3.9-18.2-3.2-37.2-18.1-48.4l-52-39 66-30.5 83.5 62.9zm-144.4 51.7l-19.7 92c-1.5 7.1-.1 13.9 2.8 20l-169.4-61.6c2.7-.2 5.4-.4 8-1.3l85-28.4c19.6-6.5 32.8-24.8 32.8-45.5V256l60.5 45.3z"></path>
    </svg>
        </div>
        <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Try Skydiving</h2>
          <p className="leading-relaxed">Skydiving isn’t just for honeymoons or trips abroad. It’s perfect for a simple summer day to feel the wind through your hair while experiencing an adrenaline rush. Remember to check coupon websites, too — you can frequently find deals for skydiving online.</p>
        </div>
      </div>
    </div>
    <div className="flex relative pb-10 sm:items-center md:w-2/3 mx-auto">
      <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">4</div>
      <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Visit Movie Theatre</h2>
          <p className="leading-relaxed">Shhh! The movie’s playing — from the comfort of your own car. Bring blankets, soda, candy and popcorn to enjoy a movie with friends at a drive-in movie theater, right under a starry sky on a clear summer night.</p>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
    <Footer />
    </>
  );
}

export default Calendar;
