import { game$ } from './store/index.js'

start()

function start() {
    game$
        .subscribe(drawGame)
}

function drawGame({ snake, food, tile }) {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')

    context.clearRect(0, 0, canvas.width, canvas.height)
    draw(snake, tile, context)
    draw(food, tile, context)
}

function draw({ position, color }, tile, context) {
    context.fillStyle = color
    position.forEach(({x, y}) => {
        context.fillRect(x, y, tile, tile)
    })
}
