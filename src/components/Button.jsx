import React, { useRef } from "react";

function Button() {
    const buttonRef = useRef();
    const scroll = () => {
        buttonRef.current.scrollLeft -= 20
    }
    return (
        <div onClick={scroll} ref={buttonRef}>
            <img src="left-arrow.png" alt="scroll-left" />
        </div>
    )
}