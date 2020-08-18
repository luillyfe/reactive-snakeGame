import {getRandomTile} from "../utils/helpers.js";

export function snakeReducer(direction) {
    return ({snake, path, tile, player, food, area}) => {
        let newPosition = updateSnakePosition([...snake.position], direction, tile)

        if (hitsItself(newPosition, snake.position)) {
            throw new Error('Snake hits itself')
        }

        if (hittedABoundary(newPosition, area)) {
            newPosition = reverseDirection(snake.position, direction, tile)
            var newPath = [...path, ...newPosition]
        } else {
            var newPath = [...path, newPosition]
        }

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

function reverseDirection(position, direction, tile) {
    switch (direction) {
        case 'ArrowDown': {
            return position.map(({x, y}, index) => {
                if (index === position.length - 1) {
                    return {x: x - tile, y: y - tile}
                } else if (index === position.length - 2) {
                    return {x: x - tile, y: y + tile}
                }
                return {x, y: y + (tile * 2)}
            })
        }
        case 'ArrowUp': {
            return position.map(({x, y}, index) => {
                if (index === position.length - 1) {
                    return {x: x + tile, y: y + tile}
                } else if (index === position.length - 2) {
                    return {x: x + tile, y: y - tile}
                }
                return {x, y: y - (tile * 2)}
            })
        }
        case 'ArrowLeft': {
            return position.map(({x, y}, index) => {
                if (index === position.length - 1) {
                    return {x: x + tile, y: y - tile}
                } else if (index === position.length - 2) {
                    return {x: x - tile, y: y - tile}
                }
                return {x: x - (tile * 2), y}
            })
        }
        case 'ArrowRight': {
            return position.map(({x, y}, index) => {
                if (index === position.length - 1) {
                    return {x: x - tile, y: y + tile}
                } else if (index === position.length - 2) {
                    return {x: x + tile, y: y + tile}
                }
                return {x: x + (tile * 2), y}
            })
        }
    }
}

function hittedABoundary(position, area) {
    const {width, height} = area
    return (
        position.x >= width ||
        position.x < 0 ||
        position.y >= height ||
        position.y < 0
    )
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
