import React, { useState, useEffect , useRef} from 'react';
import axios from 'axios';
import { weatherAppAPI as API_KEY } from '../helpers/API';
import { position } from '@chakra-ui/react';
import { googleMapAPI as GEOCODING_API_KEY} from '../helpers/API';
import moment from 'moment';
import Push from 'push.js';
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

const WashingClothesApp = () => {
  const [locations, setLocations] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [error, setError] = useState(null);
  const [body, setBody] = useState('')

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

return (
<div>
{!locations&& <p>Loading...</p>}
{locations && !weatherData && <p><Loading /></p>}
{weatherData && (
<div>
<h1>Today's Weather</h1>
<h1>{cityName}</h1>

<p>Temperature: {weatherData.main.temp}°C</p>
<p>Humidity: {weatherData.main.humidity}%</p>
<p>Wind Speed: {weatherData.wind.speed} m/s</p>

{isGoodDayForWashingClothes() ? <div class="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700 " role="alert">
        <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <div>
            <span class="font-medium">Weather Unpreictable!!!</span> <br />Weather Conditions are Not fit for washing clothes therefore, <br /><em className='text-xl text-blue-500'>Today is <i className='text-2xl text-red-500'>Not</i> a Good Day For washing Clothes. <br /> Try Washing another Day</em>
        </div>
    </div> :  
    
    <div class="flex justify-center items-center bg-green-100 rounded-lg p-4 mb-4 text-sm text-purple-700 w-1/2" role="alert">
        <svg class="w-10 h-10 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <div>
            <span class="font-medium">You are Lucky!!!</span> <br />Weather Conditions are fit for washing clothes therefore, <br /><em className='text-xl text-blue-500'>Today is a <i className='text-2xl text-red-500'>Good</i> Day For washing Clothes.</em>
        </div>
    </div>}

    
{/* 

{isGoodDayForWashingClothes(Push.create('Weather Conditions are fit for washing clothes therefore, Today is a Good Day For washing Clothes')) }

{!isGoodDayForWashingClothes() ? "" : Push.create('Today is not a Good Day For washing Clothes') }
  */}
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
  <Canvas>
         <ambientLight />
         <Sphere/>
      </Canvas>
</div>
);
};

export default WashingClothesApp;
