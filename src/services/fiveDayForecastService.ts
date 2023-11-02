import axios from 'axios';

import { fiveDayForecastTransformer, ForecastData } from '../utils/requestTransformers';

const BASE_ONECALL_API_V3_URL = `https://api.openweathermap.org/data/2.5/forecast`;
const OW_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

if (OW_API_KEY === undefined && process.env.NODE_ENV === 'development') {
  throw Error('Open Weather API Key Not Found');
}

interface FiveDayForecastQuery {
  name: string;
  lat: string;
  lon: string;
  units?: string;
  mode?: string; 
  cnt?: string;
  lang?: string;
}


export async function getFiveDayForecastService({name, lat, lon}: FiveDayForecastQuery) {
  try {
    const url = BASE_ONECALL_API_V3_URL + `?lat=${lat}&lon=${lon}&units=imperial&appid=${OW_API_KEY}`;

    const response = await axios.get(url);
    const transformedResponse: ForecastData = fiveDayForecastTransformer(response.data)
    
    return transformedResponse;
  } catch (error) {
    console.error(`Request failed for ${name} city forecast`, error)
  }
}



