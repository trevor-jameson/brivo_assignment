import { useEffect, useState } from 'react'
import { Typography, Grid, Button, FormControl, Input, InputLabel } from "@mui/material";

import { getCurrentWeatherService,  } from '../services/currentWeatherService';
import { getCityConvertedToGeocode } from '../services/geocodingService';

interface City {
  id: number;
  name: string;
  lat: string;
  lon: string;
  country: string;
  state: string;
}

export default function Dashboard() {

  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [citiesCurrentWeather, setCitiesCurrentWeather] = useState<any>([]);
  const [newCityName, setNewCityName] = useState('');

  
  useEffect(function() {
    addSampleCity();
    const cities = loadCitiesFromLocalStorage();
    requestWeatherData(cities);
  }, []) 

  // NOTE: This implemtation breaks the React data standard and is insecure. However, it's necessary to save user data between sessions without a backend.
  function loadCitiesFromLocalStorage(): City[] {
    const prevSelectedCities: string | null = window.localStorage.getItem('cities')
    const parsedPrevCities: City[] = prevSelectedCities === null ? [] : JSON.parse(prevSelectedCities);
    setSelectedCities(parsedPrevCities);
    return parsedPrevCities;
  }

  // Sample city data for testing purposes. Must be disabled to use first-login workflow.
  function addSampleCity() {
    const cities: City[] = [{
      'id': 2643743,
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
  async function requestWeatherData(cities: City[]) {
    const weatherData = [];

    for (const city of cities) {
      const result = await getCurrentWeatherService(city);
      weatherData.push(result);
    }

    setCitiesCurrentWeather(weatherData);
  }
  
  async function addCity() {
    const name = newCityName.toLowerCase();
    const isInSelectedCities = selectedCities.find((city: City) => city.name.toLowerCase() === name);
    if (!isInSelectedCities && name.length > 0) {
      const geoLocatedCity = await getCityConvertedToGeocode({name});
      const weatherData = await getCurrentWeatherService(geoLocatedCity);
      setCitiesCurrentWeather((cities: City[]) => {
        return [...cities, weatherData];
      })
    }
    setNewCityName('');
  }

  function removeCity(id: number) {

    setSelectedCities((cities: City[]) => {
      return cities.filter((city: City) => !(city.id === id));
    });

    setCitiesCurrentWeather((cities: any) => {
      return cities.filter((city: any) => !(city.id === id));
    })

  }

  return (
    <Grid id='dashboard' container spacing={2} sx={{padding: '3em'}}>
      <Grid item sx={{margin: '5em'}}>
      <FormControl>
        <InputLabel htmlFor="cityName">City Name</InputLabel>
        <Input onChange={(e) => setNewCityName(e.target.value)}/>
        <Button onClick={addCity}>Add City +</Button>
      </FormControl>

        
      </Grid>
  
      {
        citiesCurrentWeather.map(({id, name, country, currentTemp, currentWeatherConditions, maxTemp, minTemp}: any) => {
          return (
            <Grid key={id} item xs={6} md={8}>
              <Typography>City: {name}, {country}</Typography>
              <Typography>Current Temperature: {currentTemp} °F</Typography>
              <Typography>Daily High: {maxTemp} °F</Typography>
              <Typography>Daily Low: {minTemp} °F</Typography>
              <Typography>Weather Conditions: {currentWeatherConditions.join(', ')}</Typography>
              <Button onClick={() => removeCity(id)}>Remove City -</Button>
          </Grid>
          );
        })
      }
    </Grid>
  )
}