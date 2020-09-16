import {getFromLocalStorage} from "../utils/LocalStorage.js";
import {isOutGameArea, offsetGameArea} from "../utils/index.js";

const UPDATE_PATH = 'UPDATE_PATH'

const MOVE_SNAKE = 'MOVE_SNAKE'
const GROW_SNAKE = 'GROW_SNAKE'
const REVERSE_SNAKE_DIRECTION = 'REVERSE_SNAKE_DIRECTION'

function snakeReducer(currentState = getInitialState(), {type, payload}) {
    switch (type) {
        case MOVE_SNAKE: {
            const {size, path} = currentState

            return {
                ...currentState,
                position: path.slice(-size)
            }
        }
        case GROW_SNAKE: {
            const {size} = currentState
            const {units} = payload

            if (!units) {
                var newSize = size + 1
            } else {
                var newSize = size + units
            }

            return {
                ...currentState,
                size: newSize
            }
        }
        case REVERSE_SNAKE_DIRECTION: {
            const {direction, tile, gameArea} = payload
            const {path, size} = currentState
            const newPath = path.slice(0, path.length - 1)

            let newPosition = reverseDirection(newPath.slice(-size), direction, tile)
            if (isOutGameArea(newPosition, gameArea)) {
                newPosition = offsetGameArea(newPosition, gameArea)
            }

            return {
                ...currentState,
                path: [...newPath, ...newPosition]
            }
        }
        case UPDATE_PATH: {
            const {path} = currentState
            const {key: direction, tile} = payload

            const newPath = [
                ...path.slice(0, path.length),
                getNextPosition(path[path.length - 1], direction, tile)]

            return {
                ...currentState,
                path: newPath
            }
        }
        default:
            return currentState
    }
}

function getNextPosition(headPosition, direction, tile) {
    const {x, y} = headPosition

    switch (direction) {
        case 'ArrowDown':
            return {x, y: y + tile}
        case 'ArrowUp':
            return {x, y: y - tile}
        case 'ArrowRight':
            return {x: x + tile, y}
        case 'ArrowLeft':
            return {x: x - tile, y}
    }
}

function reverseDirection(snakePosition, direction, tile) {
    const lastIndex = snakePosition.length - 1
    const beforeLastIndex = snakePosition.length - 2

    switch (direction) {
        case 'ArrowUp': {
            return snakePosition.map(({x, y}, index) => {
                if (index === lastIndex) {
                    return {x: x + tile, y: y + tile}
                } else if (index === beforeLastIndex) {
                    return {x: x + tile, y: y - tile}
                } else {
                    return {x, y: y - (tile * 2)}
                }
            })
        }
        case 'ArrowDown': {
            return snakePosition.map(({x, y}, index) => {
                if (index === lastIndex) {
                    return {x: x - tile, y: y - tile}
                } else if (index === beforeLastIndex) {
                    return {x: x - tile, y: y + tile}
                } else {
                    return {x, y: y + (tile * 2)}
                }
            })
        }
        case 'ArrowLeft': {
            return snakePosition.map(({x, y}, index) => {
                if (index === lastIndex) {
                    return {x: x + tile, y: y - tile}
                } else if (index === beforeLastIndex) {
                    return {x: x - tile, y: y - tile}
                } else {
                    return {x: x - (tile * 2), y}
                }
            })
        }
        case 'ArrowRight': {
            return snakePosition.map(({x, y}, index) => {
                if (index === lastIndex) {
                    return {x: x - tile, y: y + tile}
                } else if (index === beforeLastIndex) {
                    return {x: x + tile, y: y + tile}
                } else {
                    return {x: x + (tile * 2), y}
                }
            })
        }
        default:
            return snakePosition
    }
}

function getInitialState() {
    const {snakeColor} = getFromLocalStorage()

    return {
        position: [{x: 0, y: 0}],
        color: snakeColor,
        size: 1,
        path: [{x: 0, y: 0}]
    }
}

export {
    snakeReducer,
    MOVE_SNAKE,
    GROW_SNAKE,
    REVERSE_SNAKE_DIRECTION,
    UPDATE_PATH
}
