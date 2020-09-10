export function gameReducer(currentState = getInitialState(), {type, payload}) {
    switch (type) {
        default:
            return currentState
    }
}

function getInitialState() {
    return {
        area: {width: 400, height: 400}
    }
}
