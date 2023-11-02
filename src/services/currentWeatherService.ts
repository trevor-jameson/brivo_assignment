import axios from 'axios';

import { currentWeatherTransformer, CurrentWeatherData } from '../utils/requestTransformers';

const BASE_CURRENT_WEATHER_API_V2_5_URL = `https://api.openweathermap.org/data/2.5/weather`;
const OW_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

if (OW_API_KEY === undefined && process.env.NODE_ENV === 'development') {
  throw Error('Open Weather API Key Not Found');
}

interface WeatherQueryFields {
  name: string;
  lat: string;
  lon: string;
  units?: string;
  mode?: string; 
  lang?: string;
}

export async function getCurrentWeatherService({name, lat, lon}: WeatherQueryFields) {
  try {
    const url = BASE_CURRENT_WEATHER_API_V2_5_URL + `?lat=${lat}&lon=${lon}&units=imperial&appid=${OW_API_KEY}`;

    const response = await axios.get(url);
    const transformedResponse: CurrentWeatherData = currentWeatherTransformer(response.data);

    return transformedResponse;
  } catch (error) {
    console.error(`Request failed for ${name} city current weather`, error)
  }
}



