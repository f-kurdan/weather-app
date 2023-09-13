import React from "react";

function ForecastHours() {
    return (
        <div className="forecast_hours">
            <div className="forecast_hour">
                <p className="forecast_hour_hour">15:00</p>
                <img src="cloud-sun-02.svg" alt="weather" className="forecast_hour_img" />
            </div>
            <div className="forecast_hour">
                <p className="forecast_hour_hour">16:00</p>
                <img src="cloud-sun-02.svg" alt="weather" className="forecast_hour_img" />
            </div>
            <div className="forecast_hour">
                <p className="forecast_hour_hour">17:00</p>
                <img src="cloud-sun-02.svg" alt="weather" className="forecast_hour_img" />
            </div>
            <div className="forecast_hour">
                <p className="forecast_hour_hour">18:00</p>
                <img src="cloud-sun-02.svg" alt="weather" className="forecast_hour_img" />
            </div>
            <div className="forecast_hour">
                <p className="forecast_hour_hour">19:00</p>
                <img src="cloud-sun-02.svg" alt="weather" className="forecast_hour_img" />
            </div>
        </div>
    )
}

export default ForecastHours;