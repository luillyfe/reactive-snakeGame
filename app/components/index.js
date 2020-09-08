import {snakeReducer} from './snake.js'
import {gameReducer} from './game.js'

const snake = snakeReducer
const food = () => ({position: [{x: 160, y: 160}], color: 'red'})
const game = gameReducer
const tile = () => 16

export {snake, food, tile, game}
