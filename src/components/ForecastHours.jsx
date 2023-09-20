import React from "react";

function ForecastHours({ weatherData }) {
    let currentTime = weatherData?.current_weather?.time;
    let timeStamps = weatherData?.hourly?.time;
    let temps = weatherData?.hourly?.temperature_2m;
    const nextHourIndex = timeStamps?.indexOf(currentTime) + 1;
    const timeInterval = timeStamps?.slice(nextHourIndex, nextHourIndex + 10)?.map(e => e.slice(11));
    console.log(`time interval: ${timeInterval}`)
    const tempsInterval = temps?.slice(nextHourIndex, nextHourIndex + 10)
    console.log(tempsInterval)

    let hourlyData;

    if (timeInterval && tempsInterval) {
        hourlyData = [];
        for (let i = 0; i < timeInterval?.length; i++) {
            hourlyData.push([timeInterval[i], tempsInterval[i]])
        }
    }

    return (
        <div className="forecast_hours">
            {hourlyData?.map(data => (
                <div className="forecast_hour">
                    <p className="forecast_hour_hour">{data[0] ?? '--'}</p>
                    <p className="forecast_hour_degree">{data[1] ?? '--' }°</p>
                    {/* <img src="cloud-sun-02.svg" alt="weather" className="forecast_hour_img" /> */}
                </div>
            ))}
        </div>
    )
}

export default ForecastHours;