import axios from 'axios';

const WEATHER_HOST = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '4540327c0fb82a25d6b1cd8a435702a8';

export async function getWeatherByCity(city) {
  try {
    const res = await axios.get(WEATHER_HOST, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return res.data;
  } catch (error) {
    throw Object.assign(new Error('City not found'), { status: 404 });
  }
}

export async function getWeatherByCoordinates(lat, long) {
  try {
    const res = await axios.get(WEATHER_HOST, {
      params: {
        lat: lat,
        lon: long,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
}
