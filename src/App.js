import { useEffect, useState } from 'react';
import ForecastDays from './components/ForecastDays';
import ForecastHours from './components/ForecastHours';
import SearchBar from './components/search/SearchBar';
import Temperature from './components/Temperature';

function App() {
  //по умолчанию передаем Москву
  const [intialLocation, setIntialLocation] = useState({
    name: "Moscow",
    countryName: "Russia",
    latitude: 55.755786,
    longitude: 37.617633
  });
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState({});

  useEffect(() => {
    //#region получаем геолокацию юзера
    const successCallback = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      //получаем название города/страны по координатам
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ru`)
        .then(response => response.json())
        .then(result => {
          console.log(result.city)
          setIntialLocation({
            name: result.city,
            countryName: result.countryName,
            latitude: lat,
            longitude: lon
          })
        });
    };

    const errorCallback = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    //#endregion
  }, []);
 //может это сделать внутри Temp?
  useEffect(() => {
    const latitude = location.latitude ?? intialLocation.latitude;
    const longitude = location.longitude ?? intialLocation.longitude;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current_weather=true&timezone=Europe%2FMoscow&models=best_match`)
      .then(respone => respone.json())
      .then(result => {        
        setWeatherData(result)
        console.log(result.current_weather)
        console.log(`weather is ${weatherData}`)});

  }, [intialLocation, location])

  const getLocationData = (city) => {
    // setLocation(city);
    //здесь нужно будет получит данные по местоположению, потом по выбранному городу или данные по умолчанию(по Москве) если город  не выбран
    //а еще добавить возможность откатиться к данным по местоположению
    //setWeatherData(city.coordinates);
  }

  return (
    <div id="App">
      <SearchBar getLocationData={getLocationData} />
      <div id='location'>
        {location.name ?? intialLocation.name}
      </div>
      <ForecastDays />
      <Temperature
        currentTemperature={weatherData?.current_weather?.temperature} />
      <ForecastHours />
    </div>
  );
}

export default App;
