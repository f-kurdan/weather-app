import React, { useRef, useState } from "react";
import { getImage } from "../../../services/shared";
import Button from "./HorizontalScrollButton";

function ForecastHours({ weatherData }) {
    const containerRef = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(true);
    const [showRightButton, setShowRightButton] = useState(true);

    const currentTime = weatherData?.current_weather?.time?.slice(0, 14) + '00';//нужен именно час без минут
    const timeSteps = weatherData?.hourly?.time; //часы 
    const temps = weatherData?.hourly?.temperature_2m;//температуры
    const weatherCodes = weatherData?.hourly?.weathercode;//коды
    const daysOrNights = weatherData?.hourly?.is_day;//день или ночь по каждому часу

    const nextHourIndex = timeSteps?.indexOf(currentTime) + 1;
    const next10Hours = timeSteps?.slice(nextHourIndex, nextHourIndex + 10)?.map(e => e.slice(11));//следующие 10 часов
    const next10HoursTemps = temps?.slice(nextHourIndex, nextHourIndex + 10)//температура на следующие 10 часов
    const next10HoursCodes = weatherCodes?.slice(nextHourIndex, nextHourIndex + 10);//коды на следующие 10 часов
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

    const setLeftButtonVisibility = (showButton) => {
        setShowLeftButton(showButton);
    }
    const setRightButtonVisibility = (showButton) => {
        setShowRightButton(showButton)
    }

    // вытаскиваем данные за каждый час по индексу
    return (
        <div id="forecast_hours_container">
            <Button
                opacity={showLeftButton ? 1 : 0.3}
                setRightButtonVisibility={setRightButtonVisibility}
                setLeftButtonVisibility={setLeftButtonVisibility}
                direction={"left"}
                container={containerRef.current} />
            <div ref={containerRef} className="forecast_hours">
                {hourlyData?.map((data, index )=> (
                    <div key={index} className="forecast_hour">
                        <p className="forecast_hour_hour">{data[0] ?? '--'}</p>
                        <div className="forecast_hour_flexbox">
                            <p className="forecast_hour_degree">{data[1] ?? '--'}°</p>
                            {getImage(data[2], true, data[3])}
                        </div>
                    </div>
                ))}
            </div>
            <Button
                opacity={showRightButton ? 1 : 0.3}
                setRightButtonVisibility={setRightButtonVisibility}
                setLeftButtonVisibility={setLeftButtonVisibility}
                direction={"right"}
                container={containerRef.current} />
        </div>
    )
}

export default ForecastHours;