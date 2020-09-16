export function saveToLocalStorage(appState) {
    // const stateInLocalStorage = getFromLocalStorage()
    // const merged = merge(stateInLocalStorage, appState)
    const serialized = JSON.stringify(appState)
    localStorage.setItem('__app__store', serialized)
}

export function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('__app__store') || getInitialState())
}

function merge(stateInlocal, stateToSave) {
    return Object.keys(stateToSave).reduce((state, key) => {
        state[key] = state[key] ?
            {...state[key], ...stateToSave[key]} : stateToSave[key]
        return state
    }, stateInlocal)
}

function getInitialState() {
    return JSON.stringify({
        lastScore: 0,
        snakeColor: '#f093a2'
    })
}
