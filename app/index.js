import {Store, combineReducers} from './store/index.js'
import {snake, food, tile, game, player} from './components/index.js'

import {
    moveSnakeAction,
    shouldGrowAction,
    shouldReverseAction,
    placeFoodAction,
    isDirectionAllowedAction,
    snakeHittedItselfAction,
    isGameSttopedAction
} from './components/actions.js'

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
    const appReducer = combineReducers({snake, food, tile, game, player})
    const rootReducer = (state, action) => {
        if (action.type === 'RESET') {
            state = undefined
        }
        return appReducer(state, action)
    }
    const store = new Store(rootReducer)

    store
        .subscribe(({snake, food, tile, game}) => {
            const {width, height} = game.area
            context.clearRect(0, 0, width, height)

            drawOnCanvas(snake, tile)
            drawOnCanvas(food, tile)
        })
    store.dispatch({})

    const moveSnake = moveSnakeAction(store)
    const shouldGrow = shouldGrowAction(store)
    const shouldReverse = shouldReverseAction(store)
    const isDirectionAllowed = isDirectionAllowedAction(store)
    const snakeHittedItself = snakeHittedItselfAction(store)
    const fireWhenSnakeHitsItself$ = arrowKeys$
        .pipe(
            filter(snakeHittedItself),
            doAction(() => {
                start.innerText = 'Start Again'
                store.dispatch({type: 'RESET'})
            })
        )
    const snakeMoves$ = arrowKeys$.pipe(
        filter(isDirectionAllowed),
        doAction(moveSnake),
        doAction(shouldReverse),
        doAction(shouldGrow),
    )

    const placeFood = placeFoodAction(store)
    const placingFood$ = irregularIntervals(5, 4, 10)
        .pipe(
            doAction(placeFood)
        )

    const game$ = mergeAll(snakeMoves$, placingFood$)
        .pipe(
            takeUntil(fireWhenSnakeHitsItself$)
        )

    const isGameSttoped = isGameSttopedAction(store)
    start$
        .pipe(
            filter(isGameSttoped)
        )
        .subscribe(() => {
            game$.subscribe(value => value)
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
