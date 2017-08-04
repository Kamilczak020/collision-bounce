define(["./gameobject"], function (_gameobject) {
    "use strict";

    var _gameobject2 = _interopRequireDefault(_gameobject);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var canvas; // Imports

    var context;

    // Get our canvas
    function init() {
        canvas = document.getElementById("myCanvas");
        context = canvas.getContext("2d");
        canvas.addEventListener("click", createGameObject);
    }

    function createGameObject(event) {
        let x = getMousePos(event).x;
        let y = getMousePos(event).y;
        let radius = 5;

        let obj = new _gameobject2.default(x, y, radius);
        obj.render(context);
    }

    function getMousePos(event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    init();
});