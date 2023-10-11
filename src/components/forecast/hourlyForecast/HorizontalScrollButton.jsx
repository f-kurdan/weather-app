import React from "react";

export default function Button({ 
    direction, 
    container, 
    setLeftButtonVisibility, 
    setRightButtonVisibility, 
    opacity }) {
    const buttonSrc = direction === "left" ? "left-arrow.png" : "right-arrow.png";

    const onClick = () => {
        if (direction === "left") {
            container.scrollLeft -= 400;
            setRightButtonVisibility(true);               
            setLeftButtonVisibility(container.scrollLeft >= 390)
        }
        if (direction === "right") {
            container.scrollLeft += 400;
            setLeftButtonVisibility(true);
            setRightButtonVisibility(container.scrollLeft < 698);
        }
    }

    return (<div style={{"opacity": opacity}} onClick={onClick}>
            <img className="horizontal-scroll-button" src={buttonSrc} alt="scroll" />
        </div>);
}