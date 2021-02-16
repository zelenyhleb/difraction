const purpleLimit = 360;
const darkblueLimit = 450;
const blueLimit = 480;
const greenLimit = 510;
const yellowLimit = 585;
const orangeLimit = 620;
const redLimit = 800;

/*
    Function returns factor to decrease light intensity on the edges of visible specter.
 */
function intensityFactor(wavelength) {
    if (wavelength >= purpleLimit && wavelength < 420)
        return 0.3 + 0.7 * (wavelength - purpleLimit) / (420 - purpleLimit);
    else if (wavelength >= 420 && wavelength < 701)
        return 1;
    else if (wavelength >= 701 && wavelength <= redLimit)
        return 0.3 + 0.7 * (redLimit - wavelength) / (redLimit - 700);
    else {
        return 0;
    }
}

/*
    Function returns RGB representation of color for specified wavelength.
 */
function rgb(wavelength) {
    let k = intensityFactor(wavelength);
    let red;
    let green;
    let blue;
    if (wavelength >= purpleLimit && wavelength < darkblueLimit) {
        red = blendFactor(wavelength, darkblueLimit, purpleLimit);
        green = 0.0;
        blue = 1.0;
    } else if (wavelength >= darkblueLimit && wavelength < blueLimit) {
        red = 0.0;
        green = blendFactorInverted(wavelength, blueLimit, darkblueLimit);
        blue = 1.0;
    } else if (wavelength >= blueLimit && wavelength < greenLimit) {
        red = 0.0;
        green = 1.0;
        blue = blendFactor(wavelength, greenLimit, blueLimit);
    } else if (wavelength >= greenLimit && wavelength < yellowLimit) {
        red = blendFactorInverted(wavelength, yellowLimit, greenLimit);
        green = 1.0;
        blue = 0.0;
    } else if (wavelength >= yellowLimit && wavelength < orangeLimit) {
        red = 1.0;
        green = blendFactor(wavelength, orangeLimit, yellowLimit);
        blue = 0.0;
    } else if (wavelength >= orangeLimit && wavelength <= redLimit) {
        red = 1.0;
        green = 0.0;
        blue = 0.0;
    } else {
        red = 0.0;
        green = 0.0;
        blue = 0.0;
    }

    return {
        red: red > 0 ? 255 * red * k : 0,
        green: green > 0 ? 255 * green * k : 0,
        blue: blue > 0 ? 255 * blue * k : 0
    }
}

function blendFactor(wavelength, upper, lower) {
    return (upper - wavelength) / (upper - lower);
}

function blendFactorInverted(wavelength, upper, lower) {
    return (wavelength - lower) / (upper - lower);
}