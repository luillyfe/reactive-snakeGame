import {MOVE_SNAKE, GROW_SNAKE} from "./snake.js";
import {UPDATE_PATH} from "./game.js";
import {PLACE_FOOD} from "./food.js";
import {getRandomNumber} from "../utils/index.js";

export const moveSnakeAction = store => key => {
    const {tile} = store.getState()

    store.dispatch({
        type: UPDATE_PATH,
        payload: {key, tile}
    })

    const {game, snake} = store.getState()

    store.dispatch({
        type: MOVE_SNAKE,
        payload: {path: game.path, size: snake.size}
    })
}

export const shouldGrowAction = store => () => {
    const {food} = store.getState()

    store.dispatch({
        type: GROW_SNAKE,
        payload: {foodPosition: food.position}
    })

    const {game, snake} = store.getState()

    store.dispatch({
        type: MOVE_SNAKE,
        payload: {path: game.path, size: snake.size}
    })

}

export const placeFoodAction = store => () => {
    const {tile, game} = store.getState()
    const area = game.area.width

    const position = [{
        x: getRandomNumber(0, area / tile) * tile,
        y: getRandomNumber(0, area / tile) * tile
    }]

    store.dispatch({
        type: PLACE_FOOD,
        payload: {position}
    })
}
