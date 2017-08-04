// Imports
import GameObject from './gameobject';
import Vector from './vector';
import Quadtree from 'quadtree-lib';

let vendors = ['webkit', 'moz'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}

// global accessible canvas members and quadtree
let canvas,
    context,
    qTree;

// Timing / game loop settings
let fps = 30,
    interval = 1000/fps,
    lastTime = (new Date()).getTime(),
    currentTime = 0,
    delta = 0;

// Array to hold all active game objects
let gameObjects = [];

let isGameRunning = false;

// Get our canvas
function init() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");

    if (canvas !== undefined) {
        canvas.addEventListener("click", createGameObject);

        // Create Quadtree
        qTree = new Quadtree({
        	width: canvas.width,
        	height: canvas.height,
            maxElements: 5
        });

        gameLoop();
    }
}

function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime);

    if(delta > interval) {

        frameActions();

        lastTime = currentTime - (delta % interval);
    }
}

function frameActions() {
    // Clear canvas and quadTree every frame
    context.clearRect(0, 0, canvas.width, canvas.height);

    gameObjects.forEach((element) => {
        element.move();
        element.render(context);

        qTree.push({
            x: element.x,
            y: element.y,
            width: element.radius,
            height: element.radius
        })
    })
}

function createGameObject(event) {
    let x = getMousePos(event).x,
        y = getMousePos(event).y,
        radius = 5,
        color = "#ffcd22";

    let velX = randomFromInterval(-1, 1),
        velY = randomFromInterval(-1, 1);

    let velVector = new Vector(velX, velY);

    let obj = new GameObject(x, y, radius, velVector, color);
    gameObjects.push(obj);
}

function getMousePos(event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function randomFromInterval(min, max) {
    return (Math.random() * (max - min + 1) + min);
}

// Start the game
init();
