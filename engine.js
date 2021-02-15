let lambda = 600 / Math.pow(10, 9);
let d = 6 / Math.pow(10, 7);
let l = 3;
let i0 = 13;
const app = init();
render();

function init() {
    // document.getElementById("wavelength").onchange = onChange;
    // document.getElementById("wavelength").min = 380;
    // document.getElementById("wavelength").max = 760;
    // document.getElementById("wavelength").step = 20;
    // document.getElementById("wavelength").value = 600;
    // document.getElementById("length").onchange = onChange;
    // document.getElementById("length").min = 1;
    // document.getElementById("length").max = 10;
    // document.getElementById("length").step = 1;
    // document.getElementById("length").value = 3;
    document.getElementById("width").onchange = onChange;
    document.getElementById("width").oninput = onChange;
    document.getElementById("width").min = 1;
    document.getElementById("width").max = 10;
    document.getElementById("width").step = 0.2;
    document.getElementById("width").value = 6;
    document.getElementById("state").innerText = "Wavelength: 0.6 мкм"
    const width = 1600;
    const height = 900;
    const app = new PIXI.Application({width: width, height: height});
    document.getElementById("viewport").appendChild(app.view);
    return app;
}

function render() {
    const sprite = new PIXI.Sprite(texture());
    sprite.width = 1600;
    sprite.height = 900;
    app.stage.addChild(sprite);
}

function texture() {
    const quality = 256;
    const canvas = document.createElement('canvas');
    canvas.width = quality;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    const grd = ctx.createLinearGradient(0, 0, quality, 0);
    const tolerance = 100;
    const data = image(i0, lambda, d, tolerance, l);
    const amplitude = max(data) / 255;
    for (let i = 0; i < tolerance; i++) {
        console.log(data[i]);
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

function onChange() {
    // lambda = document.getElementById("wavelength").value / Math.pow(10, 9);
    d = document.getElementById("width").value / Math.pow(10, 7);
    const mkms = Math.round(document.getElementById("width").value * 10) / 10;
    document.getElementById("state").innerText = mkms + " мкм";
    // l = document.getElementById("length").value;
    app.stage.removeChildren();
    render();
}