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

  const handleLocationSubmit = (event) => {
    event.preventDefault();
    if (location.trim() === "") {
      return;
    }
    getWeatherData(`${location}`);
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
    getWeatherData("q=Ongata Rongai"); 
  }, []);

  const getForecastDays = () => {
    if (!forecast) return [];

    const forecastDays = new Map(); 
    const days = forecast.list;

    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const date = new Date(day.dt_txt).toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
      if (!forecastDays.has(date)) {
        forecastDays.set(date, day);
      }
    }

    return Array.from(forecastDays.values()); // convert the Map values back to an array
  };

  const getLaundryDays = () => {
    if (!forecast) return [];

    const laundryDays = new Set();
    const days = forecast.list;

    for (let i = 0; i < days.length; i += 1) {
      const day = days[i];
      const avgTemp = (day.main.temp_max + day.main.temp_min) / 2;
      const weatherConditions = day.weather[0].description;

      if (weatherConditions.includes("rain")) continue;
      if (weatherConditions.includes("broken clouds")) continue;

      if (avgTemp < 17 || avgTemp > 30) continue;

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
    <>
    <div className="App">

<body className="font-mono bg-gray-400">
		<div className="container mx-auto">
			<div className="flex justify-center px-6 my-12">
				<div className="w-full ">
					
					<div className="w-full bg-white p-5 rounded-lg lg:rounded-l-none">
						<div className="px-8 mb-4 text-center">
            <h1>Laundry Days</h1>
      <form onSubmit={handleLocationSubmit}>
      <div className="mb-3 xl:w-26">
    {/* <div className="input-group relative flex flex-wrap items-stretch  mb-4">
      <input type="search" value={location} onChange={handleLocationChange}  className="form-control relative  min-w-0 w-1/2 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search Your City" aria-label="Search" aria-describedby="button-addon2" />
      <button type='submit' className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" id="button-addon2">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </button>
    </div> */}
  </div>
      </form>
      <button type="button"
  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
  onClick={handleCurrentPositionClick}>
  Use current Position
</button>     
							<h4 className="pt-4 mb-2 text-2xl">Detailed weather Forecast </h4>
							<p className="mb-4 text-sm text-gray-700">
								View all days for laundry.
							</p>
						</div>
            {forecast ? (
        <div>
          <h2 className="text-blue-700">{forecast.city.name}</h2>
          <ul>
            {getForecastDays().map((day) => (
              <li key={day.dt}>
                <div className="text-blue-400">{day.dt_txt}</div>
                <div>{day.weather[0].description}</div>
                <div>{day.main.temp} °C</div>
              </li>
            ))}
          </ul>
          <br />
          <h2 className="text-blue-600">Best Days for Laundry</h2>
          {getLaundryDays().length > 0 ? (
            <ul className="text-red-400">
              {getLaundryDays().map((day) => (
                <li key={day}>{day}</li>
              ))}
            </ul>
          ) : (
            <p className="text-red-600">Unfortunately No good laundry days in the next 5 days</p>
          )}

          <h4 className="pt-3 mb-4 text-1xl">Washing Tips </h4>
          <ul>
            <li> 
            <h5 className="text-blue-400">(i). Don’t Go Overboard With Detergent</h5>
Believe it or not, more detergent does not equal cleaner laundry. In fact, using too much detergent can leave a residue on clothes, making them feel stiff and scratchy,
 and causing them to dull in color. All of this ages clothes more quickly than they need to, as well.</li>
 <li> 
            <h5 className="text-blue-400">(ii). Wash your Darks inside out</h5>
            To keep your dark clothes vibrantly dark, turn them inside out before you put them in the washing machine. This simple trick will help combat the fading that can happen when you wash blacks, navies, and forest greens because it
             prevents the fabric surfaces from rubbing against each other. Sure, the interior side might experience some color erosion, but the exterior will remain protected.</li>       
      <li> <h5 className="text-blue-400">(iii). Use cold Water when possible</h5>
      Cold water is a good friend to your laundry: It tends to be far less abrasive on fabrics than super-hot water, which can cause shrinking and stretching.
       It is also especially kind to darks and bright colors since hot water has the ability to fade.</li> 
             <li> <h5 className="text-blue-400">(iv). Fill a tub with water</h5>
             Fill a small tub or sink with water at the temperature recommended on the care label. If no care label exists, choose cool to lukewarm water.</li> 
             <li> <h5 className="text-blue-400">(v). Rinse & Repeat</h5>
             Drain the sink or tub, and refill it with cool rinse water. Push the garment up and down in the water until all soap is removed.
              If you're unsure, sniff the garment to make sure it is no longer scented. Repeat the process with clean water if necessary. </li>
          </ul>
          <br />
          <button type="button" className=" inline-block px-5 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight
           uppercase rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none 
           focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"><a href= "/hangthewashing">Go back</a></button>

        </div>
      ) : (
        <p><Loading /></p>
      )}
					</div>
				</div>
			</div>
		</div>
	</body>
      
    </div>
    <div className="bottom-0"> <Footer /></div>
    

    </>
  );
};

    

export default LaundryDays;
