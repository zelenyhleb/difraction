/*
    Function returns light intensity for specified angle (phi)
 */
function intensity(i0, lambda, b, phi) {
    return i0 * sinc(Math.PI * b * phi / lambda) * sinc(Math.PI * b * phi / lambda);
}

function image(i0, lambda, b, tolerance, l) {
    const limit = Math.PI / 4;
    const lines = [];
    for (let i = 0; i < tolerance; i++) {
        const intens = intensity(i0, lambda, b, angle(i, limit, tolerance, l));
        lines.push(intens)
    }
    return lines;
}

function angle(iteration, limit, tolerance, l) {
    const maxOffset = l * Math.tan(limit);
    const dx = 2 * maxOffset / tolerance;
    return Math.atan((-maxOffset + dx * iteration) / l);
}

/*
    Returns sinuses of %amount% first maximums angles
 */
function maximums(lambda, b, amount) {
    const maximums = [];
    for (let i = 0; i < amount; i++) {
        maximums[i] = (i * lambda + lambda / 2) / b;
    }
    return maximums;
}

/*
    Returns sinuses of %amount% first minimum angles
 */
function minimums(lambda, b, amount) {
    const minimums = [];
    for (let i = 0; i < amount; i++) {
        minimums[i] = i * lambda / b;
    }
    return minimums;
}

function sinc(x) {
    if (x === 0) {
        return 1;
    }
    return Math.sin(x) / x;
}


