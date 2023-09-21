import React from "react";
import { getDescription, getUvIndexDefinition } from "../../services/shared";

export default function AdditionalData({ weatherData }) {
    const currentTime = weatherData?.current_weather?.time;
    const timeSteps = weatherData?.hourly?.time; //часы 
    const currentTimeIndex = timeSteps?.indexOf(currentTime);
    const windSpeed = weatherData?.current_weather?.windspeed;
    const humidity = weatherData?.hourly?.relativehumidity_2m?.at(currentTimeIndex);
    const uvIndexPoint = weatherData?.hourly?.uv_index?.at(currentTimeIndex);
    const uvIndex = getUvIndexDefinition(uvIndexPoint);
    const apparentTemperature = weatherData?.hourly?.apparent_temperature.at(currentTimeIndex);
    const sunrise = weatherData?.daily?.sunrise[0].slice(11);
    const sunset = weatherData?.daily?.sunset[0].slice(11);

    return (
        <div className="temperature-additional">
            <div className="temperature-additional-unit" style={{ "font-weight": "bold" }}>Погода на {currentTime?.slice(11) ?? '--'}: </div>
            <div className="temperature-additional-unit">{getDescription(weatherData?.current_weather?.weathercode)}</div>
            <div className="temperature-additional-unit">Ощущается как {apparentTemperature ?? '--'}°</div>
            <div className="temperature-additional-unit">Ветер: {windSpeed ?? '--'} м/с</div>
            <div className="temperature-additional-unit">UV-индекс: {uvIndex ?? '--'}</div>
            <div className="temperature-additional-unit">Влажность: {humidity ?? '--'}%</div>
            <div className="temperature-additional-unit" style={{ "font-weight": "bold" }}>🌅🠅 {sunrise} 🌄🠇 {sunset}</div>
        </div>

    )
}

