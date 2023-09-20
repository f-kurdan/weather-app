import React from "react";
import { getImage } from "../services/shared";

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

