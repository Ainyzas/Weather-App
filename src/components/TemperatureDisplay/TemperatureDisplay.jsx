import React from 'react';
import style from './TemperatureDisplay.module.css';

const ICON_URL = `https://openweathermap.org/img/wn/`;

export default function TemperatureDisplay({ temp, date, city, image }) {
  return (
    <div className={style.temperatureDisplay}>
      {temp ? (
        <>
          <div className={style.infoFlex}>
            <div>
              <h2>{city}</h2>
              <h5>Updated: {date}</h5>
            </div>
            <div>
              <h1>{Math.round(temp.temp)}°C</h1>
              <h5>
                {Math.round(temp.temp_min * 10) / 10}°C/{Math.round(temp.temp_max * 10) / 10}°C
              </h5>
            </div>
          </div>
          <div className={style.image}>
            <img src={ICON_URL + image[0].icon + '@4x.png'} alt="" />
          </div>
        </>
      ) : null}
    </div>
  );
}
