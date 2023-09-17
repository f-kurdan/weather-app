import { useState } from 'react';
import ForecastDays from './components/ForecastDays';
import ForecastHours from './components/ForecastHours';
import SearchBar from './components/search/SearchBar';
import Temperature from './components/Temperature';

function App() {
  const [intialLocation, setIntialLocation] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState({});

  const successCallback = (position) => {
    setIntialLocation({ 
      latitude: position.coords.latitude, 
      longitude: position.coords.longitude 
    });
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  const getLocationData = (city) => {
    setLocation(city);
    //здесь нужно будет получит данные по местоположению, потом по выбранному городу или данные по умолчанию(по Москве) если город  не выбран
    //а еще добавить возможность откатиться к данным по местоположению
    //setWeatherData(city.coordinates);
  }

  return (
    <div id="App">
      <SearchBar getLocationData={getLocationData} />
      <div id='location'>
        {location.name ?? 'Moscow'}
      </div>
      <ForecastDays />
      <Temperature />
      <ForecastHours />
    </div>
  );
}

export default App;
