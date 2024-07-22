import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faTint, faWind, faSun, faCloud } from '@fortawesome/free-solid-svg-icons';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="card bg-gray-800 text-white shadow-2xl p-6 rounded-lg max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-4xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6">
        <div className="flex justify-center lg:justify-center lg:w-1/3 mb-4 lg:mb-0 lg:items-center lg:relative lg:top-1/2 lg:-translate-y-1/2">
          <img src={weather.icon} alt={weather.description} className="w-24 h-24 lg:w-32 lg:h-32" />
        </div>
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">{weather.city}, {weather.country}</h2>
          <p className="text-center text-lg font-semibold mb-4 lg:text-left">{weather.description}</p>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-center lg:justify-start bg-gray-700 p-4 rounded-lg">
              <FontAwesomeIcon icon={faTemperatureHigh} className="text-2xl mr-3" />
              <p className="text-lg">Temp: {weather.temp_c}°C / {weather.temp_f}°F</p>
            </div>
            <div className="flex items-center justify-center lg:justify-start bg-gray-700 p-4 rounded-lg">
              <FontAwesomeIcon icon={faTint} className="text-2xl mr-3" />
              <p className="text-lg">Humidity: {weather.humidity}%</p>
            </div>
            <div className="flex items-center justify-center lg:justify-start bg-gray-700 p-4 rounded-lg">
              <FontAwesomeIcon icon={faWind} className="text-2xl mr-3" />
              <p className="text-lg">Wind: {weather.wind_kph} kph ({weather.wind_dir})</p>
            </div>
            <div className="flex items-center justify-center lg:justify-start bg-gray-700 p-4 rounded-lg">
              <FontAwesomeIcon icon={faWind} className="text-2xl mr-3" />
              <p className="text-lg">Gusts: {weather.gust_kph} kph</p>
            </div>
            <div className="flex items-center justify-center lg:justify-start bg-gray-700 p-4 rounded-lg">
              <FontAwesomeIcon icon={faSun} className="text-2xl mr-3" />
              <p className="text-lg">UV Index: {weather.uv}</p>
            </div>
            <div className="flex items-center justify-center lg:justify-start bg-gray-700 p-4 rounded-lg">
              <FontAwesomeIcon icon={faTemperatureHigh} className="text-2xl mr-3" />
              <p className="text-lg">Heat Index: {weather.heatindex_c}°C</p>
            </div>
            <div className="flex items-center justify-center lg:justify-start bg-gray-700 p-4 rounded-lg">
              <FontAwesomeIcon icon={faTemperatureHigh} className="text-2xl mr-3" />
              <p className="text-lg">Wind Chill: {weather.windchill_c}°C</p>
            </div>
            <div className="flex items-center justify-center lg:justify-start bg-gray-700 p-4 rounded-lg">
              <FontAwesomeIcon icon={faCloud} className="text-2xl mr-3" />
              <p className="text-lg">Cloud Cover: {weather.cloud}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
