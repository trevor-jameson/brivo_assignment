import axios from 'axios';

const BASE_GEOCODE_API_V1_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const OW_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

if (OW_API_KEY === undefined && process.env.NODE_ENV === 'development') {
  throw Error('Open Weather API Key Not Found');
}

// NOTE: Country codes adhere tos ISO 3166 standard.
interface LocationQueryFields {
  name: string;
  stateCode?: string;
  countryCode?: string;
  limit?: number;
}

interface GeoCodeResponse {
  name: string;
  lat: string;
  lon: string;
  country: string;
  state?: string;
}

export async function getCityConvertedToGeocode(query: LocationQueryFields) {
  try {
    const params = generateQueryParams(query);
    const url = `${BASE_GEOCODE_API_V1_URL}${params}&appid=${OW_API_KEY}`
    const response = await axios.get(url);
    
    // NOTE: Only returning the first of 0+ matching cities. Can use limit param if intended behavior.
    // May build out result selection dropdown feature for user
    return response.data[0];
  } catch (error) {
    console.error(error)
  }
}

export async function getZipcodeConvertedToGeocode() {
}

export function generateQueryParams({ name, stateCode, countryCode, limit = 5}: LocationQueryFields) {
  // NOTE: stateCode is only required with USA countryCode
  if (stateCode !== undefined) stateCode = `${stateCode},`
  return `?q=${name},${stateCode}${countryCode}&limit=${limit}`
}

