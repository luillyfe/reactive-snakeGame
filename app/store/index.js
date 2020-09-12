import { Store } from "./Store.js";

function combineReducers(reducers) {
    return (state = {}, action) => {
        const nextState = Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] = reducers[key](state[key], action)
            return nextState
        }, {})
        return nextState
    }
}

export {
    Store,
    combineReducers,
}
