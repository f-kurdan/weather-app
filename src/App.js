import { useEffect, useState } from 'react';
import ForecastDays from './components/ForecastDays';
import ForecastHours from './components/ForecastHours';
import SearchBar from './components/search/SearchBar';
import Temperature from './components/Temperature';

function App() {
  //по умолчанию передаем Москву
  const [intialLocation, setIntialLocation] = useState({
    name: "Earth",
    countryName: "Milky Way",
    latitude: 55.755786,
    longitude: 37.617633
  });
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState({});

  useEffect(() => {
    //#region получаем геолокацию юзера
    const successCallback = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      //получаем название города/страны по координатам
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`)
        .then(response => response.json())
        .then(result => {
          setIntialLocation({
            name: result.city,
            countryName: result.countryName,
            latitude: latitude,
            longitude: longitude,
          })
        });
      //здесь обращаемся за данными о погоде
      setWeather(latitude, longitude, setWeatherData);
    };

    const errorCallback = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    //#endregion
  }, []);

  useEffect(() => {
    const latitude = location.latitude;
    const longitude = location.longitude;

    setWeather(latitude, longitude, setWeatherData);
  }, [location])

  const getLocationData = (city) => {
    setLocation({
      name: city.name,
      countryName: city.country_name,
      latitude: city.coordinates.lat,
      longitude: city.coordinates.lon,
    });
  }
  //а еще добавить возможность откатиться к данным по местоположению
  //setWeatherData(city.coordinates);

  return (
    <div id="App">
      <SearchBar getLocationData={getLocationData} />
      <div id='location'>
        {`${location.name ?? intialLocation.name}, ${location.countryName ?? intialLocation.countryName}`}
      </div>
      <ForecastDays />
      <Temperature
        currentTemperature={weatherData?.current_weather?.temperature?? "--"}
        weathercode={weatherData?.current_weather?.weathercode} />
      <ForecastHours weatherData={weatherData} />
    </div>
  );
}

function setWeather(latitude, longitude, setWeatherData) {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current_weather=true&timezone=auto&models=best_match`)
    .then(respone => respone.json())
    .then(result => setWeatherData(result));
}

export default App;
