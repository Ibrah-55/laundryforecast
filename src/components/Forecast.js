import { Box,  Grid,  useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getItem } from "../helpers/sessionStorage";
import { getWeatherByLocation} from "../redux/actions";
import { Error } from "./Error";
import { Loading } from "./Loading";

import { Forcast } from "./Forcast";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

export const Forecast = () => {

    const { isLoading, weatherData:  forcastData, isError } = useSelector((state) => state, shallowEqual);
    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        let weather = getItem("weather");
        !weather && dispatch(getWeatherByLocation(toast));
    }, []);

  console.log("forecast data is ", forcastData)
    return isLoading ? (
        <Loading />
    ) : isError ? (
        <Error />
    ) : (
        <>
        <Navbar />
            <Box maxW={'1400px'} m={'20px auto 5px'} p={'20px'} minH={'550px'}>
            

                {/* <Grid mt={'40px'} templateRows={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)', 'repeat(8, 1fr)']} gap={'20px'}>
                    {Object.keys(forcastData).map((e, i) => <Forcast key={i} data={e} />)}
                
                </Grid> */}

               
            </Box >
        </>
    );
};






