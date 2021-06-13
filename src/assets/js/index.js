import '../css/styles.less';

class Geometry {
    constructor({
        position = {
            x: 0,
            y: 0
        },
        width = 0,
        height = 0,
        color = 0,
        velocityX = 0,
        velocityY = 0,
        gravity = 0,
        randomGeometry = 0.5
    }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.gravity = gravity;
        this.randomGeometry = randomGeometry;
    }

    update(dt) {
        this.velocityY += this.gravity * dt;
        this.position.x += this.velocityX * dt;
        this.position.y += this.velocityY * dt;
    }

    render() {
        ctx.fillStyle = this.color;
        if (this.randomGeometry < 0.5) {
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.width, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
}

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

const randomColor = () => {
    return `rgb(${Math.round(Math.random()) * 255}, 
                ${Math.round(Math.random()) * 255}, 
                ${Math.round(Math.random()) * 255})`;
}

let oldTime = 0;
const canvasWidth = 512;
const canvasHeight = 512;
const gravity = 100;
const geometryFigures = new Array;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvasWidth * devicePixelRatio;
canvas.height = canvasHeight * devicePixelRatio;
canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasHeight}px`;

requestAnimationFrame(animate);

function animate(ts) {
    ts /= 1000;
    const dt = ts - oldTime;
    oldTime = ts;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    geometryFigures.forEach(e => {
        e.update(dt);
        e.render(ctx);
    })

    requestAnimationFrame(animate);
}


canvas.addEventListener('mousedown', e => {
    const randRadius = getRandomArbitrary(10, 30);
    const figure = new Geometry({
        position: {
            x: e.offsetX,
            y: e.offsetY
        },
        width: randRadius,
        height: randRadius,
        color: randomColor(),
        velocityX: getRandomArbitrary(-200, 200),
        velocityY: getRandomArbitrary(-200, 200),
        gravity: gravity,
        randomGeometry: Math.random()
    })

    geometryFigures.push(figure);
})