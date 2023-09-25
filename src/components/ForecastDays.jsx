import React from "react";

function ForecastDays({ weatherData }) {
    const next6Days = weatherData?.daily?.time?.slice(1);
    //получаем название дней на русском
    const next6DaysOfWeekNames = next6Days?.map(date => {
        const isTomorrow = next6Days[0] === date;//это завтрашний день?
        const day = new Date(date).getDay();//получаем номера дней (0 = воскересенье)
        return getDayOfWeekName(day, isTomorrow);//получаем название
    });
    const next6daysMaxTemps = weatherData?.daily?.temperature_2m_max.slice(1);//макс. темпы
    const next6daysMinTemps = weatherData?.daily?.temperature_2m_min.slice(1);//мин. темпы

    const data = [];
    for (let i = 0; i < next6DaysOfWeekNames?.length; i++) {
        data.push([
            next6DaysOfWeekNames[i],
            next6daysMaxTemps[i],
            next6daysMinTemps[i]
        ])
    }
    
    return (
        <div id="forecast_days">
            {data.map(day => (
                <div key={data.indexOf(day)} className="forecast_day">
                    <div className="forecast_day_temperature">
                        Max: {day[1]} Min: {day[2]}
                    </div>
                    <div className="forecast_day_name">
                        {day[0]}
                    </div>
                </div>
            ))}
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

