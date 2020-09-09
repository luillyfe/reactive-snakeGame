export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * Math.floor(max)) + min
}

export function areInTheSamePosition(snakePosition, foodPosition) {
    return (snakePosition.x === foodPosition.x &&
        snakePosition.y === foodPosition.y)
}
