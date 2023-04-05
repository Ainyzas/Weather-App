import React, { useState, useEffect } from 'react';
import { getWeatherByCity, getWeatherByCoordinates } from '../../api-calls/weather';
import { getForecastByCity, getForecastByCoordinates } from '../../api-calls/forecasts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import style from './CityForm.module.css';

export default function CityForm({ setWeather, setLastUpdated, setForecast }) {
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState({});
  const [doesCityExist, setDoesCityExist] = useState(true);

  useEffect(() => {
    getWeatherByCity('kaunas').then((data) => setWeather(data));
    getForecastByCity('kaunas').then((data) => setForecast(data));
    handleSetLastUpdated();
  }, []);

  useEffect(() => {
    if (coordinates.lat && coordinates.long) {
      getWeatherByCoordinates(coordinates.lat, coordinates.long).then((data) => setWeather(data));
      getForecastByCoordinates(coordinates.lat, coordinates.long).then((data) => setForecast(data));
      handleSetLastUpdated();
    }
  }, [coordinates, setWeather]);

  function handleSetLastUpdated() {
    setLastUpdated(formatDate(new Date()));
  }

  function formatDate(date) {
    const options = { weekday: 'long' };
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const day = date.toLocaleDateString(undefined, options);

    return `${day} ${time}`;
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      if (city) {
        setWeather(await getWeatherByCity(city));
        setForecast(await getForecastByCity(city));
        setDoesCityExist(true);
        handleSetLastUpdated();
      }
    } catch (error) {
      if (error.status === 404) {
        setDoesCityExist(false);
      }
    }
  }

  function currentLocationHandler(e) {
    e.preventDefault();
    setDoesCityExist(true);
    setCity('');
    navigator.geolocation.getCurrentPosition((response) => {
      setCoordinates({
        lat: response.coords.latitude,
        long: response.coords.longitude,
      });
    });
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={style.searchBar}>
        <input type="text" id="city" value={city} placeholder="Enter city" onChange={(e) => setCity(e.target.value)} />
        <button className={style.searchButton} type="submit">
          <FontAwesomeIcon icon={faLocationDot} /> Search
        </button>
        <button className={style.locationButton} type="button" onClick={currentLocationHandler}>
          <FontAwesomeIcon icon={faLocationCrosshairs} /> Current Location
        </button>
      </div>
      <p style={{ display: doesCityExist ? 'none' : 'block' }}>This city does not exist</p>
    </form>
  );
}
