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
        console.log("зашел в хэндлер")
        if (direction === "up") {
            forecastDaysRef.scrollTop -= 250;
            setButtonDownVisibility(true);
            setButtonUpVisibility(forecastDaysRef.scrollTop >= 496);
        }
        else {
            forecastDaysRef.scrollTop += 250;
            setButtonUpVisibility(true);
            setButtonDownVisibility(forecastDaysRef.scrollTop < 249);
        }
    }

    return (
        <div style={{ "opacity": opacity }} onClick={onClick} className={buttonClass}>
            {direction === "up" ?
                (<div className="up_down_arrow">
                    назад
                </div>) :
                (<div className="up_down_arrow">
                    вперед
                </div>)}
        </div>
    )
}