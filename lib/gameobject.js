define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    class GameObject {
        constructor(x, y, radius, velVector) {
            x: x;
            y: y;
            radius: radius;
            velVector: velVector;
        }

        render(canvasContext) {
            canvasContext.beginPath();
            canvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            canvasContext.fillStyle = "#ffcd22";
            canvasContext.fill();
        }

        move() {
            this.x += velVector.x;
            this.y += velVector.y;
        }
    }
    exports.default = GameObject;
});