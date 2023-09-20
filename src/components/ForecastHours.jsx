import React from "react";
import { getImage } from "../services/shared";

function ForecastHours({ weatherData, isDay }) {
    let currentTime = weatherData?.current_weather?.time;
    let timeStep = weatherData?.hourly?.time;
    let temps = weatherData?.hourly?.temperature_2m;
    let weathercodes = weatherData?.hourly?.weathercode;
    const nextHourIndex = timeStep?.indexOf(currentTime) + 1;
    const next10Hours = timeStep?.slice(nextHourIndex, nextHourIndex + 10)?.map(e => e.slice(11));
    console.log(`time interval: ${next10Hours}`)
    const next10HoursTemps = temps?.slice(nextHourIndex, nextHourIndex + 10)
    console.log(next10HoursTemps)
    const next10HoursCodes = weathercodes?.slice(nextHourIndex, nextHourIndex + 10);

    let hourlyData = [];

    for (let i = 0; i < next10Hours?.length; i++) {
        hourlyData.push([next10Hours[i], next10HoursTemps[i], next10HoursCodes[i]])
    }

    return (
        <div className="forecast_hours">
            {hourlyData?.map(data => (
                <div className="forecast_hour">
                    <p className="forecast_hour_hour">{data[0] ?? '--'}</p>
                    <div className="forecast_hour_flexbox">
                        <p className="forecast_hour_degree">{data[1] ?? '--'}°</p>
                        {getImage(data[2], true, isDay)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ForecastHours;