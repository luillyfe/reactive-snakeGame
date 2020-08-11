import { game$ } from '/store/index.js'

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

initGame()


function initGame() {
    game$
        .subscribe(test)
}

function test(args) {
    console.log(args);
}

function drawGame({snake, food, tile}) {
    draw(snake.color, snake.position, tile)
    draw(food.color, food.position, tile)
}

function draw(color, position, size) {
    context.fillStyle = color
    position.forEach(({x, y}) => {
        context.fillRect(x, y, size, size)
    })
}
