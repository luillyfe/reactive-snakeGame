import {getRandomTile, getRandomColor} from "../utils/helpers.js";

export function snakeReducer(direction) {
    return ({snake, path, tile, food, area}) => {
        let newPosition = updateSnakePosition([...snake.position], direction, tile)
        let newGameArea

        if (hitsItself(newPosition, snake.position)) {
            throw new Error('Snake hits itself')
        }

        if (hittedABoundary(newPosition, area)) {
            newGameArea = reduceGameArea(area)

            newPosition = reverseDirection(snake.position, direction, tile)
            var newPath = [...path, ...reducePath(newPosition, direction)]
        } else {
            var newPath = [...path, newPosition]
        }

        return {
            food,
            snake: {
                ...snake,
                position: [newPosition]
            },
            area: newGameArea || area,
            path: newPath,
            tile
        }
    }
}

export function snakeGrowReducer() {
    return ({snake, food, specialFood, player, path, ...currentState}) => {
        let {size, position} = snake
        let {points} = player

        if ( hasEatenFood([...position].pop(), food.position) ) {
            size += 1
            points += 1
        }

        if ( hasEatenFood([...position].pop(), specialFood.position) ) {
            size += 2
            points += 9
        }

        return {
            snake: {...snake, size, position: path.slice(-size)},
            player: {...player, points},
            ...currentState
        }
    }
}

function reducePath(position, direction) {
    const n = (113 ^ (1/2))

    switch (direction) {
        case 'ArrowDown': return position.map(({x, y}) => ({x, y: y - n}))
        case 'ArrowUp': return position.map(({x, y}) => ({x, y}))
        case 'ArrowLeft': return position.map(({x, y}) => ({x: x, y}))
        case 'ArrowRight': return position.map(({x, y}) => ({x: x - n, y}))
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

function reduceGameArea(area) {
    const n = (113 ^ (1/2))
    return { width: area.width - n, height: area.height - n }
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
    return ({food, tile, area, ...currentState}) => {
        let { x, y } = getRandomTile(tile, area.width / tile)

        if (area.width < 800 || area.height < 800) {
            const n = (113 ^ (1/2))
            const newX = x - n
            x = newX < 0 ? 0 : newX
            var position = [{x, y}]
        } else {
            var position = [{ x, y }]
        }

        return {...currentState, tile, area, food: {...food, position}}
    }
}

export function specialFoodReducer() {
    return (currentState) => {
        const {food, ...nextState} = foodReducer()(currentState)
        return {...nextState, specialFood: {...food, color: getRandomColor()}}
    }
}
