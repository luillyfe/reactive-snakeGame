function snakeReducer(currentState = getInitialState(), {type, payload}) {
    switch (type) {
        case 'MOVE_SNAKE': {
            return currentState
        }
        default: return currentState
    }
}

function getInitialState() {
    return {
        position: [{x: 0, y: 0}],
        color: '#f093a2'
    }
}

export {
    snakeReducer
}
