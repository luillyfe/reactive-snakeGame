const SCORE_POINTS = 'SCORE_POINTS'

function playerReducer(currentState = getInitialState(), {type, payload}) {
    switch (type) {
        case SCORE_POINTS: {
            if (!payload) {
                var newPoints = currentState.points + 1
            } else {
                const {points} = payload
                var newPoints = currentState.points + points
            }

            return {...currentState, points: newPoints}
        }
        default:
            return currentState
    }
}

function getInitialState() {
    return {
        points: 0
    }
}

export {
    playerReducer,
    SCORE_POINTS
}
