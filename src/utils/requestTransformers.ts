

interface GeoCodeData {
  
}

export function geocodingTransformer() {

}

export interface CurrentWeatherData {
  id: number;
  name: string;
  country: string;
  currentTemp: string;
  maxTemp: string;
  minTemp: string;
  currentWeatherConditions: string[];
  lat: string;
  lon: string;
}

export function currentWeatherTransformer(data: any): CurrentWeatherData {

  const { id, name, coord: { lat, lon}, weather, main: { temp, temp_min, temp_max}, sys: { country }} = data;

  return {
    id,
    name,
    country,
    currentTemp: temp,
    maxTemp: temp_max,
    minTemp: temp_min,
    currentWeatherConditions: weather.map((desc: any) => desc.main),
    lat,
    lon,
  }
}

export interface ForecastData {
  name: string;
  country: string;
  lat: string;
  lon: string;
  currentTemp: number;
  currentWeatherConditions: string;
  forecasts: any;
}

export function fiveDayForecastTransformer(data: any): ForecastData {

  const {currentTemp, currentWeatherConditions, forecasts} = calculateDailyTemps(data);
  const { name, country, coord: {lat, lon} } = data.city;

  return {
    name,
    country,
    lat: String(lat),
    lon: String(lon),
    currentTemp,
    currentWeatherConditions,
    forecasts,
  }
}

function calculateDailyTemps({ list }: any) {
  const dailyRecords: any = {}

  dailyRecords.currentTemp = list[0].main.temp;
  dailyRecords.currentWeatherConditions = list[0].weather[0].main;

  // NOTE: Forecast data from API begins with upcoming day in UTC
  dailyRecords.forecasts = {};

  for (const segment of list) {

    const segmentDate: any = new Date(segment.dt_txt).getDate();

    if (!(segmentDate in dailyRecords)) {
      dailyRecords.forecasts[segmentDate] = {
        maxTemp: -Infinity,
        minTemp: Infinity,
        weatherCondition: new Set(),
      }
    };

    dailyRecords.forecasts[segmentDate].maxTemp = Math.max(dailyRecords.forecasts[segmentDate].maxTemp, segment.main.temp_max );
    dailyRecords.forecasts[segmentDate].minTemp = Math.min(dailyRecords.forecasts[segmentDate].minTemp, segment.main.temp_min );

    for (const weatherCondition of segment.weather) {
      dailyRecords.forecasts[segmentDate].weatherCondition.add(weatherCondition.main)
    }
  }

  return dailyRecords;
}