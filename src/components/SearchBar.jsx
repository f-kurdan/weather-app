import React, { useState } from "react";
import { geoDbUrl, geoDbOptions } from "../geoDbAPI";

function SearchBar() {

    const [inputValue, setInputValue] = useState('');
    const [submit, setSubmit] = useState('');
    const [cities, setCities] = useState([]);

    const onChange = (e) => {
        setInputValue(e.target.value);

        fetch(`${geoDbUrl}?namePrefix=${inputValue}&sort=-population&limit=10`, geoDbOptions)
        .then(response => response.json())
        .then(result => result.data)
        .then((data) => setCities(data));

        console.log(cities);
        console.log(inputValue);
    }

    const onSubmit = () => {
        setSubmit(inputValue);
    }

    return (

        <div className="searchBar">
            <form autoComplete="off">
                <button onSubmit={onSubmit} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none">
                        <path d="M14.4808 14.4808L21 21M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5C3 13.0899 5.91015 16 9.5 16Z" stroke="#1B1D1F" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </button>
                <input onChange={onChange} value={inputValue} type="search" placeholder="City or area" />
                <ul>
                    {cities.length? cities.map(city => <li>{`${city.name}, ${city.country}`}</li>) : cities}
                </ul>
            </form>
        </div>
    )
}

// function getCities(inputValue) {   
//         const data = fetch(`${geoDbUrl}?namePrefix=${inputValue}`, geoDbOptions)
//         .then(response => response.json())
//         .then(result => result.data)        
//         .catch(error => alert(error));

//         const getData = () => {
//             let res = data.then(data => {
//                 // console.log(data);
//                 return data;
//             })  
//             return res;          
//         }
//         console.log(getData())
//         return getData();
//     }

export default SearchBar;