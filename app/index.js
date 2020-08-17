import {moves$, start$} from '/store/index.js'

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

initGame()

function initGame() {
    let retry = false, currentSub;


    start$.subscribe({
        next: () => {
            retry = !retry
            if (retry) {
                currentSub = moves$.subscribe({
                    next: (ev) => {
                        drawGame(ev)
                    }, error: e => {
                        retry = false
                        console.error(e)
                    }
                })
            } else {
                currentSub.unsubscribe()
            }
        }
    })
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
