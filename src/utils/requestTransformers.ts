import fiveDayForecastApiResponse from '../tests/sample_data/fiveDayForecastApiResponse.json'

interface GeoCodeResponse {
  
}

export function geocodingTransformer() {

}

interface FiveDayForecastResponse {

}

export function fiveDayForecastTransformer(data: any) {
  const {currentTemp, maxTemp, minTemp, currentWeatherCondition} = calculateDailyTemps(data);
  const { name, country, coord: {lat, lon} } = data.list;
  return {
    name,
    country,
    lat: String(lat),
    lon: String(lon),
    currentTemp,
    maxTemp,
    minTemp,
    currentWeatherCondition,

  }
}

function calculateDailyTemps({ list }: any) {
  const dailyRecord: any = {}

  dailyRecord.currentTemp = list[0].main.temp;
  dailyRecord.currentWeatherCondition = list[0].weather[0].main

  for (const segment of list) {

    const segmentDate: any = new Date(segment.dt_txt).getDate();

    if (!(segmentDate in dailyRecord)) {

      dailyRecord[segmentDate] = {
        maxTemp: -Infinity,
        minTemp: Infinity,
        weatherCondition: new Set(),
      }
    };

    dailyRecord[segmentDate].maxTemp = Math.max(dailyRecord[segmentDate].maxTemp, segment.main.temp_max );
    dailyRecord[segmentDate].minTemp = Math.min(dailyRecord[segmentDate].minTemp, segment.main.temp_min );

    for (const weatherCondition of segment.weather) {
      dailyRecord[segmentDate].weatherCondition.add(weatherCondition.main)
    }
  }

return dailyRecord;
}