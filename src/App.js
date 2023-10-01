import { useCallback, useEffect, useState } from 'react';
import ForecastDays from './components/forecast/dailyForecast/ForecastDays'
import ForecastHours from './components/forecast/hourlyForecast/ForecastHours';
import SearchBar from './components/search/SearchBar';
import Temperature from './components/temperature/Temperature';

function App() {
  //по умолчанию передаем Москву
  const [initialLocation, setInitialLocation] = useState({
    name: "Earth",
    countryName: "Milky Way",
    latitude: 55.755786,
    longitude: 37.617633
  });
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState({});
  const [fontSize, setFontSize] = useState("70px");

  useEffect(() => {
    const locationData = localStorage.getItem("WEATHER_APP_LOCATION_STATE");
    const parsedLocationData = JSON.parse(locationData);
    if (parsedLocationData) {
      setLocation(parsedLocationData);
    } else {      
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
    //#region получаем геолокацию юзера
    const successCallback = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      //получаем название города/страны по координатам
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`)
        .then(response => response.json())
        .then(result => {
          setInitialLocation({
            name: result.city,
            countryName: result.countryName,
            latitude: latitude,
            longitude: longitude,
          });

          const name = `${result.city}, ${result.countryName}`;
          setLocationNameFontSize(name, setFontSize);          
        });
      //здесь обращаемся за данными о погоде
      setWeather(latitude, longitude, setWeatherData);
    };

    const errorCallback = (error) => {
      console.log(error);
    };
    //#endregion
  }, []);

  useEffect(() => {
    const latitude = location.latitude;
    const longitude = location.longitude;

    setWeather(latitude, longitude, setWeatherData);
    
    const name = `${location?.name}, ${location?.countryName}`;
    setLocationNameFontSize(name, setFontSize);
  }, [location])

  const getLocationData = useCallback((cityData) => {
    if (cityData?.name + cityData?.country_name !== initialLocation.name + initialLocation.countryName) {
      const city = {
        name: cityData?.name,
        countryName: cityData?.country_name,
        latitude: cityData?.coordinates.lat,
        longitude: cityData?.coordinates.lon,
      };
      
      localStorage.setItem("WEATHER_APP_LOCATION_STATE", JSON.stringify(city));
      setLocation(city);
    }
  }, [])
  //а еще добавить возможность откатиться к данным по местоположению
  //setWeatherData(city.coordinates);
  return (
    <div id="App">
      <SearchBar getLocationData={getLocationData} />
      <div style={{"fontSize": fontSize}} id='location'>
        {`${location.name ?? initialLocation.name}, ${location.countryName ?? initialLocation.countryName}`}
      </div>
      <ForecastDays 
        weatherData={weatherData}
        location={`${location.name ?? initialLocation.name}, ${location.countryName ?? initialLocation.countryName}`}
      />
      <Temperature weatherData={weatherData}/>
      <div id='houyrly_forecast_title'>ПРОГНОЗ НА СЛЕДУЮЩИЕ 10 ЧАСОВ</div>
      <ForecastHours weatherData={weatherData} />
    </div>
  );
}

function setWeather(latitude, longitude, setWeatherData) {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode,uv_index,is_day,apparent_temperature&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=auto&models=best_match`)
    .then(respone => respone.json())
    .then(result => setWeatherData(result));
}

function setLocationNameFontSize(fullName, setFontSize) {
  if (fullName.length < 16) {
    setFontSize("70px");
  }
  else if (fullName.length < 24) {
    setFontSize("48px")
  }
  else {
    setFontSize("35px")
  }
}

export default App;
