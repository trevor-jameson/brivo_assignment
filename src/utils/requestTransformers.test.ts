import fiveDayForecastResponse from '../tests/sample_data/fiveDayForecastApiResponse.json';

import {ForecastData, calculateDailyTemps } from '../utils/requestTransformers';

describe("calculateDailyTemps", () => {
  test("", () => {
    const result = calculateDailyTemps(fiveDayForecastResponse);
  })
})