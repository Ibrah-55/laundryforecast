import React, { useState, useEffect, useRef, Fragment} from 'react';
import { Button, Center, Flex, Icon, Input, useToast } from "@chakra-ui/react";
import moment from 'moment';
import Push from 'push.js';
import axios from 'axios';

import { weatherAppAPI as API_KEY } from '../helpers/API';
import { GET_DATA_ERROR } from "../redux/actionTypes"
import { HiLocationMarker } from "react-icons/hi";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Footer from './Footer';
import { Dialog, Transition } from '@headlessui/react'
import { Loading } from "./Loading";

import { Canvas,useFrame,useLoader } from "@react-three/fiber";
import * as THREE from "three";
import earthImg from '../giphy1.gif'

const Sphere=()=>{
   const base=new THREE.TextureLoader().load(earthImg)
   const ref=useRef()
   useFrame(() => (ref.current.rotation.x=ref.current.rotation.y += 0.01))
   return(
      <mesh visible castShadow ref={ref}>
      <directionalLight intensity={0.5} />
      <sphereGeometry attach="geometry" args={[2, 32, 32]} />
      <meshBasicMaterial
         map={base}
         color="white"
      />
      </mesh>
   )
}

export const getDataError = () => {
    return { type: GET_DATA_ERROR };
}


const HandTheWashing = () => {

  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [body, setBody] = useState('')
  let [isOpen, setIsOpen] = useState(false)
  const [location, setLocation] = useState('Nairobi South');
  const [laundryDays, setLaundryDays] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [forecast, setForecast] = useState([]);

  const [locations, setLocations] = useState(null);

  const [error, setError] = useState(null);
  const [days, setDays] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocations({ latitude, longitude });
    });
  }, []);

  useEffect(() => {
    if (locations) {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${locations.latitude}&lon=${locations.longitude}&appid=${API_KEY}`;
      
      axios.get(API_URL)

        .then(response => setWeatherData(response.data))
       
        .catch(error => console.log(error));
    }
  }, [locations]);





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
      const API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${locations.latitude}&lon=${locations.longitude}&appid=${API_KEY}&cnt=8&units=metric`;
      
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



  
  const onSubmit = async (e) => {
    await e.preventDefault();

    const res = await fetch("/server/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: name, to: number, body: body }),
    });

    const data = await res.json();

    if (data.success) {
      await setNumber("");
      await setBody("");
      await setName('');
    } else {
      await setNumber("An Error has occurred.");
      await setName("Error occured")
      await setBody("An Error has occurred.");
    }
    console.log(data)
  };

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    const fetchTemperature = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setTemperature(data.main.temp);
   
    };
    const fetchForecast = async (dispatch) => {
        try{
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setForecast(data.list);
    }catch(err){
        console.log(err)
        dispatch(getDataError());

    }
}
    fetchTemperature();
    fetchForecast();
  }, [location]);
  
  const handleLocationData = (event) => {
    setLocation({value: 'q=nairobi'})
    
};

  const handleLocationChange = (event) => {
    setLocation( event.target.value);
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
  
  var suggestedDay = '';
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
body: ` Current temperature is ${temperature}°C. 
 Consider washing clothes on another day.`,
timeout: 25000,
});
}
const suggestedDay = suggestLaundryDay();
if (suggestedDay) {
Push.create('Laundry day suggestion', {
body: `The weather forecast suggests ${suggestedDay} is the best day to do laundry.`,
timeout: 15000,
});
} else {
Push.create('Laundry day suggestion', {
body: 'Please select days you could do laundry. No suitable day found',
timeout: 15000,
});
}
};

