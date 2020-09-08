const MOVE_SNAKE = 'MOVE_SNAKE'

function snakeReducer(currentState = getInitialState(), {type, payload}) {
    switch (type) {
        case MOVE_SNAKE: {
            const {path} = payload

            return {
                ...currentState,
                position: path.slice(-1)
            }
        }
        default:
            return currentState
    }
}

function getInitialState() {
    return {
        position: [{x: 0, y: 0}],
        color: '#f093a2'
    }
}

export {
    snakeReducer,
    MOVE_SNAKE,
}
