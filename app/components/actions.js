import {
    MOVE_SNAKE,
    GROW_SNAKE,
    REVERSE_SNAKE_DIRECTION,
    UPDATE_PATH
} from "./snake.js";
import {PLACE_FOOD, PLACE_SPECIAL_FOOD} from "./food.js";
import {SCORE_POINTS} from "./player.js";
import {REGISTER_DIRECTION, DECREASE_GAME_AREA} from "./game.js";

import {
    getRandomNumber,
    areInTheSamePosition,
    itHitsABoundary,
    getOpositeDirection,
    isDirectionAllowed,
    getRandomColor,
    circleAndRectAreSamePosition
} from "../utils/index.js";
import {getFromLocalStorage, saveToLocalStorage} from "../utils/LocalStorage.js";


export const moveSnakeAction = store => key => {
    const {tile} = store.getState()

    store.dispatch({
        type: UPDATE_PATH,
        payload: {key, tile}
    })

    store.dispatch({
        type: MOVE_SNAKE
    })

    store.dispatch({
        type: REGISTER_DIRECTION,
        payload: {direction: key}
    })
}

export const shouldGrowAction = store => () => {
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

        placeFoodAction(store)()

        store.dispatch({
            type: MOVE_SNAKE
        })
    }

}

export const shouldGrowBy2Action = store => () => {
    const {snake, food} = store.getState()
    const special = food.special

    const showSnakeGrowBy2 = circleAndRectAreSamePosition(
        snake.position[snake.position.length - 1],
        special.position[special.position.length - 1])

    if (showSnakeGrowBy2) {
        store.dispatch({
            type: GROW_SNAKE,
            payload: {units: 2}
        })

        store.dispatch({
            type: SCORE_POINTS,
            payload: {points: 9}
        })

        placeSpecialFoodAction(store)()

        store.dispatch({
            type: MOVE_SNAKE
        })
    }

}

export const shouldReverseAction = store => key => {
    const {snake, game, tile} = store.getState()

    const snakeHittedABoundary = itHitsABoundary(snake.position[snake.position.length - 1], game.area)

    if (snakeHittedABoundary) {
        store.dispatch({
            type: DECREASE_GAME_AREA
        })

        const {game: gameUpdated} = store.getState()

        store.dispatch({
            type: REVERSE_SNAKE_DIRECTION,
            payload: {direction: key, tile, gameArea: gameUpdated.area}
        })

        store.dispatch({
            type: MOVE_SNAKE
        })

        store.dispatch({
            type: REGISTER_DIRECTION,
            payload: {direction: getOpositeDirection(key)}
        })
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

export const placeSpecialFoodAction = store => () => {
    const {tile, game} = store.getState()
    const area = game.area.width

    const position = [{
        x: getRandomNumber(0, area / tile) * tile,
        y: getRandomNumber(0, area / tile) * tile
    }]

    store.dispatch({
        type: PLACE_SPECIAL_FOOD,
        payload: {position, color: getRandomColor()}
    })
}

export const isDirectionAllowedAction = store => key => {
    const {game, snake} = store.getState()

    return isDirectionAllowed(game.currentDirection, key, snake.size)
}

export const snakeHittedItselfAction = store => () => {
    const {snake} = store.getState()
    const lastIndex = snake.position.length - 1
    const snakeHead = snake.position[lastIndex]
    return snake.position
        .slice(0, lastIndex)
        .some(({x, y}) => x === snakeHead.x && y === snakeHead.y)
}

export const isGameSttopedAction = store => () => {
    const {game} = store.getState();

    if (!game.currentDirection) {
        store.dispatch({
            type: REGISTER_DIRECTION,
            payload: {direction: 'ArrowRight'}
        })
    }

    return !game.currentDirection
}

export const resetAction = store => () => {
    const {player} = store.getState()
    const {lastScore} = getFromLocalStorage()
    if (player.points > lastScore) {
        saveToLocalStorage({
            lastScore: player.points,
            snakeColor: getRandomColor()
        })
    }
    store.dispatch({type: 'RESET'})
}

export const getCurrentDirectionAction = store => () => {
    const {game} = store.getState();
    return game.currentDirection ? game.currentDirection : 'ArrowRight'
}
