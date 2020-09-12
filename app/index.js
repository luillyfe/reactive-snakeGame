import {
    moveSnake,
    shouldGrow,
    shouldReverse,
    isDirectionAllowed,
    snakeHittedItself,
    placeFood,
    isGameSttoped,
    reset,
    connectStore
} from './connect.js'

import {fromEvent, irregularIntervals, mergeAll} from './streams/Observable.js'
import {map, filter, doAction, takeUntil} from './streams/operators.js'

app()

function app() {
    const canvas = document.getElementById('canvas')
    const start = document.getElementById('button')
    const context = canvas.getContext('2d')
    const drawOnCanvas = draw(context)
    const start$ = fromEvent(start, 'click')
    const arrowKeys$ = fromEvent(document, 'keydown')
        .pipe(
            map(({key}) => key),
            filter(isKeyAllowed)
        )


    const fireWhenSnakeHitsItself$ = arrowKeys$
        .pipe(
            filter(snakeHittedItself),
            doAction(() => {
                start.innerText = 'Start Again'
                reset()
            })
        )
    const snakeMoves$ = arrowKeys$.pipe(
        filter(isDirectionAllowed),
        doAction(moveSnake),
        doAction(shouldReverse),
        doAction(shouldGrow),
    )

    const placingFood$ = irregularIntervals(5, 4, 10)
        .pipe(
            doAction(placeFood)
        )

    const game$ = mergeAll(snakeMoves$, placingFood$)
        .pipe(
            takeUntil(fireWhenSnakeHitsItself$)
        )

    start$
        .pipe(
            filter(isGameSttoped)
        )
        .subscribe(() => {
            game$.subscribe(value => value)
        })

    connectStore(({snake, food, tile, game}) => {
        const {width, height} = game.area
        context.clearRect(0, 0, width, height)

        drawOnCanvas(snake, tile)
        drawOnCanvas(food, tile)
    })
}

function draw(context) {
    return ({position, color}, tile) => {
        context.fillStyle = color
        position.forEach(({x, y}) => {
            context.fillRect(x, y, tile, tile)
        })
    }
}

function isKeyAllowed(key) {
    const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    return allowedKeys.includes(key)
}
