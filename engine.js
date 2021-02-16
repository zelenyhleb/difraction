let lambda = 600 / Math.pow(10, 9);
let d = 5 / Math.pow(10, 6);
let l = 3;
let i0 = 255;
const width = window.innerWidth - 15;
const height = window.innerHeight * 0.98;
const app = init();
onChange();

function init() {
    initControl("wavelength", 380, 760, 20, 600);
    initControl("width", 5, 50, 0.1, 6);
    const app = new PIXI.Application({width: width, height: height});
    document.getElementById("viewport").appendChild(app.view);
    return app;
}

function initControl(id, min, max, step, value) {
    document.getElementById(id).onchange = onChange;
    document.getElementById(id).oninput = onChange;
    document.getElementById(id).min = min;
    document.getElementById(id).max = max;
    document.getElementById(id).step = step;
    document.getElementById(id).value = value;
}

function render() {
    const sprite = new PIXI.Sprite(texture());
    sprite.width = width;
    sprite.height = height;
    app.stage.addChild(sprite);
}

function texture() {
    const quality = 256;
    const canvas = document.createElement('canvas');
    canvas.width = quality;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    const grd = ctx.createLinearGradient(0, 0, quality, 0);
    const tolerance = 1000;
    const data = image(i0, lambda, d, tolerance, l);
    for (let i = 0; i < tolerance; i++) {
        grd.addColorStop(1 / tolerance * i, colorStop(data[i]));
    }
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);
    return PIXI.Texture.from(canvas);
}

function max(data) {
    let max = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] > max) {
            max = data[i];
        }
    }
    return max;
}

function colorStop(angle) {
    return "rgba(" + angle + "," + angle + "," + angle + ",255)";
}

function update(id, label, size, n) {
    const param = Math.round(document.getElementById(id).value * 10) / 10;
    document.getElementById(id + "_state").innerText = label + ": " + param + " " + size;
    return param / Math.pow(10, n);
}

function onChange() {
    d = update("width", "Ширина щели", "мкм", 6);
    lambda = update("wavelength", "Длина волны", "нм", 9);
    app.stage.removeChildren();
    render();
}