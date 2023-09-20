import React from "react";
import { getImage } from "../../services/shared";
import AdditionalData from "./AdditionalData";

export default function Temperature({ currentTemperature, weathercode, isDay}) {
    console.log(`inside Temp ${currentTemperature}`)
    console.log(`weather code: ${weathercode}`)
    return (
        <div className="temperature">
            <div className="degree">{`${currentTemperature}`}°</div>
            {getImage(weathercode, false, isDay)}
            <AdditionalData />
        </div>
    )
}

