import {game$, store} from './store/index.js'
import { Observable } from "./utils/Observable.js";
import {scan, combineToLatestIf, catchError} from "./utils/operators.js";
import {setItems, getItems} from "./utils/helpers.js";

start()

function start() {
    const button = document.getElementById('button')
    const starts$ = Observable.fromEvent(button, 'click');

    starts$.pipe(
        scan(shouldSubscribe => !shouldSubscribe),
        combineToLatestIf((shouldSubscribe) => {
            if (shouldSubscribe) {
                button.innerText = 'Stop'
                return game$;
            } else {
                tearDown()
                let {snake, area, food, tile} = store.getState()
                return Observable.of({snake, area, food, tile});
            }
        }),
        catchError(error => {
            tearDown()

            console.error(error)
            let {snake, area, food, tile} = store.getState()
            return {snake, area, food, tile}
        }),
    ).subscribe(drawGame)

}

function drawGame({snake, food, specialFood, tile, area}) {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')

    canvas.width = area.width
    canvas.height = area.height

    context.clearRect(0, 0, area.width, area.height)
    draw(snake, tile, context)
    draw(food, tile, context)
    if (specialFood) draw(specialFood, tile, context)
}

function draw({position, color}, tile, context) {
    context.fillStyle = color
    position.forEach(({x, y}) => {
        context.fillRect(x, y, tile, tile)
    })
}

function tearDown() {
    button.innerText = 'Start again'

    const {player} = store.getState()
    store.resetStore()

    const {score: lastScore, previousSnakeColor} = getItems()

    setItems({
        score: player.points,
        resetSnakeColor: player.points > lastScore,
        previousSnakeColor
    })
}
