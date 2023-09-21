export function getImage(weathercode, mini, isDay) {
    let src = '';

    switch (weathercode) {
        case 1: case 2: case 3:
            src = isDay ? "cloud-sun.png" : "cloud-night.png";
            break;
        case 45: case 48:
            src = "fog.png";
            break;
        case 51: case 53: case 55: case 56: case 57:
            src = "drizzle.png"
            break;
        case 61: case 63: case 65: case 66: case 67:
            src = "rain.png"
            break;
        case 71: case 73: case 75: case 85: case 86:
            src = "snowy.png";
            break;
        case 77:
            src = "snow-grain.png";
            break;
        case 80: case 81: case 82:
            src = "shower.png"
            break;
        case 95: case 96: case 99:
            src = "thunderstorm.png"
            break;
        default: src = isDay ? "sun.png" : "night.png";
    }

    let width, height = mini ? "80px" : "170px";
    return (<img style={{ width: width, height: height }} src={src} alt="weather"></img>);
}

export function getDescription(weathercode) {
    switch (weathercode) {
        case 1: case 2: case 3:
            return "Местами облачно";
        case 45: case 48:
            return "Туман";
        case 51: case 53: case 55: case 56: case 57:
            return "Моросящий дождик"
        case 61: case 63: case 65: case 66: case 67:
            return "Дождь"
        case 71: case 73: case 75: case 85: case 86:
            return "Снегопад";
        case 77:
            return "Мокрый снег";
        case 80: case 81: case 82:
            return "Ливень"
        case 95: case 96: case 99:
            return "Гроза"
        default:
            return "Чистое небо";
    }
}

export function getUvIndexDefinition(uvIndexPoint) {
    let definition = ''
    let color = ''
    console.log("индекс: " + uvIndexPoint)
    if (uvIndexPoint >= 3 && uvIndexPoint < 6) {
        definition = "Умеренный";
        color = "yellow";
    } else if (uvIndexPoint >= 6 && uvIndexPoint < 8) {
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