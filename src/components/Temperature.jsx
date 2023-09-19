import React from "react";

export default function Temperature({ currentTemperature, weathercode}) {
    console.log(`inside Temp ${currentTemperature}`)
    console.log(`weather code: ${weathercode}`)
    return (
        <div className="temperature">
            <p className="degree">{`${currentTemperature}`}°</p>
            {getImage(weathercode)}
        </div>
    )
}

function getImage(weathercode) {
    let src = '';
    switch (weathercode) {
        case 1: case 2: case 3:
            src = "cloud-sun.png";
            break;
        case 45: case 48: 
            src = "fog.png";
            break;
        case 51: case 53: case 55: case 56: case 57:
            src = "drizzle.png"
            break;
        case 61: case 63: case 65: case 66: case 67:
            src = "rain.png"
            break;
        case 71: case 73: case 75: case 85: case 86:
            src = "snowy.png";
            break;
        case 77:
            src = "snow-grain.png";
            break;
        case 80: case 81: case 82:
            src = "shower.png"
            break;
        case 95: case 96: case 99:
            src = "thunderstorm.png"    
            break; 
        default: src = "sun.png";
    }

    return (<img style={{width: "170px", height: "170px"}}  src={src} alt="weather"></img>);

}

