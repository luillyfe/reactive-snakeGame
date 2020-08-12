let initialState = {
    snake: {
        color: 'red',
        position: [{x: 0, y: 0}]
    },
    food: {
        color: 'white',
        position: [{x: 160, y: 160}]
    },
    path: [{x: 0, y: 0}],
    tile: 16
}

function Store(state = initialState) {
    this._state = state
}

Store.prototype = {
    save(state) {
        this._state = {...this._state, ...state};
    },
    getState() {
        if (Object.getOwnPropertyNames(this._state).length) {
            return this._state
        }
        return initialState
    },
    updateSnake(direction) {
        let {snake, path, tile} = this._state
        let position = this._updatePosition(snake.position, direction, tile, path)
        this.save({...this._state, snake: {...snake, position } })
    },
    _updatePosition(position, direction, tile, path) {
        let {x, y} = position.pop()
        let newPosition;

        switch (direction) {
            case 'ArrowDown': {
                newPosition = {x, y: y + tile}
                break;
            }
            case 'ArrowUp': {
                newPosition = {x, y: y - tile}
                break;
            }
            case 'ArrowLeft': {
                newPosition = {x: x - tile, y}
                break;
            }
            case 'ArrowRight': {
                newPosition = {x: x + tile, y}
                break;
            }
        }

        path.push(newPosition)
        return [newPosition]
    }

}

export {
    Store
}
