import React, { useRef} from "react";

export default function Button({ direction, container, setLeftButtonAppearance, setRightButtonAppearance, opacity }) {
    const buttonRef = useRef();
    const buttonSrc = direction === "left" ? "left-arrow.png" : "right-arrow.png";

    const onClick = () => {
        if (direction === "left") {
            container.scrollLeft -= 400;
            setRightButtonAppearance(true);               
            setLeftButtonAppearance(container.scrollLeft >= 400)
        }
        if (direction === "right") {
            container.scrollLeft += 350
            setLeftButtonAppearance(true);
            console.log(container.scrollLeft)
            setRightButtonAppearance(container.scrollLeft < 698);
        }
    }

    return (<div style={{"opacity": opacity}} onClick={onClick} ref={buttonRef}>
            <img className="horizontal-scroll-button" src={buttonSrc} alt="scroll-left" />
        </div>);
}