import React from 'react';
import style from './AirDisplay.module.css';

export default function AirDisplay({ timezone, weather, temp, wind, sun }) {
  function getSunrise() {
    const sunrise = new Date(sun.sunrise * 1000);
    const sunriseUTC = sunrise.getTime() + sunrise.getTimezoneOffset() * 60 * 1000;
    return new Date(sunriseUTC + timezone * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function getSunset() {
    const sunset = new Date(sun.sunset * 1000);
    const sunsetUTC = sunset.getTime() + sunset.getTimezoneOffset() * 60 * 1000;
    return new Date(sunsetUTC + timezone * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div className={style.airDisplay}>
      <h3 className={style.title}>AIR CONDITIONS</h3>
      {timezone && weather && temp && wind && sun ? (
        <div className={style.gridWrap}>
          <div className={style.temperature}>
            <h4>Real Feel</h4>
            <h3>{Math.round(temp.feels_like)}°C</h3>
          </div>
          <div className={style.wind}>
            <h4>Wind</h4>
            <h3>{Math.round(wind.speed * 10) / 10}km/h</h3>
          </div>
          <div className={style.sunrise}>
            <h4>Sunrise</h4>
            <h3>{getSunrise()}</h3>
          </div>
          <div className={style.humidity}>
            <h4>Humidity</h4>
            <h3>{temp.humidity}%</h3>
          </div>
          <div className={style.weather}>
            <h4>Current Weather</h4>
            <h3>{weather[0].main}</h3>
          </div>
          <div className={style.sunset}>
            <h4>Sunset</h4>
            <h3>{getSunset()}</h3>
          </div>
        </div>
      ) : null}
    </div>
  );
}
