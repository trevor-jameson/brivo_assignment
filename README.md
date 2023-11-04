## Weather app created in React using the OpenWeatherMap API. Developed as a take-home coding assignment for Brivo's Software Engineer assessment.

#### Project Todos
- Create login screen and redirect if not logged in
- Display 5 day highs and lows for each city on forecast chart
- Validate that 5 day forecast data is being correctly parsed by time segment in calculateDailyTemps()
- Create user dropdown to select from 2 - 5 possible city options in add city flow
- Redirect to login page on logout
- Cache all selectedCities in localStorage to persist through page reloads without backend DB
- Install and configure linting (airbnb style guide)
- Disable explicit "any" in tsconfig