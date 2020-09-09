const MOVE_SNAKE = 'MOVE_SNAKE'
const GROW_SNAKE = 'GROW_SNAKE'

function snakeReducer(currentState = getInitialState(), {type, payload}) {
    switch (type) {
        case MOVE_SNAKE: {
            const {path, size} = payload

            return {
                ...currentState,
                position: path.slice(-size)
            }
        }
        case GROW_SNAKE: {
            const {position, size} = currentState
            const {foodPosition} = payload

            const newSize = areInTheSamePosition(
                position[position.length - 1],
                foodPosition[foodPosition.length - 1]) ? size + 1 : size

            return {
                ...currentState,
                size: newSize
            }
        }
        default:
            return currentState
    }
}

function areInTheSamePosition(snakePosition, foodPosition) {
    return (snakePosition.x === foodPosition.x &&
        snakePosition.y === foodPosition.y)
}

function getInitialState() {
    return {
        position: [{x: 0, y: 0}],
        color: '#f093a2',
        size: 1
    }
}

export {
    snakeReducer,
    MOVE_SNAKE,
    GROW_SNAKE
}
