import React from 'react';
import style from './ForecastDisplay.module.css';

const ICON_URL = `https://openweathermap.org/img/w/`;

export default function ForecastDisplay({ forecast }) {
  return (
    <div className={style.container}>
      <h3 className={style.title}>TODAY'S FORECAST</h3>
      <div className={style.forecast}>
        {forecast.map((entry, index) => {
          return (
            <div className={style.forecastCard} key={index}>
              <h5>{new Date(entry.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h5>
              <img src={ICON_URL + entry.weather[0].icon + '.png'} alt={entry.weather[0].description} />
              <h4>{Math.round(entry.main.temp)}°C</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
