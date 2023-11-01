import axios from 'axios';


const BASE_ONECALL_API_V3_URL = `https://api.openweathermap.org/data/3.0/onecall`;
const OW_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

if (OW_API_KEY === undefined && process.env.NODE_ENV === 'development') {
  throw Error('Open Weather API Key Not Found');
}

interface WeatherQueryFields {
  lat: string;
  lon: string;
  exclude?: string; 
  units?: string;
}


export async function getCurrentWeather({lat, lon, exclude}: WeatherQueryFields) {
  try {
    const url = BASE_ONECALL_API_V3_URL + `?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${process.env.open_weather_api_key}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error(error)
  }
}

export function composeQueryFields() {
  return;
}



