import React from "react";

export default function AdditionalData({ weatherData }) {
    const currentTime = weatherData?.current_weather?.time;
    const timeSteps = weatherData?.hourly?.time; //часы 
    const currentTimeIndex = timeSteps?.indexOf(currentTime);
    const windSpeed = weatherData?.current_weather?.windspeed;
    const humidity = weatherData?.hourly?.relativehumidity_2m?.at(currentTimeIndex);
    const uvIndexPoint = weatherData?.hourly?.uv_index?.at(currentTimeIndex);
    const uvIndex = getUvIndexDefinition(uvIndexPoint);
    console.log(currentTimeIndex)

    return (
        <div className="temperature-additional">
            <div style={{ "font-weight": "bold" }}>Погода на {currentTime?.slice(11) ?? '--'}: </div>
            <div>Описание погоды</div>
            <div>Ветер: {windSpeed ?? '--'} м/с</div>
            <div>UV-индекс: {uvIndex ?? '--'}</div>
            <div>Влажность: {humidity ?? '--'}%</div>
            <div>Восход</div>
            <div>Закат</div>
        </div>

    )
}

function getUvIndexDefinition(uvIndexPoint) {
    let definition = ''
    let color = ''
    console.log("индекс: " + uvIndexPoint)
    if (uvIndexPoint >= 3 && uvIndexPoint < 6) {
        definition = "Умеренный";
        color = "yellow";
    } else if (uvIndexPoint >= 6 && uvIndexPoint < 8 ) {
        definition = "Высокий";
        color = "orange";
    } else if (uvIndexPoint >= 8 && uvIndexPoint < 11) {
        definition = "Очень высокий";
        color = "rgb(255, 87, 87)";
    } else if (uvIndexPoint >= 11) {
        definition = "Чрезмерный";
        color = "violet";
    } else {
        definition = "Низкий";
        color = "greenyellow"
    }

    return (<div style={{
        "backgroundColor": color,
        "borderRadius": "20px",
        "padding": "0px 5px",
        "display": "inline"
    }}>{definition}</div>)
}