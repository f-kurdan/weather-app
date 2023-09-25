function SearchOptions({ getLocationData, toShow, getCity, cities }) {
    const onClick = (city) => {
        //передаем город в SearchBar
        getCity(city);
        //передаем город в App
        getLocationData(city)
        //скрываем список городов
    }

    console.log(toShow)
    return toShow ? (
        <ul id="resultsList">
            {cities.map(city => <li onClick={() => { onClick(city) }} key={city.id}>
                {`${city.name}, ${city.country_name}`}
            </li>)}
        </ul>
    ) : null;
}

export default SearchOptions;