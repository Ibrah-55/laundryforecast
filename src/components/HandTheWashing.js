import React, { useState, useEffect } from 'react';
import { Button, Center, Flex, Icon, Input, useToast } from "@chakra-ui/react";
import moment from 'moment';
import Push from 'push.js';
import { weatherAppAPI as API_KEY } from '../helpers/API';
import { GET_DATA_ERROR } from "../redux/actionTypes"
import { useDispatch } from 'react-redux';
import { getWeatherByLocation } from '../redux/actions';
import { HiLocationMarker } from "react-icons/hi";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Footer from './Footer';

export const getDataError = () => {
    return { type: GET_DATA_ERROR };
}
const styles= {
    background: `url('https://images.unsplash.com/photo-1536999606895-b6c1971676c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80')`,
}

const HandTheWashing = () => {
    
  const [location, setLocation] = useState('');
  const [laundryDays, setLaundryDays] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [forecast, setForecast] = useState([]);
  const dispatch = useDispatch();
    const toast = useToast();



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
body: `Enter a Location. Current temperature is ${temperature}°C. Select days you could do laundry first, otherwise consider washing clothes on a different day.`,
timeout: 15000,
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
    <div >
<Flex p={'10px'} minH={'70px'} bg={'#d7defa'} justifyContent={'center'} flexDirection={['row', 'column']} gap={['10px', '10px']}>
            
            <Center px={'10px'}>
                <Button
                    bg={'#5e82f4'}
                    _hover={{ 'bg': '5e82f4' }}
                    color={'white'}
                    w={'97%'}
                    borderRadius={'15px'}
                    leftIcon={<Icon w={'20px'} h={'30px'} as={HiLocationMarker} />}
                    onClick={handleLocationData}
                >
                    Current Location
                </Button>
            </Center>
        </Flex >
        <div style={styles} className="relative w-full h-full mb-2"> 

<div class="flex justify-center ">
  <div class="block p-4 rounded-lg shadow-lg bg-white w-3/4">
    <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Laundry Forecast</h5>
    <div>
<Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>About laundry forecast</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                This app helps you choose what day you could carry out laundry by evaluating weather temparature, 
                humidity and how the clouds look like
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
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
      <input type="search" value={location} onChange={handleLocationChange}  class="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" required/>
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
<p>The suggested day for doing laundry is: {suggestLaundryDay}</p>
<h3 className="text-lg text-red-400">Get detailed weather forecast and suggested laundry days: </h3>
<a href='/laundry' className="text-blue-600">View More</a>

</div>

  </div>
  
</div>
<div className=""><Footer /></div>

</div>
</div>
</>
);
};

export default HandTheWashing;


