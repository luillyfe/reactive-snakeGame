import {Store, combineReducers} from './store/index.js'
import {snake, food, tile, game} from './components/index.js'

import {moveSnakeAction, placeFoodAction} from './components/actions.js'

import {fromEvent, irregularIntervals} from './streams/Observable.js'
import {map, filter, doAction} from './streams/operators.js'

app()

function app() {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    const drawOnCanvas = draw(context)
    const appReducer = combineReducers({snake, food, tile, game})
    const store = new Store(appReducer)

    store
        .subscribe(({snake, food, tile, game}) => {
            const {width, height} = game.area
            context.clearRect(0, 0, width, height)

            drawOnCanvas(snake, tile)
            drawOnCanvas(food, tile)
        })
    store.dispatch({})

    const moveSnake = moveSnakeAction(store)
    const snakeMoves$ = fromEvent(document, 'keydown')
        .pipe(
            map(({key}) => key),
            filter(isKeyAllowed),
            doAction(moveSnake)
        )

    const placeFood = placeFoodAction(store)
    const placingFood$ = irregularIntervals(5, 4, 10)
        .pipe(
            doAction(placeFood)
        ).subscribe(value => value)

    snakeMoves$.subscribe(value => value)
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
