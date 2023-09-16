import { useState } from 'react';
import ForecastDays from './components/ForecastDays';
import ForecastHours from './components/ForecastHours';
import SearchBar from './components/search/SearchBar';
import Temperature from './components/Temperature';

function App() {
  const [position, setPosition] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [currentLocation, setCurrentLocation] = useState({}); 

  const successCallback = (position) => {
    setPosition(position);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  const getLocationData = (city) => {
    setCurrentLocation(city);
    //setWeatherData(city.coordinates);
  }

  return (
    <div id="App">
      <SearchBar getLocationData={getLocationData} />
      <div id='location'>
        {currentLocation.name?? 'Moscow'}
      </div>
      <ForecastDays />
      <Temperature />
      <ForecastHours />
    </div>
  );
}

export default App;
