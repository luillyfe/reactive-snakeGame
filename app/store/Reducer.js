import {getRandomTile} from "../utils/helpers.js";

export function snakeReducer(direction) {
    return ({snake, path, tile, player, food}) => {
        const newPosition = updateSnakePosition([...snake.position], direction, tile)

        if (hitsItself(newPosition, snake.position)) {
            throw new Error('Snake hits itself')
        }

        const newPath = [...path, newPosition]
        const newPoints = hasEatenFood(newPosition, food.position) ? player.points + 1 : player.points

        return {
            food,
            snake: {
                ...snake,
                position: newPath.slice(-(newPoints + 1))
            },
            path: newPath,
            tile,
            player: {
                ...player,
                points: newPoints
            }
        }
    }
}

function hitsItself(newPosition, currentPosition) {
    return currentPosition
        .filter(({x, y}) => newPosition.x === x && newPosition.y === y)
        .length
}

function hasEatenFood(snakePosition, foodPosition) {
    const {x, y} = foodPosition[0]
    return (
        snakePosition.x === x &&
        snakePosition.y === y
    )
}

function updateSnakePosition(currentPosition, direction, tile) {
    const {x, y} = currentPosition.pop()
    let newPosition;

    switch (direction) {
        case 'ArrowLeft': {
            newPosition = {x: x - tile, y}
            break
        }
        case 'ArrowRight': {
            newPosition = {x: x + tile, y}
            break
        }
        case 'ArrowUp': {
            newPosition = {x, y: y - tile}
            break
        }
        case 'ArrowDown': {
            newPosition = {x, y: y + tile}
            break
        }
    }

    return newPosition
}

export function foodReducer() {
    return ({food, tile, ...currentState}) => {
        const position = [getRandomTile(tile)]

        return {...currentState, tile, food: {...food, position}}
    }
}
