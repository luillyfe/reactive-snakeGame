const SCORE_POINTS = 'SCORE_POINTS'

function playerReducer(currentState = getInitialState(), {type}) {
    switch (type) {
        case SCORE_POINTS: {
            return {...currentState, points: currentState.points + 1}
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
