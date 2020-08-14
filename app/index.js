import { game$ } from '/store/index.js'

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

initGame()

function initGame() {
    game$
        .subscribe(drawGame)
}

function drawGame({snake, food, tile}) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    draw(snake.color, snake.position, tile)
    draw(food.color, food.position, tile)
}

function draw(color, position, size) {
    context.fillStyle = color
    position.forEach(({x, y}) => {
        context.fillRect(x, y, size, size)
    })
}

function test(args) {
    console.log(args);
}
