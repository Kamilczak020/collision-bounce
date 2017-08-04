/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gameobject = __webpack_require__(1);

var _gameobject2 = _interopRequireDefault(_gameobject);

var _velvector = __webpack_require__(2);

var _velvector2 = _interopRequireDefault(_velvector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Imports
var vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

var canvas,
    context,
    fps = 30,
    interval = 1000 / fps,
    lastTime = new Date().getTime(),
    currentTime = 0,
    delta = 0;

var gameRunning = false;

var gameObjects = [];

// Get our canvas
function init() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");

    canvas.addEventListener("click", createGameObject);
    canvas.addEventListener("click", startGame);
}

function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    currentTime = new Date().getTime();
    delta = currentTime - lastTime;

    if (delta > interval) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        gameObjects.forEach(function (element) {
            element.render(context);
            element.move();
        });

        lastTime = currentTime - delta % interval;
    }
}

function startGame() {
    if (!gameRunning) gameLoop();
    gameRunning = true;
}

function createGameObject(event) {
    var x = getMousePos(event).x;
    var y = getMousePos(event).y;
    var radius = 5;
    var velVector = new _velvector2.default(0.1, 0.1);

    var obj = new _gameobject2.default(x, y, radius, velVector);
    gameObjects.push(obj);

    startGame();
}

function getMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Start the game
init();
gameLoop();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameObject = function () {
    function GameObject(x, y, radius, velVector) {
        _classCallCheck(this, GameObject);

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velVector = velVector;
    }

    _createClass(GameObject, [{
        key: "render",
        value: function render(canvasContext) {
            canvasContext.beginPath();
            canvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            canvasContext.fillStyle = "#ffcd22";
            canvasContext.fill();
        }
    }, {
        key: "move",
        value: function move() {
            console.log(this.x);
            this.x += this.velVector.x;
            console.log(this.x);
            this.y += this.velVector.y;
        }
    }]);

    return GameObject;
}();

exports.default = GameObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VelVector = function VelVector(x, y) {
    _classCallCheck(this, VelVector);

    this.x = x;
    this.y = y;
};

exports.default = VelVector;

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map