return (
    <>
    <div className="lazy  bg-repeat-round bg-[url('https://i.dailymail.co.uk/1s/2022/04/30/22/57249309-10771333-image-a-92_1651355735593.jpg')]">

        <div  className="relative w-full h-full"> 

<div class="flex justify-center h-full mt-3 mb-12 ">
  <div class="block p-4 rounded-lg shadow-lg bg-white w-3/4 mb-12 h-full">
    <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Laundry Forecast</h5>
    <div>


<div className='text-amber-600'>
{!locations&& <p>Loading...</p>}
{locations && !weatherData && <p><Loading /></p>}
{weatherData && (
<div>
<h1 className='justify-center items-center'>Today's Weather: </h1>


<div class="container mx-auto w-full">
        <div class="flex items-center justify-center h-full">
            <div class="bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50">
                <div class="flex flex-col">
                    <div>
                        <h2 class="font-bold text-gray-600 text-center">{location.toUpperCase()}</h2>
                    </div>
                    <div class="my-6">
                        <div class="flex flex-row space-x-4 items-center">
                            <div id="icon">
                                <span>
                                    <svg class="w-20 h-20 fill-stroke text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
                                        </path>
                                    </svg>
                                </span>
                            </div>
                            <div id="temp">
                                <h4 class="text-4xl"> {(weatherData.main.temp - 273.15).toFixed(2)}&deg;C</h4>
                                <p class="text-xs text-gray-500">Humidity {weatherData.main.humidity}%</p>
                                <p class="text-xs text-gray-500">Feels like +14&deg;C</p>
                                <p class="text-xs text-gray-500">Wind Speed {weatherData.wind.speed} m/s</p>


                            </div>
                        </div>
                    </div>
                    <div class="w-full place-items-end text-right border-t-2 border-gray-100 mt-2">
                        <a href="/weatherforecast" class="text-indigo-600 text-xs font-medium">View more</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

{isGoodDayForWashingClothes() ? <div class="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700 " role="alert">
        <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <div>
            <span class="font-medium">Weather Unpredictable!!!</span> <br />Weather Conditions are Not fit for washing clothes therefore, <br /><em className='text-xl text-blue-500'>Today is <i className='text-2xl text-red-500'>Not</i> a Good Day For washing Clothes. <br /> Try Washing another Day</em>
        </div>
    </div> :  
    
    <div class="flex justify-center items-center bg-green-100 rounded-lg p-4 mb-4 text-sm text-purple-700 w-full" role="alert">
        <svg class="w-10 h-10 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <div>
            <span class="font-medium">You are Lucky!!!</span> <br />Weather Conditions are fit for washing clothes therefore, <br /><em className='text-xl text-blue-500'>Today is a <i className='text-2xl text-red-500'>Good</i> Day For washing Clothes.</em>
        </div>
    </div>}


{isGoodDayForWashingClothes(Push.create('Weather Conditions are fit for washing clothes therefore, Today is a Good Day For washing Clothes')) }

{!isGoodDayForWashingClothes() ? "" : Push.create('Today is not a Good Day For washing Clothes') }
 
</div>

)}
{days.length > 0 && (
<div>
<h1>Best Days for Washing Clothes</h1>

<ul>

{days.map((day, index) => (
  <div>
    {isGoodDayForWashingClothes()}
    <li key={index}>{day.dayOfWeek}: {day.isGoodDay ? 'Yes' : 'No'}</li>

  </div>
))}
</ul>
</div>
)}
 <Canvas>
         <ambientLight />
         <Sphere/>
      </Canvas>
</div>
   <p className='text-xl text-red-500'>Help you decide the best day with Options </p>

        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>How it works</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
               <ul>
                <li>i. Enter a Search Location</li>

                <li>ii. Highlight Days you could do Laundry</li>
                <li>iii. Click on Suggest a day</li>


               </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
<label>
Enter your Location:

  <div class=" mb-3 xl:w-1/2">
    <div class="input-group relative flex flex-wrap items-stretch  mb-4">
      <input type="search" value={location}  onChange={handleLocationChange}  class="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" required/>
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
<p>CITY: <h5 className="text-blue-500"> {location.toUpperCase()}</h5></p>
<p className='text-amber-600'>Current Temperature: {temperature}°C</p>
{/* <p>The suggested day for doing laundry is: <em className='text-purple-700'> {}</em></p> */}
<h3 className="text-lg">Get detailed weather forecast and suggested laundry days:  </h3>
<a href='/laundry' className="text-blue-600">View More</a>

</div>
{/* <a href='/notifications' className="text-indigo-900" >Send Message</a> */}

  </div>

</div>

</div>
</div>

{/* <div className="fixed bottom-0 w-full"><Footer /></div> */}

</>
);
};

export default HandTheWashing;


