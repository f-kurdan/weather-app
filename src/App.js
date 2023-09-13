import ForecastDays from './components/ForecastDays';
import ForecastHours from './components/ForecastHours';
import SearchBar from './components/SearchBar';
import Temperature from './components/Temperature';

function App() {
  return (
    <div id="App">
      <SearchBar/>
      <div id='location'>
        Moscow
      </div>
        <ForecastDays/>
      <Temperature/>
      <ForecastHours/>
    </div>
  );
}

export default App;
