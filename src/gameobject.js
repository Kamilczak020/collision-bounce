export default class GameObject {
    constructor(x, y, radius, velVector) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velVector = velVector;
    }

    render(canvasContext) {
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = "#ffcd22";
        canvasContext.fill();
    }

    move() {
        console.log(this.x);
        this.x += this.velVector.x;
        console.log(this.x);
        this.y += this.velVector.y;
    }
}
