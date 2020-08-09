import {game$} from "/store/index.js";

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

init();

function init() {
    game$.subscribe(drawGame)
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

