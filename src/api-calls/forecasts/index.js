import axios from 'axios';

const FORECAST_HOST = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '4540327c0fb82a25d6b1cd8a435702a8';

export async function getForecastByCity(city) {
  try {
    const res = await axios.get(FORECAST_HOST, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    return handleData(res);
  } catch (error) {
    throw Object.assign(new Error('City not found'), { status: 404 });
  }
}

export async function getForecastByCoordinates(lat, long) {
  try {
    const res = await axios.get(FORECAST_HOST, {
      params: {
        lat: lat,
        lon: long,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return handleData(res);
  } catch (error) {
    console.log(error.message);
  }
}

function handleData(data) {
  let handledData = [];
  for (let i = 1; i < 7; i++) {
    handledData.push(data.data.list[i]);
  }
  return handledData;
}
