import { useEffect, useRef, useState } from "react";

function SearchOptions({ getLocationData, getCity, toShow, cities }) {
    const listRef = useRef(null);
    const onClick = (city) => {
        getCity(city);
        getLocationData(city)
    }

    useEffect(() => {
        const onClickOutside = (e) => {
            if (listRef.current && !listRef.current.contains(e.target)) {
                const results = document.getElementById('resultsList');
                results.setAttribute("style", "display:none");
            }
        };

        document.addEventListener('click', onClickOutside, true);
        return () => {
            document.removeEventListener('click', onClickOutside, true);
        };
    }, [])

    return toShow ? (
        <ul id="resultsList" ref={listRef}>
            {cities.map(city => <li onClick={() => { onClick(city) }} key={city.city_code}>{`${city.name}, ${city.country_name}`}</li>)}
        </ul>
    ) : null;
}

export default SearchOptions;