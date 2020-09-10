export const REGISTER_DIRECTION = 'REGISTER_DIRECTION'

export function gameReducer(currentState = getInitialState(), {type, payload}) {
    switch (type) {
        case REGISTER_DIRECTION: {
            const { direction } = payload
            return {...currentState, currentDirection: direction}
        }
        default:
            return currentState
    }
}

function getInitialState() {
    return {
        area: {width: 400, height: 400},
        currentDirection: null
    }
}
