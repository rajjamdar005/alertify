"use client";
import { useState, useEffect } from 'react';
import { getWeather } from 'open-meteo-js';

const WeatherWidget = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeather({
          latitude,
          longitude,
          hourly: ['temperature_2m', 'precipitation_probability'],
          daily: ['temperature_2m_max', 'temperature_2m_min', 'precipitation_sum'],
        });
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div>
      <h2>Current Weather</h2>
      <p>Temperature: {weatherData.current_weather.temperature}°C</p>
      <p>Precipitation Probability: {weatherData.hourly.precipitation_probability[0]}%</p>

      <h2>Daily Forecast</h2>
      <p>
        High: {weatherData.daily.temperature_2m_max[0]}°C, Low: {weatherData.daily.temperature_2m_min[0]}°C
      </p>
      <p>Total Precipitation: {weatherData.daily.precipitation_sum[0]}mm</p>
    </div>
  );
};

export default WeatherWidget;