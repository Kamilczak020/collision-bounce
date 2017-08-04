export default class GameObject {
    constructor(x, y, radius, velVector, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velVector = velVector;
        this.color = color;
    }

    render(canvasContext) {
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
    }

    move() {
        this.x += this.velVector.x;
        this.y += this.velVector.y;
    }
}
