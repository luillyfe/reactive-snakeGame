import {game$} from './store/index.js'
import {scan, tap, combineToLatestIf, Observable, catchError} from "./utils/index.js";

start()

function start() {
    const button = document.getElementById('button')
    const starts$ = Observable.fromEvent(button, 'click');

    starts$.pipe(
        scan(shouldSubscribe => !shouldSubscribe),
        tap(shouldSubscribe => {
            button.innerText = shouldSubscribe ? 'Stop' : 'Start again'
        }),
        combineToLatestIf(() => game$),
        catchError(error => {
            button.innerText = 'Start again'
            console.error(error)
        }),
    ).subscribe(drawGame)

}

function drawGame({snake, food, tile}) {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')

    context.clearRect(0, 0, canvas.width, canvas.height)
    draw(snake, tile, context)
    draw(food, tile, context)
}

function draw({position, color}, tile, context) {
    context.fillStyle = color
    position.forEach(({x, y}) => {
        context.fillRect(x, y, tile, tile)
    })
}
