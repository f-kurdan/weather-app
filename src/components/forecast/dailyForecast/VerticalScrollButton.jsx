import React from "react";

export default function VerticalScrollButton({
    direction,
    forecastDaysRef,
    setButtonUpVisibility,
    setButtonDownVisibility,
    opacity }) {
    const buttonClass = direction === "up" ?
        "forecast_days_upscroll_button" : "forecast_days_downscroll_button";
    const onClick = () => {
        if (direction === "up" && forecastDaysRef) {
            forecastDaysRef.scrollTop -= 250;
            setButtonDownVisibility(true);
            setButtonUpVisibility(forecastDaysRef.scrollTop >= 496);
        }
        else if (direction === "down" && forecastDaysRef) {
            forecastDaysRef.scrollTop += 250;
            setButtonUpVisibility(true);
            setButtonDownVisibility(forecastDaysRef.scrollTop < 249);
        }
    }

    return (
        <div style={{ "opacity": opacity }} onClick={onClick} className={buttonClass}>
            {direction === "up" ?
                (<div className="up_down_arrow">
                    вверх
                </div>) :
                (<div className="up_down_arrow">
                    вниз
                </div>)}
        </div>
    )
}