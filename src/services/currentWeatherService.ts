import axios from 'axios';

interface QueryFields {
  lat?: string;
  lon?: string;
  exclude?: string; 
}

// const OW_BASE_URL_V3 = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${process.env.open_weather_api_key}`;

export async function getCurrentWeather({lat, lon, exclude}: QueryFields) {
  try {
    const OW_BASE_URL_V3 = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${process.env.open_weather_api_key}`;
    const response = await axios.get(OW_BASE_URL_V3);
    return response;
  } catch (error) {
    console.error(error)
  }
}

export function composeQueryFields() {
  return;
}



