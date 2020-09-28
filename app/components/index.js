import {snakeReducer} from './snake.js'
import {gameReducer} from './game.js'
import {playerReducer} from './player.js'
import {foodReducer} from "./food.js";

const snake = snakeReducer
const food = foodReducer
const game = gameReducer
const player = playerReducer
const tile = () => 16

export {snake, food, tile, game, player}
