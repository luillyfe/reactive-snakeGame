import {Store, combineReducers} from './store/index.js'
import { snake, food, tile, game } from './components/index.js'

app()

function app() {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    const drawOnCanvas = draw(context)
    const appReducer = combineReducers({ snake, food, tile, game })
    const store = new Store(appReducer)

    store
        .subscribe(({snake, food, tile, game}) => {
            context.clearRect(0, 0, game.width, game.height)

            drawOnCanvas(snake, tile)
            drawOnCanvas(food, tile)
        })

    store.dispatch({})
}

function draw(context) {
    return ({position, color}, tile) => {
        context.fillStyle = color
        position.forEach(({x, y}) => {
            context.fillRect(x, y, tile, tile)
        })
    }
}
