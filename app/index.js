import {
    moveSnake,
    shouldGrow,
    shouldReverse,
    isDirectionAllowed,
    snakeHittedItself,
    placeFood,
    isGameSttoped,
    reset,
    placeSpecialFood,
    shouldGrowBy2,
    connectStore
} from './utils/connect.js'

import {fromEvent, irregularIntervals, mergeAll} from './streams/Observable.js'
import {map, filter, doAction, takeUntil} from './streams/operators.js'
import {isKeyAllowed} from "./utils/index.js";

app()

function app() {
    const canvas = document.getElementById('canvas')
    const start = document.getElementById('button')
    const scoreLabel = document.getElementById('score')
    const context = canvas.getContext('2d')
    const drawOnCanvas = draw(context)
    const drawArcOnCanvas = drawArc(context)

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
        doAction(shouldGrowBy2),
    )

    const placingFood$ = irregularIntervals(5, 4, 10)
        .pipe(
            doAction(placeFood)
        )

    const placingSpecialFood$ = irregularIntervals(10, 1, 5)
        .pipe(
            doAction(placeSpecialFood)
        )

    const game$ = mergeAll(snakeMoves$, placingFood$, placingSpecialFood$)
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

    connectStore(({snake, food, tile, gameArea, score, specialFood}) => {
        const {width, height} = gameArea

        scoreLabel.innerText = score
        scoreLabel.style = `color: ${snake.color}`
        canvas.width = width
        canvas.height = height

        context.clearRect(0, 0, width, height)

        drawOnCanvas(snake, tile)
        drawOnCanvas(food, tile)
        drawArcOnCanvas(specialFood)
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

function drawArc(context) {
    return ({position, color}) => {
        context.fillStyle = color
        position.forEach(({x, y}) => {
            context.beginPath();
            context.arc(x, y, 14, 0, Math.PI * 2, true);
            context.fill()
            context.stroke();
        })
    }
}
