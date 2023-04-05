import React, { useState } from 'react';
import CityForm from './components/CityForm/CityForm';
import TemperatureDisplay from './components/TemperatureDisplay/TemperatureDisplay';
import AirDisplay from './components/AirDisplay/AirDisplay';
import ForecastDisplay from './components/ForecastDisplay/ForecastDisplay';
import './App.css';

function App() {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');

  return (
    <div className="weatherContainer">
      <CityForm setWeather={setWeather} setForecast={setForecast} setLastUpdated={setLastUpdated} />
      <TemperatureDisplay temp={weather.main} date={lastUpdated} city={weather.name} image={weather.weather} />
      <ForecastDisplay forecast={forecast} />
      <AirDisplay
        timezone={weather.timezone}
        temp={weather.main}
        weather={weather.weather}
        wind={weather.wind}
        sun={weather.sys}
      />
    </div>
  );
}

export default App;
