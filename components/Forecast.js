// components/Forecast.js
import React from 'react';

const Forecast = ({ forecast }) => {
  return (
    <div className="forecast grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {forecast.map((day, index) => (
        <div key={index} className="forecast-card bg-gray-700 text-white shadow-lg p-4 rounded-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">{day.date}</h3>
          <div className="flex items-center mb-2">
            <img src={day.icon} alt={day.description} className="w-12 h-12 md:w-16 md:h-16" />
            <p className="ml-2 text-sm md:text-base">{day.description}</p>
          </div>
          <p className="text-xs md:text-sm">Temp: {day.temp}°C</p>
          <p className="text-xs md:text-sm">Humidity: {day.humidity}%</p>
          <p className="text-xs md:text-sm">Wind: {day.wind} kph</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
