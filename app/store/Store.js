export class Store {
    constructor(initState = getInitialState()) {
        this.state = initState
    }

    updateState(reducerFn) {
        const newState = reducerFn(this.state)
        this.state = {...this.state, ...newState}
    }

    resetStore() {
        this.state = getInitialState()
    }

    getState() {
        return this.state
    }
}

function getInitialState() {
    const path = [{x: 0, y: 0}]
    const snake = {
        color: '#a98963',
        position: path
    }
    const food = {
        color: '#dccfc0',
        position: [{x: 160, y: 160}]
    }
    const tile = 16
    const player = {
        points: 0
    }
    const area = {
        width: 400,
        height: 400
    }

    return {
        snake,
        food,
        tile,
        path,
        player,
        area
    }
}
