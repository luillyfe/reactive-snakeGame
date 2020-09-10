import {
    MOVE_SNAKE,
    GROW_SNAKE,
    REVERSE_SNAKE_DIRECTION,
    UPDATE_PATH
} from "./snake.js";
import {PLACE_FOOD} from "./food.js";
import {SCORE_POINTS} from "./player.js";

import {
    getRandomNumber,
    areInTheSamePosition,
    itHitsABoundary,
    getOpositeDirection
} from "../utils/index.js";

export const moveSnakeAction = store => key => {
    const {tile} = store.getState()

    store.dispatch({
        type: UPDATE_PATH,
        payload: {key, tile}
    })

    store.dispatch({
        type: MOVE_SNAKE
    })
}

export const shouldGrowAction = store => key => {
    const {snake, food} = store.getState()

    const showSnakeGrow = areInTheSamePosition(
        snake.position[snake.position.length - 1],
        food.position[food.position.length - 1])

    if (showSnakeGrow) {
        store.dispatch({
            type: GROW_SNAKE
        })

        store.dispatch({
            type: SCORE_POINTS
        })

        moveSnakeAction(store)(key)
    }

}

export const shouldReverseAction = store => key => {
    const {snake, game, tile} = store.getState()

    const snakeHittedABoundary = itHitsABoundary(snake.position[snake.position.length - 1], game.area)

    if (snakeHittedABoundary) {
        store.dispatch({
            type: REVERSE_SNAKE_DIRECTION,
            payload: {direction: key, tile}
        })

        moveSnakeAction(store)(getOpositeDirection(key))
    }
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
