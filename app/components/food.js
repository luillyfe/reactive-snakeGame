export const PLACE_FOOD = 'PLACE_FOOD'
export const PLACE_SPECIAL_FOOD = 'PLACE_SPECIAL_FOOD'

export function foodReducer(currentState = getInitialState(), {type, payload}) {
    switch (type) {
        case PLACE_FOOD: {
            const {position} = payload
            return {...currentState, position}
        }
        case PLACE_SPECIAL_FOOD: {
            const {position, color} = payload
            return {...currentState, special: {position, color}}
        }
        default:
            return currentState
    }
}

function getInitialState() {
    return {
        position: [{x: 160, y: 160}],
        color: 'red',
        special: {
            position: [{x: -160, y: -160}],
            colors: 'green'
        }
    }
}
