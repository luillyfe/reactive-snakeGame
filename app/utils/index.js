export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * Math.floor(max)) + min
}

export function areInTheSamePosition(snakePosition, foodPosition) {
    return (snakePosition.x === foodPosition.x &&
        snakePosition.y === foodPosition.y)
}

export function itHitsABoundary(snakePosition, gameArea) {
    const {x, y} = snakePosition
    return (x >= gameArea.width || x < 0 ||
        y >= gameArea.height || y < 0
    )
}

export function getOpositeDirection(direction) {
    switch (direction) {
        case 'ArrowUp':
            return 'ArrowDown'
        case 'ArrowDown':
            return 'ArrowUp'
        case 'ArrowLeft':
            return 'ArrowRight'
        case 'ArrowRight':
            return 'ArrowLeft'
        default:
            return direction;
    }
}
