import React from "react";
import { getImage } from "../services/shared";

function ForecastHours({ weatherData }) {
    const currentTime = weatherData?.current_weather?.time;
    const timeSteps = weatherData?.hourly?.time; //часы 
    const temps = weatherData?.hourly?.temperature_2m;//температуры
    const weathercodes = weatherData?.hourly?.weathercode;//коды
    const daysOrNights = weatherData?.hourly?.is_day;//день или ночь по каждому часу

    const nextHourIndex = timeSteps?.indexOf(currentTime) + 1;
    const next10Hours = timeSteps?.slice(nextHourIndex, nextHourIndex + 10)?.map(e => e.slice(11));//следующие 10 часов
    const next10HoursTemps = temps?.slice(nextHourIndex, nextHourIndex + 10)//температура на следующие 10 часов
    const next10HoursCodes = weathercodes?.slice(nextHourIndex, nextHourIndex + 10);//коды на следующие 10 часов
    const next10HoursDayOrNight = daysOrNights?.slice(nextHourIndex, nextHourIndex + 10);//день или начь на следующие 10 часов

    const hourlyData = [];
    for (let i = 0; i < next10Hours?.length; i++) {
        //закидываем данные соответсвующие каждому часу в массив
        hourlyData.push([
            next10Hours[i],
            next10HoursTemps[i],
            next10HoursCodes[i],
            next10HoursDayOrNight[i]])
    }
    // вытаскиваем данные за каждый час по индексу
    return (
        <div>

            <button>назад</button>
            <div className="forecast_hours">
                {hourlyData?.map(data => (
                    <div key={hourlyData.indexOf(data) + data[1]} className="forecast_hour">
                        <p className="forecast_hour_hour">{data[0] ?? '--'}</p>
                        <div className="forecast_hour_flexbox">
                            <p className="forecast_hour_degree">{data[1] ?? '--'}°</p>
                            {getImage(data[2], true, data[3])}
                        </div>
                    </div>
                ))}
            </div>
            <button>вперед</button>
        </div>
    )
}

export default ForecastHours;