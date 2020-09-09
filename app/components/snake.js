const MOVE_SNAKE = 'MOVE_SNAKE'
const GROW_SNAKE = 'GROW_SNAKE'

function snakeReducer(currentState = getInitialState(), {type, payload}) {
    switch (type) {
        case MOVE_SNAKE: {
            const {size} = currentState
            const {path} = payload

            return {
                ...currentState,
                position: path.slice(-size)
            }
        }
        case GROW_SNAKE: {
            const {size} = currentState

            return {
                ...currentState,
                size: size + 1
            }
        }
        default:
            return currentState
    }
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
