import {snakeReducer} from './snake.js'
import {gameReducer} from './game.js'
import {foodReducer} from "./food.js";

const snake = snakeReducer
const food = foodReducer
const game = gameReducer
const tile = () => 16

export {snake, food, tile, game}
