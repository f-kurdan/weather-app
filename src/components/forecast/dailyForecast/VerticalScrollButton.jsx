import React from "react";

export default function VerticalScrollButton({ direction, forecastDaysRef }) {
    const buttonClass = direction === "up" ?
        "forecast_days_upscroll_button" : "forecast_days_downscroll_button";
    const onClick = () => {
        console.log("зашел в хэндлер")
        if (direction === "up") {
            forecastDaysRef.scrollTop -= 200;
            console.log("up " + forecastDaysRef.scrollTop)
        }
        else {
            forecastDaysRef.scrollTop += 200;
            set(forecastDaysRef.scrollTop)
            console.log("down " + forecastDaysRef.scrollTop)
        }
    }

    return (
        <div onClick={onClick} className={buttonClass}></div>
    )
}