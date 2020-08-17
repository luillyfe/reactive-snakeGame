export class Store {
    constructor(initState = getInitialState()) {
        this.state = initState
    }

    updateState(reducerFn) {
        const newState = reducerFn(this.state)
        this.state = {...this.state, ...newState}
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

    return {
        snake,
        food,
        tile,
        path,
        player
    }
}
