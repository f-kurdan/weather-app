import React from "react";
import { getImage } from "../../services/shared";
import AdditionalData from "./AdditionalData";

export default function Temperature({ weatherData }) {
    const currentTemperature = weatherData?.current_weather?.temperature ?? "--";
    const weathercode = weatherData?.current_weather?.weathercode;
    const isDay = weatherData?.current_weather?.is_day;
    return (
        <div className="temperature-flexbox">
            <div className="temperature-degree">{`${currentTemperature}`}°</div>
            {getImage(weathercode, false, isDay)}
            <AdditionalData />
        </div>
    )
}

