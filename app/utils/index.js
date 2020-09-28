export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * Math.floor(max)) + min
}

export function getRandomColor() {
    return `hsla(${Math.random() * 360}, 100%, 50%, 1)`
}

export function areInTheSamePosition(snakePosition, foodPosition) {
    return intersects({
            ...foodPosition,
            w: 15,
            h: 15
        },
        {
            ...snakePosition,
            w: 16,
            h: 16
        }
    )
}

export function circleAndRectAreSamePosition(snakePosition, foodPosition) {
    return intersects({
            x: foodPosition.x - 14,
            y: foodPosition.y - 14,
            w: 27,
            h: 27
        },
        {
            ...snakePosition,
            w: 16,
            h: 16
        }
    )
}

function intersects(rect, rect2) {
    return !(rect.x + 1 > (rect2.x + rect2.w) ||
        (rect.x + rect.w) < rect2.x ||
        rect.y + 1 > (rect2.y + rect2.h) ||
        (rect.y + rect.h) < rect2.y);
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

export function isDirectionAllowed(currentDirection, key, snakeSize) {
    if (!currentDirection || snakeSize <= 1) return true
    return (currentDirection !== getOpositeDirection(key))
}

export function isOutGameArea(position, gameArea) {
    const {width, height} = gameArea
    for (let {x, y} of position) {
        if (x > width || y > height) return true
    }
    return false
}

export function offsetGameArea(position, gameArea) {
    const {width, height} = gameArea
    return position.map(({x, y}) => ({x: x - Math.sqrt(width), y: y - Math.sqrt(height)}))
}

export function isKeyAllowed(key) {
    const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    return allowedKeys.includes(key)
}
