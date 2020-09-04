import {snakeReducer} from './snake.js'

const snake = snakeReducer
const food = () => ({position: [{x: 160, y: 160}], color: 'red'})
const game = () => ({area: {width: 400, height: 400}})
const tile = () => 16

export {snake, food, tile, game}
