const MOVE_SNAKE = 'MOVE_SNAKE'

function snakeReducer(currentState = getInitialState(), {type, payload}) {
    switch (type) {
        case MOVE_SNAKE: {
            const {key: direction, tile} = payload
            const {position} = currentState
            return {
                ...currentState,
                position: getNextPosition([...position].pop(), direction, tile)
            }
        }
        default:
            return currentState
    }
}

function getNextPosition(headPosition, direction, tile) {
    const {x, y} = headPosition

    switch(direction) {
        case 'ArrowDown': return [{x, y: y + tile}]
        case 'ArrowUp': return [{x, y: y - tile}]
        case 'ArrowRight': return [{x: x + tile,  y}]
        case 'ArrowLeft': return [{x: x - tile, y}]
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
