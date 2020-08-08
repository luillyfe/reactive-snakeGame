import {store$} from "/store/index.js";
import {getRandomNumber} from "./utils.js";

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

init();

function init() {
    store$.subscribe(drawGame)
    // placeFood()
}

function drawGame({snake, food, tile}) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = snake.color;
    snake.position.forEach(position => {
        context.fillRect(position.x, position.y, tile, tile)
    });

    context.fillStyle = food.color;
    context.fillRect(food.position.x, food.position.y, tile, tile)
}

// TODO: Interval must be irregular
function placeFood() {
    let random = 5000;

    setInterval(() => {
        let {food} = getSnakeAndFood();
        let newFoodPosition = {x: getRandomNumber(), y: getRandomNumber()};
    }, random)
}
