import { useEffect, useState } from 'react'
import { Typography, Grid  } from "@mui/material";

import { getFiveDayForecastService } from '../services/fiveDayForecastService';

import { ForecastData } from '../utils/requestTransformers';

export default function Forecasts() {

  const [selectedCities, setSelectedCities] = useState<any>([]);
  const [fiveDayForecasts, setFiveDayforcast] = useState<any>([]);

  // NOTE: This implemtation breaks the React data standard and is insecure. However, it's necessary to save user data between sessions without a backend.
  function loadCitiesFromLocalStorage() {
    let prevSelectedCities = window.localStorage.getItem('cities')
    prevSelectedCities = prevSelectedCities === null ? [] : JSON.parse(prevSelectedCities);
    setSelectedCities(prevSelectedCities);
  }

  // Sample city data for testing purposes. Must be disabled to use first-login workflow.
  function addSampleCity() {
    const cities = [{
      'name': 'London',
      'lat':'51.5073219',
      'lon':'-0.1276474',
      'country':'GB',
      'state':'England'
    }]

    const stringifiedCities = JSON.stringify(cities)
    window.localStorage.setItem('cities', stringifiedCities)
  }

  // Make successive requests for forecast data of each selected city. Batch city data unavailable at free tier.
  async function requestWeatherData() {
    const weatherData = [];

    for (const city of selectedCities) {
      const result = await getFiveDayForecastService(city);
      weatherData.push(result);
    }

    setFiveDayforcast(weatherData);
  }

  useEffect(function() {
    addSampleCity();
    loadCitiesFromLocalStorage();
    requestWeatherData();
  }, []) 

  const currentDate: string = new Date().getDate().toString();

  return (
    <Grid id='Forecasts' container spacing={2}>
      {
        fiveDayForecasts.map((data: any) => {
          return (
            <Grid key={data.name} item xs={6} md={8}>
              <Typography>City: {data.name}, {data.country}</Typography>
              <Typography>Current Temperature: {data.currentTemp}</Typography>
              <Typography>Daily High: {data.forecast[currentDate].maxTemp}</Typography>
              <Typography>Daily Low: {data.forecast[currentDate].minTemp}</Typography>
              <Typography>Weather Conditions: {data.currentWeatherCondition}</Typography>

          </Grid>
          );
        })
      }
    </Grid>
  )
}