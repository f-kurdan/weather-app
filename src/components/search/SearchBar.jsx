import React, { useState } from "react";
import SearchOptions from "./SearchOptions";

function SearchBar({getLocationData}) {

    const [inputValue, setInputValue] = useState('');
    const [submit, setSubmit] = useState('');
    const [cities, setCities] = useState([]);

    const onChange = (e) => {
        fetch(`http://autocomplete.travelpayouts.com/places2?term=${e.target.value}&locale=ru&types[]=city`)
            .then(response => response.json())
            .then((data) => setCities(data));

        setInputValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmit(inputValue);
        // здесь должен идти запрос для получения данных о погоде
    }

    const getCity = (city) => {
        setInputValue(`${city.name}, ${city.country_name}`)
    }

    return (
        <div className="searchBar">
            <form autoComplete="off">
                <button type="button" onSubmit={onSubmit} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none">
                        <path d="M14.4808 14.4808L21 21M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5C3 13.0899 5.91015 16 9.5 16Z" stroke="#1B1D1F" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </button>
                <input onChange={onChange} value={inputValue} type="search" placeholder="City or area" />
                {inputValue? <SearchOptions
                    getCity={getCity}
                    getLocationData={getLocationData}
                    inputValue={inputValue}
                    cities={cities} /> : '' }             
            </form>
        </div>
    )
}

export default SearchBar;