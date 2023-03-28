import { Box, Flex, Grid, Heading, Icon, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { celsius } from "../helpers/extraFunctions";
import { getItem } from "../helpers/sessionStorage";
import { getWeatherByLocation, syncData } from "../redux/actions";
import { Error } from "./Error";
import { Loading } from "./Loading";
import { Map } from "./Map";
import { FaSyncAlt } from "react-icons/fa";
import { Newbox, NewText, Newboxes } from "./SmallComponents";
import { Navbar } from "./Navbar";

export const Weather = () => {

    const { isLoading, weatherData: data, isError } = useSelector((state) => state, shallowEqual);
    const [isRotate, setIsRotate] = useState(false);
    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        let weather = getItem("weather");
        !weather && dispatch(getWeatherByLocation(toast));
    }, []);

    const handleSyncData = () => {
        setIsRotate(true);
        dispatch(syncData(data.name, toast))
    }

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <Error />
    ) : (
        <>
                <Navbar />
{/* 
            <Box maxW={'1400px'} m={'20px auto 5px'} p={'20px'} minH={'550px'}>
                <Grid gridTemplateRows={['100%', 'repeat(2, 1fr)', 'repeat(2, 1fr)', '30% 27.5% 38%']} gap={'30px'}>
                    <Newbox>
                        <Box color={'#5e82f4'} p={'20px'} textAlign={'center'}>
                            <Flex justify={'end'}>
                                <Icon
                                    onClick={handleSyncData}
                                    onAnimationEnd={() => { setIsRotate(false) }}
                                    className={isRotate ? "iconRotate" : undefined}
                                    cursor={'pointer'} w={'23px'} h={'23px'} as={FaSyncAlt}
                                />
                            </Flex>
                            <Heading>{data.name}</Heading>
                            <Heading fontSize={['100px', '120px', '120px', '100px', '120px']}>{Math.round(data.main.temp - 273)}<sup>o</sup>C</Heading>
                            <Heading>{data.weather[0].main}</Heading>
                        </Box>
                    </Newbox>

                    <Newbox>
                        <Grid templateRows={'50% 50%'} h={'100%'} p={'8px'}>
                            <Box py={'10px'} pl={'15%'}>
                                {['Felt Temp.', 'Humidity', 'Wind', 'Visibility', 'Max Temp.', 'Min Temp.'].map((e, i) => (
                                    <Text key={i} color={'#5e82f4'} fontWeight={500} mt={'15px'} fontSize={'18px'} >{e}</Text>
                                ))}
                            </Box>
                            
                            <Box borderRadius={'30px'} bg={'#5e82f4'} py={'10px'} pl={'15%'}>
                                <NewText>{celsius(data.main.feels_like)}<sup>o</sup> C</NewText>
                                <NewText>{data.main.humidity}%</NewText>
                                <NewText>{(data.wind.speed * 3.6).toFixed(2)} Km/h</NewText>
                                <NewText>{(data.visibility * 0.001).toFixed(2)} Km</NewText>
                                <NewText>{celsius(data.main.temp_max)}<sup>o</sup> C</NewText>
                                <NewText>{celsius(data.main.temp_min)}<sup>o</sup> C</NewText>
                            </Box>
                        </Grid>
                        
                        
                    </Newbox>
                    

                    <Newbox>
                        <Map city={data.name} />
                    </Newbox>
                </Grid>



               
            </Box > */}
            

<div class=" bg-gray-100">
  <div class="-black h-screen p-5">
    <div class=" relative row-span-2 grid h-3/5 grid-cols-5 bg-white  shadow-lg">
      <div class="row-span-2 border pl-4 pt-4 ">

      <Newbox>
                        <Box color={'#5e82f4'} p={'20px'} textAlign={'center'}>
                           
                            <Heading>{data.name}</Heading>
                            <Heading fontSize={['100px', '120px', '120px', '100px', '120px']}>{Math.round(data.main.temp - 273)}<sup>o</sup>C</Heading>
                            <Heading>{data.weather[0].main}</Heading>

                        </Box>

                    </Newbox>      </div>
                    
      <div class="row-span-1 border pl-4 pt-4 ">
      <Box py={'10px'} pl={'15%'}>
                                {['Felt Temp.', 'Humidity', 'Wind', 'Visibility', 'Max Temp.', 'Min Temp.'].map((e, i) => (
                                    <Text key={i} color={'#5e82f4'} fontWeight={500} mt={'15px'} fontSize={'18px'} >{e}</Text>
                                ))}
                            </Box>  
                            <img class="relative mr-4 inline-block h-70 w-full rounded-md object-cover object-center" alt="Image placeholder" src="/images/weather7.jpg"/>
    </div>
      <div class="row-span-2 border pl-4 pt-4 ">
      <Box borderRadius={'30px'} bg={'#5e82f4'} py={'10px'} pl={'15%'}>
                                <NewText>{celsius(data.main.feels_like)}<sup>o</sup> C</NewText>
                                <NewText>{data.main.humidity}%</NewText>
                                <NewText>{(data.wind.speed * 3.6).toFixed(2)} Km/h</NewText>
                                <NewText>{(data.visibility * 0.001).toFixed(2)} Km</NewText>
                                <NewText>{celsius(data.main.temp_max)}<sup>o</sup> C</NewText>
                                <NewText>{celsius(data.main.temp_min)}<sup>o</sup> C</NewText>
                            </Box>      </div>
    
      
      <div class="row-span-2 border pl-4 pt-4 ">
        <h4 className="text-purple-400 font-semibold">Weather News</h4>
        <img class="relative mr-4 inline-block h-20 w-full rounded-md object-cover object-center" alt="Image placeholder" src="/images/weather7.jpg"/>
        <h3 class="text-blue-700  mt-3"><a href="https://www.metoffice.gov.uk/weather/climate-change/causes-of-climate-change"><img class="relative mr-4 inline-block h-9 w-9 rounded-md object-cover object-center" alt="Image placeholder" src="weather.png"/>Causes of Climatic change</a></h3>
        <h3 class="text-blue-700 mt-3"><a href="https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/rain/april-showers"><img class="relative mr-4 inline-block h-9 w-9 rounded-md object-cover object-center" alt="Image placeholder" src="/images/weather1.jpg"/>
Showers in April</a></h3>
        <h3 class="text-blue-700 mt-3"><a href="https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/temperature/uv-levels"><img class="relative mr-4 inline-block h-9 w-9 rounded-md object-cover object-center" alt="UV" src="/images/weather2.jpeg"/>U.V Levels</a></h3>
        <h3 class="text-blue-700 mt-3"><a href="https://www.metoffice.gov.uk/weather/learn-about/weather/optical-effects/why-is-the-sky-blue"><img class="relative mr-4 inline-block h-9 w-9 rounded-md object-cover object-center" alt="Image placeholder" src="/images/weather3.jpg"/>Why Blue Sky</a></h3>
        <h3 class="text-blue-700 mt-3"><a href="https://www.metoffice.gov.uk/weather/warnings-and-advice/seasonal-advice/health-wellbeing/hot-weather-and-its-impacts"><img class="relative mr-4 inline-block h-9 w-9 rounded-md object-cover object-center" alt="Image placeholder" src="/images/weather4.jpg"/>Hot Weather & Its Impact</a></h3>
        <h3 class="text-blue-700 mt-3"><a href="https://www.metoffice.gov.uk/weather/climate-change/causes-of-climate-change"><img class="relative mr-4 inline-block h-9 w-9 rounded-md object-cover object-center" alt="Image placeholder" src="/images/weather5.jpg"/>Historical Weather Data</a></h3>
        <h3 class="text-blue-700 mt-3"><a href="https://www.accuweather.com/en/hurricane/hurricane-damage-will-increase-in-surprising-new-places-in-the-coming-decades-see-where-its-trending-higher/1489586"><img class="relative mr-4 inline-block h-9 w-9 rounded-md object-cover object-center" alt="Image placeholder" src="/images/weather6.jpg"/>Hurricane Damage</a></h3>
        <h3 class="text-blue-700 mt-3"><a href="https://www.metoffice.gov.uk/weather/climate-change/causes-of-climate-change"><img class="relative mr-4 inline-block h-9 w-9 rounded-md object-cover object-center" alt="Image placeholder" src="/images/weather1.jpg"/>Causes of Climatic change</a></h3>
        <h3 class="text-blue-700 mt-3"><a href="https://www.metoffice.gov.uk/weather/climate-change/causes-of-climate-change"><img class="relative mr-4 inline-block h-9 w-9 rounded-md object-cover object-center" alt="Image placeholder" src="/images/weather2.jpeg"/>Causes of Climatic change</a></h3>
        <div className="flex space-x-2 justify-center">
  <button type="button" className="inline-block px-10 py-2.5 bg-blue-600 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" href="https://news.abs-cbn.com/weather"><a href="/weathernews">View More</a></button>
</div>
      </div>
   
      {/* <div class="border pl-4 pt-4 ">
      <h4 className="text-purple-400">Weather Newss</h4>
      </div> */}
    </div>



    <div class="border pl-4 pt-4 ">
      <Map city={data.name} />

      </div>

          {/* <div class="flex items-center my-4 p-5 space-x-6 bg-white shadow-lg">
      <div class="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">

        <input class="bg-gray-100 outline-none" type="text" placeholder="Article name or keyword..." />
      </div>
      <div class="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
        <span>All categorie</span>

        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
    </div> */}
  </div>

</div>
        </>
    );
};






