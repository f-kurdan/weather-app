import React, { useEffect, useState, useRef, memo } from "react";
import SearchOptions from "./SearchOptions";

const SearchBar = memo(function SearchBar({ getLocationData }) {
    const [inputValue, setInputValue] = useState('');
    const [submittedValue, setSubmittedValue] = useState('');
    const [cities, setCities] = useState([]);
    const listRef = useRef(null);
    const [toShow, setToShow] = useState(true);

    useEffect(() => {
        //получаем список городов по значению в поисковой строке 
        const cityName = inputValue.split(', ')[0];
        fetch(`https://autocomplete.travelpayouts.com/places2?term=${cityName}&locale=ru&types[]=city`)
            .then(response => response.json())
            .then((data) => setCities(data));
        //хэндлер для скрытия списка при нажатии вне списка и строки поиска
        const onClickOutside = (e) => {
            if (listRef.current && !listRef.current.contains(e.target)) {
                setToShow(false);
            }
        };
        //подписываем событие на клик, а потом удаляем его при ререндеринге
        document.addEventListener('click', onClickOutside, true);
        return () => {
            document.removeEventListener('click', onClickOutside, true);
            setToShow(true);
        };
    }, [inputValue])

    //если по значению из submittedValue можно получить данные, передаем их в App
    useEffect(() => {
        const cityNameAndCountryNameArray = submittedValue.split(', ');//делим строку на город и страну
        const cityName = cityNameAndCountryNameArray.at(0).toLowerCase();//город
        const countryName = cityNameAndCountryNameArray.at(1)?.toLowerCase();//страна, если она вообще есть
        fetch(`https://autocomplete.travelpayouts.com/places2?term=${cityName}&locale=ru&types[]=city`)
            .then(response => response.json())
            .then(data => {
                //если страна есть, значит город выбран из списка, а не введен вручную
                if (cityName && countryName) {
                    //ищем город в массиве городов
                    const targetCity = data.find(city =>
                        city.name.toLowerCase().includes(cityName)
                        && city.country_name.toLowerCase().includes(countryName))
                    if (targetCity)
                        getLocationData(targetCity);
                }
                else {
                    //если страны нет, значит просто передаем первый элемент массива городов
                    if (data[0])
                        getLocationData(data[0]);
                }
            });
    }, [submittedValue, getLocationData])

    const onChange = (e) => {
        setInputValue(e.target.value);
    }
    //хэндлер нажатия Enter 
    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            setSubmittedValue(e.target.value)
            setToShow(false);
        }
    }
    //выключаем перезагрузку страницы при подтверждении формы
    const onSubmit = (e) => {
        e.preventDefault();
    }
    //коллбэк для получения города из компонента SearchOptions
    const getCity = (city) => {
        setSubmittedValue(`${city.name}, ${city.country_name}`);
        setToShow(false);
    }

    return (
        <div ref={listRef} className="searchBar">
            <form onSubmit={onSubmit} autoComplete="off">
                <button type="submit" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none">
                        <path d="M14.4808 14.4808L21 21M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5C3 13.0899 5.91015 16 9.5 16Z" stroke="#1B1D1F" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </button>
                <input onKeyDown={onKeyDown} onChange={onChange} value={inputValue} type="search" placeholder="Город или район" />
                {inputValue ? <SearchOptions
                    toShow={toShow}
                    getCity={getCity}
                    getLocationData={getLocationData}
                    cities={cities} /> : ''}
            </form>
        </div>
    )
})

export default SearchBar;