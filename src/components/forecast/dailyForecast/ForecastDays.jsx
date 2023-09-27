import React from "react";
import { useRef } from "react";
import { getImage } from "../../../services/shared";
import VerticalScrollButton from "./VerticalScrollButton";

function ForecastDays({ weatherData }) {
    const forecastDaysRef = useRef(null);
    const next6Days = weatherData?.daily?.time?.slice(1);
    //получаем название дней на русском
    const next6DaysOfWeekNames = next6Days?.map(date => {
        const isTomorrow = next6Days[0] === date;//это завтрашний день?
        const day = new Date(date).getDay();//получаем номера дней (0 = воскересенье)
        return getDayOfWeekName(day, isTomorrow);//получаем название
    });
    const next6daysMaxTemps = weatherData?.daily?.temperature_2m_max.slice(1);//макс. темпы
    const next6daysMinTemps = weatherData?.daily?.temperature_2m_min.slice(1);//мин. темпы
    const next6DayCodes = weatherData?.daily?.weathercode?.slice(1);//погодные коды 

    const data = [];
    for (let i = 0; i < next6DaysOfWeekNames?.length; i++) {
        data.push([
            next6DaysOfWeekNames[i],
            next6daysMaxTemps[i],
            next6daysMinTemps[i],
            next6DayCodes[i]
        ])
    }

    return (
        <div className="forecast_days_container">
            <VerticalScrollButton
                direction={"up"}
                forecastDaysRef={forecastDaysRef.current} />
            <div ref={forecastDaysRef} className="forecast_days">
                {data.map(day => (
                    <div key={data.indexOf(day)} className="forecast_day">
                        <div>
                            {getImage(day[3], true, true)}
                        </div>
                        <div className="forecast_day_temperature">
                            <div className="max-min-temperature">
                                <div>
                                    <img className="max-min-img" src="max-temperature.png" alt="" />
                                </div>
                                {day[1]}°
                            </div>
                            <div className="max-min-temperature">
                                <div>
                                    <img className="max-min-img" src="min-temperature.png" alt="" />
                                </div>
                                {day[2]}°
                            </div>
                        </div>
                        <div style={{ "fontSize": day[0].length > 7 ? "10px" : "16px" }} className="forecast_day_name">
                            {day[0]}
                        </div>
                    </div>
                ))}
            </div>
            <VerticalScrollButton
                direction={"down"}
                forecastDaysRef={forecastDaysRef.current} />
        </div>
    )
}

function getDayOfWeekName(dateCode, isTomorrow) {
    switch (dateCode) {
        case 0: return isTomorrow ? "Завтра" : "Воскресенье";
        case 1: return isTomorrow ? "Завтра" : "Понедельник";
        case 2: return isTomorrow ? "Завтра" : "Вторник";
        case 3: return isTomorrow ? "Завтра" : "Среда";
        case 4: return isTomorrow ? "Завтра" : "Четверг";
        case 5: return isTomorrow ? "Завтра" : "Пятница";
        case 6: return isTomorrow ? "Завтра" : "Суббота";
    }
}

export default ForecastDays;

