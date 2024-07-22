// utils/fetchWeather.js
const API_KEY = process.env.API_KEY;

export const fetchWeather = async (city) => {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();
  return {
    city: data.location.name,
    country: data.location.country,
    description: data.current.condition.text,
    temp_c: data.current.temp_c,
    temp_f: data.current.temp_f,
    icon: data.current.condition.icon,
    humidity: data.current.humidity,
    wind_kph: data.current.wind_kph,
    wind_dir: data.current.wind_dir,
    gust_kph: data.current.gust_kph,
    uv: data.current.uv,
    heatindex_c: data.current.heatindex_c,
    windchill_c: data.current.windchill_c,
    cloud: data.current.cloud,
  };
};

export const fetchForecast = async (city, days = 3) => {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}`);
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    const data = await response.json();
    console.log(data); // Log the data to inspect the structure
    return data.forecast.forecastday.map((day) => ({
      date: day.date,
      description: day.day.condition.text,
      temp: day.day.avgtemp_c,
      humidity: day.day.avghumidity,
      wind: day.day.maxwind_kph,
      icon: day.day.condition.icon,
    }));
  };
  

/*export const fetchTyphoons = async () => {
  const response = await fetch(`https://api.weatherapi.com/v1/alerts.json?key=${API_KEY}&q=Philippines`);
  if (!response.ok) {
    throw new Error('Failed to fetch typhoon data');
  }
  const data = await response.json();
  return data.alerts.filter(alert => alert.event.toLowerCase().includes('typhoon'));
};*/
