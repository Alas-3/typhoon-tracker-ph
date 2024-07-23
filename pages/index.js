import React, { useEffect, useState } from 'react';
import { fetchWeather, fetchForecast } from '../utils/fetchWeather';
import WeatherCard from '../components/WeatherCard';
import Forecast from '../components/Forecast';
import TyphoonBanner from '../components/TyphoonBanner';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [typhoons, setTyphoons] = useState([]);
  const [location, setLocation] = useState(null);
  const [alert, setAlert] = useState('');

  const fetchData = async (city) => {
    try {
      const weatherData = await fetchWeather(city);
      setWeather(weatherData);

      const forecastData = await fetchForecast(city);
      console.log('Fetched forecast data:', forecastData); // Log to check the data
      setForecast(forecastData);

      if (weatherData.description.toLowerCase().includes('rain')) {
        setAlert('🌧️ It\'s raining in your area ☔');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTyphoonData = async () => {
    try {
      const response = await fetch('/api/scrape-pagasa');
      if (!response.ok) {
        throw new Error('Failed to fetch typhoon data');
      }
      const data = await response.json();
      setTyphoons(data);
    } catch (error) {
      console.error('Failed to fetch typhoon data:', error);
    }
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        });
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetch(`https://api.weatherapi.com/v1/search.json?key=${process.env.API_KEY}&q=${location.latitude},${location.longitude}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0 && data[0].name) {
            fetchData(data[0].name);
          } else {
            fetchData('Manila');
          }
        });

      // Fetch typhoon data from PAGASA API route
      fetchTyphoonData();
    }
  }, [location]);

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-900 text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">TyphoonTracker</h1>
      {typhoons.length > 0 && (
        <TyphoonBanner 
          typhoons={typhoons} 
          className="bg-red-600 text-white p-4 rounded-lg mb-6 shadow-lg"
        />
      )}
      {alert && (
        <div className="bg-blue-300 text-blue-900 p-4 rounded-lg mb-6 shadow-md">
          {alert}
        </div>
      )}
      {weather && <WeatherCard weather={weather} />}
      <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-6">3-Day Forecast</h2>
      <Forecast forecast={forecast} />
    </div>
  );
};

export default Home;
