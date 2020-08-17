import {getRandomNumber} from "../utils/helpers.js";

export function snakeReducer(direction) {
    return ({ snake, path, tile, ...currentState }) => {
        const position = updateSnakePosition([...snake.position], direction, tile)
        const newPath = [...path, position]

        return {...currentState, snake: {...snake, position: [position]}, path: newPath}
    }
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
    return ({food, ...currentState}) => {
        const position = [{x: getRandomNumber(0, 25) * 16, y: getRandomNumber(0, 25) * 16 }]

        return {...currentState, food: {...food, position}}
    }
}
