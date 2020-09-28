export const REGISTER_DIRECTION = 'REGISTER_DIRECTION'
export const DECREASE_GAME_AREA = 'DECREASE_GAME_AREA'

export function gameReducer(currentState = getInitialState(), {type, payload}) {
    switch (type) {
        case REGISTER_DIRECTION: {
            const {direction} = payload
            return {...currentState, currentDirection: direction}
        }
        case DECREASE_GAME_AREA: {
            const {area} = currentState

            const width = area.width - Math.sqrt(area.width)
            const height = area.height - Math.sqrt(area.height)

            return {
                ...currentState,
                area: {width, height}
            }
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
