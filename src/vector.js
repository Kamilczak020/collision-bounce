export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    inverse() {
        return new Vector(-this.x, -this.y);
    }
}
