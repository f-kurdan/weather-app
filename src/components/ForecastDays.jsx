import React from "react";

function ForecastDays() {
    return (
        <div id="forecast_days">
            <div className="forecast_day">
                <img src="cloud-sun-02.svg" alt="weather" className="forecast_day_img" />
                <div className="forecast_day_img_title">
                    tomorrow
                </div>
            </div>
            <div className="forecast_day">
                <img src="cloud-raining-03.svg" alt="weather" className="forecast_day_img"/>
                <div className="forecast_day_img_title">
                    sunday
                </div>
            </div>
            <div className="forecast_day">
                <img src="cloud-raining-03.svg" alt="weather" className="forecast_day_img"/>
                <div className="forecast_day_img_title">
                    monday
                </div>
            </div>
            <div className="forecast_day">
                <img src="cloud-sun-02.svg" alt="weather" className="forecast_day_img"/>
                <div className="forecast_day_img_title">
                    tuesday
                </div>
            </div>
            <div className="forecast_day">
                <img src="sun_new.svg" alt="weather" className="forecast_day_img"/>
                <div className="forecast_day_img_title">
                    wednesday
                </div>
            </div>
        </div>
    )
}

export default ForecastDays;

