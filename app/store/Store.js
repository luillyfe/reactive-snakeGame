import {getSnakeColor} from "../utils/helpers.js";

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
        color: getSnakeColor(),
        position: path,
        size: 1
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
        width: 800,
        height: 800
    }
    const specialFood = {
        position: [{x: -16, y: -16}],
    }

    return {
        snake,
        food,
        specialFood,
        tile,
        path,
        player,
        area
    }
}
