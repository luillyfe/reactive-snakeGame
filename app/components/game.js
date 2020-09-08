import {MOVE_SNAKE} from "./snake.js";

export function gameReducer(currentState = getInitialState(), {type, payload}) {
    switch (type) {
        case MOVE_SNAKE: {
            const {path} = currentState
            const {key: direction, tile} = payload

            const newPath = [
                ...path.slice(0, path.length),
                getNextPosition(path[path.length -1], direction, tile)]

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

function getInitialState() {
    return {
        area: {width: 400, height: 400},
        path: [{x: 0, y: 0}]
    }
}
