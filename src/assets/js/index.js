import '../css/styles.less';

const canvasWidth = 512;
const canvasHeight = 512;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvasWidth * devicePixelRatio;
canvas.height = canvasHeight * devicePixelRatio;

canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasHeight}px`;

requestAnimationFrame(animate);

function animate (ts) {
    ts /= 1000;

    requestAnimationFrame(animate);
}

