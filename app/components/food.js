export const PLACE_FOOD = 'PLACE_FOOD'

export function foodReducer(currentState = getInitialState(), { type, payload }) {
    switch (type) {
        case PLACE_FOOD: {
            const { position } = payload
            return { ...currentState, position }
        }
        default: return currentState
    }
}

function getInitialState() {
    return {position: [{x: 160, y: 160}], color: 'red'}
}
