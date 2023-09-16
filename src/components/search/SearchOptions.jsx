import { useState } from "react";

function SearchOptions({getLocationData, getCity, inputValue, cities }) {
    const [data, setData] = useState({});
    const onClick = (city) => {
        getCity(city);
        console.log(city.coordinates);
        getLocationData(city)
    }

    return (
        <ul>
            {inputValue ? cities.map(city =>
                <li onClick={() => {onClick(city)}} key={city.city_code}>{`${city.name}, ${city.country_name}`}</li>)
                : []}
        </ul>
    )
}

export default SearchOptions;