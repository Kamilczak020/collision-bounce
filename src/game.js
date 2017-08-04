// Imports
import GameObject from './gameobject';
import VelVector from './velvector';

var vendors = ['webkit', 'moz'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}

var canvas,
    context,
    fps = 1,
    interval = 1000/fps,
    lastTime = (new Date()).getTime(),
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

    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime);

    if(delta > interval) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        gameObjects.forEach((element) => {
            element.move();
            element.render(context);
        })

        lastTime = currentTime - (delta % interval);
    }
}

function startGame() {
    if (!gameRunning) gameLoop();
    gameRunning = true;
}

function createGameObject(event) {
    let x = getMousePos(event).x;
    let y = getMousePos(event).y;
    let radius = 5;
    let velVector = new VelVector(0.1, 0.1);

    let obj = new GameObject(x, y, radius, velVector);
    gameObjects.push(obj);

    startGame();
}

function getMousePos(event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Start the game
init();
gameLoop();
