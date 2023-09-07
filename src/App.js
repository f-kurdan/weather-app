import './App.css';
import SearchBar from './components/SearchBar';
import Temperature from './components/Temperature';

function App() {
  return (
    <div className="App">
      <SearchBar/>
      <div id='location'>
        Moscow
      </div>
      <Temperature/>
    </div>
  );
}

export default App;
