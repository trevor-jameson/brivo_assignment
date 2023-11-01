import { useEffect, useState } from 'react'
import { Typography } from "@mui/material";

import { getFiveDayForecast } from '../services/fiveDayForecastService';

export default function Dashboard() {

  const [selectedCities, setSelectedCities] = useState<any>([]);
  const [fiveDayForecast, setFiveDayforcast] = useState<any>([]);

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
      const result = await getFiveDayForecast(city);
      weatherData.push(result);
    }

    setFiveDayforcast(weatherData);
  }

  useEffect(function() {
    addSampleCity()
    loadCitiesFromLocalStorage()
    requestWeatherData()
  }, []) 

  return (
    <div id='dashboard'>
      {
        selectedCities.map((city: any) => (
          <Typography key={city.name}>{city.name}</Typography>
        ))
      }
    </div>
  )
}