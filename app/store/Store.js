import {getRandomNumber} from "../utils/helper.js";

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
    tile: 16,
    player: {
        points: 0
    }
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
    updateFood() {
        let position = [{ x: getRandomNumber(0, 25) * 16, y: getRandomNumber(0, 25) * 16}]

        this.save({
            ...this._state,
            food: { ...this._state.food, position }
        })
    },
    snakeHistItself(newPosition, currentPosition) {
        return currentPosition
            .filter(({x, y}) => x === newPosition.x && y === newPosition.y).length
    },
    updateSnake(direction) {
        let {snake, food, tile, path, player} = this._state

        let newPosition = this._updatePosition(snake.position, direction, tile)
        let hittedAboundary = this._hittedAboundary(newPosition);

        if (this.snakeHistItself(newPosition, snake.position)) {
            throw new Error('snake hits itself');
        }

        let newPoints =
            this._shouldGrow(newPosition, food.position[food.position.length - 1]) ?
                player.points + 1 : player.points

        if (hittedAboundary) {
            newPosition = this._changeDirection(snake.position, direction, tile)
            path.push(...newPosition)
        } else {
            path.push(newPosition)
        }

        this.save({
            ...this._state,
            snake: {...snake, position: path.slice(- (newPoints+1)) },
            player: {...player, points: newPoints}
        })
    },
    _updatePosition(position, direction, tile) {
        let {x, y} = [...position].pop()
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

        return newPosition
    },
    _shouldGrow(snakePosition, foodPosition) {
        return (
            snakePosition.x === foodPosition.x &&
            snakePosition.y === foodPosition.y)
    },
    _hittedAboundary({x, y}) {
        return (
            x >= 400 || x < 0 || y >= 400 || y < 0
        )
    },
    _changeDirection(position, direction, tile) {
        switch (direction) {
            case 'ArrowDown': {
                return position.map(({x, y}, index) => {
                    if (index === position.length - 1) {
                        return {x: x - tile, y: y - tile}
                    } else if(index === position.length - 2) {
                        return {x: x - tile, y: y + tile}
                    }
                    return {x, y: y + (tile * 2)}
                })
            }
            case 'ArrowUp': {
                return  position.map(({x, y}, index) => {
                    if (index === position.length - 1) {
                        return {x: x + tile, y: y + tile}
                    } else if(index === position.length - 2) {
                        return {x: x + tile, y: y - tile}
                    }
                    return {x, y: y - (tile * 2) }
                })
            }
            case 'ArrowLeft': {
                return position.map(({x, y}, index) => {
                    if (index === position.length - 1) {
                        return {x: x + tile, y: y - tile}
                    } else if(index === position.length - 2) {
                        return {x: x - tile, y: y - tile}
                    }
                    return {x: x - (tile * 2), y}
                })
            }
            case 'ArrowRight': {
                return position.map(({x, y}, index) => {
                    if (index === position.length - 1) {
                        return {x: x - tile, y: y + tile}
                    } else if(index === position.length - 2) {
                        return {x: x + tile, y: y + tile}
                    }
                    return {x: x + (tile * 2), y}
                })
            }
        }
    }

}

export {
    Store
}
